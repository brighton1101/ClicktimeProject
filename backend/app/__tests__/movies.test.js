const app = require('../app.js');
const supertest = require('supertest')
const request = supertest(app);
const sample_data = require('../../sample_data/data.json');

test('Endpoint is accessible', async (done) => {
	const res = await request.get('/movies');
	expect(res.status).toBe(200);
	done();
});

test('Endpoint has data', async (done) => {
	const res = await request.get('/movies');
	expect(JSON.parse(res.body)).toStrictEqual(sample_data);
	done();
});

