const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const helper = require('./test_helper')
const api = supertest(app)

const Blog = require('../models/blog')

beforeEach(async () => {
    await Blog.deleteMany({})
    await Blog.insertMany(helper.initialBlogs)
})

describe('blog tests', () => {
    test('blogs are returned as json', async () => {
        await api
          .get('/api/blogs')
          .expect(200)
          .expect('Content-Type', /application\/json/)
      })
    
    test('all blogs are returned', async () => {
        const res = await api.get('/api/blogs')

        expect(res.body).toHaveLength(helper.initialBlogs.length)
    })

    test('blogs have id field', async () => {
        const res = await api.get('/api/blogs')

        expect(res.body[0].id).toBeDefined()
    })

    test('add blog', async () => {
        const newBlog = {
            title: "dafag", 
            author: "markus", 
            url: "nojaa.com", 
            likes: 69
        }

        await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(200)
        .expect('Content-Type', /application\/json/)

        const uptatedBlogs = await helper.blogsInDb()
        expect(uptatedBlogs).toHaveLength(helper.initialBlogs.length + 1)

        const authors = uptatedBlogs.map(b => b.author)
        expect(authors).toContain('markus')
    })

    test('add blog withou like param, check if 0', async () => {
        const newBlog = {
            title: "dafag", 
            author: "markus", 
            url: "nojaa.com"
        }

        const res = await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(200)
        .expect('Content-Type', /application\/json/)

        const uptatedBlogs = await helper.blogsInDb()
        expect(uptatedBlogs).toHaveLength(helper.initialBlogs.length + 1)

        expect(res.body.likes).toBe(0)
    })

    test('get 400 if invalid data', async () => {
        const newBlog = {
            author: "markus", 
            likes: 12
        }

        await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(400)

        const uptatedBlogs = await helper.blogsInDb()
        expect(uptatedBlogs).toHaveLength(helper.initialBlogs.length)
    })
})


afterAll(() => {
  mongoose.connection.close()
})