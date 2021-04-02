import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { finishUpdatingNote } from '../../../Redux/Actions/Notes'
import { addToSongArray, replaceNoteInSong, insertNoteInSong } from '../../../HelperFunctions/NoteManipulation'
import { createNull } from '../../../HelperFunctions/Helpers'
import { WHOLE_NOTE, HALF_NOTE, QUARTER_NOTE, EIGHTH_NOTE } from '../../../HelperFunctions/SourceCodeEncodings'
import { isShowingMenuAndLogout } from '../../../Redux/Actions/Util'

const Notes = () => {

    const dispatch = useDispatch()

    const notes = useSelector(state => state.notes.notes)
    const isReplacing = useSelector(state => state.notes.isReplacing)
    const isInserting = useSelector(state => state.notes.isInserting)
    const isUpdating = useSelector(state => state.notes.isUpdating)
    const editColumn = useSelector(state => state.notes.editColumnNumber)
    const key = useSelector(state => state.song.keySignature)
    const currentLogoutState = useSelector(state => state.util.isShowingLogout)

    const onClickWholeNote = () => {
        const nullArray = createNull(8)

        if (key.id > 8)
            addToSongArray(notes, WHOLE_NOTE, 'Whole', 'D#', 5, 1, nullArray)
        else if (key.id !== 7 || key.id === 8)
            addToSongArray(notes, WHOLE_NOTE, 'Whole', 'E', 5, 1, nullArray)
        else if (key.id === 7)
            addToSongArray(notes, WHOLE_NOTE, 'Whole', 'F', 5, 1, nullArray)

        if (isReplacing) {
            replaceNoteInSong(notes, WHOLE_NOTE, 'Whole', editColumn, nullArray)
            dispatch(finishUpdatingNote())
            dispatch(isShowingMenuAndLogout(!currentLogoutState))
        }

        if (isInserting) {
            insertNoteInSong(notes, WHOLE_NOTE, 'Whole', editColumn, nullArray)
            dispatch(finishUpdatingNote())
            dispatch(isShowingMenuAndLogout(!currentLogoutState))
        }
    }

    const onClickDottedWholeNote = () => {
        const nullArray = createNull(12)

        if (key.id > 8)
            addToSongArray(notes, `${WHOLE_NOTE}.`, 'Dotted-Whole', 'D#', 5, 1, nullArray)
        else if (key.id !== 7 || key.id === 8)
            addToSongArray(notes, `${WHOLE_NOTE}.`, 'Dotted-Whole', 'E', 5, 1, nullArray)
        else if (key.id === 7)
            addToSongArray(notes, `${WHOLE_NOTE}.`, 'Dotted-Whole', 'F', 5, 1, nullArray)

        if (isReplacing) {
            replaceNoteInSong(notes, `${WHOLE_NOTE}.`, 'Dotted-Whole', editColumn, nullArray)
            dispatch(finishUpdatingNote())
            dispatch(isShowingMenuAndLogout(!currentLogoutState))
        }

        if (isInserting) {
            insertNoteInSong(notes, `${WHOLE_NOTE}.`, 'Dotted-Whole', editColumn, nullArray)
            dispatch(finishUpdatingNote())
            dispatch(isShowingMenuAndLogout(!currentLogoutState))
        }
    }

    const onClickHalfNote = () => {
        const nullArray = createNull(4)

        if (key.id > 8)
            addToSongArray(notes, HALF_NOTE, 'Half', 'D#', 5, 1, nullArray)
        else if (key.id !== 7 || key.id === 8)
            addToSongArray(notes, HALF_NOTE, 'Half', 'E', 5, 1, nullArray)
        else if (key.id === 7)
            addToSongArray(notes, HALF_NOTE, 'Half', 'F', 5, 1, nullArray)

        if (isReplacing) {
            replaceNoteInSong(notes, HALF_NOTE, 'Half', editColumn, nullArray)
            dispatch(finishUpdatingNote())
            dispatch(isShowingMenuAndLogout(!currentLogoutState))
        }

        if (isInserting) {
            insertNoteInSong(notes, HALF_NOTE, 'Half', editColumn, nullArray)
            dispatch(finishUpdatingNote())
            dispatch(isShowingMenuAndLogout(!currentLogoutState))
        }
    }

    const onClickDottedHalfNote = () => {
        const nullArray = createNull(5)

        if (key.id > 8)
            addToSongArray(notes, `${HALF_NOTE}.`, 'Dotted-Half', 'D#', 5, 1, nullArray)
        else if (key.id !== 7 || key.id === 8)
            addToSongArray(notes, `${HALF_NOTE}.`, 'Dotted-Half', 'E', 5, 1, nullArray)
        else if (key.id === 7)
            addToSongArray(notes, `${HALF_NOTE}.`, 'Dotted-Half', 'F', 5, 1, nullArray)

        if (isReplacing) {
            replaceNoteInSong(notes, `${HALF_NOTE}.`, 'Dotted-Half', editColumn, nullArray)
            dispatch(finishUpdatingNote())
            dispatch(isShowingMenuAndLogout(!currentLogoutState))
        }

        if (isInserting) {
            insertNoteInSong(notes, `${HALF_NOTE}.`, 'Dotted-Half', editColumn, nullArray)
            dispatch(finishUpdatingNote())
            dispatch(isShowingMenuAndLogout(!currentLogoutState))
        }
    }

    const onClickQuarterNote = () => {
        const nullArray = createNull(2)

        if (key.id > 8)
            addToSongArray(notes, QUARTER_NOTE, 'Quarter', 'D#', 5, 1, nullArray)
        else if (key.id !== 7 || key.id === 8)
            addToSongArray(notes, QUARTER_NOTE, 'Quarter', 'E', 5, 1, nullArray)
        else if (key.id === 7)
            addToSongArray(notes, QUARTER_NOTE, 'Quarter', 'F', 5, 1, nullArray)

        if (isReplacing) {
            replaceNoteInSong(notes, QUARTER_NOTE, 'Quarter', editColumn, nullArray)
            dispatch(finishUpdatingNote())
            dispatch(isShowingMenuAndLogout(!currentLogoutState))
        }

        if (isInserting) {
            insertNoteInSong(notes, QUARTER_NOTE, 'Quarter', editColumn, nullArray)
            dispatch(finishUpdatingNote())
            dispatch(isShowingMenuAndLogout(!currentLogoutState))
        }
    }

    const onClickDottedQuarterNote = () => {
        const nullArray = createNull(3)

        if (key.id > 8)
            addToSongArray(notes, `${QUARTER_NOTE}.`, 'Dotted-Quarter', 'D#', 5, 1, nullArray)
        else if (key.id !== 7 || key.id === 8)
            addToSongArray(notes, `${QUARTER_NOTE}.`, 'Dotted-Quarter', 'E', 5, 1, nullArray)
        else if (key.id === 7)
            addToSongArray(notes, `${QUARTER_NOTE}.`, 'Dotted-Quarter', 'F', 5, 1, nullArray)

        if (isReplacing) {
            replaceNoteInSong(notes, `${QUARTER_NOTE}.`, 'Dotted-Quarter', editColumn, nullArray)
            dispatch(finishUpdatingNote())
            dispatch(isShowingMenuAndLogout(!currentLogoutState))
        }

        if (isInserting) {
            insertNoteInSong(notes, `${QUARTER_NOTE}.`, 'Dotted-Quarter', editColumn, nullArray)
            dispatch(finishUpdatingNote())
            dispatch(isShowingMenuAndLogout(!currentLogoutState))
        }
    }

    const onClickEighthNote = () => {
        if (key.id > 8)
            addToSongArray(notes, EIGHTH_NOTE, 'Eighth', 'D#', 5, 1)
        else if (key.id !== 7 || key.id === 8)
            addToSongArray(notes, EIGHTH_NOTE, 'Eighth', 'E', 5, 1)
        else if (key.id === 7)
            addToSongArray(notes, EIGHTH_NOTE, 'Eighth', 'F', 5, 1)

        if (isReplacing) {
            replaceNoteInSong(notes, EIGHTH_NOTE, 'Eighth', editColumn)
            dispatch(finishUpdatingNote())
            dispatch(isShowingMenuAndLogout(!currentLogoutState))
        }

        if (isInserting) {
            insertNoteInSong(notes, EIGHTH_NOTE, 'Eighth', editColumn)
            dispatch(finishUpdatingNote())
            dispatch(isShowingMenuAndLogout(!currentLogoutState))
        }
    }

    return (
        <div className='notes-section mb-1'>
            <h3 className='menu-section-label center nomargin'>Notes</h3>

            <div className='row-container-col'>
                <div className='row grid-row-1'>
                    <div className='note-container'>
                        <h3 className='note-label'>Whole</h3>
                        <button disabled={isUpdating && !isReplacing && !isInserting} className='btn-translate-whole-note' onClick={() => onClickWholeNote()}>
                            <span id='wholeNote' className='note-menu-image'>&#119133;</span>
                        </button>
                    </div>

                    <div className='note-container'>
                        <h3 className='note-label'>Half</h3>
                        <button disabled={isUpdating && !isReplacing && !isInserting} onClick={() => onClickHalfNote()}>
                            <span id='HalfNote' className='note-menu-image'>&#119134;</span>
                        </button>
                    </div>
                </div>

                <div className='row grid-row-2 mb-1'>
                    <div className='note-container'>
                        <h3 className='note-label'>Quarter</h3>
                        <button disabled={isUpdating && !isReplacing && !isInserting} onClick={() => onClickQuarterNote()}>
                            <span id='QuarterNote' className='note-menu-image'>&#119135;</span>
                        </button>
                    </div>

                    <div className='note-container'>
                        <h3 className='note-label'>Eighth</h3>
                        <button disabled={isUpdating && !isReplacing && !isInserting} onClick={() => onClickEighthNote()}>
                            <span id='EighthNote' className='note-menu-image'>&#119136;</span>
                        </button>
                    </div>
                </div>

                <h3 className='menu-section-label dotted-label center'>Dotted</h3>
                <div className='row'>
                    <div className='note-container'>
                        <h3 className='note-label'>Whole</h3>
                        <button disabled={isUpdating && !isReplacing && !isInserting} className='btn-translate-whole-note' onClick={() => onClickDottedWholeNote()}>
                            <span id='wholeNote' className='note-menu-image'>&#119133;<span className='dot'>.</span></span>
                        </button>
                    </div>
                    <div className='note-container'>
                        <h3 className='note-label'>Half</h3>
                        <button disabled={isUpdating && !isReplacing && !isInserting} onClick={() => onClickDottedHalfNote()}>
                            <span id='HalfNote' className='note-menu-image'>&#119134;<span className='dot'>.</span></span>
                        </button>
                    </div>
                    <div className='note-container'>
                        <h3 className='note-label'>Quarter</h3>
                        <button disabled={isUpdating && !isReplacing && !isInserting} onClick={() => onClickDottedQuarterNote()}>
                            <span id='QuarterNote' className='note-menu-image'>&#119135;<span className='dot'>.</span></span>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Notes