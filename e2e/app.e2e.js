const request = require('supertest');
const createApp = require('./../src/app');

describe('testing the app', () => {
    let app = null;
    let server = null;
    let api = null;

    beforeAll(async () => {
        app = createApp();
        server = app.listen(9000);
        api = request(app);
    })

    describe('GET /articles', () => {
        test('should an unauthorized access', async () => {
          const { statusCode } = await api.get(`/v1/api/articles`)
          expect(statusCode).toEqual(401);
        });
    })


    afterAll(async () => {
        server.close();
    })

})