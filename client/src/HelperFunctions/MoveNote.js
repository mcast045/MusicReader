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


// export const moveNoteUp = (notes, key, editColumn) => {
//     if (!isRestNote(notes[editColumn][editIndex(notes[editColumn])], null, notes)) {
//         //Change transform and letter of note
//         let copy = [...notes]
//         let idx = editColumn
//         let allNotesIdx = findLetterIdx(notes, idx)
//         const noteToUpdate = notes[idx][editIndex(notes[editColumn])]

//         const changeNaturalLetter = (arr, index, transform) => {
//             if (transform === 'no-translate') {
//                 if (noteToUpdate.accidental === FLAT_NOTE) {
//                     if (key.id > 8 && arr[index] === 'C#')
//                         return 'D#'
//                     else if (key.id > 9 && arr[index] === 'F#')
//                         return 'G#'

//                     else if (arr[index] === 'F#')
//                         return 'A'
//                     else if ((key.id > 1 && key.id < 8) && arr[index] === 'D#')
//                         return 'F#'
//                     else if ((key.id > 2 && key.id < 8) && arr[index] === 'A#')
//                         return 'C#'
//                     else
//                         return arr[index + 2].length === 1 ? arr[index + 2] : arr[index + 3]
//                 }
//                 //Sharp Key-Signatures
//                 if ((key.id > 1 && key.id < 8) && key.id < 7 && arr[index + 1] === 'F')
//                     return 'F#'
//                 else if (key.id === 7) {
//                     if (arr[index + 1] === 'F#') return 'F#'
//                     else if (arr[index + 1] === 'E') return 'F'
//                 }
//                 else if ((key.id > 2 && key.id < 8) && arr[index + 1] === 'C')
//                     return 'C#'
//                 else if ((key.id > 3 && key.id < 8) && arr[index + 1] === 'G')
//                     return 'G#'
//                 else if ((key.id > 4 && key.id < 8) && arr[index + 1] === 'D')
//                     return 'D#'

//                 //Flat Key Signatures
//                 else if (key.id > 7 && arr[index] === 'A')
//                     return 'A#'
//                 else if (key.id > 7 && arr[index] === 'A#')
//                     return 'C'
//                 else if (key.id > 8 && arr[index] === 'D#')
//                     return 'F'
//                 else if ((key.id > 8 && arr[index] === 'D') || (key.id > 10 && arr[index] === 'C#'))
//                     return 'D#'
//                 else if (key.id > 10 && arr[index] === 'C')
//                     return 'C#'
//                 else if (key.id > 11 && arr[index] === 'F')
//                     return 'F#'
//                 else if (key.id > 11 && arr[index] === 'F#')
//                     return 'G#'

//                 else
//                     return arr[index + 1].length === 1 ? arr[index + 1] : arr[index + 2]
//             }

//             else if (transform === 'move-down') {
//                 if (noteToUpdate.accidental === FLAT_NOTE) {
//                     if ((key.id > 1 && key.id < 8) && arr[index] === 'C#')
//                         return 'F#'
//                     else if ((key.id > 3 && key.id < 8) && arr[index] === 'D#')
//                         return 'G#'
//                     else if ((key.id > 4 && key.id < 8) && arr[index] === 'A#')
//                         return 'D#'
//                     return allNotes[allNotesIdx + 4].length !== 1 ? allNotes[allNotesIdx + 3] : allNotes[allNotesIdx + 4]
//                 }

//                 else if (noteToUpdate.accidental === SHARP_NOTE) {
//                     if (key.id > 7) {
//                         if (arr[index] === 'D#')
//                             return 'F'
//                         else if (key.id > 8 && arr[index] === 'C#')
//                             return 'D#'
//                     }
//                 }

//                 if (((key.id > 1 && key.id < 8) && arr[index + 3] === 'F') || ((key.id > 4 && key.id < 8) && arr[index + 2] === 'F'))
//                     return 'F#'
//                 else if (((key.id > 2 && key.id < 8) && arr[index + 3] === 'C') || ((key.id > 5 && key.id < 8) && arr[index + 2] === 'C'))
//                     return 'C#'
//                 else if ((key.id > 3 && key.id < 8) && arr[index + 3] === 'G')
//                     return 'G#'
//                 else if ((key.id > 4 && key.id < 8) && arr[index + 3] === 'D')
//                     return 'D#'
//                 else if (key.id === 7 && arr[index + 3] === 'E')
//                     return 'F'

//                 //Flat Key-Signature
//                 else if (key.id > 8 && arr[index] === 'C')
//                     return 'D#'
//                 else if (key.id > 10 && arr[index] === 'C#')
//                     return 'F'
//                 else if (key.id > 10 && arr[index] === 'A#')
//                     return 'C#'
//                 else if (key.id > 11 && arr[index] === 'D#')
//                     return 'F#'
//                 else if (key.id > 10 && arr[index] === 'D#')
//                     return 'G'

//                 else {
//                     if ((key.id === 1 && noteToUpdate.letter === 'D#') || ((key.id === 1 || key.id === 2) && noteToUpdate.letter === 'A#'))
//                         return arr[index + 2]

//                     else if (((key.id > 1 && key.id < 8) && noteToUpdate.letter === 'D#') || ((key.id > 2 && key.id < 8) && noteToUpdate.letter === 'A#'))
//                         return arr[index + 3]

//                     return arr[index + 3].length === 1 ? arr[index + 3] : arr[index + 4]
//                 }
//             }
//         }

