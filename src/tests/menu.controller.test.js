const request = require('supertest');
const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');
const app = require('../app'); // Pointing to src/app.js

let mongoServer;
const API_KEY = '7db5d78b-cef3-4e2d-ac6d-2be2fe3cf494';

// Augmenter le timeout pour laisser le temps à memory-server de télécharger le binaire Mongo
jest.setTimeout(60000);

beforeAll(async () => {
    mongoServer = await MongoMemoryServer.create();
    const uri = mongoServer.getUri();
    await mongoose.connect(uri);
    
    // Forcer la création des index avant de lancer les tests pour que les erreurs 11000 se déclenchent bien
    const { Menu } = require('../menu/models/menu.model');
    await Menu.init();
});

afterAll(async () => {
    await mongoose.disconnect();
    if (mongoServer) {
        await mongoServer.stop();
    }
});

afterEach(async () => {
    const collections = mongoose.connection.collections;
    for (const key in collections) {
        await collections[key].deleteMany();
    }
});

describe('Menu Controller Tests', () => {
    describe('POST /api/menu/v1/add', () => {
        it('devrait créer un menu avec succès', async () => {
            const res = await request(app)
                .post('/api/menu/v1/add')
                .set('X-Api-Key', API_KEY)
                .send({
                    designation: "Tableau de Bord",
                    type: "parent",
                    route: "/dashboard",
                    ordre: "1",
                    parent: ""
                });

            expect(res.status).toBe(201);
            expect(res.body.status).toBe(true);
        });

        it('devrait retourner une erreur 409 si un menu principal avec le même ordre existe', async () => {
            // Premier menu
            await request(app).post('/api/menu/v1/add').set('X-Api-Key', API_KEY).send({
                designation: "Menu A", type: "parent", route: "/a", ordre: "1", parent: ""
            });

            // Deuxième menu avec le même ordre et parent vide
            const res = await request(app).post('/api/menu/v1/add').set('X-Api-Key', API_KEY).send({
                designation: "Menu B", type: "parent", route: "/b", ordre: "1", parent: ""
            });

            expect(res.status).toBe(409);
            expect(res.body.message).toMatch(/ordre/i);
        });

        it('devrait permettre de créer deux enfants avec les ordres 1 et 2 pour un même parent', async () => {
            await request(app).post('/api/menu/v1/add').set('X-Api-Key', API_KEY).send({
                designation: "Enfant 1", type: "enfant", route: "/e1", ordre: "1", parent: "ParentID"
            });

            const res = await request(app).post('/api/menu/v1/add').set('X-Api-Key', API_KEY).send({
                designation: "Enfant 2", type: "enfant", route: "/e2", ordre: "2", parent: "ParentID"
            });

            expect(res.status).toBe(201);
        });
        
        it('devrait permettre le même ordre 1 pour deux parents différents', async () => {
            await request(app).post('/api/menu/v1/add').set('X-Api-Key', API_KEY).send({
                designation: "Enfant A1", type: "enfant", route: "/ea1", ordre: "1", parent: "ParentA"
            });

            const res = await request(app).post('/api/menu/v1/add').set('X-Api-Key', API_KEY).send({
                designation: "Enfant B1", type: "enfant", route: "/eb1", ordre: "1", parent: "ParentB"
            });

            expect(res.status).toBe(201);
        });
    });

    describe('PUT /api/menu/v1/update/menu', () => {
        it('devrait permettre de supprimer le parent d\'un menu', async () => {
            // Créer un enfant
            const createRes = await request(app).post('/api/menu/v1/add').set('X-Api-Key', API_KEY).send({
                designation: "Sous menu", type: "enfant", route: "/sm", ordre: "10", parent: "ParentX"
            });
            const createdMenus = createRes.body.data;
            const menuCreated = createdMenus.find(m => m.designation === "sous menu"); // lowercase because trim/lowercase in schema

            // Supprimer le parent avec ""
            const res = await request(app).put(`/api/menu/v1/update/menu`).set('X-Api-Key', API_KEY).send({
                code_menu: menuCreated.code_menu,
                parent: ""
            });

            expect(res.status).toBe(200);
            expect(res.body.data.parent).toBe("");
        });
    });
});
