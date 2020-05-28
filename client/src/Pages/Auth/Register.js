import React, { useState } from 'react';
import { registerUser } from '../../Redux/Actions/Auth'
import { useDispatch, useSelector } from 'react-redux'
import { Redirect } from 'react-router'

const Register = ({ onClickBackBtn }) => {

    const dispatch = useDispatch()

    const isAuthenticated = useSelector(state => state.auth.isAuthenticated)

    const [register, setRegister] = useState({
        username: '',
        email: '',
        password: '',
        confirmPassword: ''
    })

    const onChange = e =>
        setRegister({ ...register, [e.target.name]: e.target.value })

    const onSubmit = e => {
        e.preventDefault()
        dispatch(registerUser(register))
    }

    if (isAuthenticated)
        return <Redirect to='/' />

    return (
        <div className='register'>
            <form className='registerForm' onSubmit={e => onSubmit(e)}>

                <div className='registerForm_container'>
                    <p className='registerForm_label'>Register</p>
                    <div className='registerForm_input'>
                        <label>Username</label>
                        <input type='text' name='username' placeholder='Username' value={register.username} onChange={e => onChange(e)} required />
                    </div>

                    <div className='registerForm_input'>
                        <label>Email</label>
                        <input type='email' name='email' placeholder='Email' value={register.email} onChange={e => onChange(e)} required />
                    </div>

                    <div className='registerForm_input'>
                        <label>Password</label>
                        <input type='password' name='password' placeholder='Password' value={register.password} onChange={e => onChange(e)} required />
                    </div>

                    <div className='registerForm_input'>
                        <label>Confirm Password</label>
                        <input type='password' name='confirmPassword' placeholder='Confirm Password' value={register.confirmPassword} onChange={e => onChange(e)} required />
                    </div>
                    <div className='registerForm_container-btns'>
                        <button className='btn loginForm_container-btn' type='submit'>Submit</button>
                        <button className='btn loginForm_container-btn' type='button' onClick={e => onClickBackBtn(e)}>Back</button>
                    </div>
                </div>
            </form>
        </div>
    );
}

export default Register;