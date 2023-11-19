const expressAsyncHandler = require("express-async-handler")
const Goal = require('../models/goal.model')
const User = require('../models/user.model')

// @desc     Get All Goals
// @route    GET /api/goals
// @access   Private
const getGoals = expressAsyncHandler(async (req, res) => {
    const goals = await Goal.find({ user: req.user._id })
    res.status(200).json(goals)
})

// @desc     Add goal
// @route    POST /api/goals
// @access   Private
const setGoal = expressAsyncHandler(async (req, res) => {
    if (!req.body.text) {
        res.status(400)
        throw new Error('Please add text field')
    }

    const goal = await Goal.create({
        user: req.user._id,
        text: req.body.text
    })

    res.status(200).json(goal)
})

// @desc     Update Goals
// @route    PUT /api/goals/:id
// @access   Private
const updateGoal = expressAsyncHandler(async (req, res) => {

    const goal = await Goal.findById(req.params.id)

    if (!goal) {
        res.status(400)
        throw new Error('Goal not found')
    }

    if (!req.user) {
        res.status(401)
        throw new Error('User not found')
    }

    // Make sure the logged in user matches the goal user
    if (goal.user.toString() !== req.user.id) {
        res.status(401)
        throw new Error('User not authorized')
    }

    const updatedGoal = await Goal.findByIdAndUpdate(req.params.id,
        req.body, { new: true })
    res.status(200).json(updatedGoal)

})

// @desc     Delete Goals
// @route    DELETE /api/goals/:id
// @access   Private
const deleteGoal = expressAsyncHandler(async (req, res) => {
    const goal = await Goal.findById(req.params.id)

    if (!goal) {
        res.status(400)
        throw new Error('Goal not found')
    }

    if (!req.user) {
        res.status(401)
        throw new Error('User not found')
    }

    // Make sure the logged in user matches the goal user
    if (goal.user.toString() !== req.user.id) {
        res.status(401)
        throw new Error('User not authorized')
    }

    await goal.remove()

    res.status(200).json({ id: req.params.id })
})

module.exports = { getGoals, setGoal, updateGoal, deleteGoal }