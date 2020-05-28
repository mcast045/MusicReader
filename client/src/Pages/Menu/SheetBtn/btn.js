import React, { Fragment } from 'react'
import './btn.css'
import SongInfo from '../SongInfo/SongInfo'
import { useSelector, useDispatch } from 'react-redux'
import { showModal } from '../../../Redux/Actions/Modal'
import { saveNotes, deleteLastNote } from '../../../Redux/Actions/Notes'
import { isDeleteUser } from '../../../Redux/Actions/Auth'

const StaveBtn = ({ showLogout, setShowLogout, showInfo, setShowInfo }) => {

    const dispatch = useDispatch()
    const notes = useSelector(state => state.notes.notes)
    const isEnabled = useSelector(state => state.notes.isEnabled)
    const songs = useSelector(state => state.song.songs)
    const currentSong = useSelector(state => state.song.currentSong)
    const isAuthenticated = useSelector(state => state.auth.isAuthenticated)

    const removeLastNote = () => {
        let notesUpdate = [...notes]
        let idx = notesUpdate.reverse().findIndex(note => note && note.notePath)
        notesUpdate.splice(0, idx + 1)
        notesUpdate.reverse()
        dispatch(deleteLastNote(notesUpdate))
    }

    const clearSheet = () => {
        if (isAuthenticated)
            dispatch(showModal())
        else if (notes.length > 0)
            dispatch(showModal())
    }

    const saveSheet = isSaveBtn =>
        dispatch(saveNotes(notes, currentSong._id, isSaveBtn))

    const onClickMySongs = () => {
        saveSheet(false)
        setShowInfo(!showInfo)
        setShowLogout(!showLogout)
    }

    const onClickDeleteAccount = () => {
        dispatch(isDeleteUser())
        dispatch(showModal())
    }

    return (
        <Fragment>
            {currentSong &&
                <SongInfo showLogout={showLogout} setShowLogout={setShowLogout} showInfo={showInfo} setShowInfo={setShowInfo} />
            }
            <div className='btn-sheets'>
                {!showInfo &&
                    <Fragment>
                        {songs.length > 0 && <button className='btn' disabled={isEnabled} onClick={() => onClickMySongs()}>My Songs</button>}
                        <button className='btn' disabled={isEnabled} onClick={() => removeLastNote()}>Delete Last Note</button>
                        {isAuthenticated ?
                            <Fragment>
                                <button className='btn' disabled={isEnabled} onClick={() => saveSheet(true)}>Save</button>
                                <button className='btn clearBtn' disabled={isEnabled} onClick={() => clearSheet()}>Delete Song</button>
                            </Fragment>
                            :
                            <button className='btn clearBtn' disabled={isEnabled} onClick={() => clearSheet()}>Clear All</button>
                        }
                        {isAuthenticated && <button className='btn' onClick={() => onClickDeleteAccount()}>Delete Account</button>}
                    </Fragment>
                }
            </div>
        </Fragment>
    );
}

export default StaveBtn;