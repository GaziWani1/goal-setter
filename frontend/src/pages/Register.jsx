import { useState, useEffect } from 'react'
import { FaUser } from 'react-icons/fa'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { register, reset } from '../features/auth/authSlice'
import { toast } from 'react-toastify'
import Spinner from '../components/Spinner'

const Register = () => {

    const [formData, setFromData] = useState({
        name: '',
        email: '',
        password: '',
        password2: ''
    })

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const { name, email, password, password2 } = formData


    const { user, isLoading, isError, isSuccess, message } = useSelector((state) => state.auth)

    // watch changes
    useEffect(() => {
        if (isError) {
            toast.error(message)
        }

        if (isSuccess || user) {
            navigate('/')
        }

        dispatch(reset())

    }, [user, isError, isSuccess, navigate, dispatch])

    // hanfle on change
    const onChange = (e) => {
        setFromData((prevData) => ({
            ...prevData,
            [e.target.name]: e.target.value
        }))
    }

    // handle submit
    const onSubmit = (e) => {
        e.preventDefault()

        if (password !== password2) {
            toast.error('Password do not match')
        } else {
            const userData = {
                name,
                email,
                password
            }
            dispatch(register(userData))
        }
    }

    if (isLoading)
        return <Spinner />

    return (
        <>
            <section className='heading'>
                <h1>
                    <FaUser />
                    Register
                </h1>
                <p>
                    Please create an account
                </p>
                <form onSubmit={onSubmit}>
                    <div className='form-group'>
                        <input
                            type='text'
                            className='form-control'
                            placeholder='Enter your name'
                            value={name}
                            onChange={onChange}
                            id='name'
                            name='name'
                        />
                    </div>
                    <div className='form-group'>
                        <input
                            type='text'
                            className='form-control'
                            placeholder='Enter your email'
                            value={email}
                            onChange={onChange}
                            id='email'
                            name='email'
                        />
                    </div>
                    <div className='form-group'>
                        <input
                            type='password'
                            className='form-control'
                            placeholder='Enter your password'
                            value={password}
                            onChange={onChange}
                            id='password'
                            name='password'
                        />
                    </div>
                    <div className='form-group'>
                        <input
                            type='password'
                            className='form-control'
                            placeholder='Confrim your password'
                            value={password2}
                            onChange={onChange}
                            id='password2'
                            name='password2'
                        />
                    </div>
                    <div className='form-group'>
                        <button type='submit' className='btn btn-block'>
                            Submit
                        </button>
                    </div>
                </form>
            </section>
        </>
    )
}

export default Register