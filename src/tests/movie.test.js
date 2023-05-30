const request = require('supertest');
const app = require('../app');
require('../models');

let movieId;

test('POST /movies || estatus y que el id este definido', async () => {
    const newMovie = {
        name: "Narnia",
        image: "https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.tiktok.com%2F%40ivancrspn%2Fvideo%2F7151896002662780165&psig=AOvVaw3e7APbN6wk9U-lQ2j0OuKh&ust=1685493745097000&source=images&cd=vfe&ved=0CBEQjRxqFwoTCODU0dHnm_8CFQAAAAAdAAAAABAS",
        synopsis: "¿Por qué el programador web siempre está frío? Porque siempre trabaja con la ventana abierta.",
        releaseYear: 2022
    }
    const res = await request(app)
        .post('/movies')
        .send(newMovie);
    movieId = res.body.id;
    expect(res.status).toBe(201);
    expect(res.body.id).toBeDefined();
});

test('GET /movies || estatus 200 y length 1', async () => {
    const res = await request(app).get('/movies');
    expect(res.status).toBe(200);
    expect(res.body).toHaveLength(1);
});

test('PUT /movies/id || estaus 200 y que el nombrea sea el mismo ', async () => {
    const newSynopsis = { synopsis: "¿Cuál es el lenguaje de programación favorito de los piratas informáticos?   ¡ARRR-duino!" };
    const res = await request(app)
        .put(`/movies/${movieId}`)
        .send(newSynopsis);
    expect(res.status).toBe(200);
    expect(res.body.synopsis).toBe("¿Cuál es el lenguaje de programación favorito de los piratas informáticos?   ¡ARRR-duino!");
});

test('DELETE /movies/id || estatus 204', async () => {
    const res = await request(app).delete(`/movies/${movieId}`);
    expect(res.status).toBe(204);
})