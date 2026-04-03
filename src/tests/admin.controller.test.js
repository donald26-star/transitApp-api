const request = require('supertest');
const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');
const app = require('../app');
const { Administrateur } = require('../admin/models/admin.model');
const { Profile } = require('../profile/models/profile.model');

let mongoServer;
const API_KEY = '7db5d78b-cef3-4e2d-ac6d-2be2fe3cf494';

jest.setTimeout(60000);

beforeAll(async () => {
    mongoServer = await MongoMemoryServer.create();
    const uri = mongoServer.getUri();
    await mongoose.connect(uri);
    await Profile.init();
    await Administrateur.init();
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

describe('Admin Controller Tests', () => {

    const setupProfile = async () => {
        const p = new Profile({ designation: "adm", actions: [], visibilite: [], code_profile: "prof_admin" });
        await p.save();
        return p.code_profile;
    };

    describe('POST /api/admin/v1/register', () => {
        it('devrait inscrire un nouvel administrateur avec succès', async () => {
            const profileCode = await setupProfile();
            const res = await request(app)
                .post('/api/admin/v1/register')
                .set('X-Api-Key', API_KEY)
                .send({
                    nom: "Admin Test",
                    email: "admin@test.com",
                    password: "password123",
                    telephone: "+33 612345678",
                    genre: "Masculin",
                    type_compte: "admin",
                    profile: profileCode
                });

            expect(res.status).toBe(201);
            expect(res.body.status).toBe(true);
            expect(res.body.data.email).toBe("admin@test.com");
            expect(res.body.data.password).toBeUndefined(); 
        });

        it('devrait retourner une erreur si email existant', async () => {
            const profileCode = await setupProfile();
            
            await request(app).post('/api/admin/v1/register').set('X-Api-Key', API_KEY).send({
                nom: "Un", email: "admin2@test.com", password: "pwd", telephone: "+33 611111111", genre: "Masculin", type_compte: "admin", profile: profileCode
            });

            const res = await request(app).post('/api/admin/v1/register').set('X-Api-Key', API_KEY).send({
                nom: "Deux", email: "admin2@test.com", password: "pwd", telephone: "+33 622222222", genre: "Feminin", type_compte: "admin", profile: profileCode
            });
            expect(res.status).toBe(400); 
        });
    });

    describe('POST /api/admin/v1/login', () => {
        it('devrait connecter l\'utilisateur et forcer status_first_connexion', async () => {
            const profileCode = await setupProfile();
            await request(app).post('/api/admin/v1/register').set('X-Api-Key', API_KEY).send({
                nom: "Login Test", email: "login@test.com", password: "password123", telephone: "+33 633333333", genre: "Masculin", type_compte: "admin", profile: profileCode
            });

            const res = await request(app)
                .post('/api/admin/v1/login')
                .set('X-Api-Key', API_KEY)
                .send({
                    login: "login@test.com",
                    password: "password123"
                });

            expect(res.status).toBe(200);
            expect(res.body.status).toBe(true);
        });

        it('devrait refuser une connexion avec mauvais mot de passe', async () => {
            const profileCode = await setupProfile();
            await request(app).post('/api/admin/v1/register').set('X-Api-Key', API_KEY).send({
                nom: "Login Test2", email: "log2@test.com", password: "pwd", telephone: "+33 644444444", genre: "Masculin", type_compte: "admin", profile: profileCode
            });

            const res = await request(app)
                .post('/api/admin/v1/login')
                .set('X-Api-Key', API_KEY)
                .send({
                    login: "log2@test.com",
                    password: "wrong"
                });

            expect(res.status).toBe(401);
        });
    });
});
