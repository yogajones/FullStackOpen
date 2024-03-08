const { test, after, beforeEach, describe } = require('node:test')
const assert = require('node:assert')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const Blog = require('../models/blog')
const helper = require('./test_helper')

beforeEach(async () => {
    await Blog.deleteMany({})
    await Blog.insertMany(helper.initialBlogs)
})

describe('GET /api/blogs', () => {
    test('returns JSON content', async () => {
        await api
            .get('/api/blogs')
            .expect(200)
            .expect('Content-Type', /application\/json/)
    })
    test('returns the correct number of blogs', async () => {
        const response = await api.get('/api/blogs')
        assert.strictEqual(response.body.length, helper.initialBlogs.length)
    })
    test('returns blogs with an id field', async () => {
        const response = await api.get('/api/blogs')
        const blogs = response.body

        blogs.forEach(blog => {
            assert.notStrictEqual(blog.id, undefined)
        })
    })
})

describe('POST /api/blogs', () => {
    const newBlog = {
        title: 'Titles and such',
        author: 'A. Author',
        url: 'http://www.google.com/',
        likes: 0
    }
    test('increases the number of returned blogs by one', async () => {
        await api
            .post('/api/blogs')
            .send(newBlog)
            .expect(201)
            .expect('Content-Type', /application\/json/)
          
        const response = await api.get('/api/blogs')          
        assert.strictEqual(response.body.length, helper.initialBlogs.length + 1)
    })
    test('adds the proper content to the database', async () => {
        await api
            .post('/api/blogs')
            .send(newBlog)
            .expect(201)
            .expect('Content-Type', /application\/json/)
      
        const response = await api.get('/api/blogs')

        const blogTitles = response.body.map(r => r.title)
        assert(blogTitles.includes('Titles and such'))

        const blogAuthor = response.body.map(r => r.author)
        assert(blogAuthor.includes('A. Author'))
    })
    test('sets likes to 0 if undefined', async () => {
        const undefinedLikesBlog = {
            title: 'Where are my likes?',
            author: 'Another Author',
            url: 'http://www.google.fi/'
        }
        await api
            .post('/api/blogs')
            .send(undefinedLikesBlog)
            .expect(201)
            .expect('Content-Type', /application\/json/)
          
        const response = await api.get('/api/blogs')
        const savedBlog = response.body.find(b => b.title === 'Where are my likes?')
        assert.strictEqual(savedBlog.likes, 0)
    })
    test('returns 400 if title or url is undefined', async () => {
        const blogWithOnlyAuthor = {
            author: 'Lonely Author'
        }
        await api
            .post('/api/blogs')
            .send(blogWithOnlyAuthor)
            .expect(400)
    })
})


after(async () => {
    await mongoose.connection.close()
})