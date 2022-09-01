import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { finishUpdatingNote } from '../../../Redux/Actions/Notes'
import { addToSongArray, replaceNoteInSong, insertNoteInSong } from '../../../HelperFunctions/NoteManipulation'
import { createNull } from '../../../HelperFunctions/Helpers'
import { WHOLE_REST_NOTE, HALF_REST_NOTE, QUARTER_REST_NOTE, EIGHTH_REST_NOTE, WHOLE_REST, HALF_REST, QUARTER_REST, EIGHTH_REST, DOTTED_WHOLE_REST, DOTTED_HALF_REST, DOTTED_QUARTER_REST } from '../../../HelperFunctions/SourceCodeEncodings'
import { isShowingMenuAndLogout } from '../../../Redux/Actions/Util'
import Note from './Components/Note'

const RestNotes = () => {

    const dispatch = useDispatch()

    const { notes, isReplacing, isInserting, editColumnNumber } = useSelector(({ notes }) => notes)
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
            <h3 className='menu-section-label center nomargin'>Rest Notes</h3>
            <div className='row-container-col'>
                <div className='row'>
                    <Note label='Whole' note={WHOLE_REST} onClick={onClickWholeRestNote} entity='&#119099;' />
                    <Note label='Half' note={HALF_REST} onClick={onClickHalfRestNote} entity='&#119100;' />
                </div>

                <div className='row'>
                    <Note label='Quarter' note={QUARTER_REST} onClick={onClickQuarterRestNote} entity='&#119101;' />
                    <Note label='Eighth' note={EIGHTH_REST} onClick={onClickEighthRestNote} entity='&#119102;' />
                </div>

                <h3 className='menu-section-label dotted-label center nomargin'>Dotted</h3>

                <div className='row'>
                    <Note label='Whole' note={DOTTED_WHOLE_REST} onClick={onClickDottedWholeRestNote} entity='&#119099;'><span className='dot rest-dot'>.</span></Note>
                    <Note label='Half' note={DOTTED_HALF_REST} onClick={onClickDottedeHalfRestNote} entity='&#119100;'><span className='dot rest-dot'>.</span></Note>
                    <Note label='Quarter' note={DOTTED_QUARTER_REST} onClick={onClickDottedQuarterRestNote} entity='&#119101;'><span className='dot rest-dot'>.</span></Note>
                </div>
            </div>
        </div>
    )
}

export default RestNotes