//         //Prevent note from going above top ledger line
//         if (noteToUpdate.row !== 1) {
//             if (noteToUpdate.transform === 'no-translate') {
//                 if (allNotes[allNotesIdx + 2]) {
//                     //Changing Natural notes
//                     if (copy[idx][editIndex(notes[editColumn])].accidental === null)
//                         copy[idx][editIndex(notes[editColumn])] = { ...copy[idx][editIndex(notes[editColumn])], accidental: null, transform: 'move-up', letter: changeNaturalLetter(allNotes, allNotesIdx, copy[idx][editIndex(notes[editColumn])].transform) }
//                     //Changing Sharp notes
//                     else if (copy[idx][editIndex(notes[editColumn])].accidental === SHARP_NOTE)
//                         copy[idx][editIndex(notes[editColumn])] = { ...copy[idx][editIndex(notes[editColumn])], accidental: null, transform: 'move-up', letter: changeNaturalLetter(allNotes, allNotesIdx, copy[idx][editIndex(notes[editColumn])].transform) }
//                     //Changing Flat notes
//                     else if (copy[idx][editIndex(notes[editColumn])].accidental === FLAT_NOTE)
//                         copy[idx][editIndex(notes[editColumn])] = { ...copy[idx][editIndex(notes[editColumn])], accidental: null, transform: 'move-up', letter: changeNaturalLetter(allNotes, allNotesIdx, copy[idx][editIndex(notes[editColumn])].transform) }
//                 }
//                 //Changing notes 'G' to 'A'
//                 else {
//                     if (copy[idx][editIndex(notes[editColumn])].accidental === null) {
//                         if ((key.id > 5 && key.id < 8) || (key.id > 9 && copy[idx][editIndex(notes[editColumn])].letter !== 'G'))
//                             copy[idx][editIndex(notes[editColumn])] = { ...copy[idx][editIndex(notes[editColumn])], transform: 'move-up', letter: allNotes[1] }
//                         else if ((key.id > 3 && key.id < 8))
//                             copy[idx][editIndex(notes[editColumn])] = { ...copy[idx][editIndex(notes[editColumn])], transform: 'move-up', letter: allNotes[0] }
//                         else if (key.id > 9 && copy[idx][editIndex(notes[editColumn])].letter === 'G')
//                             copy[idx][editIndex(notes[editColumn])] = { ...copy[idx][editIndex(notes[editColumn])], transform: 'move-up', letter: allNotes[11] }
//                         else
//                             copy[idx][editIndex(notes[editColumn])] = { ...copy[idx][editIndex(notes[editColumn])], transform: 'move-up', letter: allNotes[allNotes.length - allNotesIdx - 2] }
//                     }
//                     //Changing Sharp notes - 'G#' to 'A'
//                     else if (copy[idx][editIndex(notes[editColumn])].accidental === SHARP_NOTE)
//                         copy[idx][editIndex(notes[editColumn])] = { ...copy[idx][editIndex(notes[editColumn])], accidental: null, transform: 'move-up', letter: allNotes[0] }
//                     //Changing Sharp notes - 'G#' to 'A#'
//                     else if (copy[idx][editIndex(notes[editColumn])].accidental === FLAT_NOTE) {
//                         //'G#' to 'B'
//                         if ((key.id > 0 && key.id < 8) && copy[idx][editIndex(notes[editColumn])].letter === allNotes[11])
//                             copy[idx][editIndex(notes[editColumn])] = { ...copy[idx][editIndex(notes[editColumn])], accidental: null, transform: 'move-up', letter: allNotes[2] }
//                         //'G#' to 'A#'
//                         else if (key.id > 7 && copy[idx][editIndex(notes[editColumn])].letter === allNotes[11])
//                             copy[idx][editIndex(notes[editColumn])] = { ...copy[idx][editIndex(notes[editColumn])], accidental: null, transform: 'move-up', letter: allNotes[1] }
//                     }
//                 }
//             }
//             else if (noteToUpdate.transform === 'move-down') {
//                 if (allNotes[allNotesIdx + 4]) {
//                     //Changing Natural notes
//                     if (copy[idx][editIndex(notes[editColumn])].accidental === null)
//                         copy[idx][editIndex(notes[editColumn])] = { ...copy[idx][editIndex(notes[editColumn])], transform: 'move-up', letter: changeNaturalLetter(allNotes, allNotesIdx, copy[idx][editIndex(notes[editColumn])].transform) }
//                     //Changing Sharp notes
//                     else if (copy[idx][editIndex(notes[editColumn])].accidental === SHARP_NOTE)
//                         copy[idx][editIndex(notes[editColumn])] = { ...copy[idx][editIndex(notes[editColumn])], accidental: null, transform: 'move-up', letter: changeNaturalLetter(allNotes, allNotesIdx, copy[idx][editIndex(notes[editColumn])].transform) }
//                     //Changing Flat notes
//                     else if (copy[idx][editIndex(notes[editColumn])].accidental === FLAT_NOTE)
//                         copy[idx][editIndex(notes[editColumn])] = { ...copy[idx][editIndex(notes[editColumn])], accidental: null, transform: 'move-up', letter: changeNaturalLetter(allNotes, allNotesIdx, copy[idx][editIndex(notes[editColumn])].transform) }
//                 }
//                 else {
//                     if (copy[idx][editIndex(notes[editColumn])].accidental === null) {
//                         if (key.id === 7 && copy[idx][editIndex(notes[editColumn])].letter === allNotes[8])
//                             copy[idx][editIndex(notes[editColumn])] = { ...copy[idx][editIndex(notes[editColumn])], transform: 'move-up', letter: allNotes[11] }
//                         else if ((key.id > 5 && key.id < 8) && copy[idx][editIndex(notes[editColumn])].letter === allNotes[9])
//                             copy[idx][editIndex(notes[editColumn])] = { ...copy[idx][editIndex(notes[editColumn])], transform: 'move-up', letter: allNotes[1] }
//                         //If A-Major key then show letter 'B'
//                         else if ((key.id > 3 && key.id < 8) && copy[idx][editIndex(notes[editColumn])].letter === allNotes[11])
//                             copy[idx][editIndex(notes[editColumn])] = { ...copy[idx][editIndex(notes[editColumn])], transform: 'move-up', letter: allNotes[2] }
//                         //'G' to 'B'
//                         else if ((key.id > 0 && key.id < 8) && copy[idx][editIndex(notes[editColumn])].letter === allNotes[10])
//                             copy[idx][editIndex(notes[editColumn])] = { ...copy[idx][editIndex(notes[editColumn])], transform: 'move-up', letter: allNotes[2] }
//                         //'F' to 'A'
//                         else if ((key.id > 0 && key.id < 8) && copy[idx][editIndex(notes[editColumn])].letter === allNotes[8])
//                             copy[idx][editIndex(notes[editColumn])] = { ...copy[idx][editIndex(notes[editColumn])], transform: 'move-up', letter: allNotes[0] }
//                         //'F#' to 'A'
//                         else if ((key.id > 0 && key.id < 8) && copy[idx][editIndex(notes[editColumn])].letter === allNotes[9])
//                             copy[idx][editIndex(notes[editColumn])] = { ...copy[idx][editIndex(notes[editColumn])], transform: 'move-up', letter: allNotes[0] }
//                         //If Flat Key-Signature - 'F' to 'G#'
//                         else if (key.id > 11 && copy[idx][editIndex(notes[editColumn])].letter === allNotes[9])
//                             copy[idx][editIndex(notes[editColumn])] = { ...copy[idx][editIndex(notes[editColumn])], transform: 'move-up', letter: allNotes[1] }
//                         //If Flat Key-Signature - 'G#' to 'C'
//                         else if (key.id > 9 && copy[idx][editIndex(notes[editColumn])].letter === allNotes[11])
//                             copy[idx][editIndex(notes[editColumn])] = { ...copy[idx][editIndex(notes[editColumn])], transform: 'move-up', letter: allNotes[3] }
//                         //If Flat Key-Signature - 'F' to 'G#'
//                         else if (key.id > 9 && copy[idx][editIndex(notes[editColumn])].letter === allNotes[8])
//                             copy[idx][editIndex(notes[editColumn])] = { ...copy[idx][editIndex(notes[editColumn])], transform: 'move-up', letter: allNotes[11] }
//                         //If Flat Key-Signature - 'G' to 'A#'
//                         else if (key.id > 7 && copy[idx][editIndex(notes[editColumn])].letter === allNotes[10])
//                             copy[idx][editIndex(notes[editColumn])] = { ...copy[idx][editIndex(notes[editColumn])], transform: 'move-up', letter: allNotes[1] }
//                         //If Flat Key-Signature - 'F' to 'A'
//                         else if (key.id > 7 && copy[idx][editIndex(notes[editColumn])].letter === allNotes[8])
//                             copy[idx][editIndex(notes[editColumn])] = { ...copy[idx][editIndex(notes[editColumn])], transform: 'move-up', letter: allNotes[0] }
//                     }


