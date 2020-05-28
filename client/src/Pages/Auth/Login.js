import React, { useState } from 'react'
import { loginUser } from '../../Redux/Actions/Auth'
import { useDispatch, useSelector } from 'react-redux'
import { Redirect } from 'react-router'

const Login = ({ onClickBackBtn }) => {

    const dispatch = useDispatch()

    const isAuthenticated = useSelector(state => state.auth.isAuthenticated)

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
        <div className='login'>
            <form className='loginForm' onSubmit={e => onSubmit(e)}>

                <div className='loginForm_container'>
                    <p className='loginForm_label'>Login</p>
                    <div className='loginForm_input'>
                        <label>Email</label>
                        <input type='email' name='email' placeholder='Email' value={login.email} onChange={e => onChange(e)} required />
                    </div>

                    <div className='loginForm_input'>
                        <label>Password</label>
                        <input type='password' name='password' placeholder='Password' value={login.password} onChange={e => onChange(e)} required />
                    </div>

                    <div className='loginForm_container-btns'>
                        <input className='btn loginForm_container-btn' type='submit' />
                        <button className='btn loginForm_container-btn' onClick={() => onClickBackBtn()}>Back</button>
                    </div>
                </div>
            </form>
        </div>

    );
}

export default Login;