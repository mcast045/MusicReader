import store from '../Redux/Store'
import { addNote, replaceNote, insertNote, currentEditColumn } from '../Redux/Actions/Notes'
import { editIndex, countNumberOfNulls, isRestNote } from './Helpers'
import { allNotes } from '../HelperFunctions/UpdateNoteLetter'
import { NO_TRANSLATE } from './SourceCodeEncodings'

const dispatchReplaceNote = (oldNotesArray, editColumn, noteData, nullArray = []) => {
    const { notePath, type } = noteData
    //If restnote - remove chord. If chord - replace all notes. If 1 note - replace note
    if (isRestNote(-1, type, oldNotesArray)) {
        oldNotesArray[editColumn] = [noteData]
    } else if (oldNotesArray[editColumn].length > 1) {
        delete oldNotesArray[editColumn][editIndex(oldNotesArray[editColumn])]['edit']
        oldNotesArray[editColumn] = oldNotesArray[editColumn]?.map(note => note && { ...note, notePath, type })
    } else oldNotesArray[editColumn][editIndex(oldNotesArray[editColumn])] = noteData

    oldNotesArray.splice(editColumn + 1, countNumberOfNulls(oldNotesArray, editColumn), ...nullArray)
    store.dispatch(replaceNote(oldNotesArray))
    store.dispatch(currentEditColumn(-1))
}

const dispatchInsertNote = (oldNotesArray, index, noteData, nullArray = []) => {
    oldNotesArray.splice(index, 0, [noteData], ...nullArray)
    store.dispatch(insertNote(oldNotesArray))
    store.dispatch(currentEditColumn(-1))
}

export const addToSongArray = (notes, noteData, nullArray = []) => {
    let tabPosition = 1

    // TO-DO:  Make Notes default to 6th row to match RestNotes
    noteData?.letter ? noteData.row = 5 : noteData.row = 6

    //Make following tab be in same position as previous note's tab
    //To find previous note, skip the null 'notes'
    if (notes.length > 0) {
        let nullCount = 0
        let idx = notes.length - 1
        while (notes[idx] === null) {
            nullCount++
            idx--
        }
        tabPosition = notes[notes.length - 1 - nullCount][0].tabPosition
    }

    store.dispatch(addNote([...notes, [{ ...noteData, tabRow: 1, transform: NO_TRANSLATE, accidental: null, tabPosition }], ...nullArray]))
}

export const replaceNoteInSong = (notes, noteData, editColumn, nullArray = []) => {
    const { type } = noteData
    //Replacing note to a regular note
    if (!isRestNote(-1, type, notes)) {
        //If replacing rest note to regular note
        if (isRestNote(editColumn, type, notes))
            dispatchReplaceNote(notes, editColumn, { ...noteData, transform: NO_TRANSLATE, letter: allNotes[7], row: 5, accidental: null, position: 1, tabRow: 1 }, nullArray)
        //Replacing regular note to another regular note
        else {
            const noteToUpdate = notes[editColumn][editIndex(notes[editColumn])]
            const { transform, letter, row, accidental, tabPosition, tabRow } = noteToUpdate
            dispatchReplaceNote(notes, editColumn, { ...noteData, transform, letter, row, accidental, tabPosition, tabRow }, nullArray)
        }
    }
    //Replacing rest note to another rest note
    else
        dispatchReplaceNote(notes, editColumn, { ...noteData, transform: NO_TRANSLATE, letter: null, row: 6, accidental: null, position: null, tabRow: null }, nullArray)
}

export const insertNoteInSong = (notes, noteData, editColumn, nullArray = []) => {
    const columnWithEdit = notes[editColumn]
    const idx = editIndex(notes[editColumn])
    const { type } = noteData

    //If inserting rest note to regular note
    if (!isRestNote(-1, type, notes)) {
        //If inserting rest note to regular note, add to normal staff line and show tab
        if (isRestNote(editColumn, type, notes))
            dispatchInsertNote(notes, editColumn, { ...noteData, transform: NO_TRANSLATE, letter: allNotes[7], row: 5, accidental: null, tabRow: 1, tabPosition: 1 }, nullArray)
        //Inserting regular note with another regular note
        else {
            const { transform, letter, row, accidental, tabPosition, tabRow } = columnWithEdit[idx]
            dispatchInsertNote(notes, editColumn, { ...noteData, transform, letter, row, accidental, tabPosition, tabRow }, nullArray)
        }
    }
    //Inserting a rest note
    else {
        dispatchInsertNote(notes, editColumn, { ...noteData, transform: NO_TRANSLATE, letter: null, row: 6, accidental: null, tabPosition: null, tabRow: null }, nullArray)
    }

    delete columnWithEdit[idx]['edit']
}