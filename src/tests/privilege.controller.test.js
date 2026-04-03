const request = require('supertest');
const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');
const app = require('../app');
const { Droit } = require('../privilege/models/privilege.model');

let mongoServer;
const API_KEY = '7db5d78b-cef3-4e2d-ac6d-2be2fe3cf494';

jest.setTimeout(60000);

beforeAll(async () => {
    mongoServer = await MongoMemoryServer.create();
    const uri = mongoServer.getUri();
    await mongoose.connect(uri);
    await Droit.init();
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

describe('Privilege (Droit) Controller Tests', () => {
    describe('POST /api/privilege/v1/add', () => {
        it("devrait créer un droit de profil avec succès", async () => {
            const res = await request(app).post('/api/privilege/v1/add').set('X-Api-Key', API_KEY).send({
                profil: "code_profile_ext_1", menuList: ["menu_1", "menu_2"], commentaire: "test"
            });
            expect(res.status).toBe(201);
            expect(res.body.status).toBe(true);
        });

        it("devrait empêcher de créer deux fois les droits pour le même profil (profil unique)", async () => {
            await request(app).post('/api/privilege/v1/add').set('X-Api-Key', API_KEY).send({
                profil: "code_profile_ext_2", menuList: ["menu_1"]
            });
            
            const res = await request(app).post('/api/privilege/v1/add').set('X-Api-Key', API_KEY).send({
                profil: "code_profile_ext_2", menuList: ["menu_2"]
            });
            expect(res.status).toBeGreaterThanOrEqual(400); 
            expect(res.status).toBeLessThan(500); 
        });
    });

    describe('PUT /api/privilege/v1/update/droit', () => {
        it("devrait bien mettre à jour la liste des menus d'un droit", async () => {
            const createRes = await request(app).post('/api/privilege/v1/add').set('X-Api-Key', API_KEY).send({
                profil: "code_update_test", menuList: ["menu_1"]
            });
            const code_droit = createRes.body.data.code_droit;

            const res = await request(app).put('/api/privilege/v1/update/droit').set('X-Api-Key', API_KEY).send({
                code_droit: code_droit,
                menuList: ["menu_1", "menu_nouv"]
            });
            
            expect(res.status).toBe(200);
            expect(res.body.data.menuList).toContain("menu_nouv");
        });
    });
});
