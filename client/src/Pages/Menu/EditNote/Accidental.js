import React, { useEffect } from 'react';
import { useSelector } from 'react-redux'
import { updateNoteLetter, allNotes } from '../../../HelperFunctions/UpdateNoteLetter'
import { editIndex, isRestNote } from '../../../HelperFunctions/Helpers'

const Accidental = ({ findLetterNoteIndex, moveNoteBetween, moveNoteDown, moveNoteUp }) => {

    const notes = useSelector(state => state.notes.notes)
    const key = useSelector(state => state.song.keySignature)

    const preventAccidentalNotes = (key, idx) => {
        if (key === 1)
            return true
        else if (key === 2)
            return notes[idx].letter !== 'F#'
        else if (key === 3)
            return notes[idx].letter !== 'C#' && notes[idx].letter !== 'F#'
        else if (key === 4)
            return notes[idx].letter !== 'G#' && notes[idx].letter !== 'C#' && notes[idx].letter !== 'F#'
        else if (key === 5)
            return notes[idx].letter !== 'D#' && notes[idx].letter !== 'G#' && notes[idx].letter !== 'C#' && notes[idx].letter !== 'F#'
        else if (key === 6)
            return notes[idx].letter !== 'A#' && notes[idx].letter !== 'D#' && notes[idx].letter !== 'G#' && notes[idx].letter !== 'C#' && notes[idx].letter !== 'F#'
        else if (key === 7)
            return notes[idx].letter !== 'F' && notes[idx].letter !== 'A#' && notes[idx].letter !== 'D#' && notes[idx].letter !== 'G#' && notes[idx].letter !== 'C#' && notes[idx].letter !== 'F#'


        else if (key === -1)
            return notes[idx].letter !== 'A#'
        else if (key === -2)
            return notes[idx].letter !== 'A#' && notes[idx].letter !== 'D#'
        else if (key === -3)
            return notes[idx].letter !== 'A#' && notes[idx].letter !== 'D#' && notes[idx].letter !== 'G#'
        else if (key === -4)
            return notes[idx].letter !== 'A#' && notes[idx].letter !== 'D#' && notes[idx].letter !== 'G#' && notes[idx].letter !== 'C#'
        else if (key === -5)
            return notes[idx].letter !== 'A#' && notes[idx].letter !== 'D#' && notes[idx].letter !== 'G#' && notes[idx].letter !== 'C#' && notes[idx].letter !== 'F#'
    }

    const preventNaturalNotes = (key, idx) => {
        if (key === 1)
            return false
        else if (key === 2)
            return notes[idx].letter === 'F#'
        else if (key === 3)
            return notes[idx].letter === 'C#' || notes[idx].letter === 'F#'
        else if (key === 4)
            return notes[idx].letter === 'G#' || notes[idx].letter === 'C#' || notes[idx].letter === 'F#'
        else if (key === 5)
            return notes[idx].letter === 'D#' || notes[idx].letter === 'G#' || notes[idx].letter === 'C#' || notes[idx].letter === 'F#'
        else if (key === 6)
            return notes[idx].letter === 'A#' || notes[idx].letter === 'D#' || notes[idx].letter === 'G#' || notes[idx].letter === 'C#' || notes[idx].letter === 'F#'
        else if (key === 7)
            return notes[idx].letter === 'F' || notes[idx].letter === 'A#' || notes[idx].letter === 'D#' || notes[idx].letter === 'G#' || notes[idx].letter === 'C#' || notes[idx].letter === 'F#'


        else if (key === -1)
            return notes[idx].letter === 'A#'
        else if (key === -2)
            return notes[idx].letter === 'A#' || notes[idx].letter === 'D#'
        else if (key === -3)
            return notes[idx].letter === 'A#' || notes[idx].letter === 'D#' || notes[idx].letter === 'G#'
        else if (key === -4)
            return notes[idx].letter === 'A#' || notes[idx].letter === 'D#' || notes[idx].letter === 'G#' || notes[idx].letter === 'C#'
        else if (key === -5)
            return notes[idx].letter === 'A#' || notes[idx].letter === 'D#' || notes[idx].letter === 'G#' || notes[idx].letter === 'C#' || notes[idx].letter === 'F#'
    }

    //Only Sharp/Flat notes if they are not already part of natural scale
    const isLetterSameLength = (idx, type) => {
        let letterIdx = findLetterNoteIndex(notes, idx)
        if (type === 'Sharp') {
            if ((allNotes[letterIdx] === 'G' || allNotes[letterIdx] === 'G#') && key.id > 0)
                return true
            else if (allNotes[letterIdx] === 'G#' && key.id < 0 && key.id > -3)
                return false
            else if (allNotes[letterIdx] === 'A' && key.id < 0)
                return false
            else if (allNotes[letterIdx] === 'D' && key.id < -1)
                return false
            else if (allNotes[letterIdx] === 'G' && key.id < -2)
                return false
            else if (allNotes[letterIdx] === 'C' && key.id < -3)
                return false
            else if (allNotes[letterIdx] === 'F' && key.id < -4)
                return false
            else
                return allNotes[letterIdx].length !== allNotes[letterIdx + 1].length
        }

        else if (type === 'Flat') {
            if (allNotes[letterIdx] === 'A' && key.id < 0)
                return true
            else if (allNotes[letterIdx] === 'A' && key.id > 0 && key.id < 4)
                return true
            else if (allNotes[letterIdx] === 'G' && key.id > 1)
                return false
            else if ((allNotes[letterIdx] === 'D' || allNotes[letterIdx] === 'G') && key.id > 2)
                return false
            else if (allNotes[letterIdx] === 'A' && key.id > 3)
                return false
            else if (allNotes[letterIdx] === 'E' && key.id > 4)
                return false
            else if (allNotes[letterIdx] === 'B' && key.id > 5)
                return false
            else
                return allNotes[letterIdx].length !== allNotes[letterIdx - 1].length
        }
    }

    const accidentalChange = (e, kb, idx, key) => {
        if ((e.target.id === 'Sharp' || kb === 'Sharp') && (notes[idx].row > 1 || notes[idx].transform === 'move-down') && (preventAccidentalNotes(key.id, idx) || notes[idx].accidental === "\u266D") && notes[idx].accidental !== "\u266E" && isLetterSameLength(idx, 'Sharp') && (notes[idx].letter !== 'D#' && notes[idx].letter !== 'A#'))
            updateNoteLetter(notes[idx].row, idx, "\u266F", notes, key)
        else if ((e.target.id === 'Flat' || kb === 'Flat') && (notes[idx].row < 12 || notes[idx].transform === 'move-up') && (preventAccidentalNotes(key.id, idx) || notes[idx].accidental === "\u266F") && notes[idx].accidental !== "\u266E" && isLetterSameLength(idx, 'Flat') && (notes[idx].letter !== 'F#' && notes[idx].letter !== 'C#'))
            updateNoteLetter(notes[idx].row, idx, "\u266D", notes, key)
        else if ((e.target.id === 'Natural' || kb === 'Natural') && preventNaturalNotes(key.id, idx) && (notes[idx].accidental !== "\u266D" && notes[idx].accidental !== "\u266F"))
            updateNoteLetter(notes[idx].row, idx, "\u266E", notes, key)
        else
            updateNoteLetter(notes[idx].row, idx, null, notes, key)
    }

    const accidentalNote = (e, kb) => {
        let idx = editIndex(notes)

        if (!isRestNote(idx, null, notes)) {
            if (key.id === 1)
                accidentalChange(e, kb, idx, key)
            else if (key.id === 2)
                accidentalChange(e, kb, idx, key)
            else if (key.id === 3)
                accidentalChange(e, kb, idx, key)
            else if (key.id === 4)
                accidentalChange(e, kb, idx, key)
            else if (key.id === 5)
                accidentalChange(e, kb, idx, key)
            else if (key.id === 6)
                accidentalChange(e, kb, idx, key)
            else if (key.id === 7)
                accidentalChange(e, kb, idx, key)

            else if (key.id === -1)
                accidentalChange(e, kb, idx, key)
            else if (key.id === -2)
                accidentalChange(e, kb, idx, key)
            else if (key.id === -3)
                accidentalChange(e, kb, idx, key)
            else if (key.id === -4)
                accidentalChange(e, kb, idx, key)
            else if (key.id === -5)
                accidentalChange(e, kb, idx, key)
        }
    }

    const useKey = (key, isMovingUp) => {
        const isKeyMatch = e =>
            key.toLowerCase() === e.key.toLowerCase()

        const onDown = e => {
            if (isKeyMatch(e)) {
                if (isMovingUp === 'Sharp' && notes[editIndex(notes)].accidental !== "\u266F")
                    accidentalNote(e, 'Sharp')
                else if (isMovingUp === 'Flat' && notes[editIndex(notes)].accidental !== "\u266D")
                    accidentalNote(e, 'Flat')
                else if (isMovingUp === 'Natural' && notes[editIndex(notes)].accidental !== "\u266E")
                    accidentalNote(e, 'Natural')
                else if (isMovingUp === 'Up')
                    moveNoteUp()
                else if (isMovingUp === 'Down')
                    moveNoteDown()
                else if (isMovingUp === 'Between')
                    moveNoteBetween()
            }
        }

        useEffect(() => {
            if (editIndex(notes) !== -1) {
                window.addEventListener('keydown', onDown)
                return () => {
                    window.removeEventListener('keydown', onDown)
                }
            }
        }, [key, editIndex])
    }

    useKey('1', 'Sharp')
    useKey('2', 'Natural')
    useKey('3', 'Flat')

    useKey('q', 'Up')
    useKey('z', 'Down')
    useKey('a', 'Between')

    return (
        <div className='row-container-col-mod'>
            <div className='row'>
                <div className='note-container'>
                    <h3 className='note-label'>Sharp</h3>
                    <button onClick={e => accidentalNote(e)} disabled={notes[editIndex(notes)] && notes[editIndex(notes)].accidental === "\u266F"}>
                        <span id='Sharp' className='note-menu-image' title='Shortcut: Press 1'>&#9839;</span>
                    </button>
                </div>
            </div>

            <div className='note-container'>
                <h3 className='note-label'>Natural</h3>
                <button onClick={e => accidentalNote(e)} disabled={notes[editIndex(notes)] && (notes[editIndex(notes)].accidental === "\u266E" || notes[editIndex(notes)].accidental === null)}>
                    <span id='Natural' className='note-menu-image' title='Shortcut: Press 2'>&#9838;</span>
                </button>
            </div>

            <div className='note-container'>
                <h3 className='note-label'>Flat</h3>
                <button onClick={e => accidentalNote(e)} disabled={notes[editIndex(notes)] && notes[editIndex(notes)].accidental === "\u266D"}>
                    <span id='Flat' className='note-menu-image' title='Shortcut: Press 3'>&#9837;</span>
                </button>
            </div>
        </div>
    );
}

export default Accidental;