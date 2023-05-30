const request = require('supertest');
const app = require('../app');
const Actor = require('../models/Actor');
const Genre = require('../models/Genre');
const Director = require('../models/Director');
require('../models');

let movieId;

test('POST /movies || estatus 201 y que el id este definido', async () => {
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

test('POST /movies/id/actors retornar un 201', async () => {
    const actor = await Actor.create({
        firstName: "David",
        lastName: "Diaz",
        nationality: "Narnia",
        image: "https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.infobae.com%2Famerica%2Fperrosygatos%2F2022%2F12%2F27%2Fkabosu-el-perro-de-los-memes-y-dogecoin-esta-delicado-de-salud%2F&psig=AOvVaw0-NRKs6jidK_CIJdobwZhj&ust=1685490776566000&source=images&cd=vfe&ved=0CBEQjRxqFwoTCMiwscrcm_8CFQAAAAAdAAAAABAE",
        birthday: "2022-02-02"
    });
    const res = await request(app)
        .post(`/movies/${movieId}/actors`)
        .send([actor.id])
    await actor.destroy();
    console.log('ACTORS BODY',res.body);
    expect(res.status).toBe(200);
    expect(res.body).toHaveLength(1);
});

test('POST /movies/:id/directors should set the movie directors', async () => {
    const director = await Director.create({
        firstName: "Caro",
        lastName: "Rojas",
        nationality: "Narnia",
        image: "https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.tiktok.com%2F%40ivancrspn%2Fvideo%2F7151896002662780165&psig=AOvVaw3e7APbN6wk9U-lQ2j0OuKh&ust=1685493745097000&source=images&cd=vfe&ved=0CBEQjRxqFwoTCODU0dHnm_8CFQAAAAAdAAAAABAS",
        birthday: "2022-02-02"
    })
    const res = await request(app)
        .post(`/movies/${movieId}/directors`)
        .send([director.id])
    await director.destroy();
    console.log('DIRECTORS BODY',res.body);
    expect(res.status).toBe(200);
    expect(res.body).toHaveLength(1);
});

test('POST /movies/:id/genres should set the movie genres', async () => {
    const genre = await Genre.create({ name: "Comdey" })
    const res = await request(app)
        .post(`/movies/${movieId}/genres`)
        .send([genre.id])
    await genre.destroy();
    console.log('GENRES BODY',res.body);
    expect(res.status).toBe(200);
    expect(res.body).toHaveLength(1);
});

test('DELETE /movies/id || estatus 204', async () => {
    const res = await request(app).delete(`/movies/${movieId}`);
    expect(res.status).toBe(204);
});