//                     else if (copy[idx][editIndex(notes[editColumn])].accidental === SHARP_NOTE) {
//                         //'G#' to 'A#' 
//                         if (key.id > 7 && copy[idx][editIndex(notes[editColumn])].letter === allNotes[11])
//                             copy[idx][editIndex(notes[editColumn])] = { ...copy[idx][editIndex(notes[editColumn])], accidental: null, transform: 'move-up', letter: allNotes[1] }
//                         //'G#' to 'B#/C' 
//                         else if (copy[idx][editIndex(notes[editColumn])].letter === allNotes[11])
//                             copy[idx][editIndex(notes[editColumn])] = { ...copy[idx][editIndex(notes[editColumn])], accidental: null, transform: 'move-up', letter: allNotes[2] }
//                         //'F#' to 'A'
//                         else if (key.id > 9 && copy[idx][editIndex(notes[editColumn])].letter === allNotes[9])
//                             copy[idx][editIndex(notes[editColumn])] = { ...copy[idx][editIndex(notes[editColumn])], accidental: null, transform: 'move-up', letter: allNotes[11] }
//                         //'F#' to 'A'
//                         else if (copy[idx][editIndex(notes[editColumn])].letter === allNotes[9])
//                             copy[idx][editIndex(notes[editColumn])] = { ...copy[idx][editIndex(notes[editColumn])], accidental: null, transform: 'move-up', letter: allNotes[0] }
//                         //'F' to 'G#'
//                         else if (copy[idx][editIndex(notes[editColumn])].letter === allNotes[8])
//                             copy[idx][editIndex(notes[editColumn])] = { ...copy[idx][editIndex(notes[editColumn])], transform: 'move-up', letter: allNotes[11] }
//                     }


//                     else if (copy[idx][editIndex(notes[editColumn])].accidental === FLAT_NOTE) {
//                         //'F#' to 'B' 
//                         if (key.id > 7 && copy[idx][editIndex(notes[editColumn])].letter === allNotes[9])
//                             copy[idx][editIndex(notes[editColumn])] = { ...copy[idx][editIndex(notes[editColumn])], accidental: null, transform: 'move-up', letter: allNotes[1] }
//                         //'F#' to 'B' 
//                         else if ((key.id > 0 && key.id < 8) && copy[idx][editIndex(notes[editColumn])].letter === allNotes[9])
//                             copy[idx][editIndex(notes[editColumn])] = { ...copy[idx][editIndex(notes[editColumn])], accidental: null, transform: 'move-up', letter: allNotes[2] }
//                         //'G#' to 'C'
//                         else if (copy[idx][editIndex(notes[editColumn])].letter === allNotes[11]) {
//                             (key.id > 2 && key.id < 8) ? copy[idx][editIndex(notes[editColumn])] = { ...copy[idx][editIndex(notes[editColumn])], accidental: null, transform: 'move-up', letter: allNotes[4] } : copy[idx][editIndex(notes[editColumn])] = { ...copy[idx][editIndex(notes[editColumn])], accidental: null, transform: 'move-up', letter: allNotes[3] }
//                         }
//                     }
//                 }
//             }
//         }
//         store.dispatch(updateNote(copy))
//     }
// }



// export const moveNoteDown = (notes, key, editColumn) => {
//     if (!isRestNote(notes[editColumn][editIndex(notes[editColumn])], null, notes)) {
//         //Change transform and letter of note
//         let copy = [...notes]
//         let idx = editColumn
//         let allNotesIdx = findLetterIdx(copy, idx)
//         const noteToUpdate = notes[idx][editIndex(notes[idx])]

//         const changeNaturalLetter = (arr, index, transform) => {
//             if (transform === 'no-translate') {
//                 if (noteToUpdate.accidental === FLAT_NOTE)
//                     return arr[index - 1].length === 1 ? arr[index - 1] : arr[index - 2]

