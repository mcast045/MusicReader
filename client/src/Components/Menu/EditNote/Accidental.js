import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { updateNoteLetter, allNotes } from '../../../HelperFunctions/UpdateNoteLetter'
import { isRestNote, editIndex, getDifferentTabPosition } from '../../../HelperFunctions/Helpers'
import { SHARP_NOTE, NATURAL_NOTE, FLAT_NOTE } from '../../../HelperFunctions/SourceCodeEncodings'
import { findLetterIdx, moveNoteBetween, moveNoteDown, moveNoteUp } from '../../../HelperFunctions/MoveNote'

const Accidental = () => {

    const { notes, editColumnNumber } = useSelector(({ notes }) => notes)
    const key = useSelector(({ song }) => song.keySignature)

    const preventAccidentalNotes = (key, idx) => {
        const notetoUpdate = notes[idx][editIndex(notes[editColumnNumber])]
        if (key === 1) return true
        else if (key === 2) return notetoUpdate.letter !== allNotes[9]
        else if (key === 3) return notetoUpdate.letter !== allNotes[4] && notetoUpdate.letter !== allNotes[9]
        else if (key === 4) return notetoUpdate.letter !== allNotes && notetoUpdate.letter !== allNotes[4] && notetoUpdate.letter !== allNotes[9]
        else if (key === 5) return notetoUpdate.letter !== allNotes[6] && notetoUpdate.letter !== allNotes && notetoUpdate.letter !== allNotes[4] && notetoUpdate.letter !== allNotes[9]
        else if (key === 6) return notetoUpdate.letter !== allNotes[1] && notetoUpdate.letter !== allNotes[6] && notetoUpdate.letter !== allNotes && notetoUpdate.letter !== allNotes[4] && notetoUpdate.letter !== allNotes[9]
        else if (key === 7) return notetoUpdate.letter !== allNotes[8] && notetoUpdate.letter !== allNotes[1] && notetoUpdate.letter !== allNotes[6] && notetoUpdate.letter !== allNotes && notetoUpdate.letter !== allNotes[4] && notetoUpdate.letter !== allNotes[9]

        else if (key === 8) return notetoUpdate.letter !== allNotes[1]
        else if (key === 9) return notetoUpdate.letter !== allNotes[1] && notetoUpdate.letter !== allNotes[6]
        else if (key === 10) return notetoUpdate.letter !== allNotes[1] && notetoUpdate.letter !== allNotes[6] && notetoUpdate.letter !== allNotes
        else if (key === 11) return notetoUpdate.letter !== allNotes[1] && notetoUpdate.letter !== allNotes[6] && notetoUpdate.letter !== allNotes && notetoUpdate.letter !== allNotes[4]
        else if (key === 12) return notetoUpdate.letter !== allNotes[1] && notetoUpdate.letter !== allNotes[6] && notetoUpdate.letter !== allNotes && notetoUpdate.letter !== allNotes[4] && notetoUpdate.letter !== allNotes[9]
    }

    const preventNaturalNotes = (key, idx) => {
        const notetoUpdate = notes[idx][editIndex(notes[editColumnNumber])]
        if (key === 1) return false
        else if (key === 2) return notetoUpdate.letter === allNotes[9]
        else if (key === 3) return notetoUpdate.letter === allNotes[4] || notetoUpdate.letter === allNotes[9]
        else if (key === 4) return notetoUpdate.letter === allNotes || notetoUpdate.letter === allNotes[4] || notetoUpdate.letter === allNotes[9]
        else if (key === 5) return notetoUpdate.letter === allNotes[6] || notetoUpdate.letter === allNotes || notetoUpdate.letter === allNotes[4] || notetoUpdate.letter === allNotes[9]
        else if (key === 6) return notetoUpdate.letter === allNotes[1] || notetoUpdate.letter === allNotes[6] || notetoUpdate.letter === allNotes || notetoUpdate.letter === allNotes[4] || notetoUpdate.letter === allNotes[9]
        else if (key === 7) return notetoUpdate.letter === allNotes[8] || notetoUpdate.letter === allNotes[1] || notetoUpdate.letter === allNotes[6] || notetoUpdate.letter === allNotes || notetoUpdate.letter === allNotes[4]

        else if (key === 8) return notetoUpdate.letter === allNotes[1]
        else if (key === 9) return notetoUpdate.letter === allNotes[1] || notetoUpdate.letter === allNotes[6]
        else if (key === 10) return notetoUpdate.letter === allNotes[1] || notetoUpdate.letter === allNotes[6] || notetoUpdate.letter === allNotes
        else if (key === 11) return notetoUpdate.letter === allNotes[1] || notetoUpdate.letter === allNotes[6] || notetoUpdate.letter === allNotes || notetoUpdate.letter === allNotes[4]
        else if (key === 12) return notetoUpdate.letter === allNotes[1] || notetoUpdate.letter === allNotes[6] || notetoUpdate.letter === allNotes || notetoUpdate.letter === allNotes[4] || notetoUpdate.letter === allNotes[9]
    }

    //Only Sharp/Flat notes if they are not already part of natural scale
    const isLetterSameLength = (idx, type) => {
        let letterIdx = findLetterIdx(notes, idx)
        if (type === 'Sharp') {
            if ((allNotes[letterIdx] === allNotes[10] || allNotes[letterIdx] === allNotes) && key.id > 0) return true
            else if (allNotes[letterIdx] === allNotes && key.id > 7 && key.id < 10) return false
            else if (allNotes[letterIdx] === allNotes[0] && key.id > 7) return false
            else if (allNotes[letterIdx] === allNotes[5] && key.id > 8) return false
            else if (allNotes[letterIdx] === allNotes[10] && key.id > 9) return false
            else if (allNotes[letterIdx] === allNotes[3] && key.id > 10) return false
            else if (allNotes[letterIdx] === allNotes[8] && key.id > 11) return false
            return allNotes[letterIdx].length !== allNotes[letterIdx + 1].length
        }

        else if (type === 'Flat') {
            if (allNotes[letterIdx] === allNotes[0] && key.id > 7) return true
            else if (allNotes[letterIdx] === allNotes[8] && key.id > 8) return true
            else if (allNotes[letterIdx] === allNotes[0] && key.id > 0 && key.id < 4) return true
            else if (allNotes[letterIdx] === allNotes[10] && (key.id > 1 && key.id < 8)) return false
            else if ((allNotes[letterIdx] === allNotes[5] || allNotes[letterIdx] === allNotes[10]) && (key.id > 2 && key.id < 8)) return false
            else if (allNotes[letterIdx] === allNotes[0] && (key.id > 3 && key.id < 8)) return false
            else if (allNotes[letterIdx] === allNotes[7] && (key.id > 4 && key.id < 8)) return false
            else if (allNotes[letterIdx] === allNotes[2] && (key.id > 5 && key.id < 8)) return false
            return allNotes[letterIdx].length !== allNotes[letterIdx - 1].length
        }
    }

    const accidentalChange = (e, kb, noteColumn, key) => {
        const notetoUpdate = notes[noteColumn][editIndex(notes[noteColumn])]
        const { accidental, row, transform, letter } = notetoUpdate

        if ((e.target.id === 'Sharp' || kb === 'Sharp') && (row > 1 || transform === 'move-down') && (preventAccidentalNotes(key.id, noteColumn) || accidental === FLAT_NOTE) && accidental !== NATURAL_NOTE && isLetterSameLength(noteColumn, 'Sharp') && (notetoUpdate.letter !== allNotes[6] && letter !== allNotes[1]))
            updateNoteLetter(row, noteColumn, SHARP_NOTE, notes, key)
        else if ((e.target.id === 'Flat' || kb === 'Flat') && (row < 12 || transform === 'move-up') && (preventAccidentalNotes(key.id, noteColumn) || accidental === SHARP_NOTE) && accidental !== NATURAL_NOTE && isLetterSameLength(noteColumn, 'Flat') && (letter !== allNotes[9] && letter !== allNotes[4]))
            updateNoteLetter(row, noteColumn, FLAT_NOTE, notes, key)
        else if ((e.target.id === 'Natural' || kb === 'Natural') && preventNaturalNotes(key.id, noteColumn) && (accidental !== FLAT_NOTE && accidental !== SHARP_NOTE))
            updateNoteLetter(row, noteColumn, NATURAL_NOTE, notes, key)
        else
            updateNoteLetter(row, noteColumn, null, notes, key)
    }

    const accidentalNote = (e, kb) => {
        if (!isRestNote(notes[editColumnNumber][0], null, notes)) {
            if (key.id === 1) accidentalChange(e, kb, editColumnNumber, key)
            else if (key.id === 2) accidentalChange(e, kb, editColumnNumber, key)
            else if (key.id === 3) accidentalChange(e, kb, editColumnNumber, key)
            else if (key.id === 4) accidentalChange(e, kb, editColumnNumber, key)
            else if (key.id === 5) accidentalChange(e, kb, editColumnNumber, key)
            else if (key.id === 6) accidentalChange(e, kb, editColumnNumber, key)
            else if (key.id === 7) accidentalChange(e, kb, editColumnNumber, key)

            else if (key.id === 8) accidentalChange(e, kb, editColumnNumber, key)
            else if (key.id === 9) accidentalChange(e, kb, editColumnNumber, key)
            else if (key.id === 10) accidentalChange(e, kb, editColumnNumber, key)
            else if (key.id === 11) accidentalChange(e, kb, editColumnNumber, key)
            else if (key.id === 12) accidentalChange(e, kb, editColumnNumber, key)
        }
    }

    const isKeyMatch = (e, kbKey) =>
        kbKey.toLowerCase() === e.key.toLowerCase()

    const useKey = (kbKey, keyFunction) => {
        const accidental = notes[editColumnNumber][editIndex(notes[editColumnNumber])]?.accidental

        useEffect(() => {
            const onDown = e => {
                if (isKeyMatch(e, kbKey)) {
                    if (keyFunction === 'Sharp' && accidental !== SHARP_NOTE)
                        accidentalNote(e, 'Sharp')
                    else if (keyFunction === 'Flat' && accidental !== FLAT_NOTE)
                        accidentalNote(e, 'Flat')
                    else if (keyFunction === 'Natural' && accidental !== NATURAL_NOTE)
                        accidentalNote(e, 'Natural')
                    else if (keyFunction === 'Up')
                        moveNoteUp(notes, key, editColumnNumber)
                    else if (keyFunction === 'Down')
                        moveNoteDown(notes, key, editColumnNumber)
                    else if (keyFunction === 'Between')
                        moveNoteBetween(notes, key, editColumnNumber)
                    else if (keyFunction === 'tabChange')
                        getDifferentTabPosition(notes, editColumnNumber)
                }
            }

            if (editColumnNumber !== -1) {
                window.addEventListener('keydown', onDown)
                return () => { window.removeEventListener('keydown', onDown) }
            }
        }, [kbKey, keyFunction, accidental])
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
                    <button onClick={accidentalNote} disabled={notes[editColumnNumber] && notes[editColumnNumber][editIndex(notes[editColumnNumber])].accidental === SHARP_NOTE}>
                        <span id='Sharp' className='note-menu-image' title='Shortcut: Press 1'>&#9839;</span>
                    </button>
                </div>
            </div>

            <div className='note-container'>
                <h3 className='note-label'>Natural</h3>
                <button onClick={accidentalNote} disabled={notes[editColumnNumber] && (notes[editColumnNumber][editIndex(notes[editColumnNumber])].accidental === NATURAL_NOTE)}>
                    <span id='Natural' className='note-menu-image' title='Shortcut: Press 2'>&#9838;</span>
                </button>
            </div>

            <div className='note-container'>
                <h3 className='note-label'>Flat</h3>
                <button onClick={accidentalNote} disabled={notes[editColumnNumber] && notes[editColumnNumber][editIndex(notes[editColumnNumber])].accidental === FLAT_NOTE}>
                    <span id='Flat' className='note-menu-image' title='Shortcut: Press 3'>&#9837;</span>
                </button>
            </div>
        </div>
    )
}

export default Accidental