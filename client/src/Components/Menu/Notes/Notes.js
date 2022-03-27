import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { finishUpdatingNote } from '../../../Redux/Actions/Notes'
import { addToSongArray, replaceNoteInSong, insertNoteInSong } from '../../../HelperFunctions/NoteManipulation'
import { createNull } from '../../../HelperFunctions/Helpers'
import { WHOLE_NOTE, HALF_NOTE, QUARTER_NOTE, EIGHTH_NOTE, WHOLE, HALF, EIGHTH, QUARTER, DOTTED_QUARTER, DOTTED_HALF, DOTTED_WHOLE } from '../../../HelperFunctions/SourceCodeEncodings'
import { isShowingMenuAndLogout } from '../../../Redux/Actions/Util'
import { allNotes } from '../../../HelperFunctions/UpdateNoteLetter'

const Notes = () => {

    const dispatch = useDispatch()

    const { notes, isReplacing, isInserting, isUpdating, editColumnNumber } = useSelector(({ notes }) => notes)
    const key = useSelector(({ song }) => song.keySignature)
    const { isShowingLogout } = useSelector(({ util }) => util)

    const onClickWholeNote = () => {
        const nullArray = createNull(8)

        const wholeNote = { notePath: WHOLE_NOTE, type: WHOLE }

        if (key.id > 8)
            addToSongArray(notes, { ...wholeNote, letter: allNotes[6] }, nullArray)
        else if (key.id !== 7 || key.id === 8)
            addToSongArray(notes, { ...wholeNote, letter: allNotes[7] }, nullArray)
        else if (key.id === 7)
            addToSongArray(notes, { ...wholeNote, letter: allNotes[8] }, nullArray)

        if (isReplacing) {
            replaceNoteInSong(notes, wholeNote, editColumnNumber, nullArray)
            dispatch(finishUpdatingNote())
            dispatch(isShowingMenuAndLogout(!isShowingLogout))
        }

        if (isInserting) {
            insertNoteInSong(notes, wholeNote, editColumnNumber, nullArray)
            dispatch(finishUpdatingNote())
            dispatch(isShowingMenuAndLogout(!isShowingLogout))
        }
    }

    const onClickDottedWholeNote = () => {
        const nullArray = createNull(12)

        const dottedWholeHoleNote = { notePath: `${WHOLE_NOTE}.`, type: DOTTED_WHOLE }

        if (key.id > 8)
            addToSongArray(notes, { ...dottedWholeHoleNote, letter: allNotes[6] }, nullArray)
        else if (key.id !== 7 || key.id === 8)
            addToSongArray(notes, { ...dottedWholeHoleNote, letter: allNotes[7] }, nullArray)
        else if (key.id === 7)
            addToSongArray(notes, { ...dottedWholeHoleNote, letter: allNotes[8] }, nullArray)

        if (isReplacing) {
            replaceNoteInSong(notes, dottedWholeHoleNote, editColumnNumber, nullArray)
            dispatch(finishUpdatingNote())
            dispatch(isShowingMenuAndLogout(!isShowingLogout))
        }

        if (isInserting) {
            insertNoteInSong(notes, dottedWholeHoleNote, editColumnNumber, nullArray)
            dispatch(finishUpdatingNote())
            dispatch(isShowingMenuAndLogout(!isShowingLogout))
        }
    }

    const onClickHalfNote = () => {
        const nullArray = createNull(4)

        const halfNote = { notePath: HALF_NOTE, type: HALF }

        if (key.id > 8)
            addToSongArray(notes, { ...halfNote, letter: allNotes[6] }, nullArray)
        else if (key.id !== 7 || key.id === 8)
            addToSongArray(notes, { ...halfNote, letter: allNotes[7] }, nullArray)
        else if (key.id === 7)
            addToSongArray(notes, { ...halfNote, letter: allNotes[8] }, nullArray)

        if (isReplacing) {
            replaceNoteInSong(notes, halfNote, editColumnNumber, nullArray)
            dispatch(finishUpdatingNote())
            dispatch(isShowingMenuAndLogout(!isShowingLogout))
        }

        if (isInserting) {
            insertNoteInSong(notes, halfNote, editColumnNumber, nullArray)
            dispatch(finishUpdatingNote())
            dispatch(isShowingMenuAndLogout(!isShowingLogout))
        }
    }

    const onClickDottedHalfNote = () => {
        const nullArray = createNull(5)

        const dottedHalfNote = { notePath: `${HALF_NOTE}.`, type: DOTTED_HALF }

        if (key.id > 8)
            addToSongArray(notes, { ...dottedHalfNote, letter: allNotes[6] }, nullArray)
        else if (key.id !== 7 || key.id === 8)
            addToSongArray(notes, { ...dottedHalfNote, letter: allNotes[7] }, nullArray)
        else if (key.id === 7)
            addToSongArray(notes, { ...dottedHalfNote, letter: allNotes[8] }, nullArray)

        if (isReplacing) {
            replaceNoteInSong(notes, dottedHalfNote, editColumnNumber, nullArray)
            dispatch(finishUpdatingNote())
            dispatch(isShowingMenuAndLogout(!isShowingLogout))
        }

        if (isInserting) {
            insertNoteInSong(notes, `${HALF_NOTE}.`, 'Dotted-Half', editColumnNumber, nullArray)
            dispatch(finishUpdatingNote())
            dispatch(isShowingMenuAndLogout(!isShowingLogout))
        }
    }

    const onClickQuarterNote = () => {
        const nullArray = createNull(2)

        const quarterNote = { notePath: QUARTER_NOTE, type: QUARTER }

        if (key.id > 8)
            addToSongArray(notes, { ...quarterNote, letter: allNotes[6] }, nullArray)
        else if (key.id !== 7 || key.id === 8)
            addToSongArray(notes, { ...quarterNote, letter: allNotes[7] }, nullArray)
        else if (key.id === 7)
            addToSongArray(notes, { ...quarterNote, letter: allNotes[8] }, nullArray)

        if (isReplacing) {
            replaceNoteInSong(notes, quarterNote, editColumnNumber, nullArray)
            dispatch(finishUpdatingNote())
            dispatch(isShowingMenuAndLogout(!isShowingLogout))
        }

        if (isInserting) {
            insertNoteInSong(notes, quarterNote, editColumnNumber, nullArray)
            dispatch(finishUpdatingNote())
            dispatch(isShowingMenuAndLogout(!isShowingLogout))
        }
    }

    const onClickDottedQuarterNote = () => {
        const nullArray = createNull(3)

        const dottedQuarterNote = { notePath: `${QUARTER_NOTE}.`, type: DOTTED_QUARTER }

        if (key.id > 8)
            addToSongArray(notes, { ...dottedQuarterNote, letter: allNotes[6] }, nullArray)
        else if (key.id !== 7 || key.id === 8)
            addToSongArray(notes, { ...dottedQuarterNote, letter: allNotes[7] }, nullArray)
        else if (key.id === 7)
            addToSongArray(notes, { ...dottedQuarterNote, letter: allNotes[8] }, nullArray)

        if (isReplacing) {
            replaceNoteInSong(notes, dottedQuarterNote, editColumnNumber, nullArray)
            dispatch(finishUpdatingNote())
            dispatch(isShowingMenuAndLogout(!isShowingLogout))
        }

        if (isInserting) {
            insertNoteInSong(notes, dottedQuarterNote, editColumnNumber, nullArray)
            dispatch(finishUpdatingNote())
            dispatch(isShowingMenuAndLogout(!isShowingLogout))
        }
    }

    const onClickEighthNote = () => {

        const eighthNote = { notePath: EIGHTH_NOTE, type: EIGHTH }

        if (key.id > 8)
            addToSongArray(notes, { ...eighthNote, letter: allNotes[6] })
        else if (key.id !== 7 || key.id === 8)
            addToSongArray(notes, { ...eighthNote, letter: allNotes[7] })
        else if (key.id === 7)
            addToSongArray(notes, { ...eighthNote, letter: allNotes[8] })

        if (isReplacing) {
            replaceNoteInSong(notes, eighthNote, editColumnNumber)
            dispatch(finishUpdatingNote())
            dispatch(isShowingMenuAndLogout(!isShowingLogout))
        }

        if (isInserting) {
            insertNoteInSong(notes, eighthNote, editColumnNumber)
            dispatch(finishUpdatingNote())
            dispatch(isShowingMenuAndLogout(!isShowingLogout))
        }
    }

    return (
        <div className='notes-section mb-1'>
            <h3 className='menu-section-label center nomargin'>Notes</h3>

            <div className='row-container-col'>
                <div className='row grid-row-1'>
                    <div className='note-container'>
                        <h3 className='note-label'>Whole</h3>
                        <button disabled={isUpdating && !isReplacing && !isInserting} className='btn-translate-whole-note' onClick={onClickWholeNote}>
                            <span id={WHOLE} className='note-menu-image'>&#119133;</span>
                        </button>
                    </div>

                    <div className='note-container'>
                        <h3 className='note-label'>Half</h3>
                        <button disabled={isUpdating && !isReplacing && !isInserting} onClick={onClickHalfNote}>
                            <span id={HALF} className='note-menu-image'>&#119134;</span>
                        </button>
                    </div>
                </div>

                <div className='row grid-row-2 mb-1'>
                    <div className='note-container'>
                        <h3 className='note-label'>Quarter</h3>
                        <button disabled={isUpdating && !isReplacing && !isInserting} onClick={onClickQuarterNote}>
                            <span id={QUARTER} className='note-menu-image'>&#119135;</span>
                        </button>
                    </div>

                    <div className='note-container'>
                        <h3 className='note-label'>Eighth</h3>
                        <button disabled={isUpdating && !isReplacing && !isInserting} onClick={onClickEighthNote}>
                            <span id={EIGHTH} className='note-menu-image'>&#119136;</span>
                        </button>
                    </div>
                </div>

                <h3 className='menu-section-label dotted-label center'>Dotted</h3>
                <div className='row'>
                    <div className='note-container'>
                        <h3 className='note-label'>Whole</h3>
                        <button disabled={isUpdating && !isReplacing && !isInserting} className='btn-translate-whole-note' onClick={onClickDottedWholeNote}>
                            <span id={DOTTED_WHOLE} className='note-menu-image'>&#119133;<span className='dot'>.</span></span>
                        </button>
                    </div>
                    <div className='note-container'>
                        <h3 className='note-label'>Half</h3>
                        <button disabled={isUpdating && !isReplacing && !isInserting} onClick={onClickDottedHalfNote}>
                            <span id={DOTTED_HALF} className='note-menu-image'>&#119134;<span className='dot'>.</span></span>
                        </button>
                    </div>
                    <div className='note-container'>
                        <h3 className='note-label'>Quarter</h3>
                        <button disabled={isUpdating && !isReplacing && !isInserting} onClick={onClickDottedQuarterNote}>
                            <span id={DOTTED_QUARTER} className='note-menu-image'>&#119135;<span className='dot'>.</span></span>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Notes