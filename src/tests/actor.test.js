const request = require('supertest');
const app = require('../app');
require('../models');

let actorId;

test('POST /actors || estatus y que el id este definido', async () => {
    const newActor = {
        firstName: "David",
        lastName: "Diaz",
        nationality: "Narnia",
        image: "https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.infobae.com%2Famerica%2Fperrosygatos%2F2022%2F12%2F27%2Fkabosu-el-perro-de-los-memes-y-dogecoin-esta-delicado-de-salud%2F&psig=AOvVaw0-NRKs6jidK_CIJdobwZhj&ust=1685490776566000&source=images&cd=vfe&ved=0CBEQjRxqFwoTCMiwscrcm_8CFQAAAAAdAAAAABAE",
        birthday: "2022-02-02"
    }
    const res = await request(app)
        .post('/actors')
        .send(newActor);
    actorId = res.body.id;
    expect(res.status).toBe(201);
    expect(res.body.id).toBeDefined();
});

test('GET /actors || estatus 200 y length 1', async () => {
    const res = await request(app).get('/actors');
    expect(res.status).toBe(200);
    expect(res.body).toHaveLength(1);
});

test('PUT /actors/id || estaus 200 y que el nombrea sea el mismo ', async () => {
    const newName = { firstName: "Bruno" };
    const res = await request(app)
        .put(`/actors/${actorId}`)
        .send(newName);
    expect(res.status).toBe(200);
    expect(res.body.firstName).toBe("Bruno");
});

test('DELETE /actors/id || estatus 204', async () => {
    const res = await request(app).delete(`/actors/${actorId}`);
    expect(res.status).toBe(204);
})