const expressAsyncHandler = require("express-async-handler")
const Goal = require('../models/goal.model')

// @desc     Get All Goals
// @route    GET /api/goals
// @access   Private
const getGoals = expressAsyncHandler(async (req, res) => {
    const goals = await Goal.find()
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

    const updatedGoal = await Goal.findByIdAndUpdate(req.params.id,
        req.body, { new: true })


    res.status(200).json({ message: `Updated goal ${req.params.id}` })

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

    const deletedGoal = await Goal.findByIdAndDelete(req.params.id)


    res.status(200).json({ message: `Delete goal ${req.params.id}` })
})

module.exports = { getGoals, setGoal, updateGoal, deleteGoal }