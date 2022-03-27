import React, { useState } from 'react'
import { registerUser, flipAuthCard } from '../../Redux/Actions/Auth'
import { useDispatch, useSelector } from 'react-redux'
import { Redirect } from 'react-router'
import RegisterSvg from '../../Images/Register.svg'

const Register = () => {

    const dispatch = useDispatch()

    const { isAuthenticated } = useSelector(({ auth }) => auth)

    const [register, setRegister] = useState({
        username: '',
        email: '',
        password: '',
        confirmPassword: ''
    })

    const { username, email, password, confirmPassword } = register

    const onChange = e =>
        setRegister({ ...register, [e.target.name]: e.target.value })

    const onSubmit = e => {
        e.preventDefault()
        dispatch(registerUser(register))
    }

    if (isAuthenticated)
        return <Redirect to='/' />

    return (
        <div className='register card_face card_face--back'>

            <form className='registerForm' onSubmit={onSubmit} onChange={onChange}>

                <div className='registerForm_container'>
                    <p className='registerForm_label font-4 nomargin'>Register</p>

                    <div className='registerForm_input'>
                        <input type='text' name='username' placeholder='Username' value={username} required />
                    </div>

                    <div className='registerForm_input'>
                        <input type='email' name='email' placeholder='Email' value={email} required />
                    </div>

                    <div className='registerForm_input'>
                        <input type='password' name='password' placeholder='Password' value={password} required />
                    </div>

                    <div className='registerForm_input'>
                        <input type='password' name='confirmPassword' placeholder='Confirm Password' value={confirmPassword} required />
                    </div>

                    <button className='registerForm_container-btn' type='submit'>Submit</button>
                    <button onClick={() => dispatch(flipAuthCard('back'))} className='registerForm_container-login' type='button'>&larr; Login</button>
                </div>
            </form>

            <div className="registerSvg">
                <object data={RegisterSvg} type="image/svg+xml">Music Image</object>
            </div>
        </div>
    )
}

export default Register