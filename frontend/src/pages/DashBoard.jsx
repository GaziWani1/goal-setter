import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import GoalFrom from '../components/GoalFrom'
import { getGoals, reset } from '../features/goal/goalSlice'
import Spinner from '../components/Spinner'
import GoalItem from '../components/GoalItem'
import { toast } from 'react-toastify'

const Dashboard = () => {
    const user = useSelector((state) => state.auth.user)
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const { goals, isLoading, isError, message } = useSelector((state) => state.goals)

    useEffect(() => {
        if (isError) {
            toast.error(message)
        }

        if (!user) {
            navigate('/login')
        }

        if (!goals.length && user) {
            dispatch(getGoals())
        }

        return () => {
            dispatch(reset())
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [user, isError, dispatch, navigate, message])

    if (!user) {
        // Render loading state or redirect to login if user is not available
        return <Spinner />
    }

    return (
        <>
            <section className='heading'>
                <h1>Welcome {user && user.name}</h1>
                <p>Goals Dashboard</p>
            </section>
            <GoalFrom />
            <section className='content'>
                {isLoading ? (
                    <Spinner />
                ) : goals.length > 0 ? (
                    <div className='goals'>
                        {goals.map((goal) => (
                            <GoalItem key={goal._id} goal={goal} />
                        ))}
                    </div>
                ) : (
                    <h3>You have not set any goals</h3>
                )}
            </section>
        </>
    )
}

export default Dashboard
