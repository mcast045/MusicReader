import React, { Fragment } from 'react'
import './btn.css'
import SongInfo from '../SongInfo/SongInfo'
import AuthBtn from './AuthBtn'
import NonAuthBtn from './NonAuthBtn'
import { useSelector, useDispatch } from 'react-redux'
import { showModal } from '../../../Redux/Actions/Modal'
import { deleteLastNote } from '../../../Redux/Actions/Notes'

const StaveBtn = () => {

    const dispatch = useDispatch()
    const notes = useSelector(state => state.notes.notes)
    const isNotesLoading = useSelector(state => state.notes.loading)
    const currentSong = useSelector(state => state.song.currentSong)
    const isAuthenticated = useSelector(state => state.auth.isAuthenticated)
    const currentSongInfoMenuState = useSelector(state => state.util.isShowingInfo)

    const clearSheet = () => {
        if (isAuthenticated)
            dispatch(showModal())
        else if (notes.length > 0)
            dispatch(showModal())
    }

    const removeLastNote = () => {
        const notesUpdate = [...notes]
        const idx = notesUpdate.reverse().map(note => note && note.length > 0).findIndex(note => note)
        notesUpdate.splice(0, idx + 1)
        notesUpdate.reverse()
        dispatch(deleteLastNote(notesUpdate))
    }

    return (
        <Fragment>
            {currentSong && <SongInfo />}
            <div className='btn-sheets'>
                {!currentSongInfoMenuState &&
                    <Fragment>
                        {!isAuthenticated && <NonAuthBtn clearSheet={clearSheet} removeLastNote={removeLastNote} />}
                        {isAuthenticated && !isNotesLoading && <AuthBtn clearSheet={clearSheet} removeLastNote={removeLastNote} />}
                    </Fragment>
                }
            </div>
        </Fragment>
    )
}

export default StaveBtn