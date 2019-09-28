const app = require('../app.js');
const supertest = require('supertest')
const request = supertest(app);
const sample_data = require('../../sample_data/data.json');
const sample_images = require('../../sample_data/images.json');

test('Movies endpoint is accessible', async (done) => {
	const res = await request.get('/movies');
	expect(res.status).toBe(200);
	done();
});

test('Movies endpoint has data', async (done) => {
	const res = await request.get('/movies');
	expect(JSON.parse(res.body)).toStrictEqual(sample_data);
	done();
});

test('Images endpoint is accessible', async (done) => {
	const res = await request.get('/movies/images');
	expect(res.status).toBe(200);
	done();
});

test('Images endpoint has data', async (done) => {
	const res = await request.get('/movies/images');
	expect(JSON.parse(res.body)).toStrictEqual(sample_images);
	done();
});
