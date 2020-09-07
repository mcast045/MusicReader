import React, { Fragment, useEffect, useState } from 'react'
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

    const [disableLastbarBtn, setDisableCN] = useState('not-available')
    useEffect(() => {
        if (notes.length % 8 === 0 && notes.length !== 0) setDisableCN()
        else setDisableCN('not-available')
    }, [notes])

    const clearSheet = () => {
        if (isAuthenticated)
            dispatch(showModal())
        else if (notes.length > 0)
            dispatch(showModal())
    }

    const removeLastNote = () => {
        const copyNotes = [...notes]
        const idx = copyNotes.reverse().map(note => note && note.length > 0).findIndex(note => note)
        copyNotes.splice(0, idx + 1)
        copyNotes.reverse()
        dispatch(deleteLastNote(copyNotes))
    }

    //Reuse notes/chords
    const copyPreviousNote = () => {
        const copyNotes = [...notes]
        const idx = copyNotes.reverse().map(note => note && note.length > 0).findIndex(note => note)
        const copyiedNoted = copyNotes[idx]

        let nullArray = []
        if (copyiedNoted[0].type === 'Whole') nullArray = createNull(8)
        else if (copyiedNoted[0].type === 'Half') nullArray = createNull(4)
        else if (copyiedNoted[0].type === 'Quarter') nullArray = createNull(2)
        else if (copyiedNoted[0].type === 'Dotted-Whole') nullArray = createNull(12)
        else if (copyiedNoted[0].type === 'Dotted-Half') nullArray = createNull(5)
        else if (copyiedNoted[0].type === 'Dotted-Quarter') nullArray = createNull(3)

        copyNotes.reverse()
        copyNotes.push(copyiedNoted, ...nullArray)
        dispatch(updateNote(copyNotes))
        dispatch(finishUpdatingNote())
    }

    const copyPreviousBar = () => {
        const copyNotes = [...notes]
        const notesToPush = copyNotes.slice(copyNotes.length - 8)
        copyNotes.push(...notesToPush)

        dispatch(updateNote(copyNotes))
        dispatch(finishUpdatingNote())
    }

    return (
        <Fragment>
            {currentSong && <SongInfo />}
            <div className='btn-sheets'>
                {!currentSongInfoMenuState &&
                    <Fragment>
                        {!isAuthenticated && <NonAuthBtn clearSheet={clearSheet} removeLastNote={removeLastNote} copyPreviousNote={copyPreviousNote} copyPreviousBar={copyPreviousBar} disableLastbarBtn={disableLastbarBtn} />}
                        {isAuthenticated && !isNotesLoading && <AuthBtn clearSheet={clearSheet} removeLastNote={removeLastNote} copyPreviousNote={copyPreviousNote} copyPreviousBar={copyPreviousBar} disableLastbarBtn={disableLastbarBtn} />}
                    </Fragment>
                }
            </div>
        </Fragment>
    )
}

export default StaveBtn