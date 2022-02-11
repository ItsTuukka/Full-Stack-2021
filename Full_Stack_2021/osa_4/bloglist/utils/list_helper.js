const _ = require('lodash')
// eslint-disable-next-line no-unused-vars
const dummy = (blogs) => {
    return 1
}

const totalLikes = (blogs) => {
    const multiple = (blogs) => {
        let sum = 0
        blogs.map(blog => {
            sum += blog.likes
        })
        return sum
    }
    if (blogs.length === 0 ) {
        return 0
    } else if (blogs.length === 1) {
        return blogs[0].likes
    } else {
        return multiple(blogs)
    }
}

const favouriteblog = (blogs) => {
    let favourite = null
    if (blogs.length === 0) {
        return favourite
    } else {
        favourite = blogs[0]
        blogs.map(blog => {
            if (blog.likes > favourite.likes) {
                favourite = blog
            }
        })
        return favourite
    }
}

const mostBlogs = (blogs) => {
    if (blogs.length === 0) {
        return null
    }
    const nameList = _.map(blogs, 'author')
    const data = _.values(_.groupBy(nameList)).map(name => ({author: name[0], blogs: name.length}))
    const mostCommon = data.reduce((prev, current) => (prev.blogs > current.blogs) ? prev : current)
    return mostCommon
}

const mostLikes = (blogs) => {
    if (blogs.length === 0) {
        return null
    }
    const authors = {}

    blogs.map(blog=> {
        const name = blog.author
        authors[name]
            ? (authors[name] += blog.likes)
            : (authors[name] = blog.likes)
    })
    const mostLiked = Object.keys(authors).reduce((prev, current) => authors[prev] > authors[current] ? prev : current)
    return {
        author: mostLiked,
        likes: authors[mostLiked]
    }
}
  
module.exports = {
    dummy, totalLikes, favouriteblog, mostBlogs, mostLikes
}