export const dateFormat = date => {
    const d = new Date(date)
    const dtf = new Intl.DateTimeFormat('en', { year: 'numeric', month: 'short', day: '2-digit' })
    const [{ value: mo }, , { value: da }, , { value: ye }] = dtf.formatToParts(d)
    return `${mo} ${da}, ${ye}`
}

export const getIndex = (innerloop1, innerloop2, outerloop) =>
    ((innerloop1 * 8) + innerloop2 - 9) + (32 * outerloop)

export const isRestNote = (idx, type, notes) => {
    let copy = [...notes]
    if (idx > -1)
        return copy[idx].type.slice(copy[idx].type.length - 4) === 'Rest'
    else if (type)
        return type.slice(type.length - 4, type.length) === 'Rest'
}

export const countNumberOfNulls = (array, index, nullCount = 0) => {
    while (array[index + 1] === null) {
        index++
        nullCount++
    }
    return nullCount
}

export const editIndex = notesArr =>
    notesArr.findIndex(note => note && note.edit === 'edit-placeholder')