import store from '../Redux/Store'
import { addNote, replaceNote, insertNote } from '../Redux/Actions/Notes'
import { editIndex, countNumberOfNulls, isRestNote } from './Helpers'

const dispatchReplaceNote = (oldNotesArray, index, notePath, noteType, transform, letter, row, accidental, nullArray = []) => {
    oldNotesArray[index] = { notePath: notePath, draggable: false, type: noteType, transform: transform, letter: letter, row: row, accidental: accidental }
    oldNotesArray.splice(index + 1, countNumberOfNulls(oldNotesArray, index), ...nullArray)
    store.dispatch(replaceNote(oldNotesArray))
}

const dispatchInsertNote = (copy, idx, notePath, noteType, transform, letter, row, accidental, nullArray = []) => {
    copy.splice(idx, 0, { notePath: notePath, draggable: false, type: noteType, transform: transform, letter: letter, row: row, accidental: accidental }, ...nullArray)
    store.dispatch(insertNote(copy))
}

export const addToSongArray = (notes, note, type, letter, row, array = []) =>
    store.dispatch(addNote([...notes, { notePath: note, type: type, draggable: false, transform: 'no-translate', letter: letter, row: row, accidental: null }, ...array]))

export const replaceNoteInSong = (notes, notePath, noteType, nullArray = []) => {
    let idx = editIndex(notes)
    //Replacing note to a regular note
    if (!isRestNote(-1, noteType, notes)) {
        //If replacing rest note to regular note, show tab
        if (isRestNote(idx, noteType, notes))
            dispatchReplaceNote(notes, idx, notePath, noteType, 'no-translate', 'E', 5, null, nullArray)
        //Replacing regular note with another regular note
        else
            dispatchReplaceNote(notes, idx, notePath, noteType, notes[idx].transform, notes[idx].letter, notes[idx].row, notes[idx].accidental, nullArray)
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
            dispatchInsertNote(notes, idx, notePath, noteType, notes[idx].transform, notes[idx].letter, notes[idx].row, notes[idx].accidental, nullArray)
    }
    //Inserting a rest note
    else
        dispatchInsertNote(notes, idx, notePath, noteType, 'no-translate', null, 6, null, nullArray)
}
