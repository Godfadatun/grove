import User from "../entities/user";
import supertest from "supertest";
import faker from 'faker'

const mongoose = require("mongoose")
const createServer = require("../server")
let token;
let id;
let user = faker.name.findName()
let password = faker.internet.password()
beforeEach((done) => {
    mongoose.connect(
        "mongodb://localhost:27017/testDb",
        {useNewUrlParser: true},
        () => done()
    )
})

afterEach((done) => {
    mongoose.connection.db.dropDatabase(() => {
        mongoose.connection.close(() => done())
    })
})


test('POST /auth/signup', async () => {
    await supertest(createServer).post('/auth/signup').send({
        username: user,
        name: faker.name.findName(),
        email: faker.internet.email(),
        password: password
    }).expect(200).then(
        res => {
            token = res.body.data.token
        }
    )
})

test('POST /auth/login', async () => {
    await supertest(createServer).post('/auth/login').send({
        username: user,
        password: password
    }).expect(200)
})

test('POST /auth/forgot', async () => {
    await supertest(createServer).post('/auth/forgot').send({
        username: user
    }).expect(200)
})

test('POST /auth/verify', async () => {
    await supertest(createServer).post('/auth/verify').send({
        username: user,
        token: '2hda'
    }).expect(400)
})
test('POST /auth/reset', async () => {
    await supertest(createServer).post('/auth/reset').auth(token, {type: 'bearer'}).send({
        password: password
    }).expect(200)
})


test('POST /contact', async () => {
    await supertest(createServer).post('/contact').auth(token, {type: 'bearer'}).send({
        name: faker.name.firstName(),
        phone_number: faker.phone.phoneNumber(),
        email: faker.internet.email(),
        address: faker.address.streetAddress(),
        gender: faker.name.lastName()
    }).expect(200)
})

test('GET /contact', async () => {
    await supertest(createServer).get('/contact').auth(token, {type: 'bearer'}).expect(200).then(
        res => {
            id = res.body.data[0]._id
        }
    )
})

test('GET /contact/:id', async () => {
    await supertest(createServer).get('/contact/' + id).auth(token, {type: 'bearer'}).expect(200)
})


test('GET /contact/:id', async () => {
    await supertest(createServer).put('/contact/' + id).auth(token, {type: 'bearer'}).send({
        name: 'hello',
        phone_number: 'name',
        email: 'a@a.com',
        address: 'password',
        gender: ''
    }).expect(200)
})

test('GET /contact/:id', async () => {
    await supertest(createServer).delete('/contact/' + id).auth(token, {type: 'bearer'}).expect(200)
})


