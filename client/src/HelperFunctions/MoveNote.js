import store from '../Redux/Store'
import { allNotes } from './UpdateNoteLetter'
import { updateNote } from '../Redux/Actions/Notes'
import { editIndex, isRestNote } from './Helpers'
import { SHARP_NOTE, FLAT_NOTE, NATURAL_NOTE } from './SourceCodeEncodings'

export const findLetterIdx = (songArr, index) =>
    allNotes.findIndex(note => note === songArr[index][editIndex(songArr[index])].letter)

const isKeySharp = (keyId, idCheck) => keyId > idCheck && keyId < 8
const isKeyFlat = (keyId, idCheck) => keyId > idCheck && keyId > 7

export const moveNoteUp = (notes, key, editColumn) => {
    if (!isRestNote(notes[editColumn][editIndex(notes[editColumn])], null, notes)) {
        //Change transform and letter of note
        const copy = [...notes]
        const allNotesIdx = findLetterIdx(copy, editColumn)
        let noteToUpdate = copy[editColumn][editIndex(copy[editColumn])]
        const constantChanges = { accidental: null, transform: 'move-up' }

        const changeNaturalLetter = (arr, index, transform) => {
            if (transform === 'no-translate') {
                if (noteToUpdate.accidental === FLAT_NOTE) {
                    if (isKeySharp(key.id, 2) && arr[index] === 'A#') return 'C#'
                    else if (isKeySharp(key.id, 1) && arr[index] === 'D#') return 'F#'
                    else if (isKeyFlat(key.id, 11) && allNotes[allNotesIdx] === 'E') return 'F#'
                    else if (isKeyFlat(key.id, 9) && allNotes[allNotesIdx] === 'F#') return 'G#'
                    else if (isKeyFlat(key.id, 8) && arr[index] === 'C#') return 'D#'
                    else if (!arr[index + 3]) return 'A'
                    else return arr[index + 2].length === 1 ? arr[index + 2] : arr[index + 3]
                } else {
                    if (isKeySharp(key.id, 6) && arr[index] === 'F') return 'F#'
                    else if (isKeySharp(key.id, 6) && (arr[index] === 'D#' || (noteToUpdate.accidental === NATURAL_NOTE && arr[index] === 'D'))) return 'F'
                    else if (isKeySharp(key.id, 4) && (arr[index] === 'C#' || (noteToUpdate.accidental === NATURAL_NOTE && arr[index] === 'C'))) return 'D#'
                    else if (isKeySharp(key.id, 3) && (arr[index] === 'F#' || (noteToUpdate.accidental === NATURAL_NOTE && arr[index] === 'F'))) return 'G#'
                    else if (isKeySharp(key.id, 2) && arr[index] === 'B') return 'C#'
                    else if (isKeySharp(key.id, 1) && arr[index] === 'E') return 'F#'
                    else if (isKeyFlat(key.id, 11) && arr[index] === 'F#') return 'G#'
                    else if (isKeyFlat(key.id, 11) && arr[index] === 'F') return 'F#'
                    else if (isKeyFlat(key.id, 10) && arr[index] === 'C#') return 'D#'
                    else if (isKeyFlat(key.id, 10) && arr[index] === 'C') return 'C#'
                    else if (isKeyFlat(key.id, 8) && arr[index] === 'D') return 'D#'
                    else if (isKeyFlat(key.id, 8) && arr[index] === 'D#') return 'F'
                    else if (isKeyFlat(key.id, 7) && arr[index] === 'A#') return 'C'
                    else if (isKeyFlat(key.id, 7) && arr[index] === 'A') return 'A#'
                    else return arr[index + 1].length === 1 ? arr[index + 1] : arr[index + 2]
                }
            } else if (transform === 'move-down') {
                if (noteToUpdate.accidental === FLAT_NOTE) {
                    if (isKeyFlat(key.id, 9) && allNotes[allNotesIdx] === 'E') return 'G#'
                    else if (isKeySharp(key.id, 3) && arr[index] === 'D#') return 'G#'
                    else if (isKeySharp(key.id, 1) && arr[index] === 'C#') return 'F#'
                    else return allNotes[allNotesIdx + 4].length !== 1 ? allNotes[allNotesIdx + 3] : allNotes[allNotesIdx + 4]
                }
                else {
                    if (isKeySharp(key.id, 6) && (arr[index] === 'C#' || (noteToUpdate.accidental === NATURAL_NOTE && arr[index] === 'C'))) return 'F'
                    else if (isKeySharp(key.id, 6) && arr[index] === 'F') return 'G#'
                    else if (isKeySharp(key.id, 5) && arr[index] === 'A#') return 'C#'
                    else if (isKeySharp(key.id, 4) && arr[index] === 'D#') return 'F#'
                    else if (isKeySharp(key.id, 4) && arr[index] === 'B') return 'D#'
                    else if (isKeySharp(key.id, 3) && arr[index] === 'E') return 'G#'
                    else if (isKeySharp(key.id, 2) && arr[index] === 'C#') return 'E'
                    else if (isKeySharp(key.id, 2) && arr[index] === 'A') return 'C#'
                    else if (isKeySharp(key.id, 1) && (arr[index] === 'D' || arr[index] === 'D#')) return 'F#'
                    else if (isKeyFlat(key.id, 11) && (arr[index] === 'D#' || (noteToUpdate.accidental === NATURAL_NOTE && arr[index] === 'E'))) return 'F#'
                    else if (isKeyFlat(key.id, 10) && arr[index] === 'C#') return 'F'
                    else if (isKeyFlat(key.id, 10) && (arr[index] === 'A#' || (noteToUpdate.accidental === NATURAL_NOTE && arr[index] === 'B'))) return 'C#'
                    else if (isKeyFlat(key.id, 9) && arr[index] === 'G#') return 'C'
                    else if (isKeyFlat(key.id, 8) && (arr[index] === 'C' || (noteToUpdate.accidental === SHARP_NOTE && arr[index] === 'C#'))) return 'D#'
                    else if (isKeyFlat(key.id, 8) && arr[index] === 'D#') return 'G'
                    else if (isKeyFlat(key.id, 7) && arr[index] === 'A#') return 'D'
                    //Change 'A#' and 'D#' up 2 or 3 notes
                    else if (isKeySharp(key.id, 2) && allNotes[allNotesIdx][1] && allNotes[allNotesIdx + 2].length === 1) return arr[index + 3]
                    else if (allNotes[allNotesIdx][1] && allNotes[allNotesIdx + 2].length === 1) return arr[index + 2]
                    else return arr[index + 3].length === 1 ? arr[index + 3] : arr[index + 4]
                }
            }
        }

        //Prevent note from going above top ledger line
        if (noteToUpdate.row !== 1) {
            if (noteToUpdate.transform === 'no-translate') {
                if (allNotes[allNotesIdx + 2])
                    noteToUpdate = { ...noteToUpdate, ...constantChanges, letter: changeNaturalLetter(allNotes, allNotesIdx, noteToUpdate.transform) }
                else {
                    if (noteToUpdate.accidental === FLAT_NOTE) {
                        //'G#' to 'B/A#'
                        let letter = allNotes[2]
                        if (isKeyFlat(key.id, 7) && allNotes[allNotesIdx] === 'G#') letter = 'A#'
                        noteToUpdate = { ...noteToUpdate, ...constantChanges, letter: letter }
                    } else {
                        //'G/G#' to 'A/A#' or 'G#' to 'A' (if Sharp)
                        let letter = 'A'
                        if (isKeyFlat(key.id, 9) && allNotes[allNotesIdx] === 'G#') letter = 'A#'
                        else if (isKeyFlat(key.id, 9) && allNotes[allNotesIdx] === 'G') letter = 'G#'
                        else if (isKeySharp(key.id, 5) && (allNotes[allNotesIdx] === 'G#' || (allNotes[allNotesIdx] === 'G' && noteToUpdate.accidental === NATURAL_NOTE))) letter = 'A#'
                        noteToUpdate = { ...noteToUpdate, ...constantChanges, letter: letter }
                    }
                }
            } else if (noteToUpdate.transform === 'move-down') {
                if (allNotes[allNotesIdx + 4])
                    noteToUpdate = { ...noteToUpdate, ...constantChanges, letter: changeNaturalLetter(allNotes, allNotesIdx, noteToUpdate.transform) }
                else {
                    if (noteToUpdate.accidental === SHARP_NOTE) {
                        //'G#' to 'B' and 'F#' to 'A'
                        let letter = allNotes[3 - (allNotes.length - allNotesIdx)]
                        if (isKeyFlat(key.id, 9) && allNotes[allNotesIdx] === 'F#') letter = 'G#'
                        else if (isKeyFlat(key.id, 7) && allNotes[allNotesIdx] === 'G#') letter = 'A#'
                        noteToUpdate = { ...noteToUpdate, ...constantChanges, letter: letter }
                    } else if (noteToUpdate.accidental === FLAT_NOTE) {
                        //'F#' to 'B' and 'G#' to 'C'
                        let letter
                        if (isKeyFlat(key.id, 7) && allNotes[allNotesIdx] === 'F#') letter = 'A#'
                        else if (isKeySharp(key.id, 2) && allNotes[allNotesIdx] === 'G#') letter = 'C#'
                        else if (noteToUpdate.letter === allNotes[9]) letter = allNotes[(allNotes.length - allNotesIdx - 1) % 4]
                        else if (noteToUpdate.letter === allNotes[11]) letter = allNotes[4 - (allNotes.length - allNotesIdx)]
                        noteToUpdate = { ...noteToUpdate, ...constantChanges, letter: letter }
                    } else {
                        //'G' to 'B' and 'F' to 'A'
                        let letter = allNotes[4 - (allNotes.length - allNotesIdx)]

                        //'G#' to 'B' and 'F#' to 'A'
                        if (isKeyFlat(key.id, 9) && allNotes[allNotesIdx] === 'F') letter = 'G#'
                        else if (isKeyFlat(key.id, 7) && allNotes[allNotesIdx] === 'G') letter = 'A#'
                        else if (isKeySharp(key.id, 6) && allNotes[allNotesIdx] === 'F') letter = 'G#'
                        else if (isKeySharp(key.id, 5) && (allNotes[allNotesIdx] === 'F#' || (noteToUpdate.accidental === NATURAL_NOTE && allNotes[allNotesIdx] === 'F'))) letter = 'A#'
                        else if (isKeySharp(key.id, 3) && allNotes[allNotesIdx] === 'G#') letter = allNotes[3 - (allNotes.length - allNotesIdx)]
                        else if (isKeySharp(key.id, 1) && allNotes[allNotesIdx] === 'F#') letter = allNotes[3 - (allNotes.length - allNotesIdx)]

                        noteToUpdate = { ...noteToUpdate, ...constantChanges, letter: letter }
                    }
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
        const constantChanges = { accidental: null, transform: 'move-down' }

        const changeNaturalLetter = (arr, index, transform) => {
            if (transform === 'no-translate') {
                if (noteToUpdate.accidental === SHARP_NOTE) {
                    if (isKeySharp(key.id, 2) && arr[index] === 'D#') return 'C#'
                    else if (isKeySharp(key.id, 1) && arr[index] === 'G#') return 'F#'
                    else if (isKeyFlat(key.id, 8) && arr[index] === 'F#') return 'D#'
                    else if (isKeyFlat(key.id, 7) && arr[index] === 'C#') return 'A#'
                    else return arr[index - 2].length === 1 ? arr[index - 2] : arr[index - 3]
                }
                else {
                    if (isKeySharp(key.id, 6) && arr[index] === 'F') return 'D#'
                    else if (isKeySharp(key.id, 6) && arr[index] === 'F#') return 'F'
                    else if (isKeySharp(key.id, 5) && arr[index] === 'B') return 'A#'
                    else if (isKeySharp(key.id, 4) && arr[index] === 'D#') return 'C#'
                    else if (isKeySharp(key.id, 4) && arr[index] === 'E') return 'D#'
                    else if (isKeySharp(key.id, 3) && arr[index] === 'G#') return 'F#'
                    else if (isKeySharp(key.id, 2) && arr[index] === 'C#') return 'B'
                    else if (isKeySharp(key.id, 2) && arr[index] === 'D') return 'C#'
                    else if (isKeySharp(key.id, 1) && arr[index] === 'F#') return 'E'
                    else if (isKeySharp(key.id, 1) && arr[index] === 'G') return 'F#'
                    else if (isKeyFlat(key.id, 11) && arr[index] === 'G#') return 'F#'
                    else if (isKeyFlat(key.id, 10) && (arr[index] === 'D#' || (noteToUpdate.accidental === NATURAL_NOTE && arr[index] === 'E'))) return 'C#'
                    else if (isKeyFlat(key.id, 9) && arr[index] === 'G#') return 'G'
                    else if (isKeyFlat(key.id, 9) && arr[index] === 'B' && noteToUpdate.accidental === NATURAL_NOTE) return 'G#'
                    else if (isKeyFlat(key.id, 8) && arr[index] === 'D#') return 'D'
                    else if (isKeyFlat(key.id, 8) && (arr[index] === 'F' || (noteToUpdate.accidental === FLAT_NOTE && arr[index] === 'E'))) return 'D#'
                    else if (isKeyFlat(key.id, 7) && arr[index] === 'C') return 'A#'
                    else return arr[index - 1].length === 1 ? arr[index - 1] : arr[index - 2]
                }
            } else if (transform === 'move-up') {
                if (noteToUpdate.accidental === SHARP_NOTE) {
                    if (isKeyFlat(key.id, 10) && arr[index] === 'F#') return 'C#'
                    if (isKeyFlat(key.id, 9) && arr[index] === 'C#') return 'G#'
                    if (isKeyFlat(key.id, 8) && arr[index] === 'G#') return 'D#'
                    if (isKeyFlat(key.id, 7) && arr[index] === 'D#') return 'A#'
                    return allNotes[allNotesIdx - 4].length !== 1 ? allNotes[allNotesIdx - 3] : allNotes[allNotesIdx - 4]
                }
                else {
                    if (isKeySharp(key.id, 6) && arr[index] === 'F') return 'C#'
                    else if (isKeySharp(key.id, 6) && (arr[index] === 'G#' || (arr[index] === 'G' && noteToUpdate.accidental === NATURAL_NOTE))) return 'F'
                    else if (isKeySharp(key.id, 5) && (arr[index] === 'C#' || (arr[index] === 'C' && noteToUpdate.accidental === NATURAL_NOTE))) return 'A#'
                    else if (isKeySharp(key.id, 4) && arr[index] === 'D#') return 'B'
                    else if (isKeySharp(key.id, 4) && (arr[index] === 'F#' || (arr[index] === 'F' && noteToUpdate.accidental === NATURAL_NOTE))) return 'D#'
                    else if (isKeySharp(key.id, 3) && arr[index] === 'G#') return 'E'
                    else if (isKeySharp(key.id, 2) && arr[index] === 'C#') return 'A'
                    else if (isKeySharp(key.id, 2) && (arr[index] === 'E' || (arr[index] === 'D#' && noteToUpdate.accidental === FLAT_NOTE))) return 'C#'
                    else if (isKeySharp(key.id, 1) && arr[index] === 'F#') return 'D'
                    else if (isKeySharp(key.id, 1) && arr[index] === 'G#') return 'F#'
                    else if (isKeyFlat(key.id, 11) && arr[index] === 'F#') return 'D#'
                    else if (isKeyFlat(key.id, 10) && arr[index] === 'C#') return 'A#'
                    else if (isKeyFlat(key.id, 10) && (arr[index] === 'F' || (noteToUpdate.accidental === FLAT_NOTE && arr[index] === 'E'))) return 'C#'
                    else if (isKeyFlat(key.id, 9) && arr[index] === 'C') return 'G#'
                    else if (isKeyFlat(key.id, 9) && arr[index] === 'G#') return 'F'
                    else if (isKeyFlat(key.id, 8) && (arr[index] === 'G' || (noteToUpdate.accidental === FLAT_NOTE && arr[index] === 'F#'))) return 'D#'
                    else if (isKeyFlat(key.id, 7) && (arr[index] === 'D' || (noteToUpdate.accidental === FLAT_NOTE && arr[index] === 'C#'))) return 'A#'
                    //Change 'C#' and 'F#' down 2 notes
                    else if (allNotes[allNotesIdx][1] && allNotes[allNotesIdx - 2].length === 1) return arr[index - 2]
                    else return arr[index - 3].length === 1 ? arr[index - 3] : arr[index - 4]
                }
            }
        }

        //Prevent note from going below bottom ledger line
        if (noteToUpdate.row !== 12) {
            if (noteToUpdate.transform === 'no-translate') {
                if (allNotes[allNotesIdx - 2])
                    noteToUpdate = { ...noteToUpdate, ...constantChanges, letter: changeNaturalLetter(allNotes, allNotesIdx, noteToUpdate.transform) }
                else {
                    if (noteToUpdate.accidental === FLAT_NOTE) {
                        //'A#' to 'A'
                        noteToUpdate = { ...noteToUpdate, ...constantChanges, letter: allNotes[0] }
                    } else {
                        //'A' to 'G/G#' or 'A#' to 'G/G#' (if Sharp)
                        let letter = 'G'
                        if (isKeyFlat(key.id, 11) && allNotes[allNotesIdx] === 'A' && noteToUpdate.accidental === NATURAL_NOTE) letter = 'F#'
                        else if (isKeyFlat(key.id, 9) && allNotes[allNotesIdx] === 'A#') letter = 'G#'
                        else if (isKeyFlat(key.id, 7) && allNotes[allNotesIdx] === 'A#') letter = 'A'
                        else if (isKeySharp(key.id, 3) && (allNotes[allNotesIdx] === 'A' || allNotes[allNotesIdx] === 'A#')) letter = 'G#'
                        noteToUpdate = { ...noteToUpdate, ...constantChanges, letter: letter }
                    }
                }
            } else if (noteToUpdate.transform === 'move-up') {
                if (allNotes[allNotesIdx - 3])
                    noteToUpdate = { ...noteToUpdate, ...constantChanges, letter: changeNaturalLetter(allNotes, allNotesIdx, noteToUpdate.transform) }
                else {
                    if (noteToUpdate.accidental === SHARP_NOTE) {
                        //'A#' to 'F'
                        let letter = allNotes[8]
                        if (isKeySharp(key.id, 1) && allNotes[allNotesIdx] === 'A#') letter = 'F#'
                        noteToUpdate = noteToUpdate = { ...noteToUpdate, ...constantChanges, letter: letter }
                    } else if (noteToUpdate.accidental === FLAT_NOTE) {
                        //'A#' to 'G/G#'
                        let letter = allNotes[10]
                        if (isKeySharp(key.id, 3) && allNotes[allNotesIdx] === 'A#') letter = 'G#'
                        noteToUpdate = { ...noteToUpdate, ...constantChanges, letter: letter }
                    } else {
                        //'A' to 'F/F#' and 'B' to 'G'
                        let letter = allNotes[((allNotes.length - allNotesIdx) % 4) + 8]
                        if (isKeyFlat(key.id, 11) && (allNotes[allNotesIdx] === 'A#' || (noteToUpdate.accidental === NATURAL_NOTE && allNotes[allNotesIdx] === 'B'))) letter = 'F#'
                        else if (isKeyFlat(key.id, 7) && allNotes[allNotesIdx] === 'A#') letter = 'G'
                        else if (isKeySharp(key.id, 5) && allNotes[allNotesIdx] === 'A#') letter = 'F#'
                        else if (isKeySharp(key.id, 3) && allNotes[allNotesIdx] === 'B') letter = 'G#'
                        else if (isKeySharp(key.id, 1) && allNotes[allNotesIdx] === 'A') letter = 'F#'
                        noteToUpdate = { ...noteToUpdate, ...constantChanges, letter: letter }
                    }
                }
            }
        }

        copy[editColumn][editIndex(copy[editColumn])] = noteToUpdate
        store.dispatch(updateNote(copy))
    }
}

export const moveNoteBetween = (notes, key, editColumn) => {
    if (!isRestNote(notes[editColumn][editIndex(notes[editColumn])], null, notes)) {
        //Change transform and letter of note
        const copy = [...notes]
        const allNotesIdx = findLetterIdx(copy, editColumn)
        let noteToUpdate = copy[editColumn][editIndex(copy[editColumn])]
        const constantChanges = { accidental: null, transform: 'no-translate' }

        const changeNaturalLetter = (arr, index, transform) => {
            if (transform === 'move-up') {
                if (noteToUpdate.accidental === SHARP_NOTE) {
                    if (isKeySharp(key.id, 2) && arr[index] === 'D#') return 'C#'
                    else if (isKeySharp(key.id, 1) && arr[index] === 'G#') return 'F#'
                    else if (isKeyFlat(key.id, 8) && arr[index] === 'F#') return 'D#'
                    else if (isKeyFlat(key.id, 7) && arr[index] === 'C#') return 'A#'
                    else if (arr[index - 2].length !== 1) return arr[index - 3]
                    else return arr[index - 1].length === 1 ? arr[index - 2] : arr[index - 1]
                } else {
                    if (isKeySharp(key.id, 6) && arr[index] === 'F') return 'D#'
                    else if (isKeySharp(key.id, 6) && arr[index] === 'F#') return 'F'
                    else if (isKeySharp(key.id, 5) && arr[index] === 'B') return 'A#'
                    else if (isKeySharp(key.id, 4) && arr[index] === 'D#') return 'C#'
                    else if (isKeySharp(key.id, 4) && arr[index] === 'E') return 'D#'
                    else if (isKeySharp(key.id, 3) && arr[index] === 'G#') return 'F#'
                    else if (isKeySharp(key.id, 2) && arr[index] === 'C#') return 'B'
                    else if (isKeySharp(key.id, 2) && arr[index] === 'D') return 'C#'
                    else if (isKeySharp(key.id, 1) && arr[index] === 'F#') return 'E'
                    else if (isKeySharp(key.id, 1) && arr[index] === 'G') return 'F#'
                    else if (isKeyFlat(key.id, 11) && arr[index] === 'G#') return 'F#'
                    else if (isKeyFlat(key.id, 10) && (arr[index] === 'D#' || (noteToUpdate.accidental === NATURAL_NOTE && arr[index] === 'E'))) return 'C#'
                    else if (isKeyFlat(key.id, 9) && arr[index] === 'B' && noteToUpdate.accidental === NATURAL_NOTE) return 'G#'
                    else if (isKeyFlat(key.id, 8) && (arr[index] === 'F' || (noteToUpdate.accidental === FLAT_NOTE && arr[index] === 'E'))) return 'D#'
                    else if (isKeyFlat(key.id, 7) && arr[index] === 'C') return 'A#'
                    else return arr[index - 1].length === 1 ? arr[index - 1] : arr[index - 2]
                }
            } else if (transform === 'move-down') {
                if (noteToUpdate.accidental === FLAT_NOTE) {
                    if (isKeySharp(key.id, 2) && arr[index] === 'A#') return 'C#'
                    else if (isKeySharp(key.id, 1) && arr[index] === 'D#') return 'F#'
                    else if (isKeyFlat(key.id, 11) && arr[index] === 'E') return 'F#'
                    else if (isKeyFlat(key.id, 9) && arr[index] === 'F#') return 'G#'
                    else if (isKeyFlat(key.id, 8) && arr[index] === 'C#') return 'D#'
                    else if (!arr[index + 3]) return 'A' //F# to A
                    else return arr[index + 2].length === 1 ? arr[index + 2] : arr[index + 3]
                } else {
                    if (isKeySharp(key.id, 6) && arr[index] === 'F') return 'F#'
                    else if (isKeySharp(key.id, 6) && (arr[index] === 'D#' || (arr[index] === 'D' && noteToUpdate.accidental === NATURAL_NOTE))) return 'F'
                    else if (isKeySharp(key.id, 4) && arr[index] === 'D#') return 'E'
                    else if (isKeySharp(key.id, 4) && (arr[index] === 'C#' || (arr[index] === 'C' && noteToUpdate.accidental === NATURAL_NOTE))) return 'D#'
                    else if (isKeySharp(key.id, 3) && (arr[index] === 'F#' || (arr[index] === 'F' && noteToUpdate.accidental === NATURAL_NOTE))) return 'G#'
                    else if (isKeySharp(key.id, 2) && arr[index] === 'B') return 'C#'
                    else if (isKeySharp(key.id, 1) && arr[index] === 'F#') return 'G'
                    else if (isKeySharp(key.id, 1) && arr[index] === 'E') return 'F#'
                    else if (isKeyFlat(key.id, 11) && arr[index] === 'F#') return 'G#'
                    else if (isKeyFlat(key.id, 11) && arr[index] === 'F') return 'F#'
                    else if (isKeyFlat(key.id, 10) && arr[index] === 'C#') return 'D#'
                    else if (isKeyFlat(key.id, 10) && arr[index] === 'C') return 'C#'
                    else if (isKeyFlat(key.id, 8) && arr[index] === 'D#') return 'F'
                    else if (isKeyFlat(key.id, 8) && arr[index] === 'D') return 'D#'
                    else if (isKeyFlat(key.id, 7) && arr[index] === 'A#') return 'C'
                    else if (isKeyFlat(key.id, 7) && arr[index] === 'A') return 'A#'
                    else return arr[index + 1].length === 1 ? arr[index + 1] : arr[index + 2]
                }
            }
        }

        if (noteToUpdate.transform === 'move-up') {
            if (allNotes[allNotesIdx - 2])
                noteToUpdate = { ...noteToUpdate, ...constantChanges, letter: changeNaturalLetter(allNotes, allNotesIdx, noteToUpdate.transform) }
            else {
                if (noteToUpdate.accidental === FLAT_NOTE) {
                    //'A#' to 'A'
                    noteToUpdate = { ...noteToUpdate, ...constantChanges, letter: allNotes[0] }
                } else {
                    //'A' to 'G' and 'A#' to 'G' (if Sharp)
                    let letter = allNotes[10]
                    if (isKeyFlat(key.id, 11) && allNotes[allNotesIdx] === 'A') letter = 'F#'
                    else if (isKeyFlat(key.id, 9) && allNotes[allNotesIdx] === 'A#') letter = 'G#'
                    else if (isKeyFlat(key.id, 7) && allNotes[allNotesIdx] === 'A#') letter = 'A'
                    else if (isKeySharp(key.id, 3) && (allNotes[allNotesIdx] === 'A' || allNotes[allNotesIdx] === 'A#')) letter = 'G#'
                    noteToUpdate = { ...noteToUpdate, ...constantChanges, letter: letter }
                }
            }
        } else if (noteToUpdate.transform === 'move-down') {
            if (allNotes[allNotesIdx + 2])
                noteToUpdate = { ...noteToUpdate, ...constantChanges, letter: changeNaturalLetter(allNotes, allNotesIdx, noteToUpdate.transform) }
            else {
                if (noteToUpdate.accidental === FLAT_NOTE) {
                    //'G#' to 'B'
                    let letter = allNotes[2]
                    if (isKeyFlat(key.id, 7) && allNotes[allNotesIdx] === 'G#') letter = 'A#'
                    noteToUpdate = { ...noteToUpdate, ...constantChanges, letter: letter }
                } else {
                    //'G' to 'A' and 'G#' to 'A' (if Sharp)
                    let letter = 'A'
                    //Fix
                    if (isKeyFlat(key.id, 9) && (allNotes[allNotesIdx] === 'G' || (noteToUpdate.accidental === SHARP_NOTE && allNotes[allNotesIdx] === 'G#'))) letter = 'G#'
                    else if (isKeyFlat(key.id, 9) && allNotes[allNotesIdx] === 'G#') letter = 'A#'
                    else if (isKeySharp(key.id, 5) && (allNotes[allNotesIdx] === 'G#' || allNotes[allNotesIdx] === 'G')) letter = 'A#'
                    noteToUpdate = { ...noteToUpdate, ...constantChanges, letter: letter }
                }
            }
        }

        copy[editColumn][editIndex(copy[editColumn])] = noteToUpdate
        store.dispatch(updateNote(copy))
    }
}