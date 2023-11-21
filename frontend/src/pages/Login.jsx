import { useState, useEffect } from 'react'
import { FaSignInAlt } from 'react-icons/fa'
const Login = () => {

    const [formData, setFromData] = useState({
        email: '',
        password: '',
    })

    const { name, email, password, password2 } = formData

    const onChange = (e) => {
        setFromData((prevData) => ({
            ...prevData,
            [e.target.name]: e.target.value
        }))
    }

    const onSubmit = (e) => {
        e.preventDefault()
    }

    return (
        <>
            <section className='heading'>
                <h1>
                    <FaSignInAlt />
                    Login
                </h1>
                <p>
                    Login and start setting goals
                </p>
                <form onSubmit={onSubmit}>

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
                        <button type='submit' className='btn btn-block'>
                            Submit
                        </button>
                    </div>
                </form>
            </section>
        </>
    )
}

export default Login