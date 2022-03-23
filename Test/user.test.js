const request = require('supertest');
const app = require('../src/app');
const routes = require('../src/routes/routes');
const session = require('supertest-session');
const { beforeAll, afterAll , beforeEach} = require('@jest/globals');

beforeAll(() => {
    app.use('/', routes);  
});


test('[Registro] Usuarios correcto', async () => {// no se esta eliminando, deberia?
    const usuario = { nombre: 'prueba', email: 'prueba@prueba.es', password: '1234567Aa', password2: '1234567Aa' };
    
    const response = await request(app).post("/sign-up").send(usuario);
    expect(response.status).toBe(201);

});
test('[Registro] Usuarios existente', async () => {
    const usuario = { nombre: 'prueba', email: 'prueba@prueba.es', password: '1234567Aa', password2: '1234567Aa' };
    
    const response = await request(app).post("/sign-up").send(usuario);
    expect(response.status).toBe(402);

});
test('[Registro] Usuario datos vacios', async () => {
    const usuario = { nombre: '', email: '', password: '', password2: '' };
    
    const response = await request(app).post("/sign-up").send(usuario);
    expect(response.status).toBe(401);

});

test('[Registro] Usuarios nombre incorrecto', async () => {
    const usuario = { nombre: 'p', email: 'prueba@prueb.es', password: '12345Aa', password2: '12345Aa' };
    
    const response = await request(app).post("/sign-up").send(usuario);
    expect(response.status).toBe(401);

});

test('[Registro] Usuarios contraseña diferente', async () => {
    const usuario = { nombre: 'prueba', email: 'prueba@prueb.es', password: '12345Aa', password2: '12345Aa' };    
    const response = await request(app).post("/sign-up").send(usuario);
    expect(response.status).toBe(401);

});

test('[Registro] Usuarios contraseña insuficiente numero caracteres', async () => {
    const usuario = { nombre: 'prueba', email: 'prueb.es', password: '12345', password2: '12345' };
    const response = await request(app).post("/sign-up").send(usuario);
    expect(response.status).toBe(401);

});

test('[Registro] Usuarios contraseña falta mayusucla', async () => {
    const usuario = { nombre: 'prueba', email: 'prueb.es', password: '1234567a', password2: '1234567a' };
    const response = await request(app).post("/sign-up").send(usuario);
    expect(response.status).toBe(401);

});

test('[Registro] Usuarios contraseña falta minuscula', async () => {
    const usuario = { nombre: 'prueba', email: 'prueb.es', password: '1234567A', password2: '1234567A' };
    const response = await request(app).post("/sign-up").send(usuario);
    expect(response.status).toBe(401);

});

var cookies;

test('[Inicio de sesion] correo/contraseña correcto', async () => {

    const usuario = { correo: 'alberiva@ucm.es', contraseya: '123'};
    const response = await request(app).post('/login').send(usuario);
    expect(response.status).toBe(302);

});

test('[Crear pregunta] con sesion iniciada', async () => {

    const usuario = { correo: 'alberiva@ucm.es', contraseya: '123'};
    const pregunta = {
        titulo: "Pregunta de test",
        descripcion: "test",
        etiquetas: [1,2,3]
    }

    let testSession = session(app);


    const response = await testSession.post('/login').send(usuario);
    
    const response2 = await testSession.post('/preguntas/crear').send(pregunta);
    expect(response2.status).toBe(200);

});

