import store from '../Redux/Store'
import { updateNote, finishUpdatingNote, currentEditColumn, deleteAnyNote } from '../Redux/Actions/Notes'
import { showModal } from '../Redux/Actions/Modal'
import { allNotes } from './UpdateNoteLetter'
import { ARROW_KEY_RIGHT, ARROW_KEY_LEFT, EDIT } from './SourceCodeEncodings'
import { isShowingMenuAndLogout } from '../Redux/Actions/Util'

export const dateFormat = date => {
    const d = new Date(date)
    const dtf = new Intl.DateTimeFormat('en', { year: 'numeric', month: 'short', day: '2-digit' })
    const [{ value: mo }, , { value: da }, , { value: ye }] = dtf.formatToParts(d)
    return `${mo} ${da}, ${ye}`
}

export const isRestNote = (column, type, notes) => {
    if (column > -1) return notes[column] && notes[column][0].type.slice(notes[column][0].type.length - 4) === 'Rest'
    else if (type) return type.slice(type.length - 4, type.length) === 'Rest'
}

export const countNumberOfNulls = (array, index, nullCount = 0) => {
    while (array[index + 1] === null) {
        index++
        nullCount++
    }
    return nullCount
}

export const createNull = num => {
    let array = []
    for (let i = 1; i < num; i++)
        array.push(null)
    return array
}

export const getNoteColumn = (measure, columnNumber, staffNumber) => {
    const screenSize = window.screen.width
    let columnsPerStaff = 32

    if (screenSize < 800)
        columnsPerStaff = 8
    else if (screenSize < 1340)
        columnsPerStaff = 16

    return ((measure * 8) + columnNumber - 9) + (columnsPerStaff * staffNumber)
}

export const editIndex = notesArr => notesArr.findIndex(note => note?.edit)

export const getDifferentTabPosition = (notes, editColumn) => {
    const copy = [...notes]
    const notetoUpdate = copy[editColumn][editIndex(notes[editColumn])]

    notetoUpdate.tabPosition < 3 ? notetoUpdate.tabPosition++ : notetoUpdate.tabPosition = 1

    //Move position to 1 or 2 if only 2 tab positions are possible
    if (((notetoUpdate.row === 2 || notetoUpdate.row === 3) && (notetoUpdate.letter === allNotes[2] || notetoUpdate.letter === allNotes[3] || notetoUpdate.letter === allNotes[4])) || (notetoUpdate.row === 9 && (notetoUpdate.letter === allNotes[3] || notetoUpdate.letter === allNotes[4])) || (notetoUpdate.row === 10 && notetoUpdate.letter !== allNotes[11]) || (notetoUpdate.row === 11 && (notetoUpdate.letter === allNotes[1] || notetoUpdate.letter === allNotes[0])))
        notetoUpdate.tabPosition === 2 ? notetoUpdate.tabPosition = 2 : notetoUpdate.tabPosition = 1
    //Do not change position if only 1 tab position is possible
    else if (notetoUpdate.row === 1 || notetoUpdate.row === 12 || (notetoUpdate.row === 2 && (notetoUpdate.letter === allNotes[5] || notetoUpdate.letter === allNotes[6] || notetoUpdate.letter === allNotes[7])) || (notetoUpdate.row === 10 && notetoUpdate.letter === allNotes[11]) || (notetoUpdate.row === 11 && (notetoUpdate.letter !== allNotes[0] || notetoUpdate.letter !== allNotes[1])))
        notetoUpdate.tabPosition = 1

    store.dispatch(updateNote(copy))
}

export const removeEdit = (idx, notesArr, editColumn, isEditCancel = false) => {
    const columnWithEdit = notesArr[editColumn][idx]

    //isEditCancel - Cancel button when editing note
    isEditCancel ? notesArr[editColumn].splice(idx, 0)
        : notesArr[editColumn].splice(idx, 1, columnWithEdit)

    delete columnWithEdit['edit']

    store.dispatch(finishUpdatingNote())
    store.dispatch(updateNote(notesArr))
}

export const clearSheet = (notes, isAuth = false) => {
    //Allow authenticated users to delete songs even if songs have notes
    //Removes songs from database
    if (notes.length > 0 || isAuth) store.dispatch(showModal())
}

export const editNeighboringNote = (notes, editColumn, targetNote) => {
    const copyNotes = notes
    const idx = editIndex(copyNotes[editColumn])
    let currentEditableColumn

    if (targetNote === ARROW_KEY_RIGHT) {
        const newEditableColumn = copyNotes?.slice(editColumn)?.findIndex(note => note && !note?.[idx]?.edit)
        if (newEditableColumn === -1) return
        copyNotes[newEditableColumn + editColumn][0].edit = EDIT
        currentEditableColumn = newEditableColumn + editColumn
    }

    if (targetNote === ARROW_KEY_LEFT) {
        let previousEditableColumn = -1
        for (let i = editColumn - 1; i > -1; i--) {
            if (copyNotes[i] && !copyNotes[i]?.edit) {
                previousEditableColumn = editColumn - 1 - i
                break
            }
        }
        if (previousEditableColumn === -1) return
        copyNotes[editColumn - previousEditableColumn - 1][0].edit = EDIT
        currentEditableColumn = editColumn - previousEditableColumn - 1
    }

    const columnWithEdit = copyNotes[editColumn][idx]
    delete columnWithEdit['edit']

    store.dispatch(updateNote(copyNotes))
    store.dispatch(currentEditColumn(currentEditableColumn))
}

export const confirmRemove = (notes, editColumn, isShowingLogout) => {
    const notesCopy = [...notes]
    if (notesCopy[editColumn].length === 1) notesCopy.splice(editColumn, countNumberOfNulls(notesCopy, editColumn, 1))
    else notesCopy[editColumn].splice(editIndex(notesCopy[editColumn]), 1)

    store.dispatch(deleteAnyNote(notesCopy))
    store.dispatch(isShowingMenuAndLogout(!isShowingLogout))
    store.dispatch(currentEditColumn(-1))
}