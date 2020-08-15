import store from '../Redux/Store'
import { updateNote } from '../Redux/Actions/Notes'

export const dateFormat = date => {
    const d = new Date(date)
    const dtf = new Intl.DateTimeFormat('en', { year: 'numeric', month: 'short', day: '2-digit' })
    const [{ value: mo }, , { value: da }, , { value: ye }] = dtf.formatToParts(d)
    return `${mo} ${da}, ${ye}`
}

export const isRestNote = (idx, type, notes) => {
    if (idx > -1) return notes[idx].type.slice(notes[idx].type.length - 4) === 'Rest'
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

export const editIndex = notesArr =>
    notesArr.findIndex(note => note && note.edit === 'edit-placeholder')


export const getDifferentTabPosition = notes => {
    let copy = [...notes]
    let idx = editIndex(copy)
    copy[idx].tabPosition < 3 ? copy[idx].tabPosition++ : copy[idx].tabPosition = 1

    //Move position to 1 or 2 if only 2 tab positions are possible
    if (((copy[idx].row === 2 || copy[idx].row === 3) && (copy[idx].letter === 'B' || copy[idx].letter === 'C' || copy[idx].letter === 'C#')) || (copy[idx].row === 9 && (copy[idx].letter === 'C' || copy[idx].letter === 'C#')) || (copy[idx].row === 10 && copy[idx].letter !== 'G#') || (copy[idx].row === 11 && (copy[idx].letter === 'A#' || copy[idx].letter === 'A')))
        copy[idx].tabPosition === 2 ? copy[idx].tabPosition = 2 : copy[idx].tabPosition = 1
    //Do not change position if only 1 tab position is possible
    else if (copy[idx].row === 1 || copy[idx].row === 12 || (copy[idx].row === 2 && (copy[idx].letter === 'D' || copy[idx].letter === 'D#' || copy[idx].letter === 'E')) || (copy[idx].row === 10 && copy[idx].letter === 'G#') || (copy[idx].row === 11 && (copy[idx].letter !== 'A' || copy[idx].letter !== 'A#')))
        copy[idx].tabPosition = 1

    store.dispatch(updateNote(copy))
}