//                 else if (noteToUpdate.accidental === SHARP_NOTE) {
//                     if (key.id > 8 && arr[index] === 'F#')
//                         return 'D#'
//                     else if (key.id > 7 && arr[index] === 'F#')
//                         return 'E'

//                     else if ((key.id > 0 && key.id < 8) && arr[index] === 'C#')
//                         return 'B'
//                     else if ((key.id > 0 && key.id < 8) && arr[index] === 'F#')
//                         return 'E'
//                     else if ((key.id > 1 && key.id < 8) && arr[index] === 'G#')
//                         return 'F#'
//                     else if ((key.id > 2 && key.id < 8) && arr[index] === 'D#')
//                         return 'C#'
//                     else
//                         return arr[index - 1].length !== 1 ? arr[index - 2] : arr[index - 3]
//                 }

//                 else if ((key.id > 0 && key.id < 8)) {
//                     if ((key.id > 1 && key.id < 8) && arr[index - 2] === 'F')
//                         return 'F#'
//                     else if ((key.id > 2 && key.id < 5 && arr[index - 2] === 'C') || ((key.id > 4 && key.id < 8) && arr[index - 3] === 'C'))
//                         return 'C#'
//                     else if ((key.id > 4 && key.id < 8) && arr[index - 2] === 'D')
//                         return 'D#'
//                     else if ((key.id > 5 && key.id < 8) && arr[index - 2] === 'A')
//                         return 'A#'
//                     else if (key.id === 7 && arr[index - 2] === 'E')
//                         return 'F'

//                     else {
//                         if (((key.id > 1 && key.id < 8) && noteToUpdate.letter === 'F#') ||
//                             ((key.id > 2 && key.id < 8) && (noteToUpdate.letter === 'C#')) ||
//                             ((key.id > 4 && key.id < 8) && (noteToUpdate.letter === 'D#')))
//                             index--
//                         else if (((key.id > 3 && key.id < 8) && (noteToUpdate.letter === 'G#')) || (key.id === 7 && (noteToUpdate.letter === 'F')))
//                             return arr[index - 2]
//                         if (noteToUpdate.accidental === SHARP_NOTE) {
//                             if ((key.id > 1 && key.id < 8) && noteToUpdate.letter === 'G#')
//                                 return arr[index - 2]
//                             else if (((key.id > 2 && key.id < 8) && noteToUpdate.letter === 'D#'))
//                                 return arr[index - 2]
//                             else
//                                 index--
//                         }
//                         return arr[index - 1].length === 1 ? arr[index - 1] : arr[index - 2]
//                     }
//                 }

//                 if (key.id > 7) {
//                     if (key.id > 7 && arr[index] === 'C')
//                         return 'A#'
//                     else if (key.id > 8 && arr[index] === 'F')
//                         return 'D#'
//                     else if (key.id > 10 && arr[index] === 'D#')
//                         return 'C#'
//                     else if (key.id > 11 && arr[index] === 'G#')
//                         return 'F#'
//                     else
//                         return arr[index - 1].length === 1 ? arr[index - 1] : arr[index - 2]
//                 }
//             }
//             else if (transform === 'move-up') {
//                 if (noteToUpdate.accidental === FLAT_NOTE) {
//                     if ((key.id > 1 && key.id < 8) && copy[idx][editIndex(notes[editColumn])].letter === 'G#')
//                         return 'F#'
//                     else if ((key.id > 2 && key.id < 8) && copy[idx][editIndex(notes[editColumn])].letter === 'D#')
//                         return 'C#'
//                     else if (key.id > 7 && copy[idx][editIndex(notes[editColumn])].letter === 'C#')
//                         return 'A#'
//                     else if (key.id > 8 && copy[idx][editIndex(notes[editColumn])].letter === 'F#')
//                         return 'D#'
//                     else if (copy[idx][editIndex(notes[editColumn])].letter === 'C#')
//                         return 'B'
//                     else if (copy[idx][editIndex(notes[editColumn])].letter === 'F#')
//                         return 'E'
//                     return allNotes[allNotesIdx - 4].length === 1 ? allNotes[allNotesIdx - 3] : allNotes[allNotesIdx - 4]
//                 }
//                 if (noteToUpdate.accidental === SHARP_NOTE) {
//                     if (key.id > 7) {
//                         if (arr[index] === 'D#')
//                             return 'A#'
//                         else if (key.id > 8 && arr[index] === 'G#')
//                             return 'D#'
//                         else if (key.id > 9 && arr[index] === 'C#')
//                             return 'G#'
//                         else if (key.id > 10 && arr[index] === 'F#')
//                             return 'C#'
//                     }
//                 }

//                 if ((key.id > 3 && key.id < 7) && arr[index - 3] === 'F')
//                     return 'E'
//                 else if ((key.id > 1 && key.id < 8) && arr[index - 4] === 'F')
//                     return 'F#'
//                 else if ((key.id > 2 && key.id < 8) && arr[index - 4] === 'C')
//                     return 'C#'
//                 else if ((key.id > 4 && key.id < 8) && arr[index - 4] === 'D')
//                     return 'D#'
//                 else if ((key.id > 4 && key.id < 8) && arr[index - 3] === 'C')
//                     return 'B'
//                 else if ((key.id > 5 && key.id < 8) && arr[index - 4] === 'A')
//                     return 'A#'
//                 else if (key.id === 7 && arr[index - 4] === 'E')
//                     return 'F'
//                 else if (key.id === 7 && arr[index - 3] === 'D')
//                     return 'C#'

//                 //Flat Key-Signature
//                 else if (key.id > 7 && arr[index] === 'D')
//                     return 'A#'
//                 else if (key.id > 8 && arr[index] === 'D#')
//                     return 'C'
//                 else if (key.id > 8 && arr[index] === 'G')
//                     return 'D#'
//                 else if (key.id > 9 && arr[index] === 'G#')
//                     return 'F'
//                 else if (key.id > 10 && arr[index] === 'F')
//                     return 'C#'
//                 else if (key.id > 10 && arr[index] === 'C#')
//                     return 'A#'
//                 else if (key.id > 11 && arr[index] === 'F#')
//                     return 'D#'

