import React, { useEffect, useRef } from 'react'
import './Staff.css'
import '../../../Pages/Sheet/Sheet.css'
import { useSelector, useDispatch } from 'react-redux';
import { updateNote, getUserNotes } from '../../../Redux/Actions/Notes';
import { updateNoteLetter } from '../../../HelperFunctions/UpdateNoteLetter'
import { getNoteColumn, isRestNote, editIndex } from '../../../HelperFunctions/Helpers'
import { isShowingMenu, isShowLogout } from '../../../Redux/Actions/Util'

const Staff = ({ viewOnly, bars, staffLines, eighthNotes, numberOfStaves }) => {

    const dispatch = useDispatch()

    const notes = useSelector(state => state.notes.notes)
    const isUpdating = useSelector(state => state.notes.isUpdating)
    const key = useSelector(state => state.song.keySignature)
    const currentSong = useSelector(state => state.song.currentSong)
    const isAuthenticated = useSelector(state => state.auth.isAuthenticated)
    const currentMenuState = useSelector(state => state.util.isShowingMenu)
    const currentLogoutState = useSelector(state => state.util.isShowingLogout)

    const isMounted = useRef(false);

    //Load currentSong notes when user changes song
    //Without isMounted, mounting error when adding notes to new staff lines
    useEffect(() => {
        //Only run when the dependencies change & if user has at least 1 song
        if (isMounted.current && currentSong && !viewOnly)
            isAuthenticated && currentSong._id && dispatch(getUserNotes(currentSong._id))

        return () => { isMounted.current = true; }
    }, [isAuthenticated, currentSong, dispatch, viewOnly])

    //Assigns an edit key to the note object
    const assignEdit = i => {
        if (!viewOnly) {
            let copy = [...notes]
            dispatch(isShowingMenu(!currentMenuState))
            dispatch(isShowLogout(!currentLogoutState))

            if (isRestNote(i, notes[i].type, notes))
                copy[i] = { ...copy[i], edit: 'edit-placeholder', draggable: false }
            else
                copy[i] = { ...copy[i], edit: 'edit-placeholder', draggable: true }

            dispatch(updateNote(copy))
        }
    }

    //Drag and Drop functionality
    const allowDrop = e =>
        e.preventDefault()

    const drop = (e, row, noteColumn) => {
        e.preventDefault()
        let accidental = null
        updateNoteLetter(row, noteColumn, accidental, notes, key)
    }

    const isCurrentColumn = (j, l, i) => {
        let idx = editIndex(notes)
        if (notes[idx] && !isRestNote(idx, notes[idx].type, notes))
            return (getNoteColumn(j, l, i) === idx)
    }

    const showLedgerLines = (measure, column, staff, rowNumber) => {
        if (notes[getNoteColumn(measure, column, staff)].row < 5)
            return rowNumber < 4 ? { borderBottom: '1px solid black' } : null
        else if (notes[getNoteColumn(measure, column, staff)].row > 8)
            return (rowNumber > 8 && rowNumber !== 12) ? { borderBottom: '1px solid black' } : null
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

                                        {notes[getNoteColumn(measure, columnsPerMeasure, numberOfStaves)] && rowNumber === notes[getNoteColumn(measure, columnsPerMeasure, numberOfStaves)].row &&
                                            <button
                                                draggable={!viewOnly && notes[getNoteColumn(measure, columnsPerMeasure, numberOfStaves)] && notes[getNoteColumn(measure, columnsPerMeasure, numberOfStaves)].draggable}
                                                id={`note-btn-${getNoteColumn(measure, columnsPerMeasure, numberOfStaves)}`}
                                                disabled={isUpdating}
                                                className={`${!viewOnly ? 'note-temp-item-btn' : 'note-temp-item-img'}  ${notes[getNoteColumn(measure, columnsPerMeasure, numberOfStaves)] && notes[getNoteColumn(measure, columnsPerMeasure, numberOfStaves)].transform} ${notes[getNoteColumn(measure, columnsPerMeasure, numberOfStaves)] && notes[getNoteColumn(measure, columnsPerMeasure, numberOfStaves)].edit}`}
                                                style={notes[getNoteColumn(measure, columnsPerMeasure, numberOfStaves)] && { display: 'block' }}
                                                onClick={() => assignEdit(getNoteColumn(measure, columnsPerMeasure, numberOfStaves))}>

                                                <div
                                                    alt='Note'
                                                    draggable='false'
                                                    className={`note-staff-image font-4 ${notes[getNoteColumn(measure, columnsPerMeasure, numberOfStaves)] && notes[getNoteColumn(measure, columnsPerMeasure, numberOfStaves)].type}`}
                                                    style={notes[getNoteColumn(measure, columnsPerMeasure, numberOfStaves)] && { display: 'block' }}>

                                                    <span className='note-staff-image-accidental font-2'>{notes[getNoteColumn(measure, columnsPerMeasure, numberOfStaves)] && notes[getNoteColumn(measure, columnsPerMeasure, numberOfStaves)].accidental}</span>
                                                    {notes[getNoteColumn(measure, columnsPerMeasure, numberOfStaves)] && notes[getNoteColumn(measure, columnsPerMeasure, numberOfStaves)].notePath}
                                                    {(notes[getNoteColumn(measure, columnsPerMeasure, numberOfStaves)].type === 'Dotted-WholeRest' || notes[getNoteColumn(measure, columnsPerMeasure, numberOfStaves)].type === 'Dotted-HalfRest' || notes[getNoteColumn(measure, columnsPerMeasure, numberOfStaves)].type === 'Dotted-QuarterRest') && <span className='rest-dotted'>.</span>}
                                                </div>
                                            </button>}


                                        {/* {notes[getNoteColumn(measure, columnsPerMeasure, numberOfStaves)] &&
                                            notes[getNoteColumn(measure, columnsPerMeasure, numberOfStaves)].chordNote &&
                                            notes[getNoteColumn(measure, columnsPerMeasure, numberOfStaves)].chordNote[getNoteColumn(measure, columnsPerMeasure, numberOfStaves)] &&
                                            rowNumber === notes[getNoteColumn(measure, columnsPerMeasure, numberOfStaves)].chordNote[getNoteColumn(measure, columnsPerMeasure, numberOfStaves)].row &&

                                            <button
                                                draggable={!viewOnly && notes[getNoteColumn(measure, columnsPerMeasure, numberOfStaves)] && notes[getNoteColumn(measure, columnsPerMeasure, numberOfStaves)].chordNote && notes[getNoteColumn(measure, columnsPerMeasure, numberOfStaves)].chordNote[getNoteColumn(measure, columnsPerMeasure, numberOfStaves)].draggable}
                                                id={`note-btn-${getNoteColumn(measure, columnsPerMeasure, numberOfStaves)}`}
                                                disabled={isUpdating}
                                                className={`${!viewOnly ? 'note-temp-item-btn' : 'note-temp-item-img'}  ${notes[getNoteColumn(measure, columnsPerMeasure, numberOfStaves)].chordNote && notes[getNoteColumn(measure, columnsPerMeasure, numberOfStaves)].chordNote[getNoteColumn(measure, columnsPerMeasure, numberOfStaves)].transform} ${notes[getNoteColumn(measure, columnsPerMeasure, numberOfStaves)].chordNote && notes[getNoteColumn(measure, columnsPerMeasure, numberOfStaves)].chordNote[getNoteColumn(measure, columnsPerMeasure, numberOfStaves)].edit}`}
                                                style={notes[getNoteColumn(measure, columnsPerMeasure, numberOfStaves)].chordNote && { display: 'block' }}
                                                onClick={() => assignEdit(getNoteColumn(measure, columnsPerMeasure, numberOfStaves))}>

                                                <div
                                                    alt='Note'
                                                    draggable='false'
                                                    className={`note-staff-image font-4 ${notes[getNoteColumn(measure, columnsPerMeasure, numberOfStaves)] && notes[getNoteColumn(measure, columnsPerMeasure, numberOfStaves)].type}`}
                                                    style={notes[getNoteColumn(measure, columnsPerMeasure, numberOfStaves)].chordNote && { display: 'block' }}>

                                                    <span className='note-staff-image-accidental font-2'>{notes[getNoteColumn(measure, columnsPerMeasure, numberOfStaves)] && notes[getNoteColumn(measure, columnsPerMeasure, numberOfStaves)].accidental}</span>
                                                    {notes[getNoteColumn(measure, columnsPerMeasure, numberOfStaves)] && notes[getNoteColumn(measure, columnsPerMeasure, numberOfStaves)].notePath}
                                                    {(notes[getNoteColumn(measure, columnsPerMeasure, numberOfStaves)].type === 'Dotted-WholeRest' || notes[getNoteColumn(measure, columnsPerMeasure, numberOfStaves)].type === 'Dotted-HalfRest' || notes[getNoteColumn(measure, columnsPerMeasure, numberOfStaves)].type === 'Dotted-QuarterRest') && <span className='rest-dotted'>.</span>}
                                                </div>
                                            </button>} */}

                                    </div>
                                </div>
                            ))}
                        </li>
                    ))}
                </ul>
            ))
            }
        </div >
    );
}

