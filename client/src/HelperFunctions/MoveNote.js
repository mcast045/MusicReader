import store from '../Redux/Store'
import { allNotes } from './UpdateNoteLetter'
import { updateNote } from '../Redux/Actions/Notes'
import { editIndex, isRestNote } from './Helpers'
import { SHARP_NOTE, FLAT_NOTE, NATURAL_NOTE, MOVE_DOWN, NO_TRANSLATE, MOVE_UP } from './SourceCodeEncodings'

export const findLetterIdx = (songArr, index) =>
    allNotes.findIndex(note => note === songArr[index][editIndex(songArr[index])]?.letter)

const isKeySharp = (keyId, idCheck) => keyId > idCheck && keyId < 8
const isKeyFlat = (keyId, idCheck) => keyId > idCheck && keyId > 7

export const moveNoteUp = (notes, key, editColumn) => {
    if (!isRestNote(notes[editColumn][editIndex(notes[editColumn])], null, notes)) {
        // Change transform and letter of note
        const copy = [...notes]
        const allNotesIdx = findLetterIdx(copy, editColumn)
        let noteToUpdate = copy[editColumn][editIndex(copy[editColumn])]

        const { accidental, row, transform } = noteToUpdate
        const constantChanges = { ...noteToUpdate, accidental: null }

        const changeNaturalLetter = (arr, index) => {
            if (accidental === FLAT_NOTE) {
                if (isKeySharp(key.id, 2) && arr[index] === allNotes[1]) return allNotes[4]
                else if (isKeySharp(key.id, 1) && arr[index] === allNotes[6]) return allNotes[9]
                else if (isKeyFlat(key.id, 11) && allNotes[allNotesIdx] === allNotes[7]) return allNotes[9]
                else if (isKeyFlat(key.id, 9) && allNotes[allNotesIdx] === allNotes[9]) return allNotes[11]
                else if (isKeyFlat(key.id, 8) && arr[index] === allNotes[4]) return allNotes[6]
                else if (!arr[index + 3]) return allNotes[0]
                return arr[index + 2].length === 1 ? arr[index + 2] : arr[index + 3]
            } else {
                if (isKeySharp(key.id, 6) && arr[index] === allNotes[8]) return allNotes[9]
                else if (isKeySharp(key.id, 6) && (arr[index] === allNotes[6] || (accidental === NATURAL_NOTE && arr[index] === allNotes[5]))) return allNotes[8]
                else if (isKeySharp(key.id, 4) && (arr[index] === allNotes[4] || (accidental === NATURAL_NOTE && arr[index] === allNotes[3]))) return allNotes[6]
                else if (isKeySharp(key.id, 3) && (arr[index] === allNotes[9] || (accidental === NATURAL_NOTE && arr[index] === allNotes[8]))) return allNotes[11]
                else if (isKeySharp(key.id, 2) && arr[index] === allNotes[2]) return allNotes[4]
                else if (isKeySharp(key.id, 1) && arr[index] === allNotes[7]) return allNotes[9]
                else if (isKeyFlat(key.id, 11) && arr[index] === allNotes[9]) return allNotes[11]
                else if (isKeyFlat(key.id, 11) && arr[index] === allNotes[8]) return allNotes[9]
                else if (isKeyFlat(key.id, 10) && arr[index] === allNotes[4]) return allNotes[6]
                else if (isKeyFlat(key.id, 10) && arr[index] === allNotes[3]) return allNotes[4]
                else if (isKeyFlat(key.id, 8) && arr[index] === allNotes[5]) return allNotes[6]
                else if (isKeyFlat(key.id, 8) && arr[index] === allNotes[6]) return allNotes[8]
                else if (isKeyFlat(key.id, 7) && arr[index] === allNotes[1]) return allNotes[3]
                else if (isKeyFlat(key.id, 7) && arr[index] === allNotes[0]) return allNotes[1]
                return arr[index + 1].length === 1 ? arr[index + 1] : arr[index + 2]
            }
        }

        const preventNoteAboveLedgerLine = row !== 1
        if (preventNoteAboveLedgerLine) {
            if (transform === MOVE_UP) {
                constantChanges.row = row - 1
                constantChanges.transform = NO_TRANSLATE
            } else constantChanges.transform = transform === NO_TRANSLATE ? MOVE_UP : NO_TRANSLATE

            if (allNotes[allNotesIdx + 2])
                noteToUpdate = { ...constantChanges, letter: changeNaturalLetter(allNotes, allNotesIdx) }
            else {
                if (accidental === FLAT_NOTE) {
                    //'G#' to 'B/A#'
                    let letter = allNotes[2]
                    if (isKeyFlat(key.id, 7) && allNotes[allNotesIdx] === allNotes[11]) letter = allNotes[1]
                    noteToUpdate = { ...constantChanges, letter: letter }
                } else {
                    //'G/G#' to 'A/A#' or 'G#' to 'A' (if Sharp)
                    let letter = allNotes[0]
                    if (isKeyFlat(key.id, 9) && allNotes[allNotesIdx] === allNotes[11]) letter = allNotes[1]
                    else if (isKeyFlat(key.id, 9) && allNotes[allNotesIdx] === allNotes[10]) letter = allNotes[11]
                    else if (isKeySharp(key.id, 5) && (allNotes[allNotesIdx] === allNotes[11] || (allNotes[allNotesIdx] === allNotes[10] && accidental === NATURAL_NOTE))) letter = allNotes[1]
                    noteToUpdate = { ...constantChanges, letter: letter }
                }
            }
        }

        copy[editColumn][editIndex(copy[editColumn])] = noteToUpdate
        store.dispatch(updateNote(copy))
    }
}

