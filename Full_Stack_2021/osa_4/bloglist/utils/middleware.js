const jwt = require('jsonwebtoken')
const User = require('../models/user')

const tokenExtractor = (request, response, next) => {
    const getTokenFrom = request => {
        const authorization = request.get('authorization')
        if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
          return authorization.substring(7)
        }
        return null
    }
    request.token = getTokenFrom(request)
    next()
}

module.exports = {tokenExtractor}