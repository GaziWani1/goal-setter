const express = require('express')
const { protect } = require('../middleware/authMiddleware')
const {
    getGoals,
    setGoal,
    updateGoal,
    deleteGoal } = require('../controller/goalController')

// @create router
const router = express.Router()

router.route('/').get(protect, getGoals).post(protect, setGoal)
router.route('/:id').put(protect, updateGoal).delete(protect, deleteGoal)

module.exports = router