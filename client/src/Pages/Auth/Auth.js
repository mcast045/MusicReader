import React from 'react'
import './Auth.css'
import Login from './Login'
import Register from './Register'
import Alert from '../../Components/Alert/Alert'
import ReactCardFlip from 'react-card-flip'
import { useSelector } from 'react-redux'

const Auth = () => {

    const { card } = useSelector(({ auth }) => auth)

    return (
        <>
            <Alert />
            <div className='auth'>
                <div className='auth-block card'>

                    <ReactCardFlip isFlipped={card} flipSpeedBackToFront={1} flipSpeedFrontToBack={1}>
                        <><Login /></>
                        <><Register /></>
                    </ReactCardFlip>

                </div>
            </div>
        </>
    )
}

export default Auth