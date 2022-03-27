import React, { useState } from 'react'
import { loginUser, flipAuthCard } from '../../Redux/Actions/Auth'
import { useDispatch, useSelector } from 'react-redux'
import { Redirect } from 'react-router'
import LoginSvg from '../../Images/Login.svg'

const Login = () => {

    const dispatch = useDispatch()

    const { isAuthenticated } = useSelector(({ auth }) => auth)

    const [login, setLogin] = useState({
        email: '',
        password: ''
    })

    const { email, password } = login

    const onChange = e =>
        setLogin({ ...login, [e.target.name]: e.target.value })

    const onSubmit = e => {
        e.preventDefault()
        dispatch(loginUser(login))
    }

    if (isAuthenticated)
        return <Redirect to='/' />

    return (
        <div className='login card_face card_face--front'>
            <div className="loginSvg">
                <object data={LoginSvg} type="image/svg+xml">Music Image</object>
            </div>

            <form className='loginForm' onSubmit={onSubmit} onChange={onChange}>

                <div className='loginForm_container'>
                    <p className='loginForm_label font-4 nomargin'>Login</p>

                    <div className='loginForm_container-inputs'>
                        <div className='loginForm_container-input-div relative'>
                            <span className="envelope font-2">&#9993;</span>
                            <input type='email' name='email' placeholder='Email' value={email} required />
                        </div>

                        <div className='loginForm_container-input-div relative'>
                            <span className='lock font-2' role='img' aria-label='Key'>&#x1f511;</span>
                            <input type='password' name='password' placeholder='Password' value={password} required />
                        </div>
                    </div>
                    <button className='loginForm_container-btn' type='submit'>Submit</button>
                    <button onClick={() => dispatch(flipAuthCard('front'))} className='loginForm_container-createAccount' type='button'>Create Account &rarr;</button>
                </div>
            </form>
        </div>
    )
}

export default Login