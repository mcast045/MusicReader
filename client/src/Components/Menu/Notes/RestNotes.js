import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { finishUpdatingNote } from '../../../Redux/Actions/Notes'
import { addToSongArray, replaceNoteInSong, insertNoteInSong } from '../../../HelperFunctions/NoteManipulation'
import { createNull } from '../../../HelperFunctions/Helpers'
import { WHOLE_REST_NOTE, HALF_REST_NOTE, QUARTER_REST_NOTE, EIGHTH_REST_NOTE, WHOLE_REST, HALF_REST, QUARTER_REST, EIGHTH_REST, DOTTED_WHOLE_REST, DOTTED_HALF_REST, DOTTED_QUARTER_REST } from '../../../HelperFunctions/SourceCodeEncodings'
import { isShowingMenuAndLogout } from '../../../Redux/Actions/Util'

const RestNotes = () => {

    const dispatch = useDispatch()

    const { notes, isReplacing, isInserting, isUpdating, editColumnNumber } = useSelector(({ notes }) => notes)
    const { isShowingLogout } = useSelector(({ util }) => util)

    const onClickWholeRestNote = () => {
        const nullArray = createNull(8)
        const wholeRestNote = { notePath: WHOLE_REST_NOTE, type: WHOLE_REST }

        addToSongArray(notes, wholeRestNote, nullArray)

        if (isReplacing) {
            replaceNoteInSong(notes, wholeRestNote, editColumnNumber, nullArray)
            dispatch(finishUpdatingNote())
            dispatch(isShowingMenuAndLogout(!isShowingLogout))
        }

        if (isInserting) {
            insertNoteInSong(notes, wholeRestNote, editColumnNumber, nullArray)
            dispatch(finishUpdatingNote())
            dispatch(isShowingMenuAndLogout(!isShowingLogout))
        }
    }

    const onClickDottedWholeRestNote = () => {
        const nullArray = createNull(12)
        const dottedWholeRestNote = { notePath: WHOLE_REST_NOTE, type: DOTTED_WHOLE_REST }

        addToSongArray(notes, dottedWholeRestNote, nullArray)

        if (isReplacing) {
            replaceNoteInSong(notes, dottedWholeRestNote, editColumnNumber, nullArray)
            dispatch(finishUpdatingNote())
            dispatch(isShowingMenuAndLogout(!isShowingLogout))
        }

        if (isInserting) {
            insertNoteInSong(notes, dottedWholeRestNote, editColumnNumber, nullArray)
            dispatch(finishUpdatingNote())
            dispatch(isShowingMenuAndLogout(!isShowingLogout))
        }
    }

    const onClickHalfRestNote = () => {
        const nullArray = createNull(4)
        const halfRestNote = { notePath: HALF_REST_NOTE, type: HALF_REST }

        addToSongArray(notes, halfRestNote, nullArray)

        if (isReplacing) {
            replaceNoteInSong(notes, halfRestNote, editColumnNumber, nullArray)
            dispatch(finishUpdatingNote())
            dispatch(isShowingMenuAndLogout(!isShowingLogout))
        }

        if (isInserting) {
            insertNoteInSong(notes, halfRestNote, editColumnNumber, nullArray)
            dispatch(finishUpdatingNote())
            dispatch(isShowingMenuAndLogout(!isShowingLogout))
        }
    }

    const onClickDottedeHalfRestNote = () => {
        const nullArray = createNull(6)
        const dottedHalfRestNote = { notePath: HALF_REST_NOTE, type: DOTTED_HALF_REST }

        addToSongArray(notes, dottedHalfRestNote, nullArray)

        if (isReplacing) {
            replaceNoteInSong(notes, dottedHalfRestNote, editColumnNumber, nullArray)
            dispatch(finishUpdatingNote())
            dispatch(isShowingMenuAndLogout(!isShowingLogout))
        }

        if (isInserting) {
            insertNoteInSong(notes, dottedHalfRestNote, editColumnNumber, nullArray)
            dispatch(finishUpdatingNote())
            dispatch(isShowingMenuAndLogout(!isShowingLogout))
        }
    }

    const onClickQuarterRestNote = () => {
        const nullArray = createNull(2)
        const quarterRestNote = { notePath: QUARTER_REST_NOTE, type: QUARTER_REST }

        addToSongArray(notes, quarterRestNote, nullArray)

        if (isReplacing) {
            replaceNoteInSong(notes, quarterRestNote, editColumnNumber, nullArray)
            dispatch(finishUpdatingNote())
            dispatch(isShowingMenuAndLogout(!isShowingLogout))
        }

        if (isInserting) {
            insertNoteInSong(notes, quarterRestNote, editColumnNumber, nullArray)
            dispatch(finishUpdatingNote())
            dispatch(isShowingMenuAndLogout(!isShowingLogout))
        }
    }

    const onClickDottedQuarterRestNote = () => {
        const nullArray = createNull(3)
        const dottedQuarterRestNote = { notePath: QUARTER_REST_NOTE, type: DOTTED_QUARTER_REST }

        addToSongArray(notes, dottedQuarterRestNote, nullArray)

        if (isReplacing) {
            replaceNoteInSong(notes, dottedQuarterRestNote, editColumnNumber, nullArray)
            dispatch(finishUpdatingNote())
            dispatch(isShowingMenuAndLogout(!isShowingLogout))
        }

        if (isInserting) {
            insertNoteInSong(notes, dottedQuarterRestNote, editColumnNumber, nullArray)
            dispatch(finishUpdatingNote())
            dispatch(isShowingMenuAndLogout(!isShowingLogout))
        }
    }

    const onClickEighthRestNote = () => {
        const eighthRestNote = { notePath: EIGHTH_REST_NOTE, type: EIGHTH_REST }

        addToSongArray(notes, eighthRestNote)

        if (isReplacing) {
            replaceNoteInSong(notes, eighthRestNote, editColumnNumber)
            dispatch(finishUpdatingNote())
            dispatch(isShowingMenuAndLogout(!isShowingLogout))
        }

        if (isInserting) {
            insertNoteInSong(notes, eighthRestNote, editColumnNumber)
            dispatch(finishUpdatingNote())
            dispatch(isShowingMenuAndLogout(!isShowingLogout))
        }
    }

    return (
        <div className='notes-section mb-1'>
            <h3 className='menu-section-label center'>Rest Notes</h3>
            <div className='row-container-col'>
                <div className='row'>
                    <div className='note-container'>
                        <h3 className='note-label'>Whole</h3>
                        <button disabled={isUpdating && !isReplacing && !isInserting} className='btn-translate note-btn' onClick={onClickWholeRestNote}>
                            <span id={WHOLE_REST} className='note-menu-image'>&#119099;</span>
                        </button>
                    </div>

                    <div className='note-container'>
                        <h3 className='note-label'>Half</h3>
                        <button disabled={isUpdating && !isReplacing && !isInserting} onClick={onClickHalfRestNote}>
                            <span id={HALF_REST} className='note-menu-image'>&#119100;</span>
                        </button>
                    </div>
                </div>

                <div className='row'>
                    <div className='note-container'>
                        <h3 className='note-label'>Quarter</h3>
                        <button disabled={isUpdating && !isReplacing && !isInserting} onClick={onClickQuarterRestNote}>
                            <span id={QUARTER_REST} className='note-menu-image'>&#119101;</span>
                        </button>
                    </div>

                    <div className='note-container'>
                        <h3 className='note-label'>Eighth</h3>
                        <button disabled={isUpdating && !isReplacing && !isInserting} onClick={onClickEighthRestNote}>
                            <span id={EIGHTH_REST} className='note-menu-image'>&#119102;</span>
                        </button>
                    </div>
                </div>

                <div className='row'>
                    <h3 className='menu-section-label dotted-label center nomargin'>Dotted</h3>
                </div>
                <div className='row'>
                    <div className='note-container'>
                        <h3 className='note-label'>Whole</h3>
                        <button disabled={isUpdating && !isReplacing && !isInserting} className='btn-translate note-btn' onClick={onClickDottedWholeRestNote}>
                            <span id={DOTTED_WHOLE_REST} className='note-menu-image'>&#119099;<span className='dot rest-dot'>.</span></span>
                        </button>
                    </div>
                    <div className='note-container'>
                        <h3 className='note-label'>Half</h3>
                        <button disabled={isUpdating && !isReplacing && !isInserting} onClick={onClickDottedeHalfRestNote}>
                            <span id={DOTTED_HALF_REST} className='note-menu-image'>&#119100;<span className='dot rest-dot'>.</span></span>
                        </button>
                    </div>
                    <div className='note-container'>
                        <h3 className='note-label'>Quarter</h3>
                        <button disabled={isUpdating && !isReplacing && !isInserting} onClick={onClickDottedQuarterRestNote}>
                            <span id={DOTTED_QUARTER_REST} className='note-menu-image'>&#119101;<span className='dot'>.</span></span>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default RestNotes