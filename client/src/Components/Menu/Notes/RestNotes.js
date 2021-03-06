import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { finishUpdatingNote } from '../../../Redux/Actions/Notes'
import { addToSongArray, replaceNoteInSong, insertNoteInSong } from '../../../HelperFunctions/NoteManipulation'
import { createNull } from '../../../HelperFunctions/Helpers'
import { WHOLE_REST_NOTE, HALF_REST_NOTE, QUARTER_REST_NOTE, EIGHTH_REST_NOTE } from '../../../HelperFunctions/SourceCodeEncodings'
import { isShowingMenuAndLogout } from '../../../Redux/Actions/Util'

const RestNotes = () => {

    const dispatch = useDispatch()

    const notes = useSelector(state => state.notes.notes)
    const isReplacing = useSelector(state => state.notes.isReplacing)
    const isInserting = useSelector(state => state.notes.isInserting)
    const isUpdating = useSelector(state => state.notes.isUpdating)
    const editColumn = useSelector(state => state.notes.editColumnNumber)
    const currentLogoutState = useSelector(state => state.util.isShowingLogout)

    const onClickWholeRestNote = () => {
        const nullArray = createNull(8)
        addToSongArray(notes, WHOLE_REST_NOTE, 'WholeRest', null, 6, null, nullArray)

        if (isReplacing) {
            replaceNoteInSong(notes, WHOLE_REST_NOTE, 'WholeRest', editColumn, nullArray)
            dispatch(finishUpdatingNote())
            dispatch(isShowingMenuAndLogout(!currentLogoutState))
        }

        if (isInserting) {
            insertNoteInSong(notes, WHOLE_REST_NOTE, 'WholeRest', editColumn, nullArray)
            dispatch(finishUpdatingNote())
            dispatch(isShowingMenuAndLogout(!currentLogoutState))
        }
    }

    const onClickDottedWholeRestNote = () => {
        const nullArray = createNull(12)
        addToSongArray(notes, WHOLE_REST_NOTE, 'Dotted-WholeRest', null, 6, null, nullArray)

        if (isReplacing) {
            replaceNoteInSong(notes, WHOLE_REST_NOTE, 'Dotted-WholeRest', editColumn, nullArray)
            dispatch(finishUpdatingNote())
            dispatch(isShowingMenuAndLogout(!currentLogoutState))
        }

        if (isInserting) {
            insertNoteInSong(notes, WHOLE_REST_NOTE, 'Dotted-WholeRest', editColumn, nullArray)
            dispatch(finishUpdatingNote())
            dispatch(isShowingMenuAndLogout(!currentLogoutState))
        }
    }

    const onClickHalfRestNote = () => {
        const nullArray = createNull(4)
        addToSongArray(notes, HALF_REST_NOTE, 'HalfRest', null, 6, null, nullArray)

        if (isReplacing) {
            replaceNoteInSong(notes, HALF_REST_NOTE, 'HalfRest', editColumn, nullArray)
            dispatch(finishUpdatingNote())
            dispatch(isShowingMenuAndLogout(!currentLogoutState))
        }

        if (isInserting) {
            insertNoteInSong(notes, HALF_REST_NOTE, 'HalfRest', editColumn, nullArray)
            dispatch(finishUpdatingNote())
            dispatch(isShowingMenuAndLogout(!currentLogoutState))
        }
    }

    const onClickDottedeHalfRestNote = () => {
        const nullArray = createNull(6)
        addToSongArray(notes, HALF_REST_NOTE, 'Dotted-HalfRest', null, 6, null, nullArray)

        if (isReplacing) {
            replaceNoteInSong(notes, HALF_REST_NOTE, 'Dotted-HalfRest', editColumn, nullArray)
            dispatch(finishUpdatingNote())
            dispatch(isShowingMenuAndLogout(!currentLogoutState))
        }

        if (isInserting) {
            insertNoteInSong(notes, HALF_REST_NOTE, 'Dotted-HalfRest', editColumn, nullArray)
            dispatch(finishUpdatingNote())
            dispatch(isShowingMenuAndLogout(!currentLogoutState))
        }
    }

    const onClickQuarterRestNote = () => {
        const nullArray = createNull(2)
        addToSongArray(notes, QUARTER_REST_NOTE, 'QuarterRest', null, 6, null, nullArray)

        if (isReplacing) {
            replaceNoteInSong(notes, QUARTER_REST_NOTE, 'QuarterRest', editColumn, nullArray)
            dispatch(finishUpdatingNote())
            dispatch(isShowingMenuAndLogout(!currentLogoutState))
        }

        if (isInserting) {
            insertNoteInSong(notes, QUARTER_REST_NOTE, 'QuarterRest', editColumn, nullArray)
            dispatch(finishUpdatingNote())
            dispatch(isShowingMenuAndLogout(!currentLogoutState))
        }
    }

    const onClickDottedQuarterRestNote = () => {
        const nullArray = createNull(3)
        addToSongArray(notes, QUARTER_REST_NOTE, 'Dotted-QuarterRest', null, 6, null, nullArray)

        if (isReplacing) {
            replaceNoteInSong(notes, QUARTER_REST_NOTE, 'Dotted-QuarterRest', editColumn, nullArray)
            dispatch(finishUpdatingNote())
            dispatch(isShowingMenuAndLogout(!currentLogoutState))
        }

        if (isInserting) {
            insertNoteInSong(notes, QUARTER_REST_NOTE, 'Dotted-QuarterRest', editColumn, nullArray)
            dispatch(finishUpdatingNote())
            dispatch(isShowingMenuAndLogout(!currentLogoutState))
        }
    }

    const onClickEighthRestNote = () => {
        addToSongArray(notes, EIGHTH_REST_NOTE, 'EighthRest', null, 6, null)

        if (isReplacing) {
            replaceNoteInSong(notes, EIGHTH_REST_NOTE, 'EighthRest', editColumn)
            dispatch(finishUpdatingNote())
            dispatch(isShowingMenuAndLogout(!currentLogoutState))
        }

        if (isInserting) {
            insertNoteInSong(notes, EIGHTH_REST_NOTE, 'EighthRest', editColumn)
            dispatch(finishUpdatingNote())
            dispatch(isShowingMenuAndLogout(!currentLogoutState))
        }
    }

    return (
        <div className='notes-section mb-1'>
            <h3 className='menu-section-label center'>Rest Notes</h3>
            <div className='row-container-col'>
                <div className='row'>
                    <div className='note-container'>
                        <h3 className='note-label'>Whole</h3>
                        <button disabled={isUpdating && !isReplacing && !isInserting} className='btn-translate note-btn' onClick={() => onClickWholeRestNote()}>
                            <span id='WholeRest' className='note-menu-image'>&#119099;</span>
                        </button>
                    </div>

                    <div className='note-container'>
                        <h3 className='note-label'>Half</h3>
                        <button disabled={isUpdating && !isReplacing && !isInserting} onClick={() => onClickHalfRestNote()}>
                            <span id='HalfRest' className='note-menu-image'>&#119100;</span>
                        </button>
                    </div>
                </div>

                <div className='row'>
                    <div className='note-container'>
                        <h3 className='note-label'>Quarter</h3>
                        <button disabled={isUpdating && !isReplacing && !isInserting} onClick={() => onClickQuarterRestNote()}>
                            <span id='QuarterRest' className='note-menu-image'>&#119101;</span>
                        </button>
                    </div>

                    <div className='note-container'>
                        <h3 className='note-label'>Eighth</h3>
                        <button disabled={isUpdating && !isReplacing && !isInserting} onClick={() => onClickEighthRestNote()}>
                            <span id='EighthRest' className='note-menu-image'>&#119102;</span>
                        </button>
                    </div>
                </div>

                <div className='row'>
                    <h3 className='menu-section-label dotted-label center nomargin'>Dotted</h3>
                </div>
                <div className='row'>
                    <div className='note-container'>
                        <h3 className='note-label'>Whole</h3>
                        <button disabled={isUpdating && !isReplacing && !isInserting} className='btn-translate note-btn' onClick={() => onClickDottedWholeRestNote()}>
                            <span id='WholeRest' className='note-menu-image'>&#119099;<span className='dot rest-dot'>.</span></span>
                        </button>
                    </div>
                    <div className='note-container'>
                        <h3 className='note-label'>Half</h3>
                        <button disabled={isUpdating && !isReplacing && !isInserting} onClick={() => onClickDottedeHalfRestNote()}>
                            <span id='HalfRest' className='note-menu-image'>&#119100;<span className='dot rest-dot'>.</span></span>
                        </button>
                    </div>
                    <div className='note-container'>
                        <h3 className='note-label'>Quarter</h3>
                        <button disabled={isUpdating && !isReplacing && !isInserting} onClick={() => onClickDottedQuarterRestNote()}>
                            <span id='QuarterRest' className='note-menu-image'>&#119101;<span className='dot'>.</span></span>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default RestNotes