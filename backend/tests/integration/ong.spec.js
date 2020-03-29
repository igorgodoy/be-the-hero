const request = require('supertest');
const app = require('../../src/app');
const connection = require('../../src/database/connection');

describe('ONG', () => {
    beforeEach(async () => {
        await connection.migrate.rollback();
        await connection.migrate.latest();
    });

    afterAll(async () => {
        await connection.destroy();
    });

    it('should be able to create a new ONG', async () => {
        const { body } = await request(app)
        .post('/ongs')
        .send({
            name: "APAD5",
            email: "contato@apad5.com.br",
            whatsapp: "19991149804",
            city: "Campinas",
            uf: "SP"
        });

        expect(body).toHaveProperty('id');
        expect(body.id).toHaveLength(8);
    })
});