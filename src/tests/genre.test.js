const request = require('supertest');
const app = require('../app');
require('../models');

let genreId;

test('POST /genres || estatus y que el id este definido', async () => {
    const newGenre = {
        name: "Accion"
    }
    const res = await request(app)
        .post('/genres')
        .send(newGenre);
    genreId = res.body.id;
    expect(res.status).toBe(201);
    expect(res.body.id).toBeDefined();
});

test('GET /genres || estatus 200 y length 1', async () => {
    const res = await request(app).get('/genres');
    expect(res.status).toBe(200);
    expect(res.body).toHaveLength(1);
});

test('PUT /genres/id || estaus 200 y que el nombrea sea el mismo ', async () => {
    const newName = { name: "Scary" };
    const res = await request(app)
        .put(`/genres/${genreId}`)
        .send(newName);
    expect(res.status).toBe(200);
    expect(res.body.name).toBe("Scary");
});

test('DELETE /genres/id || estatus 204', async () => {
    const res = await request(app).delete(`/genres/${genreId}`);
    expect(res.status).toBe(204);
})