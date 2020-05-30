import React, { useState } from 'react'
import { registerUser, flipAuthCard } from '../../Redux/Actions/Auth'
import { useDispatch, useSelector } from 'react-redux'
import { Redirect } from 'react-router'
import RegisterSvg from '../../Images/Register.svg'
import Loader from '../../Images/Loader/Loader'

const Register = () => {

    const dispatch = useDispatch()

    const isAuthenticated = useSelector(state => state.auth.isAuthenticated)

    const [svgLoad, setSvgLoad] = useState(true)
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
        <div className='register card_face card_face--back'>
            {svgLoad ? <Loader /> :
                <form className='registerForm' onSubmit={e => onSubmit(e)}>

                    <div className='registerForm_container'>
                        <p className='registerForm_label'>Register</p>

                        <div className='registerForm_input'>
                            <input type='text' name='username' placeholder='Username' value={register.username} onChange={e => onChange(e)} required />
                        </div>

                        <div className='registerForm_input'>
                            <input type='email' name='email' placeholder='Email' value={register.email} onChange={e => onChange(e)} required />
                        </div>

                        <div className='registerForm_input'>
                            <input type='password' name='password' placeholder='Password' value={register.password} onChange={e => onChange(e)} required />
                        </div>

                        <div className='registerForm_input'>
                            <input type='password' name='confirmPassword' placeholder='Confirm Password' value={register.confirmPassword} onChange={e => onChange(e)} required />
                        </div>

                        <button className='registerForm_container-btn' type='submit'>Submit</button>
                        <button onClick={() => dispatch(flipAuthCard('back'))} className='registerForm_container-login' type='button'>&larr; Login</button>
                    </div>
                </form>
            }
            <div className="registerSvg">
                <object data={RegisterSvg} type="image/svg+xml" onLoad={() => setSvgLoad(false)}>Music Image</object>
            </div>
        </div>
    );
}

export default Register;