import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { isFetchingUser, loadUser } from '../Redux/Actions/Auth'
import Sheet from './Sheet/Sheet'
import Menu from './Menu/Menu'
import Alert from '../Pages/Alert/Alert'

const Main = () => {

    const dispatch = useDispatch()
    const user = useSelector(state => state.auth.user)

    //Shows Edit menu or Default menu
    const [isShowingMenu, setIsShowingMenu] = useState(true)
    const [newSongClickState, setNewSongClickState] = useState(false)
    const [showLogout, setShowLogout] = useState(true)
    const [showInfo, setShowInfo] = useState()

    //Load user most recent song
    useEffect(() => {
        dispatch(isFetchingUser())
        user._id && dispatch(loadUser(user._id))
    }, [dispatch, user._id])

    return (
        <div>
            <Alert />
            <Menu showInfo={showInfo} setShowInfo={setShowInfo} showLogout={showLogout} setShowLogout={setShowLogout} newSongClickState={newSongClickState} setNewSongClickState={setNewSongClickState} setIsShowingMenu={setIsShowingMenu} isShowingMenu={isShowingMenu} />
            <Sheet showInfo={showInfo} setShowInfo={setShowInfo} showLogout={showLogout} setShowLogout={setShowLogout} newSongClickState={newSongClickState} isShowingMenu={isShowingMenu} setIsShowingMenu={setIsShowingMenu} />
        </div>
    );
}

export default Main;