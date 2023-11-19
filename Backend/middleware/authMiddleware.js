const jwt = require('jsonwebtoken')
const asyncHandler = require('express-async-handler')
const User = require('../models/user.model')

const protect = asyncHandler(async (req, res, next) => {

    let token

    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        token = req.headers.authorization.split(' ')[1]
        try {

            // Verfie token
            const decoded = jwt.verify(token, process.env.JWT_SECRET)

            // Get the user from token
            req.user = await User.findById(decoded.id).select('-password')
            next()
        } catch (error) {
            console.log('ERROR AT PROTECT MIDDLEWARE :: ' + error)
            res.status(401)
            throw new Error('No authorization')
        }
    }

    if (!token) {
        res.status(401)
        throw new Error('No authorization')
    }

})

module.exports = { protect }