export default Staff;


// {notes[getNoteColumn(measure, columnsPerMeasure, numberOfStaves)].chordNote[editIndex(notes)] && rowNumber === notes[getNoteColumn(measure, columnsPerMeasure, numberOfStaves)].chordNote[editIndex(notes)].row &&
//         <button
//             draggable={!viewOnly && notes[getNoteColumn(measure, columnsPerMeasure, numberOfStaves)] && notes[getNoteColumn(measure, columnsPerMeasure, numberOfStaves)].draggable}
//             id={`note-btn-${getNoteColumn(measure, columnsPerMeasure, numberOfStaves)}`}
//             disabled={isUpdating}
//             className={`${!viewOnly ? 'note-temp-item-btn' : 'note-temp-item-img'}  ${notes[getNoteColumn(measure, columnsPerMeasure, numberOfStaves)] && notes[getNoteColumn(measure, columnsPerMeasure, numberOfStaves)].transform} ${notes[getNoteColumn(measure, columnsPerMeasure, numberOfStaves)] && notes[getNoteColumn(measure, columnsPerMeasure, numberOfStaves)].edit}`}
//             style={notes[getNoteColumn(measure, columnsPerMeasure, numberOfStaves)] && { display: 'block' }}
//             onClick={() => assignEdit(getNoteColumn(measure, columnsPerMeasure, numberOfStaves))}>

