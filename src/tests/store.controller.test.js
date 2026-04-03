const request = require('supertest');
const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');
const app = require('../app');
const { Menu } = require('../menu/models/menu.model');
const { Champ } = require('../inputs/models/input.model');

let mongoServer;
const API_KEY = '7db5d78b-cef3-4e2d-ac6d-2be2fe3cf494';

jest.setTimeout(60000);

beforeAll(async () => {
    mongoServer = await MongoMemoryServer.create();
    const uri = mongoServer.getUri();
    await mongoose.connect(uri);
    await Menu.init();
    await Champ.init();
});

afterAll(async () => {
    await mongoose.disconnect();
    if (mongoServer) await mongoServer.stop();
});

afterEach(async () => {
    const collections = mongoose.connection.collections;
    for (const key in collections) {
        await collections[key].deleteMany();
    }
});

describe('Store (Données Dynamiques) Controller Tests', () => {
    
    // Crée le contexte complet (Menu dynamique + 2 Champs)
    const setupMenuAndFields = async () => {
        const menu = new Menu({
            designation: "Clients",
            type: "dynamique",
            route: "/clients",
            ordre: "1",
            code_menu: "menu_clients",
            parent: "",
            tbl_name: "dyn_clients"
        });
        await menu.save();

        const champMatricule = new Champ({
            menu: menu._id,
            libelle: "Matricule",
            id_champ: "matricule",
            type_champ: "text",
            is_unique: "oui",
            afficher_tableau: "oui",
            ordre: "1",
            obligatoire: "oui"
        });
        await champMatricule.save();

        const champNom = new Champ({
            menu: menu._id,
            libelle: "Nom Complet",
            id_champ: "nom_complet",
            type_champ: "text",
            is_unique: "non",
            afficher_tableau: "oui",
            ordre: "2",
            obligatoire: "non" // Champ falcultatif
        });
        await champNom.save();

        return menu;
    };

    describe('POST /api/store/v1/add', () => {
        it('devrait créer une entrée dynamique avec succès', async () => {
            const menu = await setupMenuAndFields();
            
            const res = await request(app)
                .post('/api/store/v1/add')
                .set('X-Api-Key', API_KEY)
                .send({
                    menu: menu.code_menu,
                    matricule: "CL-100",
                    nom_complet: "Donald"
                });

            expect(res.status).toBe(201);
            expect(res.body.status).toBe(true);
            expect(res.body.data.matricule).toBe("CL-100");
            // Code dynamique a bien été généré par le controller (lettres aléa)
            expect(res.body.data.code_dynamique).toBeDefined(); 
        });

        it('devrait rejeter si un champ obligatoire manque', async () => {
            const menu = await setupMenuAndFields();
            
            const res = await request(app)
                .post('/api/store/v1/add')
                .set('X-Api-Key', API_KEY)
                .send({
                    menu: menu.code_menu,
                    nom_complet: "Donald" // manque matricule qui est obligatoire
                });

            expect(res.status).toBe(422);
            expect(res.body.data.errors[0]).toMatch(/obligatoire/i);
        });

        it('devrait rejeter si une contrainte d\'unicité (is_unique) n\'est pas recpectée', async () => {
            const menu = await setupMenuAndFields();
            
            await request(app).post('/api/store/v1/add').set('X-Api-Key', API_KEY).send({
                menu: menu.code_menu, matricule: "UNIQUE-123"
            });

            // Doublon
            const res = await request(app).post('/api/store/v1/add').set('X-Api-Key', API_KEY).send({
                menu: menu.code_menu, matricule: "UNIQUE-123"
            });

            expect(res.status).toBe(422);
            expect(res.body.data.errors[0]).toMatch(/unique/i);
        });
    });

    describe('PUT /api/store/v1/update/dynamique/:code_dynamique', () => {
        it('devrait mettre à jour l\'enregistrement', async () => {
            const menu = await setupMenuAndFields();
            
            const createRes = await request(app).post('/api/store/v1/add').set('X-Api-Key', API_KEY).send({
                menu: menu.code_menu, matricule: "CL-200", nom_complet: "Ancien Nom"
            });
            const code_dynamique = createRes.body.data.code_dynamique;

            const res = await request(app)
                .put(`/api/store/v1/update/dynamique/${code_dynamique}`)
                .set('X-Api-Key', API_KEY)
                .send({
                    menu: menu.code_menu,
                    nom_complet: "Nouveau Nom"
                });

            expect(res.status).toBe(200);
            expect(res.body.data.nom_complet).toBe("Nouveau Nom");
        });
    });
});