//                 else {
//                     if (noteToUpdate.letter === 'D#' || noteToUpdate.letter === 'G#')
//                         index--

//                     return arr[index - 3].length === 1 ? allNotes[index - 3] : allNotes[index - 4]
//                 }
//             }
//         }

//         //Prevent note from going below bottom ledger line
//         if (noteToUpdate.row !== 12) {
//             if (noteToUpdate.transform === 'no-translate') {
//                 if (allNotes[allNotesIdx - 2]) {
//                     //Changing Natural notes
//                     if (copy[idx][editIndex(notes[editColumn])].accidental === null)
//                         copy[idx][editIndex(notes[editColumn])] = { ...copy[idx][editIndex(notes[editColumn])], transform: 'move-down', letter: changeNaturalLetter(allNotes, allNotesIdx, copy[idx][editIndex(notes[editColumn])].transform) }
//                     //Changing Sharp notes
//                     else if (copy[idx][editIndex(notes[editColumn])].accidental === SHARP_NOTE)
//                         copy[idx][editIndex(notes[editColumn])] = { ...copy[idx][editIndex(notes[editColumn])], accidental: null, transform: 'move-down', letter: changeNaturalLetter(allNotes, allNotesIdx, copy[idx][editIndex(notes[editColumn])].transform) }
//                     //Changing Flat notes
//                     else if (copy[idx][editIndex(notes[editColumn])].accidental === FLAT_NOTE)
//                         copy[idx][editIndex(notes[editColumn])] = { ...copy[idx][editIndex(notes[editColumn])], accidental: null, transform: 'move-down', letter: changeNaturalLetter(allNotes, allNotesIdx, copy[idx][editIndex(notes[editColumn])].transform) }
//                 }
//                 //Change note from 'A' to 'G'
//                 else {
//                     //'A' to 'G' or 'A' to 'G#'
//                     if (copy[idx][editIndex(notes[editColumn])].accidental === null) {
//                         if ((key.id > 0 && key.id < 8))
//                             (key.id > 3 && key.id < 8) ? copy[idx][editIndex(notes[editColumn])] = { ...copy[idx][editIndex(notes[editColumn])], transform: 'move-down', letter: allNotes[11] } : copy[idx][editIndex(notes[editColumn])] = { ...copy[idx][editIndex(notes[editColumn])], transform: 'move-down', letter: allNotes[allNotes.length - allNotesIdx - 2] }
//                         else if (key.id > -3 && copy[idx][editIndex(notes[editColumn])].letter === 'A#')
//                             copy[idx][editIndex(notes[editColumn])] = { ...copy[idx][editIndex(notes[editColumn])], transform: 'move-down', letter: allNotes[0] }
//                         else if (key.id > -3 && copy[idx][editIndex(notes[editColumn])].letter !== 'A#')
//                             copy[idx][editIndex(notes[editColumn])] = { ...copy[idx][editIndex(notes[editColumn])], transform: 'move-down', letter: allNotes[10] }
//                         else if (key.id > 9)
//                             copy[idx][editIndex(notes[editColumn])] = { ...copy[idx][editIndex(notes[editColumn])], transform: 'move-down', letter: allNotes[11] }
//                     }
//                     //'A#' to 'G' or 'A#' to 'G#'
//                     else if (copy[idx][editIndex(notes[editColumn])].accidental === SHARP_NOTE)
//                         (key.id > 3 && key.id < 8) ? copy[idx][editIndex(notes[editColumn])] = { ...copy[idx][editIndex(notes[editColumn])], accidental: null, transform: 'move-down', letter: allNotes[11] } : copy[idx][editIndex(notes[editColumn])] = { ...copy[idx][editIndex(notes[editColumn])], accidental: null, transform: 'move-down', letter: allNotes[10] }
//                     //'A#' to 'A'
//                     else if (copy[idx][editIndex(notes[editColumn])].accidental === FLAT_NOTE)
//                         copy[idx][editIndex(notes[editColumn])].letter === allNotes[1] ? copy[idx][editIndex(notes[editColumn])] = { ...copy[idx][editIndex(notes[editColumn])], accidental: null, transform: 'move-down', letter: allNotes[0] } : copy[idx][editIndex(notes[editColumn])] = { ...copy[idx][editIndex(notes[editColumn])], accidental: null, transform: 'move-down', letter: allNotes[allNotes.length - allNotesIdx] }
//                 }
//             }
//             else if (noteToUpdate.transform === 'move-up') {
//                 if (allNotes[allNotesIdx - 4]) {
//                     //Changing Natural notes
//                     if (copy[idx][editIndex(notes[editColumn])].accidental === null)
//                         copy[idx][editIndex(notes[editColumn])] = { ...copy[idx][editIndex(notes[editColumn])], transform: 'move-down', letter: changeNaturalLetter(allNotes, allNotesIdx, copy[idx][editIndex(notes[editColumn])].transform) }
//                     //Changing Sharp notes
//                     else if (copy[idx][editIndex(notes[editColumn])].accidental === SHARP_NOTE)
//                         copy[idx][editIndex(notes[editColumn])] = { ...copy[idx][editIndex(notes[editColumn])], accidental: null, transform: 'move-down', letter: changeNaturalLetter(allNotes, allNotesIdx, copy[idx][editIndex(notes[editColumn])].transform) }
//                     //Changing Flat notes
//                     else if (copy[idx][editIndex(notes[editColumn])].accidental === FLAT_NOTE)
//                         copy[idx][editIndex(notes[editColumn])] = { ...copy[idx][editIndex(notes[editColumn])], accidental: null, transform: 'move-down', letter: changeNaturalLetter(allNotes, allNotesIdx, copy[idx][editIndex(notes[editColumn])].transform) }
//                 }
//                 else {
//                     if (copy[idx][editIndex(notes[editColumn])].accidental === null) {
//                         //'A#' to 'F' or 'A' to 'F'
//                         if (copy[idx][editIndex(notes[editColumn])].letter === allNotes[0])
//                             (key.id > 1 && key.id < 8) ? copy[idx][editIndex(notes[editColumn])] = { ...copy[idx][editIndex(notes[editColumn])], transform: 'move-down', letter: allNotes[9] } : copy[idx][editIndex(notes[editColumn])] = { ...copy[idx][editIndex(notes[editColumn])], transform: 'move-down', letter: allNotes[8] }
//                         else if ((key.id > 5 && key.id < 8) && copy[idx][editIndex(notes[editColumn])].letter === allNotes[1])
//                             copy[idx][editIndex(notes[editColumn])] = { ...copy[idx][editIndex(notes[editColumn])], transform: 'move-down', letter: allNotes[9] }
//                         //If A-Major then show 'G#'
//                         else if ((key.id > 3 && key.id < 8) && copy[idx][editIndex(notes[editColumn])].letter === allNotes[2])
//                             copy[idx][editIndex(notes[editColumn])] = { ...copy[idx][editIndex(notes[editColumn])], transform: 'move-down', letter: allNotes[11] }
//                         //'B' to 'G'
//                         else if ((key.id > 0 && key.id < 8) && copy[idx][editIndex(notes[editColumn])].letter === allNotes[2])
//                             copy[idx][editIndex(notes[editColumn])] = { ...copy[idx][editIndex(notes[editColumn])], transform: 'move-down', letter: allNotes[10] }
//                         //'C' to 'A'
//                         else if ((key.id > 0 && key.id < 8) && copy[idx][editIndex(notes[editColumn])].letter === allNotes[3])
//                             copy[idx][editIndex(notes[editColumn])] = { ...copy[idx][editIndex(notes[editColumn])], transform: 'move-down', letter: allNotes[0] }
//                         //If Flat Key-Signature - 'F#' to 'A#'
//                         else if (key.id > 11 && copy[idx][editIndex(notes[editColumn])].letter === allNotes[1])
//                             copy[idx][editIndex(notes[editColumn])] = { ...copy[idx][editIndex(notes[editColumn])], transform: 'move-down', letter: allNotes[9] }
//                         //If Flat Key-Signature - 'A#' to 'G'
//                         else if (key.id > 7 && copy[idx][editIndex(notes[editColumn])].letter === allNotes[1])
//                             copy[idx][editIndex(notes[editColumn])] = { ...copy[idx][editIndex(notes[editColumn])], transform: 'move-down', letter: allNotes[10] }
//                         //If Flat Key-Signature - 'A#' to 'G'
//                         else if (key.id > 9 && copy[idx][editIndex(notes[editColumn])].letter === allNotes[3])
//                             copy[idx][editIndex(notes[editColumn])] = { ...copy[idx][editIndex(notes[editColumn])], transform: 'move-down', letter: allNotes[11] }
//                         //If Flat Key-Signature - 'C' to 'A#'
//                         else if (key.id > 7 && copy[idx][editIndex(notes[editColumn])].letter === allNotes[3])
//                             copy[idx][editIndex(notes[editColumn])] = { ...copy[idx][editIndex(notes[editColumn])], transform: 'move-down', letter: allNotes[0] }
//                         //If Flat Key-Signature - 'C' to 'G#'
//                         else if (key.id > 10 && copy[idx][editIndex(notes[editColumn])].letter === allNotes[3])
//                             copy[idx][editIndex(notes[editColumn])] = { ...copy[idx][editIndex(notes[editColumn])], transform: 'move-down', letter: allNotes[11] }
//                     }
//                     else if (copy[idx][editIndex(notes[editColumn])].accidental === SHARP_NOTE) {
//                         //'A#' to 'F' or 'A' to 'F'
//                         if (copy[idx][editIndex(notes[editColumn])].letter === allNotes[1])
//                             (key.id > 1 && key.id < 8) ? copy[idx][editIndex(notes[editColumn])] = { ...copy[idx][editIndex(notes[editColumn])], accidental: null, transform: 'move-down', letter: allNotes[9] } : copy[idx][editIndex(notes[editColumn])] = { ...copy[idx][editIndex(notes[editColumn])], accidental: null, transform: 'move-down', letter: allNotes[8] }
//                         //'B#/C' to 'G#'
//                         else if (copy[idx][editIndex(notes[editColumn])].letter === allNotes[3])
//                             copy[idx][editIndex(notes[editColumn])] = { ...copy[idx][editIndex(notes[editColumn])], transform: 'move-down', letter: allNotes[11] }
//                     }
//                     else if (copy[idx][editIndex(notes[editColumn])].accidental === FLAT_NOTE) {
//                         //'A#' to 'G#'
//                         if ((key.id > 3 && key.id < 8) && copy[idx][editIndex(notes[editColumn])].letter === allNotes[1])
//                             copy[idx][editIndex(notes[editColumn])] = { ...copy[idx][editIndex(notes[editColumn])], accidental: null, transform: 'move-down', letter: allNotes[11] }
//                         //'A#' to 'G'
//                         else if (copy[idx][editIndex(notes[editColumn])].letter === allNotes[1])
//                             copy[idx][editIndex(notes[editColumn])] = { ...copy[idx][editIndex(notes[editColumn])], accidental: null, transform: 'move-down', letter: allNotes[10] }
//                         //'B' to 'G#
//                         else if (copy[idx][editIndex(notes[editColumn])].letter === allNotes[2])
//                             copy[idx][editIndex(notes[editColumn])] = { ...copy[idx][editIndex(notes[editColumn])], transform: 'move-down', letter: allNotes[11] }
//                     }
//                 }
//             }
//         }
//         store.dispatch(updateNote(copy))
//     }
// }

