const request = require('supertest');
const app = require('../app');
require('../models');

let directorId;

test('POST /directors || estatus y que el id este definido', async () => {
    const newDirector = {
        firstName: "Caro",
        lastName: "Rojas",
        nationality: "Narnia",
        image: "https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.tiktok.com%2F%40ivancrspn%2Fvideo%2F7151896002662780165&psig=AOvVaw3e7APbN6wk9U-lQ2j0OuKh&ust=1685493745097000&source=images&cd=vfe&ved=0CBEQjRxqFwoTCODU0dHnm_8CFQAAAAAdAAAAABAS",
        birthday: "2022-02-02"
    }
    const res = await request(app)
        .post('/directors')
        .send(newDirector);
    directorId = res.body.id;
    expect(res.status).toBe(201);
    expect(res.body.id).toBeDefined();
});

test('GET /directors || estatus 200 y length 1', async () => {
    const res = await request(app).get('/directors');
    expect(res.status).toBe(200);
    expect(res.body).toHaveLength(1);
});

test('PUT /directors/id || estaus 200 y que el nombrea sea el mismo ', async () => {
    const newName = { lastName: "Tarantulino" };
    const res = await request(app)
        .put(`/directors/${directorId}`)
        .send(newName);
    expect(res.status).toBe(200);
    expect(res.body.lastName).toBe("Tarantulino");
});

test('DELETE /directors/id || estatus 204', async () => {
    const res = await request(app).delete(`/directors/${directorId}`);
    expect(res.status).toBe(204);
})