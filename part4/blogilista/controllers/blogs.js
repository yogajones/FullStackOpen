const blogsRouter = require('express').Router()
const Blog = require('../models/blog')

blogsRouter.get('/', (request, response) => {
    Blog
        .find({})
        .then(blogs => {
            response.json(blogs)
        })
})

blogsRouter.post('/', (request, response, next) => {
    const body = request.body

    const blog = new Blog({
        title: body.title,
        author: body.author,
        url: body.url,
        likes: body.likes
    })

    console.log(body.title)

    blog
        .save()
        .then(result => {
            response.status(201).json(result)
        })
        .catch(error => next(error))
})

module.exports = blogsRouter