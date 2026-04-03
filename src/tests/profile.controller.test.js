const request = require('supertest');
const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');
const app = require('../app');
const { Profile } = require('../profile/models/profile.model');

let mongoServer;
const API_KEY = '7db5d78b-cef3-4e2d-ac6d-2be2fe3cf494';

jest.setTimeout(60000);

beforeAll(async () => {
    mongoServer = await MongoMemoryServer.create();
    const uri = mongoServer.getUri();
    await mongoose.connect(uri);
    await Profile.init();
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

describe('Profile Controller Tests', () => {
    describe('POST /api/profile/v1/add', () => {
        it('devrait créer un profil avec succès', async () => {
            const res = await request(app).post('/api/profile/v1/add').set('X-Api-Key', API_KEY).send({
                designation: "Manager", actions: ["read", "write"], visibilite: ["all"], type_accueil: "dashboard"
            });
            expect(res.status).toBe(201);
            expect(res.body.status).toBe(true);
        });

        it('devrait empêcher les profils avec une désignation identique (unique)', async () => {
            await request(app).post('/api/profile/v1/add').set('X-Api-Key', API_KEY).send({
                designation: "UniqueProfile", actions: ["read"], visibilite: ["all"]
            });
            const res = await request(app).post('/api/profile/v1/add').set('X-Api-Key', API_KEY).send({
                designation: "UniqueProfile", actions: ["read", "write"], visibilite: ["all"]
            });
            
            // Depends on controller implementation: could be 400 or 409
            expect(res.status).toBeGreaterThanOrEqual(400); 
            expect(res.status).toBeLessThan(500); 
        });
    });

    describe('PUT /api/profile/v1/update/profile', () => {
        it('devrait mettre à jour un profil', async () => {
            const createRes = await request(app).post('/api/profile/v1/add').set('X-Api-Key', API_KEY).send({
                designation: "OldName", actions: ["read"], visibilite: ["all"]
            });
            const code_profile = createRes.body.data.code_profile;

            const res = await request(app).put(`/api/profile/v1/update/profile`).set('X-Api-Key', API_KEY).send({
                code_profile: code_profile,
                designation: "NewName"
            });
            expect(res.status).toBe(200);
            expect(res.body.data.designation).toBe("newname"); // lowercase par le schema
        });
    });
});
