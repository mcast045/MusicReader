import React, { Fragment } from 'react'
import './btn.css'
import SongInfo from '../SongInfo/SongInfo'
import AuthBtn from './AuthBtn'
import NonAuthBtn from './NonAuthBtn'
import { useSelector, useDispatch } from 'react-redux'
import { showModal } from '../../../Redux/Actions/Modal'
import { deleteLastNote } from '../../../Redux/Actions/Notes'

const StaveBtn = ({ showLogout, setShowLogout, showInfo, setShowInfo }) => {

    const dispatch = useDispatch()
    const notes = useSelector(state => state.notes.notes)
    const isNotesLoading = useSelector(state => state.notes.loading)
    const currentSong = useSelector(state => state.song.currentSong)
    const isAuthenticated = useSelector(state => state.auth.isAuthenticated)

    const clearSheet = () => {
        if (isAuthenticated)
            dispatch(showModal())
        else if (notes.length > 0)
            dispatch(showModal())
    }

    const removeLastNote = () => {
        let notesUpdate = [...notes]
        let idx = notesUpdate.reverse().findIndex(note => note && note.notePath)
        notesUpdate.splice(0, idx + 1)
        notesUpdate.reverse()
        dispatch(deleteLastNote(notesUpdate))
    }

    return (
        <Fragment>
            {currentSong && <SongInfo showLogout={showLogout} setShowLogout={setShowLogout} showInfo={showInfo} setShowInfo={setShowInfo} />}
            <div className='btn-sheets'>
                {!showInfo &&
                    <Fragment>
                        {!isAuthenticated && <NonAuthBtn clearSheet={clearSheet} removeLastNote={removeLastNote} />}
                        {isAuthenticated && !isNotesLoading && <AuthBtn clearSheet={clearSheet} removeLastNote={removeLastNote} showLogout={showLogout} setShowLogout={setShowLogout} showInfo={showInfo} setShowInfo={setShowInfo} />}
                    </Fragment>
                }
            </div>
        </Fragment>
    );
}

export default StaveBtn;