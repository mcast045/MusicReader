import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { updateNoteLetter, allNotes } from '../../../HelperFunctions/UpdateNoteLetter'
import { isRestNote, editIndex, getDifferentTabPosition } from '../../../HelperFunctions/Helpers'
import { SHARP_NOTE, NATURAL_NOTE, FLAT_NOTE } from '../../../HelperFunctions/SourceCodeEncodings'
import { findLetterIdx, moveNoteBetween, moveNoteDown, moveNoteUp } from '../../../HelperFunctions/MoveNote'

const Accidental = () => {

    const notes = useSelector(state => state.notes.notes)
    const editColumn = useSelector(state => state.notes.editColumnNumber)
    const key = useSelector(state => state.song.keySignature)

    const preventAccidentalNotes = (key, idx) => {
        const notetoUpdate = notes[idx][editIndex(notes[editColumn])]
        if (key === 1) return true
        else if (key === 2) return notetoUpdate.letter !== 'F#'
        else if (key === 3) return notetoUpdate.letter !== 'C#' && notetoUpdate.letter !== 'F#'
        else if (key === 4) return notetoUpdate.letter !== 'G#' && notetoUpdate.letter !== 'C#' && notetoUpdate.letter !== 'F#'
        else if (key === 5) return notetoUpdate.letter !== 'D#' && notetoUpdate.letter !== 'G#' && notetoUpdate.letter !== 'C#' && notetoUpdate.letter !== 'F#'
        else if (key === 6) return notetoUpdate.letter !== 'A#' && notetoUpdate.letter !== 'D#' && notetoUpdate.letter !== 'G#' && notetoUpdate.letter !== 'C#' && notetoUpdate.letter !== 'F#'
        else if (key === 7) return notetoUpdate.letter !== 'F' && notetoUpdate.letter !== 'A#' && notetoUpdate.letter !== 'D#' && notetoUpdate.letter !== 'G#' && notetoUpdate.letter !== 'C#' && notetoUpdate.letter !== 'F#'

        else if (key === 8) return notetoUpdate.letter !== 'A#'
        else if (key === 9) return notetoUpdate.letter !== 'A#' && notetoUpdate.letter !== 'D#'
        else if (key === 10) return notetoUpdate.letter !== 'A#' && notetoUpdate.letter !== 'D#' && notetoUpdate.letter !== 'G#'
        else if (key === 11) return notetoUpdate.letter !== 'A#' && notetoUpdate.letter !== 'D#' && notetoUpdate.letter !== 'G#' && notetoUpdate.letter !== 'C#'
        else if (key === 12) return notetoUpdate.letter !== 'A#' && notetoUpdate.letter !== 'D#' && notetoUpdate.letter !== 'G#' && notetoUpdate.letter !== 'C#' && notetoUpdate.letter !== 'F#'
    }

    const preventNaturalNotes = (key, idx) => {
        const notetoUpdate = notes[idx][editIndex(notes[editColumn])]
        if (key === 1) return false
        else if (key === 2) return notetoUpdate.letter === 'F#'
        else if (key === 3) return notetoUpdate.letter === 'C#' || notetoUpdate.letter === 'F#'
        else if (key === 4) return notetoUpdate.letter === 'G#' || notetoUpdate.letter === 'C#' || notetoUpdate.letter === 'F#'
        else if (key === 5) return notetoUpdate.letter === 'D#' || notetoUpdate.letter === 'G#' || notetoUpdate.letter === 'C#' || notetoUpdate.letter === 'F#'
        else if (key === 6) return notetoUpdate.letter === 'A#' || notetoUpdate.letter === 'D#' || notetoUpdate.letter === 'G#' || notetoUpdate.letter === 'C#' || notetoUpdate.letter === 'F#'
        else if (key === 7) return notetoUpdate.letter === 'F' || notetoUpdate.letter === 'A#' || notetoUpdate.letter === 'D#' || notetoUpdate.letter === 'G#' || notetoUpdate.letter === 'C#'

        else if (key === 8) return notetoUpdate.letter === 'A#'
        else if (key === 9) return notetoUpdate.letter === 'A#' || notetoUpdate.letter === 'D#'
        else if (key === 10) return notetoUpdate.letter === 'A#' || notetoUpdate.letter === 'D#' || notetoUpdate.letter === 'G#'
        else if (key === 11) return notetoUpdate.letter === 'A#' || notetoUpdate.letter === 'D#' || notetoUpdate.letter === 'G#' || notetoUpdate.letter === 'C#'
        else if (key === 12) return notetoUpdate.letter === 'A#' || notetoUpdate.letter === 'D#' || notetoUpdate.letter === 'G#' || notetoUpdate.letter === 'C#' || notetoUpdate.letter === 'F#'
    }

    //Only Sharp/Flat notes if they are not already part of natural scale
    const isLetterSameLength = (idx, type) => {
        let letterIdx = findLetterIdx(notes, idx)
        if (type === 'Sharp') {
            if ((allNotes[letterIdx] === 'G' || allNotes[letterIdx] === 'G#') && key.id > 0) return true
            else if (allNotes[letterIdx] === 'G#' && key.id > 7 && key.id < 10) return false
            else if (allNotes[letterIdx] === 'A' && key.id > 7) return false
            else if (allNotes[letterIdx] === 'D' && key.id > 8) return false
            else if (allNotes[letterIdx] === 'G' && key.id > 9) return false
            else if (allNotes[letterIdx] === 'C' && key.id > 10) return false
            else if (allNotes[letterIdx] === 'F' && key.id > 11) return false
            else return allNotes[letterIdx].length !== allNotes[letterIdx + 1].length
        }

        else if (type === 'Flat') {
            if (allNotes[letterIdx] === 'A' && key.id > 7) return true
            else if (allNotes[letterIdx] === 'F' && key.id > 8) return true
            else if (allNotes[letterIdx] === 'A' && key.id > 0 && key.id < 4) return true
            else if (allNotes[letterIdx] === 'G' && (key.id > 1 && key.id < 8)) return false
            else if ((allNotes[letterIdx] === 'D' || allNotes[letterIdx] === 'G') && (key.id > 2 && key.id < 8)) return false
            else if (allNotes[letterIdx] === 'A' && (key.id > 3 && key.id < 8)) return false
            else if (allNotes[letterIdx] === 'E' && (key.id > 4 && key.id < 8)) return false
            else if (allNotes[letterIdx] === 'B' && (key.id > 5 && key.id < 8)) return false
            else return allNotes[letterIdx].length !== allNotes[letterIdx - 1].length
        }
    }

    const accidentalChange = (e, kb, noteColumn, key) => {
        const notetoUpdate = notes[noteColumn][editIndex(notes[noteColumn])]
        if ((e.target.id === 'Sharp' || kb === 'Sharp') && (notetoUpdate.row > 1 || notetoUpdate.transform === 'move-down') && (preventAccidentalNotes(key.id, noteColumn) || notetoUpdate.accidental === FLAT_NOTE) && notetoUpdate.accidental !== NATURAL_NOTE && isLetterSameLength(noteColumn, 'Sharp') && (notetoUpdate.letter !== 'D#' && notetoUpdate.letter !== 'A#'))
            updateNoteLetter(notetoUpdate.row, noteColumn, SHARP_NOTE, notes, key)
        else if ((e.target.id === 'Flat' || kb === 'Flat') && (notetoUpdate.row < 12 || notetoUpdate.transform === 'move-up') && (preventAccidentalNotes(key.id, noteColumn) || notetoUpdate.accidental === SHARP_NOTE) && notetoUpdate.accidental !== NATURAL_NOTE && isLetterSameLength(noteColumn, 'Flat') && (notetoUpdate.letter !== 'F#' && notetoUpdate.letter !== 'C#'))
            updateNoteLetter(notetoUpdate.row, noteColumn, FLAT_NOTE, notes, key)
        else if ((e.target.id === 'Natural' || kb === 'Natural') && preventNaturalNotes(key.id, noteColumn) && (notetoUpdate.accidental !== FLAT_NOTE && notetoUpdate.accidental !== SHARP_NOTE))
            updateNoteLetter(notetoUpdate.row, noteColumn, NATURAL_NOTE, notes, key)
        else
            updateNoteLetter(notetoUpdate.row, noteColumn, null, notes, key)
    }

    const accidentalNote = (e, kb) => {
        if (!isRestNote(notes[editColumn][0], null, notes)) {
            if (key.id === 1) accidentalChange(e, kb, editColumn, key)
            else if (key.id === 2) accidentalChange(e, kb, editColumn, key)
            else if (key.id === 3) accidentalChange(e, kb, editColumn, key)
            else if (key.id === 4) accidentalChange(e, kb, editColumn, key)
            else if (key.id === 5) accidentalChange(e, kb, editColumn, key)
            else if (key.id === 6) accidentalChange(e, kb, editColumn, key)
            else if (key.id === 7) accidentalChange(e, kb, editColumn, key)

            else if (key.id === 8) accidentalChange(e, kb, editColumn, key)
            else if (key.id === 9) accidentalChange(e, kb, editColumn, key)
            else if (key.id === 10) accidentalChange(e, kb, editColumn, key)
            else if (key.id === 11) accidentalChange(e, kb, editColumn, key)
            else if (key.id === 12) accidentalChange(e, kb, editColumn, key)
        }
    }

    const useKey = (kbKey, keyFunction) => {
        const notetoUpdate = notes[editColumn][editIndex(notes[editColumn])]

        const isKeyMatch = e =>
            kbKey.toLowerCase() === e.key.toLowerCase()

        useEffect(() => {
            const onDown = e => {
                if (isKeyMatch(e)) {
                    if (keyFunction === 'Sharp' && notetoUpdate.accidental !== SHARP_NOTE)
                        accidentalNote(e, 'Sharp')
                    else if (keyFunction === 'Flat' && notetoUpdate.accidental !== FLAT_NOTE)
                        accidentalNote(e, 'Flat')
                    else if (keyFunction === 'Natural' && notetoUpdate.accidental !== NATURAL_NOTE)
                        accidentalNote(e, 'Natural')
                    else if (keyFunction === 'Up')
                        moveNoteUp(notes, key, editColumn)
                    else if (keyFunction === 'Down')
                        moveNoteDown(notes, key, editColumn)
                    else if (keyFunction === 'Between')
                        moveNoteBetween(notes, key, editColumn)
                    else if (keyFunction === 'tabChange')
                        getDifferentTabPosition(notes, editColumn)
                }
            }

            if (editColumn !== -1) {
                window.addEventListener('keydown', onDown)
                return () => { window.removeEventListener('keydown', onDown) }
            }
        }, [kbKey, keyFunction, isKeyMatch, notetoUpdate.accidental])
    }
    useKey('1', 'Sharp')
    useKey('2', 'Natural')
    useKey('3', 'Flat')

    useKey('q', 'Up')
    useKey('z', 'Down')
    useKey('a', 'Between')

    useKey('t', 'tabChange')

    return (
        <div className='row-container-col-mod'>
            <div className='row'>
                <div className='note-container'>
                    <h3 className='note-label'>Sharp</h3>
                    <button onClick={e => accidentalNote(e)} disabled={notes[editColumn] && notes[editColumn][editIndex(notes[editColumn])].accidental === SHARP_NOTE}>
                        <span id='Sharp' className='note-menu-image' title='Shortcut: Press 1'>&#9839;</span>
                    </button>
                </div>
            </div>

            <div className='note-container'>
                <h3 className='note-label'>Natural</h3>
                <button onClick={e => accidentalNote(e)} disabled={notes[editColumn] && (notes[editColumn][editIndex(notes[editColumn])].accidental === NATURAL_NOTE)}>
                    <span id='Natural' className='note-menu-image' title='Shortcut: Press 2'>&#9838;</span>
                </button>
            </div>

            <div className='note-container'>
                <h3 className='note-label'>Flat</h3>
                <button onClick={e => accidentalNote(e)} disabled={notes[editColumn] && notes[editColumn][editIndex(notes[editColumn])].accidental === FLAT_NOTE}>
                    <span id='Flat' className='note-menu-image' title='Shortcut: Press 3'>&#9837;</span>
                </button>
            </div>
        </div>
    )
}

export default Accidental