export const moveNoteDown = (notes, key, editColumn) => {
    if (!isRestNote(notes[editColumn][editIndex(notes[editColumn])], null, notes)) {
        //Change transform and letter of note
        const copy = [...notes]
        const allNotesIdx = findLetterIdx(copy, editColumn)
        let noteToUpdate = copy[editColumn][editIndex(copy[editColumn])]

        const { accidental, row, transform } = noteToUpdate
        const constantChanges = { ...noteToUpdate, accidental: null }

        const changeNaturalLetter = (arr, index) => {
            if (accidental === SHARP_NOTE) {
                if (isKeySharp(key.id, 2) && arr[index] === allNotes[6]) return allNotes[4]
                else if (isKeySharp(key.id, 1) && arr[index] === allNotes[11]) return allNotes[9]
                else if (isKeyFlat(key.id, 8) && arr[index] === allNotes[9]) return allNotes[6]
                else if (isKeyFlat(key.id, 7) && arr[index] === allNotes[4]) return allNotes[1]
                return arr[index - 2].length === 1 ? arr[index - 2] : arr[index - 3]
            }
            else {
                if (isKeySharp(key.id, 6) && arr[index] === allNotes[8]) return allNotes[6]
                else if (isKeySharp(key.id, 6) && arr[index] === allNotes[9]) return allNotes[8]
                else if (isKeySharp(key.id, 5) && arr[index] === allNotes[2]) return allNotes[1]
                else if (isKeySharp(key.id, 4) && arr[index] === allNotes[6]) return allNotes[4]
                else if (isKeySharp(key.id, 4) && arr[index] === allNotes[7]) return allNotes[6]
                else if (isKeySharp(key.id, 3) && arr[index] === allNotes[11]) return allNotes[9]
                else if (isKeySharp(key.id, 2) && arr[index] === allNotes[4]) return allNotes[2]
                else if (isKeySharp(key.id, 2) && arr[index] === allNotes[5]) return allNotes[4]
                else if (isKeySharp(key.id, 1) && arr[index] === allNotes[9]) return allNotes[7]
                else if (isKeySharp(key.id, 1) && arr[index] === allNotes[10]) return allNotes[9]
                else if (isKeyFlat(key.id, 11) && arr[index] === allNotes[11]) return allNotes[9]
                else if (isKeyFlat(key.id, 10) && (arr[index] === allNotes[6] || (accidental === NATURAL_NOTE && arr[index] === allNotes[7]))) return allNotes[4]
                else if (isKeyFlat(key.id, 9) && arr[index] === allNotes[11]) return allNotes[10]
                else if (isKeyFlat(key.id, 9) && arr[index] === allNotes[2] && accidental === NATURAL_NOTE) return allNotes[11]
                else if (isKeyFlat(key.id, 8) && arr[index] === allNotes[6]) return allNotes[5]
                else if (isKeyFlat(key.id, 8) && (arr[index] === allNotes[8] || (accidental === FLAT_NOTE && arr[index] === allNotes[7]))) return allNotes[6]
                else if (isKeyFlat(key.id, 7) && arr[index] === allNotes[3]) return allNotes[1]
                return arr[index - 1].length === 1 ? arr[index - 1] : arr[index - 2]
            }
        }

        const preventNoteBelowLedgerLine = (key?.id !== 12 && row !== 12) || (key?.id === 12 && (row !== 11 || transform === NO_TRANSLATE))
        if (preventNoteBelowLedgerLine) {
            if (transform === MOVE_DOWN) {
                constantChanges.row = row + 1
                constantChanges.transform = NO_TRANSLATE
            } else constantChanges.transform = transform === NO_TRANSLATE ? MOVE_DOWN : NO_TRANSLATE

            if (allNotes[allNotesIdx - 2])
                noteToUpdate = { ...constantChanges, letter: changeNaturalLetter(allNotes, allNotesIdx) }
            else {
                if (accidental === FLAT_NOTE) {
                    //'A#' to 'A'
                    noteToUpdate = { ...constantChanges, letter: allNotes[0] }
                } else {
                    //'A' to 'G/G#' or 'A#' to 'G/G#' (if Sharp)
                    let letter = allNotes[10]
                    if (isKeyFlat(key.id, 11) && allNotes[allNotesIdx] === allNotes[0] && accidental === NATURAL_NOTE) letter = allNotes[9]
                    else if (isKeyFlat(key.id, 9) && allNotes[allNotesIdx] === allNotes[1]) letter = allNotes[11]
                    else if (isKeyFlat(key.id, 7) && allNotes[allNotesIdx] === allNotes[1]) letter = allNotes[0]
                    else if (isKeySharp(key.id, 3) && (allNotes[allNotesIdx] === allNotes[0] || allNotes[allNotesIdx] === allNotes[1])) letter = allNotes[11]
                    noteToUpdate = { ...constantChanges, letter: letter }
                }
            }
        }

        copy[editColumn][editIndex(copy[editColumn])] = noteToUpdate
        store.dispatch(updateNote(copy))
    }
}