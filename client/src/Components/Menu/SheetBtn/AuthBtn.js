import React, { Fragment } from 'react'
import './btn.css'
import { useSelector, useDispatch } from 'react-redux'
import { saveNotes } from '../../../Redux/Actions/Notes'
import { showModal } from '../../../Redux/Actions/Modal'
import { isDeletingUser } from '../../../Redux/Actions/Auth'

const AuthBtn = ({ removeLastNote, clearSheet, showLogout, setShowLogout, showInfo, setShowInfo }) => {

    const dispatch = useDispatch()

    const notes = useSelector(state => state.notes.notes)
    const isUpdating = useSelector(state => state.notes.isUpdating)
    const isSongsLoading = useSelector(state => state.song.loading)
    const currentSong = useSelector(state => state.song.currentSong)

    const saveSheet = isSaveBtn =>
        dispatch(saveNotes(notes, currentSong._id, isSaveBtn))

    const onClickMySongs = () => {
        saveSheet(false)
        setShowInfo(!showInfo)
        setShowLogout(!showLogout)
    }

    const onClickDeleteAccount = () => {
        dispatch(isDeletingUser())
        dispatch(showModal())
    }

    return (
        <Fragment>
            {!isSongsLoading && <button className='btn' disabled={isUpdating} onClick={() => onClickMySongs()}>My Songs</button>}
            <button className='btn' disabled={isUpdating} onClick={() => saveSheet(true)}>Save</button>
            <button className='btn' disabled={isUpdating} onClick={() => removeLastNote()}>Delete Last Note</button>
            <button className='btn clearBtn' disabled={isUpdating} onClick={() => clearSheet()}>Delete Song</button>
            <button className='btn' onClick={() => onClickDeleteAccount()}>Delete Account</button>
        </Fragment>
    );
}

export default AuthBtn;