// export const moveNoteBetween = (notes, key, editColumn) => {
//     if (!isRestNote(notes[editColumn][editIndex(notes[editColumn])], null, notes)) {
//         //Change transform and letter of note
//         let copy = [...notes]
//         let idx = editColumn
//         let allNotesIdx = findLetterIdx(copy, idx)
//         const noteToUpdate = notes[idx][editIndex(notes[idx])]

//         const changeNaturalLetter = (arr, index, transform) => {
//             if (transform === 'move-up') {
//                 if (noteToUpdate.accidental === FLAT_NOTE)
//                     return arr[index - 1].length === 1 ? arr[index - 1] : arr[index - 2]

//                 //Sharp Key-Signature
//                 if ((key.id > 0 && key.id < 8)) {
//                     if ((key.id > 1 && key.id < 8) && arr[index - 2] === 'F')
//                         return 'F#'
//                     else if (((key.id > 2 && key.id < 8) && arr[index - 2] === 'C') || ((key.id > 4 && key.id < 8) && arr[index - 3] === 'C'))
//                         return 'C#'
//                     else if (((key.id > 4 && key.id < 8) && arr[index - 2] === 'D') || (key.id === 7 && arr[index - 3] === 'D'))
//                         return 'D#'
//                     else if ((key.id > 5 && key.id < 8) && arr[index - 2] === 'A')
//                         return 'A#'
//                     else if (key.id === 7 && arr[index - 2] === 'E')
//                         return 'F'
//                     else {
//                         if ((noteToUpdate.letter === 'F#' || noteToUpdate.letter === 'C#'))
//                             return arr[index - 2]
//                         else if (((noteToUpdate.letter === 'G#') && key.id > 1) || ((key.id > 2 && key.id < 8) && noteToUpdate.letter === 'D#'))
//                             return arr[index - 2]
//                         else if (noteToUpdate.letter === 'G#' || noteToUpdate.letter === 'D#')
//                             index--
//                         return arr[index - 1].length === 1 ? arr[index - 1] : arr[index - 2]
//                     }
//                 }

