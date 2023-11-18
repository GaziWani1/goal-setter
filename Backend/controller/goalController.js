const expressAsyncHandler = require("express-async-handler")

// @desc     Get All Goals
// @route    GET /api/goals
// @access   Private
const getGoals = expressAsyncHandler((req, res) => {
    res.status(200).json({ msg: "get goals" })
})

// @desc     Add goal
// @route    POST /api/goals
// @access   Private
const setGoal = expressAsyncHandler((req, res) => {
    if (!req.body.text) {
        res.status(400)
        throw new Error('Please add text field')
    }
    res.status(200).json({ msg: "create goals" })
})

// @desc     Update Goals
// @route    PUT /api/goals/:id
// @access   Private
const updateGoal = expressAsyncHandler((req, res) => {
    res.status(200).json({ msg: `update goals${req.params.id}` })
})

// @desc     Delete Goals
// @route    DELETE /api/goals/:id
// @access   Private
const deleteGoal = expressAsyncHandler((req, res) => {
    res.status(200).json({ msg: `delete goal ${req.params.id}` })
})

module.exports = { getGoals, setGoal, updateGoal, deleteGoal }