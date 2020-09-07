import React, { useEffect, useRef, Fragment } from 'react'
import './Staff.css'
import '../../../Pages/Sheet/Sheet.css'
import { useSelector, useDispatch } from 'react-redux'
import { updateNote, getUserNotes, currentEditColumn } from '../../../Redux/Actions/Notes'
import { updateNoteLetter } from '../../../HelperFunctions/UpdateNoteLetter'
import { getNoteColumn, isRestNote, editIndex } from '../../../HelperFunctions/Helpers'
import { isShowingMenuAndLogout } from '../../../Redux/Actions/Util'

const Staff = ({ screenSize, viewOnly, bars, staffLines, eighthNotes, numberOfStaves }) => {

    const dispatch = useDispatch()

    const notes = useSelector(state => state.notes.notes)
    const isUpdating = useSelector(state => state.notes.isUpdating)
    const editColumn = useSelector(state => state.notes.editColumnNumber)
    const key = useSelector(state => state.song.keySignature)
    const currentSong = useSelector(state => state.song.currentSong)
    const isAuthenticated = useSelector(state => state.auth.isAuthenticated)
    const currentMenuState = useSelector(state => state.util.isShowingMenu)

    const isMounted = useRef(false)

    //Load currentSong notes when user changes song
    //Without isMounted, mounting error when adding notes to new staff lines
    useEffect(() => {
        //Only run when the dependencies change & if user has at least 1 song
        if (isMounted.current && currentSong && !viewOnly)
            isAuthenticated && currentSong._id && dispatch(getUserNotes(currentSong._id))

        return () => { isMounted.current = true; }
    }, [isAuthenticated, currentSong, dispatch, viewOnly])

    //Assigns an edit key to the note object
    const assignEdit = (column, i) => {
        if (!viewOnly) {
            const noteToUpdate = [...notes[column]]

            if (isRestNote(column, noteToUpdate.type, notes)) noteToUpdate[i] = { ...noteToUpdate[i], edit: 'edit-placeholder' }
            else noteToUpdate[i] = { ...noteToUpdate[i], edit: 'edit-placeholder' }

            //Update only 1 note in the chord
            notes[column] = [...noteToUpdate]

            dispatch(isShowingMenuAndLogout(!currentMenuState))
            dispatch(currentEditColumn(column))
            dispatch(updateNote(notes))
        }
    }

    //Drag and Drop functionality
    const allowDrop = e =>
        e.preventDefault()

    const drop = (e, row, noteColumn) => {
        //Prevent drop if note is already in row
        if (notes[noteColumn].findIndex(note => note.row === row) === -1) {
            e.preventDefault()
            const accidental = null
            updateNoteLetter(row, noteColumn, accidental, notes, key)
        }
    }

    const isCurrentColumn = (measure, column, staff) => {
        if (notes[editColumn] && !isRestNote(editColumn, notes[editColumn][0].type, notes))
            return (getNoteColumn(measure, column, staff) === editColumn)
    }

    const showLedgerLines = (measure, column, staff, rowNumber) => {
        let topLedgerLines = false
        let bottomLedgerLines = false
        notes[getNoteColumn(measure, column, staff)].forEach(note => {
            if (note.row < 5 && !topLedgerLines) topLedgerLines = true
            else if (note.row > 8 && !bottomLedgerLines) bottomLedgerLines = true
        })

        if (topLedgerLines && bottomLedgerLines) return rowNumber < 4 || (rowNumber > 8 && rowNumber !== 12) ? { borderBottom: '1px solid black' } : null
        else if (bottomLedgerLines) return (rowNumber > 8 && rowNumber !== 12) ? { borderBottom: '1px solid black' } : null
        else if (topLedgerLines) return rowNumber < 4 ? { borderBottom: '1px solid black' } : null
    }

    const hideLedgerLinesOnLoad = rowNumber => {
        if (rowNumber < 5 || rowNumber > 9)
            return { border: 'none' }
    }

    return (
        <div className='sheet-music-container'>
            {bars.map(measure => (
                <ul id={(measure + (numberOfStaves * 4))} className='sheet-music nomarginpadding' key={measure}>
                    {staffLines.map(rowNumber => (
                        <li key={rowNumber} style={hideLedgerLinesOnLoad(rowNumber)}>
                            {eighthNotes.map(columnsPerMeasure => (
                                <div
                                    className='note-temp-container'
                                    key={columnsPerMeasure}
                                    style={isCurrentColumn(measure, columnsPerMeasure, numberOfStaves) && (rowNumber !== 12 && (rowNumber < 4 || rowNumber > 8)) ? { borderBottom: '1px solid black' } : notes[getNoteColumn(measure, columnsPerMeasure, numberOfStaves)] && showLedgerLines(measure, columnsPerMeasure, numberOfStaves, rowNumber)}>

                                    <div
                                        id={`note-container-${getNoteColumn(measure, columnsPerMeasure, numberOfStaves)}`}
                                        className='drag-container-space'
                                        onDrop={e => drop(e, rowNumber, getNoteColumn(measure, columnsPerMeasure, numberOfStaves))}
                                        onDragOver={e => allowDrop(e)}
                                        style={notes[getNoteColumn(measure, columnsPerMeasure, numberOfStaves)] && { display: 'block' }}>

                                        {notes[getNoteColumn(measure, columnsPerMeasure, numberOfStaves)] && notes[getNoteColumn(measure, columnsPerMeasure, numberOfStaves)].map((chordNote, i) => (
                                            <Fragment key={i}>
                                                {rowNumber === chordNote.row &&
                                                    <button
                                                        draggable={!viewOnly && Boolean(chordNote.edit)}
                                                        id={`note-btn-${getNoteColumn(measure, columnsPerMeasure, numberOfStaves)}-${i}`}
                                                        disabled={(editColumn > -1 && notes[editColumn][editIndex(notes[editColumn])].edit)}
                                                        className={`${!viewOnly ? 'note-temp-item-btn' : 'note-temp-item-img'}  ${chordNote.transform} ${chordNote.edit}`}
                                                        style={chordNote && { display: 'block' }}
                                                        onClick={() => assignEdit(getNoteColumn(measure, columnsPerMeasure, numberOfStaves), i)}>

                                                        <div
                                                            alt='Note'
                                                            draggable='false'
                                                            className={`note-staff-image font-4 ${chordNote.type}`}
                                                            style={chordNote && { display: 'block' }}>

                                                            <div className='flex'>
                                                                <div className='note-staff-image-accidental font-2'>{chordNote.accidental}</div>
                                                                <div className='notePath'>{chordNote.notePath}</div>
                                                            </div>
                                                            {(chordNote.type === 'Dotted-WholeRest' || chordNote.type === 'Dotted-HalfRest' || chordNote.type === 'Dotted-QuarterRest') && <span className='rest-dotted dot'>.</span>}
                                                        </div>

                                                    </button>}
                                            </Fragment>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </li>
                    ))}
                </ul>
            ))}
        </div>
    )
}

export default Staff