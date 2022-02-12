const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const jwt = require('jsonwebtoken')

blogsRouter.get('/', async (request, response) => {
    const blogs = await Blog.find({}).populate('user', {blogs: 0})
    response.json(blogs.map(blog => blog.toJSON()))
})
  
blogsRouter.post('/', async (request, response) => {
    const data = request.body
    const decodedToken = jwt.verify(request.token, process.env.SECRET)
    if (!decodedToken.id) {
        return response.status(401).json({ error: 'token missing or invalid' })
    }
    const user = await User.findById(decodedToken.id)
    
    if (!data.title || !data.url) {
        return response.status(400).json({
            error: 'missing title or url'
        })
    }

    const blog = new Blog({
        title: data.title,
        author: data.author,
        url: data.url,
        likes: data.likes || 0,
        user: user._id
    })
  
    const savedBlog = await blog.save()
    user.blogs = user.blogs.concat(savedBlog._id)
    await user.save()

    response.json(savedBlog.toJSON())
})

blogsRouter.delete('/:id', async (request, response) => {
    const blog = await Blog.findById(request.params.id)
    const decodedToken = jwt.verify(request.token, process.env.SECRET)
    if (!decodedToken.id) {
        return response.status(401).json({ error: 'token missing or invalid' })
    }
    const user = await User.findById(decodedToken.id)
    if ( blog.user.toString() === user.id.toString()){
        await Blog.findByIdAndRemove(request.params.id)
        response.status(204).end()
    } else {
        return response.status(403).json({
            error: 'no rights to delete this blog'
        })
    }
})

blogsRouter.put('/:id', (request, response, next) => {
    const body = request.body
  
    const blog = {
      title: body.title,
      author: body.author,
      url: body.url,
      likes: body.likes || 0
    }
  
    Blog.findByIdAndUpdate(request.params.id, blog, { new: true })
      .then(updatedBlog => {
        response.json(updatedBlog)
      })
      .catch(error => next(error))
  })

module.exports = blogsRouter