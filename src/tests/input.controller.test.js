const request = require('supertest');
const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');
const app = require('../app');
const { Menu } = require('../menu/models/menu.model');
const { Champ } = require('../inputs/models/input.model');

let mongoServer;
const API_KEY = '7db5d78b-cef3-4e2d-ac6d-2be2fe3cf494';

// Aumenter le timeout global pour le téléchargement de mongo in-memory si besoin
jest.setTimeout(60000);

beforeAll(async () => {
    mongoServer = await MongoMemoryServer.create();
    const uri = mongoServer.getUri();
    await mongoose.connect(uri);
    
    // Forcer la création des index
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

describe('Input (Champ) Controller Tests', () => {
    
    // Setup d'un menu existant avant de tester les inputs
    const setupMenu = async () => {
        const menu = new Menu({
            designation: "Users",
            type: "dynamique", // Must be dynamique since your Champ requires type dynamique
            route: "/users",
            ordre: "1",
            code_menu: "menu_users_123",
            parent: "",
            tbl_name: "users_dyn"
        });
        await menu.save();
        return menu;
    };

    describe('POST /api/input/v1/add', () => {
        it('devrait créer un champ complet avec succès', async () => {
            const menu = await setupMenu();
            
            const res = await request(app)
                .post('/api/input/v1/add')
                .set('X-Api-Key', API_KEY)
                .send({
                    menu: menu.code_menu,
                    libelle: "Prénom",
                    id_champ: "prenom",
                    type_champ: "text",
                    is_unique: "non",
                    afficher_tableau: "oui",
                    ordre: "1",
                    obligatoire: "oui"
                });

            expect(res.status).toBe(201);
            expect(res.body.status).toBe(true);
            expect(res.body.data.id_champ).toBe("prenom");
        });

        it('devrait retourner 409 si id_champ existe déjà pour le même menu', async () => {
            const menu = await setupMenu();
            
            await request(app).post('/api/input/v1/add').set('X-Api-Key', API_KEY).send({
                menu: menu.code_menu, libelle: "Prénom", id_champ: "prenom", 
                type_champ: "text", ordre: "1", obligatoire: "oui"
            });

            const res = await request(app).post('/api/input/v1/add').set('X-Api-Key', API_KEY).send({
                menu: menu.code_menu, libelle: "Autre Prénom", id_champ: "prenom", 
                type_champ: "text", ordre: "2", obligatoire: "non"
            });

            expect(res.status).toBe(409);
        });

        it('devrait retourner 409 si ordre existe déjà pour le même menu', async () => {
            const menu = await setupMenu();
            
            await request(app).post('/api/input/v1/add').set('X-Api-Key', API_KEY).send({
                menu: menu.code_menu, libelle: "Nom", id_champ: "nom", 
                type_champ: "text", ordre: "1", obligatoire: "oui"
            });

            const res = await request(app).post('/api/input/v1/add').set('X-Api-Key', API_KEY).send({
                menu: menu.code_menu, libelle: "Prénom", id_champ: "prenom", 
                type_champ: "text", ordre: "1", obligatoire: "non"
            });

            expect(res.status).toBe(409);
        });
    });

    describe('PUT /api/input/v1/update/input/:code_champ', () => {
        it('devrait mettre à jour un champ existant', async () => {
            const menu = await setupMenu();
            
            const createRes = await request(app).post('/api/input/v1/add').set('X-Api-Key', API_KEY).send({
                menu: menu.code_menu, libelle: "Email", id_champ: "email", 
                type_champ: "text", ordre: "1", obligatoire: "oui"
            });
            
            const code_champ = createRes.body.data.code_champ;

            const res = await request(app)
                .put(`/api/input/v1/update/input/${code_champ}`)
                .set('X-Api-Key', API_KEY)
                .send({
                    libelle: "Email Pro",
                    obligatoire: "non",
                    type_champ: "textarea"
                });

            if (res.status === 500) {
                throw new Error("HTTP 500 from API: " + JSON.stringify(res.body));
            }
            expect(res.status).toBe(200);
            expect(res.body.data.libelle).toBe("Email Pro");
            expect(res.body.data.obligatoire).toBe("non");
            expect(res.body.data.type_champ).toBe("textarea");
        });
    });

});
