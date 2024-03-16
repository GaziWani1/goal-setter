import axios from 'axios'

const API_URL = '/api/goals/'

const createGoal = async (goalData, token) => {
    try {
        const config = {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }
        const response = await axios.post(API_URL, goalData, config)
        return response.data
    } catch (error) {
        throw error.response.data || error.message || 'Failed to create goal'
    }
}

const getGoals = async (token) => {
    try {
        const config = {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }

        const response = await axios.get(API_URL, config)

        return response.data
    } catch (error) {
        throw error.response.data || error.message || 'Failed to fetch goals'
    }
}

const updateGoal = async (goalId, goalData, token) => {
    try {
        const config = {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }

        const updateGoal = { text: goalData }

        const response = await axios.put(API_URL + goalId, updateGoal, config)

        return response.data
    } catch (error) {
        throw error.response.data || error.message || 'Failed to update goal'
    }
}

const deleteGoal = async (goalId, token) => {
    try {
        const config = {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }

        const response = await axios.delete(API_URL + goalId, config)

        return response.data
    } catch (error) {
        throw error.response.data || error.message || 'Failed to delete goal'
    }
}

const goalService = {
    createGoal,
    getGoals,
    updateGoal,
    deleteGoal,
}

export default goalService
