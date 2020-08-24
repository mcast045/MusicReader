import store from '../Redux/Store'
import { addNote, replaceNote, insertNote, currentEditColumn } from '../Redux/Actions/Notes'
import { editIndex, countNumberOfNulls, isRestNote } from './Helpers'

const dispatchReplaceNote = (oldNotesArray, index, notePath, noteType, transform, letter, row, accidental, position, tabRow, nullArray = []) => {
    oldNotesArray[index][editIndex(oldNotesArray[index])] = { notePath: notePath, draggable: false, type: noteType, transform: transform, letter: letter, row: row, accidental: accidental, tabPosition: position, tabRow: tabRow }
    oldNotesArray.splice(index + 1, countNumberOfNulls(oldNotesArray, index), ...nullArray)
    store.dispatch(replaceNote(oldNotesArray))
    store.dispatch(currentEditColumn(-1))
}

const dispatchInsertNote = (oldNotesArray, index, notePath, noteType, transform, letter, row, accidental, position, tabRow, nullArray = []) => {
    oldNotesArray.splice(index, 0, [{ notePath: notePath, draggable: false, type: noteType, transform: transform, letter: letter, row: row, accidental: accidental, tabPosition: position, tabRow: tabRow }], ...nullArray)
    store.dispatch(insertNote(oldNotesArray))
    store.dispatch(currentEditColumn(-1))
}

export const addToSongArray = (notes, note, type, letter, row, tabRow, nullArray = []) => {
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
        notePosition = notes[notes.length - 1 - nullCount][0].tabPosition
    }

    store.dispatch(addNote([...notes, [{ notePath: note, type: type, draggable: false, transform: 'no-translate', letter: letter, row: row, accidental: null, tabPosition: notePosition, tabRow: tabRow }], ...nullArray]))
}

export const replaceNoteInSong = (notes, notePath, noteType, editColumn, nullArray = []) => {
    //Replacing note to a regular note
    if (!isRestNote(-1, noteType, notes)) {
        //If replacing rest note to regular note
        if (isRestNote(editColumn, noteType, notes))
            dispatchReplaceNote(notes, editColumn, notePath, noteType, 'no-translate', 'E', 5, null, 1, 1, nullArray)
        //Replacing regular note to another regular note
        else {
            const noteToUpdate = notes[editColumn][editIndex(notes[editColumn])]
            dispatchReplaceNote(notes, editColumn, notePath, noteType, noteToUpdate.transform, noteToUpdate.letter, noteToUpdate.row, noteToUpdate.accidental, noteToUpdate.tabPosition, noteToUpdate.tabRow, nullArray)
        }
    }
    //Replacing rest note to another rest note
    else
        dispatchReplaceNote(notes, editColumn, notePath, noteType, 'no-translate', null, 6, null, null, null, nullArray)
}

export const insertNoteInSong = (notes, notePath, noteType, editColumn, nullArray = []) => {
    const columnWithEdit = notes[editColumn]
    const idx = editIndex(notes[editColumn])

    //If inserting rest note to regular note
    if (!isRestNote(-1, noteType, notes)) {
        //If inserting rest note to regular note, 
        //Add to normal staff line and show tab
        if (isRestNote(editColumn, noteType, notes))
            dispatchInsertNote(notes, editColumn, notePath, noteType, 'no-translate', 'E', 5, null, 1, 1, nullArray)
        //Inserting regular note with another regular note
        else {
            const noteToUpdate = columnWithEdit[idx]
            dispatchInsertNote(notes, editColumn, notePath, noteType, noteToUpdate.transform, noteToUpdate.letter, noteToUpdate.row, noteToUpdate.accidental, noteToUpdate.tabPosition, noteToUpdate.tabRow, nullArray)
        }
        delete columnWithEdit[idx]['edit']
    }
    //Inserting a rest note
    else {
        dispatchInsertNote(notes, editColumn, notePath, noteType, 'no-translate', null, 6, null, null, null, nullArray)
        delete columnWithEdit[idx]['edit']
    }
}