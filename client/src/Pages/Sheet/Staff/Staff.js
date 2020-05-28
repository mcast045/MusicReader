import React, { useEffect, useRef } from 'react'
import './Staff.css'
import '../Sheet.css'
import { useSelector, useDispatch } from 'react-redux';
import { updateNote, getUserNotes } from '../../../Redux/Actions/Notes';
import { updateNoteLetter } from '../../../HelperFunctions/UpdateNoteLetter'
import { getIndex, isRestNote, editIndex } from '../../../HelperFunctions/Helpers'

const Staff = ({ viewOnly, showLogout, setShowLogout, setIsShowingMenu, isShowingMenu, bars, staffLines, eighthNotes, i }) => {

    const dispatch = useDispatch()
    const notes = useSelector(state => state.notes.notes)
    const isEnabled = useSelector(state => state.notes.isEnabled)
    const key = useSelector(state => state.song.keySignature)
    const currentSong = useSelector(state => state.song.currentSong)
    const isAuthenticated = useSelector(state => state.auth.isAuthenticated)

    const isMounted = useRef(false);

    //Load currentSong notes when user changes song
    //Without isMounted, mounting error when adding notes to new staff lines
    useEffect(() => {
        //Only run when the dependencies change & if user has at least 1 song
        if (isMounted.current && currentSong && !viewOnly)
            isAuthenticated && currentSong._id && dispatch(getUserNotes(currentSong._id))

        return () => { isMounted.current = true; }
    }, [isAuthenticated, currentSong, dispatch])

    //Assigns an edit key to the note object
    const onClickImg = i => {
        if (!viewOnly) {
            let copy = [...notes]
            setIsShowingMenu(!isShowingMenu)
            setShowLogout(!showLogout)

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

    const drop = (e, row, index) => {
        e.preventDefault()
        let accidental = null
        updateNoteLetter(row, index, accidental, notes, key)
    }

    const isCurrentColumn = (j, l, i) => {
        let idx = editIndex(notes)
        if (notes[idx] && !isRestNote(idx, notes[idx].type, notes))
            return (getIndex(j, l, i) === idx)
    }

    const showLedgerLines = (j, l, i, k) => {
        if (notes[getIndex(j, l, i)].row < 5)
            return k < 4 ? { borderBottom: '1px solid black' } : null
        else if (notes[getIndex(j, l, i)].row > 8)
            return (k > 8 && k !== 12) ? { borderBottom: '1px solid black' } : null
    }

    const hideLedgerLinesOnLoad = k => {
        if (k < 5 || k > 9)
            return { border: 'none' }
    }

    return (
        <div className='sheet-music-container'>
            {bars.map(j => (
                <ul id={(j + (i * 4))} className='sheet-music' key={j}>
                    {staffLines.map(k => (
                        <li key={k} style={hideLedgerLinesOnLoad(k)}>
                            {eighthNotes.map(l => (
                                <div
                                    className='note-temp-container'
                                    key={l}
                                    style={
                                        isCurrentColumn(j, l, i) && (k !== 12 && (k < 4 || k > 8)) ? { borderBottom: '1px solid black' } : notes[getIndex(j, l, i)] && showLedgerLines(j, l, i, k)}>
                                    <div
                                        id={`note-container-${getIndex(j, l, i)}`}
                                        className='drag-container-space'
                                        onDrop={e => drop(e, k, getIndex(j, l, i))}
                                        onDragOver={e => allowDrop(e)}
                                        style={notes[getIndex(j, l, i)] && { display: 'block' }} >
                                        {notes[getIndex(j, l, i)] && k === notes[getIndex(j, l, i)].row &&
                                            <button
                                                draggable={!viewOnly && notes[getIndex(j, l, i)] && notes[getIndex(j, l, i)].draggable}
                                                id={`note-btn-${getIndex(j, l, i)}`}
                                                disabled={isEnabled}
                                                className={`${!viewOnly ? 'note-temp-item-btn' : 'note-temp-item-img'}  ${notes[getIndex(j, l, i)] && notes[getIndex(j, l, i)].transform} ${notes[getIndex(j, l, i)] && notes[getIndex(j, l, i)].edit}`}
                                                style={notes[getIndex(j, l, i)] && { display: 'block' }}
                                                onClick={() => onClickImg(getIndex(j, l, i))}
                                            >
                                                <div
                                                    alt='Note'
                                                    draggable='false'
                                                    className={`note-staff-image ${notes[getIndex(j, l, i)] && notes[getIndex(j, l, i)].type}`}
                                                    style={notes[getIndex(j, l, i)] && { display: 'block' }}
                                                >
                                                    <span className='note-staff-image-accidental'>{notes[getIndex(j, l, i)] && notes[getIndex(j, l, i)].accidental}</span>
                                                    {notes[getIndex(j, l, i)] && notes[getIndex(j, l, i)].notePath}
                                                    {(notes[getIndex(j, l, i)].type === 'Dotted-WholeRest' || notes[getIndex(j, l, i)].type === 'Dotted-HalfRest' || notes[getIndex(j, l, i)].type === 'Dotted-QuarterRest') && <span className='rest-dotted'>.</span>}
                                                </div>
                                            </button>}
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