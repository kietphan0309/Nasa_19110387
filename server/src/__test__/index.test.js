const app = require('../app')
const request = require('supertest')

describe('GET /launches', function () {
    it('Data return json', function (done) {
        request(app)
            .get('/launches')
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200, done);
    });
});
describe('POST /launches', function () {
    it('Đầu vào bị thiếu', async function () {
        const res = await request(app).post('/launches').send({ mission: 'nhiệm vụ' })
        expect(res.statusCode).toEqual(400)
        expect(res.body.error).toEqual('Missing required launch property')
    })
    it('Định dạng ngày sai', async function () {
        const res = await request(app).post('/launches').send({ mission: 'nhiệm vụ', rocket: '10000', launchDate: '111111111111' })

        expect(res.statusCode).toEqual(400)
        expect(res.body.error).toEqual('Invalid launch date')
    })
    it('Thực hiện thành công', async function () {
        const res = await request(app).post('/launches').send({ mission: 'nhiệm vụ', rocket: '10000', launchDate: '2022-11-09' })

        expect(res.statusCode).toEqual(201)
    })
})
// describe('GET /planets', function () {
//     it('Data return json', function (done) {
//         request(app)
//             .get('/planets')
//             .set('Accept', 'application/json')
//             .expect('Content-Type', /json/)
//             .expect(200, done);
//     });
// });
