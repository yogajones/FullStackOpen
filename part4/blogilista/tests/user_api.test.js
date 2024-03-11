const { test, after, beforeEach, describe } = require('node:test')
const assert = require('node:assert')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const User = require('../models/user')
const helper = require('./test_helper')
const bcrypt = require('bcrypt')

beforeEach(async () => {
    await User.deleteMany({})

    const passwordHash = await bcrypt.hash('beforeEach', 10)
    const user = new User({username: 'beforeEach', passwordHash})
    await user.save()
})

describe('GET /api/users', () => {
    test('succesfully returns all users', async () => {
        const usersAtStart = await helper.usersInDB()

        const response = await api
            .get('/api/users')
            .expect(200)
            .expect('Content-Type', /application\/json/)

        assert.strictEqual(response.body.length, usersAtStart.length)
    })
})


describe('POST /api/users', () => {
    test('succesfully creates a new user', async () => {
        const usersAtStart = await helper.usersInDB()

        const newUser = {
            username: 'deedee',
            name: 'Dee Dee',
            password: 'doodoo'
        }

        await api
            .post('/api/users')
            .send(newUser)
            .expect(201)
            .expect('Content-Type', /application\/json/)
        
        const usersAtEnd = await helper.usersInDB()
        assert.strictEqual(usersAtEnd.length, usersAtStart.length + 1)

        const usernames = usersAtEnd.map(u => u.username)
        assert(usernames.includes(newUser.username))
    })
    test('enforces unique usernames at least 3 characters long', async () => {
        const usersAtStart = await helper.usersInDB()

        const validUser = {
            username: 'heehee',
            name: 'Dee Dee',
            password: 'doodoo'
        }
        const duplicateUsername = {
            username: 'heehee',
            name: 'Dee Dee',
            password: 'doodoo'
        }
        const shortUsername = {
            username: 'd',
            name: 'Dee Dee',
            password: 'doodoo'
        }

        await api
            .post('/api/users')
            .send(validUser)
            .expect(201)
        await api
            .post('/api/users')
            .send(duplicateUsername)
            .expect(400)
        await api
            .post('/api/users')
            .send(shortUsername)
            .expect(400)
        
        const usersAtEnd = await helper.usersInDB()
        assert.strictEqual(usersAtEnd.length, usersAtStart.length + 1)

        const usernames = usersAtEnd.map(u => u.username)
        assert(usernames.includes(validUser.username))
        assert.strictEqual(usernames.filter(u => u === duplicateUsername.username).length, 1)
        assert.strictEqual(usernames.filter(u => u === shortUsername.username).length, 0)
    })
    test('enforces passwords at least 3 characters long', async () => {
        const usersAtStart = await helper.usersInDB()

        const validUser = {
            username: 'heehee',
            name: 'Dee Dee',
            password: 'doodoo'
        }
        const emptyPassword = {
            username: 'tootoo',
            name: 'Dee Dee',
            password: ''
        }
        const shortPassword = {
            username: 'd',
            name: 'Dee Dee',
            password: 'd2'
        }

        await api
            .post('/api/users')
            .send(validUser)
            .expect(201)
        await api
            .post('/api/users')
            .send(emptyPassword)
            .expect(400)
        await api
            .post('/api/users')
            .send(shortPassword)
            .expect(400)
        
        const usersAtEnd = await helper.usersInDB()
        assert.strictEqual(usersAtEnd.length, usersAtStart.length + 1)

        const usernames = usersAtEnd.map(u => u.username)
        assert(usernames.includes(validUser.username))
        assert.strictEqual(usernames.includes(emptyPassword.username), false)
        assert.strictEqual(usernames.includes(shortPassword.username), false)
    })
})


after(async () => {
    await mongoose.connection.close()
})