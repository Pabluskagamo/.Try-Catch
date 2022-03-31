const request = require('supertest');
const routes = require('./src/routes/routes');
const app = require('./src/app.js');
const { beforeAll } = require('@jest/globals');

beforeAll(() => {
    app.use('/', routes);  
});


test('[Ver Atributos] con id existente', async () => {
    const response3 = await request(app).get('/preguntas/mostrar/1');
    expect(response3.status).toBe(450);

});


test('[Ver Atributos] con id no existente', async () => {
    const response3 = await request(app).get('/preguntas/mostrar/-1');
    expect(response3.status).toBe(451);
});


test('[Ver Atributos] con id no existente', async () => {
    const response3 = await request(app).get('/preguntas/mostrar/2');
    expect(response3.status).toBe(451);
});