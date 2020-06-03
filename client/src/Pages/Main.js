import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { isFetchingUser, loadUser } from '../Redux/Actions/Auth'
import Sheet from './Sheet/Sheet'
import Menu from '../Components/Menu/Menu'
import Alert from '../Components/Alert/Alert'

const Main = () => {

    const dispatch = useDispatch()
    const user = useSelector(state => state.auth.user)

    //Load user most recent song
    useEffect(() => {
        dispatch(isFetchingUser())
        user._id && dispatch(loadUser(user._id))
    }, [dispatch, user._id])

    return (
        <div>
            <Alert />
            <div className='main'>
                <Menu />
                <Sheet />
            </div>
        </div>
    );
}

export default Main;