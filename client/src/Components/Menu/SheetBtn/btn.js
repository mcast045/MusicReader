import React, { Fragment } from 'react'
import './btn.css'
import SongInfo from '../SongInfo/SongInfo'
import AuthBtn from './AuthBtn'
import NonAuthBtn from './NonAuthBtn'
import { useSelector, useDispatch } from 'react-redux'
import { showModal } from '../../../Redux/Actions/Modal'
import { deleteLastNote, finishUpdatingNote, updateNote } from '../../../Redux/Actions/Notes'
import { createNull } from '../../../HelperFunctions/Helpers'

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

    //Reuse notes and chords
    const copyPreviousNote = () => {
        const notesUpdate = [...notes]
        const idx = notesUpdate.reverse().map(note => note && note.length > 0).findIndex(note => note)
        const copyiedNoted = notesUpdate[idx]

        let nullArray = []
        if (copyiedNoted[0].type === 'Whole') nullArray = createNull(8)
        else if (copyiedNoted[0].type === 'Half') nullArray = createNull(4)
        else if (copyiedNoted[0].type === 'Quarter') nullArray = createNull(2)
        else if (copyiedNoted[0].type === 'Dotted-Whole') nullArray = createNull(12)
        else if (copyiedNoted[0].type === 'Dotted-Half') nullArray = createNull(5)
        else if (copyiedNoted[0].type === 'Dotted-Quarter') nullArray = createNull(3)

        notesUpdate.reverse()
        notesUpdate.push(copyiedNoted, ...nullArray)
        dispatch(updateNote(notesUpdate))
        dispatch(finishUpdatingNote())
    }

    return (
        <Fragment>
            {currentSong && <SongInfo />}
            <div className='btn-sheets'>
                {!currentSongInfoMenuState &&
                    <Fragment>
                        {!isAuthenticated && <NonAuthBtn clearSheet={clearSheet} removeLastNote={removeLastNote} copyPreviousNote={copyPreviousNote} />}
                        {isAuthenticated && !isNotesLoading && <AuthBtn clearSheet={clearSheet} removeLastNote={removeLastNote} copyPreviousNote={copyPreviousNote} />}
                    </Fragment>
                }
            </div>
        </Fragment>
    )
}

export default StaveBtn