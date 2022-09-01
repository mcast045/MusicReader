import React from 'react'
import './btn.css'
import { useSelector, useDispatch } from 'react-redux'
import { saveNotes } from '../../../Redux/Actions/Notes'
import { showModal } from '../../../Redux/Actions/Modal'
import { isDeletingUser } from '../../../Redux/Actions/Auth'
import { isShowLogout, isShowInfo } from '../../../Redux/Actions/Util'
import CommonBtns from './CommonBtns'

const AuthBtn = () => {

    const dispatch = useDispatch()

    const { notes, isUpdating } = useSelector(({ notes }) => notes)
    const { loading: isSongsLoading, currentSong } = useSelector(({ song }) => song)
    const { isShowingInfo, isShowingLogout } = useSelector(({ util }) => util)

    const saveSheet = isSaveBtn =>
        dispatch(saveNotes(notes, currentSong._id, isSaveBtn))

    const onClickMySongs = () => {
        saveSheet(false)
        dispatch(isShowInfo(!isShowingInfo))
        dispatch(isShowLogout(!isShowingLogout))
    }

    const onClickDeleteAccount = () => {
        dispatch(isDeletingUser())
        dispatch(showModal())
    }

    return (
        <>
            {!isSongsLoading && <button className='btn' disabled={isUpdating} onClick={onClickMySongs}>My Songs</button>}
            <button className='btn' disabled={isUpdating} onClick={() => saveSheet(true)}>Save</button>
            <CommonBtns />
            <button className='btn' onClick={onClickDeleteAccount}>Delete Account</button>
        </>
    )
}

export default AuthBtn