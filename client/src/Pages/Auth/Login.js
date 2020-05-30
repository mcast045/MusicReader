import React, { useState } from 'react'
import { loginUser, flipAuthCard } from '../../Redux/Actions/Auth'
import { useDispatch, useSelector } from 'react-redux'
import { Redirect } from 'react-router'
import LoginSvg from '../../Images/Login.svg'
import Loader from '../../Images/Loader/Loader'

const Login = () => {

    const dispatch = useDispatch()

    const isAuthenticated = useSelector(state => state.auth.isAuthenticated)

    const [svgLoad, setSvgLoad] = useState(true)
    const [login, setLogin] = useState({
        email: '',
        password: ''
    })

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
                <object data={LoginSvg} type="image/svg+xml" onLoad={() => setSvgLoad(false)}>Music Image</object>
            </div>

            {svgLoad ? <Loader /> :
                <form className='loginForm' onSubmit={e => onSubmit(e)}>

                    <div className='loginForm_container'>
                        <p className='loginForm_label'>Login</p>

                        <div className='loginForm_container-inputs'>
                            <div className='loginForm_container-input-div'>
                                <span className="envelope">&#9993;</span>
                                <input type='email' name='email' placeholder='Email' value={login.email} onChange={e => onChange(e)} required />
                            </div>

                            <div className='loginForm_container-input-div'>
                                <span className='lock' role='img' aria-label='Key'>&#x1f511;</span>
                                <input type='password' name='password' placeholder='Password' value={login.password} onChange={e => onChange(e)} required />
                            </div>
                        </div>
                        <button className='loginForm_container-btn' type='submit'>Submit</button>
                        <button onClick={() => dispatch(flipAuthCard('front'))} className='loginForm_container-createAccount' type='button'>Create Account &rarr;</button>
                    </div>
                </form>
            }
        </div>

    );
}

export default Login;