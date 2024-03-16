const asyncHandler = require('express-async-handler')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const User = require('../models/user.model')

// @desc     POST register user
// @route    POST /api/users
// @access   Public
const registerUser = asyncHandler(async (req, res) => {
    const { name, email, password } = req.body
    if (!name || !email || !password) {
        res.status(400)
        throw new Error('Please add all fields')
    }

    const userExists = await User.findOne({ email })
    if (userExists) {
        res.status(400)
        throw new Error('User already exists')
    }

    const salt = await bcrypt.genSalt(10)
    const hashPassword = await bcrypt.hash(password, salt)

    const user = await User.create({
        name,
        email,
        password: hashPassword
    })

    if (user) {
        res.status(201).json({
            id: user._id,
            name: user.name,
            email: user.email,
            token: generateToken(user._id)
        })
    }

})

// @desc     POST login user
// @route    POST /api/users/login
// @access   Public
const loginUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body
    if (!email || !password) {
        res.status(400)
        throw new Error('Please add all fields')
    }

    const user = await User.findOne({ email })

    if (user && (await bcrypt.compare(password, user.password))) {
        res.status(200).json({
            id: user._id,
            name: user.name,
            email: user.email,
            token: generateToken(user._id)
        })
    } else {
        res.status(400)
        throw new Error('Invalied credentials')
    }

})


// @desc     GET  user
// @route    GET /api/users/me
// @access   Private
const getMe = asyncHandler(async (req, res) => {
    const { _id, name, email } = await User.findById(req.user.id);
    res.status(200).json(req.user)
})

// @create a JWT token
const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: '30d'
    })
}

module.exports = { registerUser, loginUser, getMe }