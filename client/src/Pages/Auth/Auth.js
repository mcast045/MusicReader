import React, { Fragment } from 'react'
import './Auth.css'
import Login from './Login'
import Register from './Register'
import Alert from '../../Components/Alert/Alert'
import ReactCardFlip from 'react-card-flip'
import { useSelector } from 'react-redux'

const Auth = () => {

    const isFlipped = useSelector(state => state.auth.card)

    return (
        <Fragment>
            <Alert />
            <div className='auth'>
                <div className='auth-block card'>

                    <ReactCardFlip isFlipped={isFlipped} flipSpeedBackToFront={1} flipSpeedFrontToBack={1}>
                        <Fragment><Login /></Fragment>
                        <Fragment><Register /></Fragment>
                    </ReactCardFlip>

                </div>
            </div>
        </Fragment>
    )
}

export default Auth