import store from '../Redux/Store'
import { addNote, replaceNote, insertNote } from '../Redux/Actions/Notes'
import { editIndex, countNumberOfNulls, isRestNote } from './Helpers'

const dispatchReplaceNote = (oldNotesArray, index, notePath, noteType, transform, letter, row, accidental, position, nullArray = []) => {
    oldNotesArray[index] = { notePath: notePath, draggable: false, type: noteType, transform: transform, letter: letter, row: row, accidental: accidental, tabPosition: position }
    oldNotesArray.splice(index + 1, countNumberOfNulls(oldNotesArray, index), ...nullArray)
    store.dispatch(replaceNote(oldNotesArray))
}

const dispatchInsertNote = (copy, idx, notePath, noteType, transform, letter, row, accidental, position, nullArray = []) => {
    copy.splice(idx, 0, { notePath: notePath, draggable: false, type: noteType, transform: transform, letter: letter, row: row, accidental: accidental, tabPosition: position }, ...nullArray)
    store.dispatch(insertNote(copy))
}

export const addToSongArray = (notes, note, type, letter, row, array = []) => {
    let notePosition = 1

    //Make following tab be in same position as previous note's tab
    //To find previous note, skip the null 'notes'
    if (notes.length > 0) {
        let nullCount = 0
        let idx = notes.length - 1
        while (notes[idx] === null) {
            nullCount++
            idx--
        }
        notePosition = notes[notes.length - 1 - nullCount].tabPosition
    }

    store.dispatch(addNote([...notes, { notePath: note, type: type, draggable: false, transform: 'no-translate', letter: letter, row: row, accidental: null, tabPosition: notePosition }, ...array]))
}

export const replaceNoteInSong = (notes, notePath, noteType, nullArray = []) => {
    let idx = editIndex(notes)
    //Replacing note to a regular note
    if (!isRestNote(-1, noteType, notes)) {
        //If replacing rest note to regular note, show tab
        if (isRestNote(idx, noteType, notes))
            dispatchReplaceNote(notes, idx, notePath, noteType, 'no-translate', 'E', 5, null, nullArray)
        //Replacing regular note with another regular note
        else
            dispatchReplaceNote(notes, idx, notePath, noteType, notes[idx].transform, notes[idx].letter, notes[idx].row, notes[idx].accidental, notes[idx].tabPosition, nullArray)
    }
    //Replacing note to a rest note
    else
        dispatchReplaceNote(notes, idx, notePath, noteType, 'no-translate', null, 6, null, nullArray)
}

export const insertNoteInSong = (notes, notePath, noteType, nullArray = []) => {
    let idx = editIndex(notes)
    delete notes[idx]['edit']
    //If inserting rest note to regular note, show tab
    if (!isRestNote(-1, noteType, notes)) {
        //If inserting rest note to regular note, 
        //Add to normal staff line and show tab
        if (isRestNote(idx, noteType, notes))
            dispatchInsertNote(notes, idx, notePath, noteType, 'no-translate', 'E', 5, null, nullArray)
        //Inserting regular note with another regular note
        else
            dispatchInsertNote(notes, idx, notePath, noteType, notes[idx].transform, notes[idx].letter, notes[idx].row, notes[idx].accidental, notes[idx].tabPosition, nullArray)
    }
    //Inserting a rest note
    else
        dispatchInsertNote(notes, idx, notePath, noteType, 'no-translate', null, 6, null, nullArray)
}