//                 //Flat Key-Signature
//                 if (key.id > 7) {
//                     if (noteToUpdate.accidental === SHARP_NOTE) {
//                         if (key.id > 7 && arr[index] === 'G#')
//                             return 'F'
//                         else if (key.id > 8 && arr[index] === 'F#')
//                             return 'D#'
//                     }

//                     if (key.id > 7 && arr[index] === 'C')
//                         return 'A#'
//                     else if (key.id > 7 && arr[index] === 'C#')
//                         return 'A#'
//                     else if (key.id > 8 && arr[index] === 'F')
//                         return 'D#'
//                     else if (key.id > 10 && arr[index] === 'D#')
//                         return 'C#'
//                     else if (key.id > 11 && arr[index] === 'G#')
//                         return 'F#'
//                     else {
//                         if (key.id > 8 && noteToUpdate.letter === 'D#')
//                             return arr[index - 1]
//                         return arr[index - 1].length === 1 ? arr[index - 1] : arr[index - 2]
//                     }
//                 }
//             }
//             else if (transform === 'move-down') {
//                 if (noteToUpdate.accidental === FLAT_NOTE) {
//                     if ((key.id > 1 && key.id < 8) && copy[idx][editIndex(notes[editColumn])].letter === arr[6])
//                         return 'F#'
//                     else if ((key.id > 2 && key.id < 8) && copy[idx][editIndex(notes[editColumn])].letter === arr[1])
//                         return 'C#'

//                     else if (key.id > 8 && copy[idx][editIndex(notes[editColumn])].letter === arr[4])
//                         return 'D#'
//                     else if (key.id > -3 && copy[idx][editIndex(notes[editColumn])].letter === arr[9])
//                         return 'A'
//                     else if (key.id > 9 && copy[idx][editIndex(notes[editColumn])].letter === arr[9])
//                         return 'G#'

//                     return arr[index + 2].length === 1 ? arr[index + 2] : arr[index + 3]
//                 }

//                 //Sharp Key-Signature
//                 if ((key.id > 1 && key.id < 8) && arr[index + 1] === 'F')
//                     return 'F#'
//                 else if ((key.id > 2 && key.id < 8) && arr[index + 1] === 'C')
//                     return 'C#'
//                 else if ((key.id > 3 && key.id < 8) && arr[index + 1] === 'G')
//                     return 'G#'
//                 else if ((key.id > 4 && key.id < 8) && arr[index + 1] === 'D')
//                     return 'D#'
//                 else if (key.id === 7) {
//                     if (arr[index + 1] === 'E') return 'F'
//                     else if (arr[index] === 'F') return 'F#'
//                 }

//                 //Flat Key-Signature
//                 else if (key.id > 7 && arr[index] === 'A#')
//                     return 'C'
//                 else if (key.id > 7 && arr[index] === 'A')
//                     return 'A#'
//                 else if (key.id > 8 && arr[index] === 'D#')
//                     return 'F'
//                 else if (key.id > 8 && arr[index] === 'D')
//                     return 'D#'
//                 else if (key.id > 10 && arr[index] === 'C')
//                     return 'C#'
//                 else if (key.id > 10 && arr[index] === 'C#')
//                     return 'D#'
//                 else if (key.id > 11 && arr[index] === 'F')
//                     return 'F#'
//                 else if (key.id > 11 && arr[index] === 'F#')
//                     return 'G#'

//                 else
//                     return arr[index + 1].length === 1 ? arr[index + 1] : arr[index + 2]
//             }
//         }

