const express = require('express')
const {
    getGoals,
    setGoal,
    updateGoal,
    deleteGoal } = require('../controller/goalController')

// @create router
const router = express.Router()

router.route('/').get(getGoals).post(setGoal)
router.route('/:id').put(updateGoal).delete(deleteGoal)

module.exports = router