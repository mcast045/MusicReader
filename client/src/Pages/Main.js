import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { isFetchingUser, loadUser } from '../Redux/Actions/Auth'
import { isShowingMenu } from '../Redux/Actions/Util'
import Sheet from './Sheet/Sheet'
import Menu from '../Components/Menu/Menu'
import Alert from '../Components/Alert/Alert'

const Main = () => {

    const dispatch = useDispatch()
    const { _id: userID } = useSelector(({ auth }) => auth.user)

    //Load user most recent song
    useEffect(() => {
        dispatch(isFetchingUser())

        //Always show beginning menu on login/registration
        dispatch(isShowingMenu(true))

        userID && dispatch(loadUser(userID))
    }, [dispatch, userID])

    return (
        <div>
            <Alert />
            <div className='main'>
                <Menu />
                <Sheet />
            </div>
        </div>
    )
}

export default Main