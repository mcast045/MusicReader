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

export const createNull = num => {
    let array = []
    for (let i = 1; i < num; i++)
        array.push(null)
    return array
}