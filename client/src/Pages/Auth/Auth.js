import React, { Fragment } from 'react'
import './Auth.css'
import Login from './Login'
import Register from './Register'
import { REMOVE_ALERT } from '../../Redux/Constants'
import { useDispatch } from 'react-redux'
import Alert from '../Alert/Alert'

const Auth = props => {
    const dispatch = useDispatch()

    const onClickBackBtn = () => {
        props.history.goBack()
        dispatch({ type: REMOVE_ALERT })
    }

    return (
        <Fragment>
            <Alert />
            <div className='auth'>
                <Login onClickBackBtn={onClickBackBtn} />
                <Register onClickBackBtn={onClickBackBtn} />
            </div>
        </Fragment>
    );
}

export default Auth;