//             <div
//                 alt='Note'
//                 draggable='false'
//                 className={`note-staff-image font-4 ${notes[getNoteColumn(measure, columnsPerMeasure, numberOfStaves)] && notes[getNoteColumn(measure, columnsPerMeasure, numberOfStaves)].type}`}
//                 style={notes[getNoteColumn(measure, columnsPerMeasure, numberOfStaves)] && { display: 'block' }}>

//                 <span className='note-staff-image-accidental font-2'>{notes[getNoteColumn(measure, columnsPerMeasure, numberOfStaves)] && notes[getNoteColumn(measure, columnsPerMeasure, numberOfStaves)].accidental}</span>
//                 {notes[getNoteColumn(measure, columnsPerMeasure, numberOfStaves)] && notes[getNoteColumn(measure, columnsPerMeasure, numberOfStaves)].notePath}
//                 {(notes[getNoteColumn(measure, columnsPerMeasure, numberOfStaves)].type === 'Dotted-WholeRest' || notes[getNoteColumn(measure, columnsPerMeasure, numberOfStaves)].type === 'Dotted-HalfRest' || notes[getNoteColumn(measure, columnsPerMeasure, numberOfStaves)].type === 'Dotted-QuarterRest') && <span className='rest-dotted'>.</span>}
//             </div>
//         </button>
// }

// {
//     notes[getNoteColumn(measure, columnsPerMeasure, numberOfStaves)].chordNote && notes[getNoteColumn(measure, columnsPerMeasure, numberOfStaves)].chordNote.map((note, i) => (
//         <Fragment>
//             <span className='note-staff-image-accidental font-2'>{notes[getNoteColumn(measure, columnsPerMeasure, numberOfStaves)] && notes[getNoteColumn(measure, columnsPerMeasure, numberOfStaves)].chordNote[i].accidental}</span>
//             {notes[getNoteColumn(measure, columnsPerMeasure, numberOfStaves)] && notes[getNoteColumn(measure, columnsPerMeasure, numberOfStaves)].notePath}
//             {(notes[getNoteColumn(measure, columnsPerMeasure, numberOfStaves)].type === 'Dotted-WholeRest' || notes[getNoteColumn(measure, columnsPerMeasure, numberOfStaves)].type === 'Dotted-HalfRest' || notes[getNoteColumn(measure, columnsPerMeasure, numberOfStaves)].type === 'Dotted-QuarterRest') && <span className='rest-dotted'>.</span>}
//         </Fragment>
//     ))
// }