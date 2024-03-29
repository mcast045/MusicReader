import React, { useContext, Fragment } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { updateNoteLetter } from '../../../HelperFunctions/UpdateNoteLetter'
import { getNoteColumn, isRestNote, editIndex } from '../../../HelperFunctions/Helpers'
import { StaffContext } from '../../../Context/StaffContext'
import { isShowingMenuAndLogout } from '../../../Redux/Actions/Util'
import { updateNote, currentEditColumn } from '../../../Redux/Actions/Notes'
import { EDIT } from '../../../HelperFunctions/SourceCodeEncodings'

const StaffRow = ({ rowNumber, measure }) => {

    const dispatch = useDispatch()

    const { notes, editColumnNumber } = useSelector(({ notes }) => notes)
    const key = useSelector(({ song }) => song.keySignature)
    const { isShowingMenu } = useSelector(({ util }) => util)

    const { numberOfStaves, viewOnly, eighthNotes } = useContext(StaffContext)

    const isStaffContinerAvailable = (column, row) => notes[column].findIndex(note => note?.row === row) === -1

    const allowDrop = e => e.preventDefault()

    const drop = (e, row, noteColumn) => {
        //Prevent drop if note is already in row
        if (isStaffContinerAvailable(noteColumn, row)) {
            e.preventDefault()
            const accidental = null
            updateNoteLetter(row, noteColumn, accidental, notes, key)
        }
    }

    const showLedgerLines = (measure, column, staff, rowNumber) => {
        let topLedgerLines = false
        let bottomLedgerLines = false
        notes[getNoteColumn(measure, column, staff)].forEach(note => {
            if (note?.row < 5 && !topLedgerLines) topLedgerLines = true
            else if (note?.row > 8 && !bottomLedgerLines) bottomLedgerLines = true
        })

        if (topLedgerLines && bottomLedgerLines) return rowNumber < 4 || (rowNumber > 8 && rowNumber !== 12) ? { borderBottom: '1px solid black' } : null
        else if (bottomLedgerLines) return (rowNumber > 8 && rowNumber !== 12) ? { borderBottom: '1px solid black' } : null
        else if (topLedgerLines) return rowNumber < 4 ? { borderBottom: '1px solid black' } : null
    }

    const hideLedgerLinesOnLoad = rowNumber => {
        if (rowNumber < 5 || rowNumber > 9)
            return { border: 'none' }
    }

    //Assigns an edit key to the note object
    const assignEdit = (column, i) => {
        if (!viewOnly) {
            const noteToUpdate = [...notes[column]]

            if (isRestNote(column, noteToUpdate.type, notes)) noteToUpdate[i] = { ...noteToUpdate[i], edit: EDIT }
            else noteToUpdate[i] = { ...noteToUpdate[i], edit: EDIT }

            //Update only 1 note in the chord
            notes[column] = [...noteToUpdate]

            dispatch(isShowingMenuAndLogout(!isShowingMenu))
            dispatch(currentEditColumn(column))
            dispatch(updateNote(notes))
        }
    }

    const isCurrentColumn = (measure, column, staff) => {
        if (notes[editColumnNumber] && !isRestNote(editColumnNumber, notes[editColumnNumber][0].type, notes))
            return (getNoteColumn(measure, column, staff) === editColumnNumber)
    }

    const currentColumn = (measure, columnsPerMeasure, numberOfStaves) => {
        return notes[getNoteColumn(measure, columnsPerMeasure, numberOfStaves)]
    }

    return (
        <li key={rowNumber} style={hideLedgerLinesOnLoad(rowNumber)}>
            {eighthNotes.map(columnsPerMeasure => (
                <div
                    className='note-temp-container'
                    key={columnsPerMeasure}
                    style={isCurrentColumn(measure, columnsPerMeasure, numberOfStaves) && (rowNumber !== 12 && (rowNumber < 4 || rowNumber > 8)) ? { borderBottom: '1px solid black' } : currentColumn(measure, columnsPerMeasure, numberOfStaves) && showLedgerLines(measure, columnsPerMeasure, numberOfStaves, rowNumber)}>

                    <div
                        id={`note-container-${getNoteColumn(measure, columnsPerMeasure, numberOfStaves)}`}
                        className='drag-container-space'
                        onDrop={e => drop(e, rowNumber, getNoteColumn(measure, columnsPerMeasure, numberOfStaves))}
                        onDragOver={allowDrop}
                        style={currentColumn(measure, columnsPerMeasure, numberOfStaves) && { display: 'block' }}>

                        {currentColumn(measure, columnsPerMeasure, numberOfStaves)?.map((chordNote, i) => (
                            <Fragment key={i}>
                                {chordNote && (rowNumber === chordNote?.row) &&
                                    <button
                                        draggable={!viewOnly && Boolean(chordNote?.edit)}
                                        id={`note-btn-${getNoteColumn(measure, columnsPerMeasure, numberOfStaves)}-${i}`}
                                        disabled={(editColumnNumber > -1 && notes[editColumnNumber][editIndex(notes[editColumnNumber])]?.edit)}
                                        className={`${!viewOnly ? 'note-temp-item-btn' : 'note-temp-item-img'}  ${chordNote?.transform} ${chordNote?.edit}`}
                                        style={chordNote && { display: 'block' }}
                                        onClick={() => assignEdit(getNoteColumn(measure, columnsPerMeasure, numberOfStaves), i)}>

                                        <div
                                            alt='Note'
                                            draggable='false'
                                            className={`note-staff-image font-4 ${chordNote?.type}`}
                                            style={chordNote && { display: 'block' }}>

                                            <div className='flex'>
                                                <div className='note-staff-image-accidental font-2'>{chordNote?.accidental}</div>
                                                <div className='notePath'>{chordNote?.notePath}</div>
                                            </div>

                                            {(chordNote?.type === 'Dotted-WholeRest' || chordNote?.type === 'Dotted-HalfRest' || chordNote?.type === 'Dotted-QuarterRest') && <span className='rest-dotted dot'>.</span>}
                                        </div>

                                    </button>}
                            </Fragment>
                        ))}
                    </div>
                </div>
            ))}
        </li>
    );
}

export default StaffRow;