//         if (noteToUpdate.transform === 'move-up') {
//             if (allNotes[allNotesIdx - 2]) {
//                 //Changing Natural notes
//                 if (copy[idx][editIndex(notes[editColumn])].accidental === null)
//                     copy[idx][editIndex(notes[editColumn])] = { ...copy[idx][editIndex(notes[editColumn])], transform: 'no-translate', letter: changeNaturalLetter(allNotes, allNotesIdx, copy[idx][editIndex(notes[editColumn])].transform) }
//                 //Changing Sharp notes
//                 else if (copy[idx][editIndex(notes[editColumn])].accidental === SHARP_NOTE)
//                     copy[idx][editIndex(notes[editColumn])] = { ...copy[idx][editIndex(notes[editColumn])], accidental: null, transform: 'no-translate', letter: changeNaturalLetter(allNotes, allNotesIdx, copy[idx][editIndex(notes[editColumn])].transform) }
//                 //Changing Flat notes
//                 else if (copy[idx][editIndex(notes[editColumn])].accidental === FLAT_NOTE)
//                     copy[idx][editIndex(notes[editColumn])] = { ...copy[idx][editIndex(notes[editColumn])], accidental: null, transform: 'no-translate', letter: changeNaturalLetter(allNotes, allNotesIdx, copy[idx][editIndex(notes[editColumn])].transform) }
//             }
//             else {
//                 //Changing Natural notes - 'A' to 'G'
//                 if (copy[idx][editIndex(notes[editColumn])].accidental === null) {
//                     if ((key.id > 3 && key.id < 8) || (key.id > 9 && noteToUpdate.letter === 'A#'))
//                         copy[idx][editIndex(notes[editColumn])] = { ...copy[idx][editIndex(notes[editColumn])], transform: 'no-translate', letter: allNotes[11] }
//                     else if (key.id > 7 && noteToUpdate.letter === 'A#')
//                         copy[idx][editIndex(notes[editColumn])] = { ...copy[idx][editIndex(notes[editColumn])], transform: 'no-translate', letter: allNotes[0] }
//                     else
//                         copy[idx][editIndex(notes[editColumn])] = { ...copy[idx][editIndex(notes[editColumn])], transform: 'no-translate', letter: allNotes[10] }
//                 }
//                 //Changing Sharp notes - 'A#' to 'G#'
//                 else if (copy[idx][editIndex(notes[editColumn])].accidental === SHARP_NOTE)
//                     (key.id > 3 && key.id < 8) ? copy[idx][editIndex(notes[editColumn])] = { ...copy[idx][editIndex(notes[editColumn])], accidental: null, transform: 'no-translate', letter: allNotes[11] } : copy[idx][editIndex(notes[editColumn])] = { ...copy[idx][editIndex(notes[editColumn])], accidental: null, transform: 'no-translate', letter: allNotes[10] }
//                 //Changing Flat notes - 'B' to 'A#'
//                 else if (copy[idx][editIndex(notes[editColumn])].accidental === FLAT_NOTE)
//                     copy[idx][editIndex(notes[editColumn])] = { ...copy[idx][editIndex(notes[editColumn])], accidental: null, transform: 'no-translate', letter: allNotes[0] }
//             }
//         }
//         else if (noteToUpdate.transform === 'move-down') {
//             if (allNotes[allNotesIdx + 2]) {
//                 //Changing Natural notes
//                 if (copy[idx][editIndex(notes[editColumn])].accidental === null)
//                     copy[idx][editIndex(notes[editColumn])] = { ...copy[idx][editIndex(notes[editColumn])], transform: 'no-translate', letter: changeNaturalLetter(allNotes, allNotesIdx, copy[idx][editIndex(notes[editColumn])].transform) }
//                 //Changing Sharp notes
//                 else if (copy[idx][editIndex(notes[editColumn])].accidental === SHARP_NOTE)
//                     copy[idx][editIndex(notes[editColumn])] = { ...copy[idx][editIndex(notes[editColumn])], accidental: null, transform: 'no-translate', letter: changeNaturalLetter(allNotes, allNotesIdx, copy[idx][editIndex(notes[editColumn])].transform) }
//                 //Changing Flat notes
//                 else if (copy[idx][editIndex(notes[editColumn])].accidental === FLAT_NOTE)
//                     copy[idx][editIndex(notes[editColumn])] = { ...copy[idx][editIndex(notes[editColumn])], accidental: null, transform: 'no-translate', letter: changeNaturalLetter(allNotes, allNotesIdx, copy[idx][editIndex(notes[editColumn])].transform) }
//             }
//             //Changing note from 'G' to 'A'
//             else {
//                 //Changing Natural notes - 'G' to 'A'
//                 if (copy[idx][editIndex(notes[editColumn])].accidental === null) {
//                     if ((key.id > 5 && key.id < 8))
//                         copy[idx][editIndex(notes[editColumn])] = { ...copy[idx][editIndex(notes[editColumn])], transform: 'no-translate', letter: allNotes[1] }
//                     else if ((key.id > 3 && key.id < 8))
//                         copy[idx][editIndex(notes[editColumn])] = { ...copy[idx][editIndex(notes[editColumn])], transform: 'no-translate', letter: allNotes[0] }
//                     else if (key.id > 9 && copy[idx][editIndex(notes[editColumn])].letter === 'G#')
//                         copy[idx][editIndex(notes[editColumn])] = { ...copy[idx][editIndex(notes[editColumn])], transform: 'no-translate', letter: allNotes[1] }
//                     else if (key.id > 9 && copy[idx][editIndex(notes[editColumn])].letter === 'G')
//                         copy[idx][editIndex(notes[editColumn])] = { ...copy[idx][editIndex(notes[editColumn])], transform: 'no-translate', letter: allNotes[11] }
//                     else
//                         copy[idx][editIndex(notes[editColumn])] = { ...copy[idx][editIndex(notes[editColumn])], transform: 'no-translate', letter: allNotes[allNotes.length - allNotesIdx - 2] }
//                 }
//                 //Changing Sharp notes - 'G#' to 'A#'
//                 else if (copy[idx][editIndex(notes[editColumn])].accidental === SHARP_NOTE)
//                     copy[idx][editIndex(notes[editColumn])] = { ...copy[idx][editIndex(notes[editColumn])], accidental: null, transform: 'no-translate', letter: allNotes[0] }
//                 //Changing Flat notes - 'G#/A-flat' to 'A#/G-flat'
//                 else if (copy[idx][editIndex(notes[editColumn])].accidental === FLAT_NOTE) {
//                     if ((key.id > 0 && key.id < 8) && copy[idx][editIndex(notes[editColumn])].letter === allNotes[11])
//                         copy[idx][editIndex(notes[editColumn])] = { ...copy[idx][editIndex(notes[editColumn])], accidental: null, transform: 'no-translate', letter: allNotes[2] }
//                     else if (key.id > 7 && copy[idx][editIndex(notes[editColumn])].letter === allNotes[11])
//                         copy[idx][editIndex(notes[editColumn])] = { ...copy[idx][editIndex(notes[editColumn])], accidental: null, transform: 'no-translate', letter: allNotes[1] }
//                 }
//             }
//         }
//         store.dispatch(updateNote(copy))
//     }
// }
