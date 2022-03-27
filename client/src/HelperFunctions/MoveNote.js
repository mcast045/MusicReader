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
        //Change transform and letter of note
        const copy = [...notes]
        const allNotesIdx = findLetterIdx(copy, editColumn)
        let noteToUpdate = copy[editColumn][editIndex(copy[editColumn])]
        const constantChanges = { accidental: null, transform: MOVE_UP }

        const { accidental, row, transform } = noteToUpdate

        const changeNaturalLetter = (arr, index, transform) => {
            if (transform === NO_TRANSLATE) {
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
            } else if (transform === MOVE_DOWN) {
                if (accidental === FLAT_NOTE) {
                    if (isKeyFlat(key.id, 9) && allNotes[allNotesIdx] === allNotes[7]) return allNotes[11]
                    else if (isKeySharp(key.id, 3) && arr[index] === allNotes[6]) return allNotes[11]
                    else if (isKeySharp(key.id, 1) && arr[index] === allNotes[4]) return allNotes[9]
                    return allNotes[allNotesIdx + 4].length !== 1 ? allNotes[allNotesIdx + 3] : allNotes[allNotesIdx + 4]
                }
                else {
                    if (isKeySharp(key.id, 6) && (arr[index] === allNotes[4] || (accidental === NATURAL_NOTE && arr[index] === allNotes[3]))) return allNotes[8]
                    else if (isKeySharp(key.id, 6) && arr[index] === allNotes[8]) return allNotes[11]
                    else if (isKeySharp(key.id, 5) && arr[index] === allNotes[1]) return allNotes[4]
                    else if (isKeySharp(key.id, 4) && arr[index] === allNotes[6]) return allNotes[9]
                    else if (isKeySharp(key.id, 4) && arr[index] === allNotes[2]) return allNotes[6]
                    else if (isKeySharp(key.id, 3) && arr[index] === allNotes[7]) return allNotes[11]
                    else if (isKeySharp(key.id, 2) && arr[index] === allNotes[4]) return allNotes[7]
                    else if (isKeySharp(key.id, 2) && arr[index] === allNotes[0]) return allNotes[4]
                    else if (isKeySharp(key.id, 1) && (arr[index] === allNotes[5] || arr[index] === allNotes[6])) return allNotes[9]
                    else if (isKeyFlat(key.id, 11) && (arr[index] === allNotes[6] || (accidental === NATURAL_NOTE && arr[index] === allNotes[7]))) return allNotes[9]
                    else if (isKeyFlat(key.id, 10) && arr[index] === allNotes[4]) return allNotes[8]
                    else if (isKeyFlat(key.id, 10) && (arr[index] === allNotes[1] || (accidental === NATURAL_NOTE && arr[index] === allNotes[2]))) return allNotes[4]
                    else if (isKeyFlat(key.id, 9) && arr[index] === allNotes[11]) return allNotes[3]
                    else if (isKeyFlat(key.id, 8) && (arr[index] === allNotes[3] || (accidental === SHARP_NOTE && arr[index] === allNotes[4]))) return allNotes[6]
                    else if (isKeyFlat(key.id, 8) && arr[index] === allNotes[6]) return allNotes[10]
                    else if (isKeyFlat(key.id, 7) && arr[index] === allNotes[1]) return allNotes[5]
                    //Change 'A#' and 'D#' up 2 or 3 notes
                    else if (isKeySharp(key.id, 2) && allNotes[allNotesIdx][1] && allNotes[allNotesIdx + 2].length === 1) return arr[index + 3]
                    else if (allNotes[allNotesIdx][1] && allNotes[allNotesIdx + 2].length === 1) return arr[index + 2]
                    return arr[index + 3].length === 1 ? arr[index + 3] : arr[index + 4]
                }
            }
        }

        //Prevent note from going above top ledger line
        if (row !== 1) {
            if (transform === NO_TRANSLATE) {
                if (allNotes[allNotesIdx + 2])
                    noteToUpdate = { ...noteToUpdate, ...constantChanges, letter: changeNaturalLetter(allNotes, allNotesIdx, transform) }
                else {
                    if (accidental === FLAT_NOTE) {
                        //'G#' to 'B/A#'
                        let letter = allNotes[2]
                        if (isKeyFlat(key.id, 7) && allNotes[allNotesIdx] === allNotes[11]) letter = allNotes[1]
                        noteToUpdate = { ...noteToUpdate, ...constantChanges, letter: letter }
                    } else {
                        //'G/G#' to 'A/A#' or 'G#' to 'A' (if Sharp)
                        let letter = allNotes[0]
                        if (isKeyFlat(key.id, 9) && allNotes[allNotesIdx] === allNotes[11]) letter = allNotes[1]
                        else if (isKeyFlat(key.id, 9) && allNotes[allNotesIdx] === allNotes[10]) letter = allNotes[11]
                        else if (isKeySharp(key.id, 5) && (allNotes[allNotesIdx] === allNotes[11] || (allNotes[allNotesIdx] === allNotes[10] && accidental === NATURAL_NOTE))) letter = allNotes[1]
                        noteToUpdate = { ...noteToUpdate, ...constantChanges, letter: letter }
                    }
                }
            } else if (transform === MOVE_DOWN) {
                if (allNotes[allNotesIdx + 4])
                    noteToUpdate = { ...noteToUpdate, ...constantChanges, letter: changeNaturalLetter(allNotes, allNotesIdx, transform) }
                else {
                    if (accidental === SHARP_NOTE) {
                        //'G#' to 'B' and 'F#' to 'A'
                        let letter = allNotes[3 - (allNotes.length - allNotesIdx)]
                        if (isKeyFlat(key.id, 9) && allNotes[allNotesIdx] === allNotes[9]) letter = allNotes[11]
                        else if (isKeyFlat(key.id, 7) && allNotes[allNotesIdx] === allNotes[11]) letter = allNotes[1]
                        noteToUpdate = { ...noteToUpdate, ...constantChanges, letter: letter }
                    } else if (accidental === FLAT_NOTE) {
                        //'F#' to 'B' and 'G#' to 'C'
                        let letter
                        if (isKeyFlat(key.id, 7) && allNotes[allNotesIdx] === allNotes[9]) letter = allNotes[1]
                        else if (isKeySharp(key.id, 2) && allNotes[allNotesIdx] === allNotes[11]) letter = allNotes[4]
                        else if (letter === allNotes[9]) letter = allNotes[(allNotes.length - allNotesIdx - 1) % 4]
                        else if (letter === allNotes[11]) letter = allNotes[4 - (allNotes.length - allNotesIdx)]
                        noteToUpdate = { ...noteToUpdate, ...constantChanges, letter: letter }
                    } else {
                        //'G' to 'B' and 'F' to 'A'
                        let letter = allNotes[4 - (allNotes.length - allNotesIdx)]

                        //'G#' to 'B' and 'F#' to 'A'
                        if (isKeyFlat(key.id, 9) && allNotes[allNotesIdx] === allNotes[8]) letter = allNotes[11]
                        else if (isKeyFlat(key.id, 7) && allNotes[allNotesIdx] === allNotes[10]) letter = allNotes[1]
                        else if (isKeySharp(key.id, 6) && allNotes[allNotesIdx] === allNotes[8]) letter = allNotes[11]
                        else if (isKeySharp(key.id, 5) && (allNotes[allNotesIdx] === allNotes[9] || (accidental === NATURAL_NOTE && allNotes[allNotesIdx] === allNotes[8]))) letter = allNotes[1]
                        else if (isKeySharp(key.id, 3) && allNotes[allNotesIdx] === allNotes[11]) letter = allNotes[3 - (allNotes.length - allNotesIdx)]
                        else if (isKeySharp(key.id, 1) && allNotes[allNotesIdx] === allNotes[9]) letter = allNotes[3 - (allNotes.length - allNotesIdx)]

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
        const constantChanges = { accidental: null, transform: MOVE_DOWN }

        const { accidental, row, transform } = noteToUpdate

        const changeNaturalLetter = (arr, index, transform) => {
            if (transform === NO_TRANSLATE) {
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
            } else if (transform === MOVE_UP) {
                if (accidental === SHARP_NOTE) {
                    if (isKeyFlat(key.id, 10) && arr[index] === allNotes[9]) return allNotes[4]
                    if (isKeyFlat(key.id, 9) && arr[index] === allNotes[4]) return allNotes[11]
                    if (isKeyFlat(key.id, 8) && arr[index] === allNotes[11]) return allNotes[6]
                    if (isKeyFlat(key.id, 7) && arr[index] === allNotes[6]) return allNotes[1]
                    return allNotes[allNotesIdx - 4].length !== 1 ? allNotes[allNotesIdx - 3] : allNotes[allNotesIdx - 4]
                }
                else {
                    if (isKeySharp(key.id, 6) && arr[index] === allNotes[8]) return allNotes[4]
                    else if (isKeySharp(key.id, 6) && (arr[index] === allNotes[11] || (arr[index] === allNotes[10] && accidental === NATURAL_NOTE))) return allNotes[8]
                    else if (isKeySharp(key.id, 5) && (arr[index] === allNotes[4] || (arr[index] === allNotes[3] && accidental === NATURAL_NOTE))) return allNotes[1]
                    else if (isKeySharp(key.id, 4) && arr[index] === allNotes[6]) return allNotes[2]
                    else if (isKeySharp(key.id, 4) && (arr[index] === allNotes[9] || (arr[index] === allNotes[8] && accidental === NATURAL_NOTE))) return allNotes[6]
                    else if (isKeySharp(key.id, 3) && arr[index] === allNotes[11]) return allNotes[7]
                    else if (isKeySharp(key.id, 2) && arr[index] === allNotes[4]) return allNotes[0]
                    else if (isKeySharp(key.id, 2) && (arr[index] === allNotes[7] || (arr[index] === allNotes[6] && accidental === FLAT_NOTE))) return allNotes[4]
                    else if (isKeySharp(key.id, 1) && arr[index] === allNotes[9]) return allNotes[5]
                    else if (isKeySharp(key.id, 1) && arr[index] === allNotes[11]) return allNotes[9]
                    else if (isKeyFlat(key.id, 11) && arr[index] === allNotes[9]) return allNotes[6]
                    else if (isKeyFlat(key.id, 10) && arr[index] === allNotes[4]) return allNotes[1]
                    else if (isKeyFlat(key.id, 10) && (arr[index] === allNotes[8] || (accidental === FLAT_NOTE && arr[index] === allNotes[7]))) return allNotes[4]
                    else if (isKeyFlat(key.id, 9) && arr[index] === allNotes[3]) return allNotes[11]
                    else if (isKeyFlat(key.id, 9) && arr[index] === allNotes[11]) return allNotes[8]
                    else if (isKeyFlat(key.id, 8) && (arr[index] === allNotes[10] || (accidental === FLAT_NOTE && arr[index] === allNotes[9]))) return allNotes[6]
                    else if (isKeyFlat(key.id, 7) && (arr[index] === allNotes[5] || (accidental === FLAT_NOTE && arr[index] === allNotes[4]))) return allNotes[1]
                    //Change 'C#' and 'F#' down 2 notes
                    else if (allNotes[allNotesIdx][1] && allNotes[allNotesIdx - 2].length === 1) return arr[index - 2]
                    return arr[index - 3].length === 1 ? arr[index - 3] : arr[index - 4]
                }
            }
        }

        //Prevent note from going below bottom ledger line
        if (row !== 12) {
            if (transform === NO_TRANSLATE) {
                if (allNotes[allNotesIdx - 2])
                    noteToUpdate = { ...noteToUpdate, ...constantChanges, letter: changeNaturalLetter(allNotes, allNotesIdx, transform) }
                else {
                    if (accidental === FLAT_NOTE) {
                        //'A#' to 'A'
                        noteToUpdate = { ...noteToUpdate, ...constantChanges, letter: allNotes[0] }
                    } else {
                        //'A' to 'G/G#' or 'A#' to 'G/G#' (if Sharp)
                        let letter = allNotes[10]
                        if (isKeyFlat(key.id, 11) && allNotes[allNotesIdx] === allNotes[0] && accidental === NATURAL_NOTE) letter = allNotes[9]
                        else if (isKeyFlat(key.id, 9) && allNotes[allNotesIdx] === allNotes[1]) letter = allNotes[11]
                        else if (isKeyFlat(key.id, 7) && allNotes[allNotesIdx] === allNotes[1]) letter = allNotes[0]
                        else if (isKeySharp(key.id, 3) && (allNotes[allNotesIdx] === allNotes[0] || allNotes[allNotesIdx] === allNotes[1])) letter = allNotes[11]
                        noteToUpdate = { ...noteToUpdate, ...constantChanges, letter: letter }
                    }
                }
            } else if (transform === MOVE_UP) {
                if (allNotes[allNotesIdx - 3])
                    noteToUpdate = { ...noteToUpdate, ...constantChanges, letter: changeNaturalLetter(allNotes, allNotesIdx, transform) }
                else {
                    if (accidental === SHARP_NOTE) {
                        //'A#' to 'F'
                        let letter = allNotes[8]
                        if (isKeySharp(key.id, 1) && allNotes[allNotesIdx] === allNotes[1]) letter = allNotes[9]
                        noteToUpdate = noteToUpdate = { ...noteToUpdate, ...constantChanges, letter: letter }
                    } else if (accidental === FLAT_NOTE) {
                        //'A#' to 'G/G#'
                        let letter = allNotes[10]
                        if (isKeySharp(key.id, 3) && allNotes[allNotesIdx] === allNotes[1]) letter = allNotes[11]
                        noteToUpdate = { ...noteToUpdate, ...constantChanges, letter: letter }
                    } else {
                        //'A' to 'F/F#' and 'B' to 'G'
                        let letter = allNotes[((allNotes.length - allNotesIdx) % 4) + 8]
                        if (isKeyFlat(key.id, 11) && (allNotes[allNotesIdx] === allNotes[1] || (accidental === NATURAL_NOTE && allNotes[allNotesIdx] === allNotes[2]))) letter = allNotes[9]
                        else if (isKeyFlat(key.id, 7) && allNotes[allNotesIdx] === allNotes[1]) letter = allNotes[10]
                        else if (isKeySharp(key.id, 5) && allNotes[allNotesIdx] === allNotes[1]) letter = allNotes[9]
                        else if (isKeySharp(key.id, 3) && allNotes[allNotesIdx] === allNotes[2]) letter = allNotes[11]
                        else if (isKeySharp(key.id, 1) && allNotes[allNotesIdx] === allNotes[0]) letter = allNotes[9]
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
        const constantChanges = { accidental: null, transform: NO_TRANSLATE }

        const { accidental, transform } = noteToUpdate

        const changeNaturalLetter = (arr, index, transform) => {
            if (transform === MOVE_UP) {
                if (accidental === SHARP_NOTE) {
                    if (isKeySharp(key.id, 2) && arr[index] === allNotes[6]) return allNotes[4]
                    else if (isKeySharp(key.id, 1) && arr[index] === allNotes[11]) return allNotes[9]
                    else if (isKeyFlat(key.id, 8) && arr[index] === allNotes[9]) return allNotes[6]
                    else if (isKeyFlat(key.id, 7) && arr[index] === allNotes[4]) return allNotes[1]
                    else if (arr[index - 2].length !== 1) return arr[index - 3]
                    return arr[index - 1].length === 1 ? arr[index - 2] : arr[index - 1]
                } else {
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
                    else if (isKeyFlat(key.id, 9) && arr[index] === allNotes[2] && accidental === NATURAL_NOTE) return allNotes[11]
                    else if (isKeyFlat(key.id, 8) && (arr[index] === allNotes[8] || (accidental === FLAT_NOTE && arr[index] === allNotes[7]))) return allNotes[6]
                    else if (isKeyFlat(key.id, 7) && arr[index] === allNotes[3]) return allNotes[1]
                    return arr[index - 1].length === 1 ? arr[index - 1] : arr[index - 2]
                }
            } else if (transform === MOVE_DOWN) {
                if (accidental === FLAT_NOTE) {
                    if (isKeySharp(key.id, 2) && arr[index] === allNotes[1]) return allNotes[4]
                    else if (isKeySharp(key.id, 1) && arr[index] === allNotes[6]) return allNotes[9]
                    else if (isKeyFlat(key.id, 11) && arr[index] === allNotes[7]) return allNotes[9]
                    else if (isKeyFlat(key.id, 9) && arr[index] === allNotes[9]) return allNotes[11]
                    else if (isKeyFlat(key.id, 8) && arr[index] === allNotes[4]) return allNotes[6]
                    else if (!arr[index + 3]) return allNotes[0] //F# to A
                    return arr[index + 2].length === 1 ? arr[index + 2] : arr[index + 3]
                } else {
                    if (isKeySharp(key.id, 6) && arr[index] === allNotes[8]) return allNotes[9]
                    else if (isKeySharp(key.id, 6) && (arr[index] === allNotes[6] || (arr[index] === allNotes[5] && accidental === NATURAL_NOTE))) return allNotes[8]
                    else if (isKeySharp(key.id, 4) && arr[index] === allNotes[6]) return allNotes[7]
                    else if (isKeySharp(key.id, 4) && (arr[index] === allNotes[4] || (arr[index] === allNotes[3] && accidental === NATURAL_NOTE))) return allNotes[6]
                    else if (isKeySharp(key.id, 3) && (arr[index] === allNotes[9] || (arr[index] === allNotes[8] && accidental === NATURAL_NOTE))) return allNotes[11]
                    else if (isKeySharp(key.id, 2) && arr[index] === allNotes[2]) return allNotes[4]
                    else if (isKeySharp(key.id, 1) && arr[index] === allNotes[9]) return allNotes[10]
                    else if (isKeySharp(key.id, 1) && arr[index] === allNotes[7]) return allNotes[9]
                    else if (isKeyFlat(key.id, 11) && arr[index] === allNotes[9]) return allNotes[11]
                    else if (isKeyFlat(key.id, 11) && arr[index] === allNotes[8]) return allNotes[9]
                    else if (isKeyFlat(key.id, 10) && arr[index] === allNotes[4]) return allNotes[6]
                    else if (isKeyFlat(key.id, 10) && arr[index] === allNotes[3]) return allNotes[4]
                    else if (isKeyFlat(key.id, 8) && arr[index] === allNotes[6]) return allNotes[8]
                    else if (isKeyFlat(key.id, 8) && arr[index] === allNotes[5]) return allNotes[6]
                    else if (isKeyFlat(key.id, 7) && arr[index] === allNotes[1]) return allNotes[3]
                    else if (isKeyFlat(key.id, 7) && arr[index] === allNotes[0]) return allNotes[1]
                    return arr[index + 1].length === 1 ? arr[index + 1] : arr[index + 2]
                }
            }
        }

        if (transform === MOVE_UP) {
            if (allNotes[allNotesIdx - 2])
                noteToUpdate = { ...noteToUpdate, ...constantChanges, letter: changeNaturalLetter(allNotes, allNotesIdx, transform) }
            else {
                if (accidental === FLAT_NOTE) {
                    //'A#' to 'A'
                    noteToUpdate = { ...noteToUpdate, ...constantChanges, letter: allNotes[0] }
                } else {
                    //'A' to 'G' and 'A#' to 'G' (if Sharp)
                    let letter = allNotes[10]
                    if (isKeyFlat(key.id, 11) && allNotes[allNotesIdx] === allNotes[0]) letter = allNotes[9]
                    else if (isKeyFlat(key.id, 9) && allNotes[allNotesIdx] === allNotes[1]) letter = allNotes[11]
                    else if (isKeyFlat(key.id, 7) && allNotes[allNotesIdx] === allNotes[1]) letter = allNotes[0]
                    else if (isKeySharp(key.id, 3) && (allNotes[allNotesIdx] === allNotes[0] || allNotes[allNotesIdx] === allNotes[1])) letter = allNotes[11]
                    noteToUpdate = { ...noteToUpdate, ...constantChanges, letter: letter }
                }
            }
        } else if (transform === MOVE_DOWN) {
            if (allNotes[allNotesIdx + 2])
                noteToUpdate = { ...noteToUpdate, ...constantChanges, letter: changeNaturalLetter(allNotes, allNotesIdx, transform) }
            else {
                if (accidental === FLAT_NOTE) {
                    //'G#' to 'B'
                    let letter = allNotes[2]
                    if (isKeyFlat(key.id, 7) && allNotes[allNotesIdx] === allNotes[11]) letter = allNotes[1]
                    noteToUpdate = { ...noteToUpdate, ...constantChanges, letter: letter }
                } else {
                    //'G' to 'A' and 'G#' to 'A' (if Sharp)
                    let letter = allNotes[0]
                    //Fix
                    if (isKeyFlat(key.id, 9) && (allNotes[allNotesIdx] === allNotes[10] || (accidental === SHARP_NOTE && allNotes[allNotesIdx] === allNotes[11]))) letter = allNotes[11]
                    else if (isKeyFlat(key.id, 9) && allNotes[allNotesIdx] === allNotes[11]) letter = allNotes[1]
                    else if (isKeySharp(key.id, 5) && (allNotes[allNotesIdx] === allNotes[11] || allNotes[allNotesIdx] === allNotes[10])) letter = allNotes[1]
                    noteToUpdate = { ...noteToUpdate, ...constantChanges, letter: letter }
                }
            }
        }

        copy[editColumn][editIndex(copy[editColumn])] = noteToUpdate
        store.dispatch(updateNote(copy))
    }
}