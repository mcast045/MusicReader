import { editIndex } from './Helpers'
import store from '../Redux/Store'
import { updateNote } from '../Redux/Actions/Notes'


//Updates tabRow for each note
//If multiple notes on single tab line, hide all notes on tab line
const updateNoteTabRow = (notes, column, tabRow, tabLine, tab) => {
    const noteToUpdate = notes[column][editIndex(notes[column])]
    notes[column][tabRow].tabRow = tabLine

    // const oldRow = notes[column][tabRow].tabRow
    // const isNewTabLine = noteToUpdate && notes[column].some(note => (note !== noteToUpdate) && (note.tabRow === noteToUpdate.tabRow))
    // const notePerTabLine = notes[column].filter(notes => notes.tabRow === oldRow).length

    //Prevent updateNote() if user is searching a published song
    if (noteToUpdate) store.dispatch(updateNote(notes))

    return tab
}

export const tabValue = (tabLine, tab, notes, column, tabRow) => {
    if (tab.tabPosition === 1) {
        if (tab.row === 1) {
            if (tab.letter === 'F#') return tabLine === 1 ? updateNoteTabRow(notes, column, tabRow, tabLine, '14') : ''
            else if (tab.letter === 'F') return tabLine === 1 ? updateNoteTabRow(notes, column, tabRow, tabLine, '13') : ''
            else if (tab.letter === 'E') return tabLine === 1 ? updateNoteTabRow(notes, column, tabRow, tabLine, '12') : ''
            else if (tab.letter === 'D#') return tabLine === 1 ? updateNoteTabRow(notes, column, tabRow, tabLine, '11') : ''
        } else if (tab.row === 2) {
            if (tab.letter === 'F') return tabLine === 1 ? updateNoteTabRow(notes, column, tabRow, tabLine, '13') : ''
            else if (tab.letter === 'E') return tabLine === 1 ? updateNoteTabRow(notes, column, tabRow, tabLine, '12') : ''
            else if (tab.letter === 'D#') return tabLine === 1 ? updateNoteTabRow(notes, column, tabRow, tabLine, '11') : ''
            else if (tab.letter === 'D') return tabLine === 1 ? updateNoteTabRow(notes, column, tabRow, tabLine, '10') : ''
            else if (tab.letter === 'C#') return tabLine === 1 ? updateNoteTabRow(notes, column, tabRow, tabLine, '9') : ''
            else if (tab.letter === 'C') return tabLine === 1 ? updateNoteTabRow(notes, column, tabRow, tabLine, '8') : ''
            else if (tab.letter === 'B') return tabLine === 1 ? updateNoteTabRow(notes, column, tabRow, tabLine, '7') : ''
        } else if (tab.row === 3) {
            if (tab.letter === 'C#') return tabLine === 1 ? updateNoteTabRow(notes, column, tabRow, tabLine, '9') : ''
            else if (tab.letter === 'C') return tabLine === 1 ? updateNoteTabRow(notes, column, tabRow, tabLine, '8') : ''
            else if (tab.letter === 'B') return tabLine === 1 ? updateNoteTabRow(notes, column, tabRow, tabLine, '7') : ''
            else if (tab.letter === 'A#') return tabLine === 1 ? updateNoteTabRow(notes, column, tabRow, tabLine, '6') : ''
            else if (tab.letter === 'A') return tabLine === 1 ? updateNoteTabRow(notes, column, tabRow, tabLine, '5') : ''
            else if (tab.letter === 'G#') return tabLine === 1 ? updateNoteTabRow(notes, column, tabRow, tabLine, '4') : ''
        } else if (tab.row === 4) {
            if (tab.letter === 'A#') return tabLine === 1 ? updateNoteTabRow(notes, column, tabRow, tabLine, '6') : ''
            else if (tab.letter === 'A') return tabLine === 1 ? updateNoteTabRow(notes, column, tabRow, tabLine, '5') : ''
            else if (tab.letter === 'G#') return tabLine === 1 ? updateNoteTabRow(notes, column, tabRow, tabLine, '4') : ''
            else if (tab.letter === 'G') return tabLine === 1 ? updateNoteTabRow(notes, column, tabRow, tabLine, '3') : ''
            else if (tab.letter === 'F#') return tabLine === 1 ? updateNoteTabRow(notes, column, tabRow, tabLine, '2') : ''
            else if (tab.letter === 'F') return tabLine === 1 ? updateNoteTabRow(notes, column, tabRow, tabLine, '1') : ''
            else if (tab.letter === 'E') return tabLine === 1 ? updateNoteTabRow(notes, column, tabRow, tabLine, '0') : ''
        } else if (tab.row === 5) {
            if (tab.letter === 'F#') return tabLine === 1 ? updateNoteTabRow(notes, column, tabRow, tabLine, '2') : ''
            else if (tab.letter === 'F') return tabLine === 1 ? updateNoteTabRow(notes, column, tabRow, tabLine, '1') : ''
            else if (tab.letter === 'E') return tabLine === 1 ? updateNoteTabRow(notes, column, tabRow, tabLine, '0') : ''
            else if (tab.letter === 'D#') return tabLine === 2 ? updateNoteTabRow(notes, column, tabRow, tabLine, '4') : ''
            else if (tab.letter === 'D') return tabLine === 2 ? updateNoteTabRow(notes, column, tabRow, tabLine, '3') : ''
            else if (tab.letter === 'C#') return tabLine === 2 ? updateNoteTabRow(notes, column, tabRow, tabLine, '2') : ''
        } else if (tab.row === 6) {
            if (tab.letter === 'D#') return tabLine === 2 ? updateNoteTabRow(notes, column, tabRow, tabLine, '4') : ''
            else if (tab.letter === 'D') return tabLine === 2 ? updateNoteTabRow(notes, column, tabRow, tabLine, '3') : ''
            else if (tab.letter === 'C#') return tabLine === 2 ? updateNoteTabRow(notes, column, tabRow, tabLine, '2') : ''
            else if (tab.letter === 'C') return tabLine === 2 ? updateNoteTabRow(notes, column, tabRow, tabLine, '1') : ''
            else if (tab.letter === 'B') return tabLine === 2 ? updateNoteTabRow(notes, column, tabRow, tabLine, '0') : ''
            else if (tab.letter === 'A#') return tabLine === 3 ? updateNoteTabRow(notes, column, tabRow, tabLine, '3') : ''
        } else if (tab.row === 7) {
            if (tab.letter === 'C') return tabLine === 2 ? updateNoteTabRow(notes, column, tabRow, tabLine, '1') : ''
            else if (tab.letter === 'B') return tabLine === 2 ? updateNoteTabRow(notes, column, tabRow, tabLine, '0') : ''
            else if (tab.letter === 'A#') return tabLine === 3 ? updateNoteTabRow(notes, column, tabRow, tabLine, '3') : ''
            else if (tab.letter === 'A') return tabLine === 3 ? updateNoteTabRow(notes, column, tabRow, tabLine, '2') : ''
            else if (tab.letter === 'G#') return tabLine === 3 ? updateNoteTabRow(notes, column, tabRow, tabLine, '1') : ''
            else if (tab.letter === 'G') return tabLine === 3 ? updateNoteTabRow(notes, column, tabRow, tabLine, '0') : ''
            else if (tab.letter === 'F#') return tabLine === 4 ? updateNoteTabRow(notes, column, tabRow, tabLine, '4') : ''
        } else if (tab.row === 8) {
            if (tab.letter === 'G#') return tabLine === 3 ? updateNoteTabRow(notes, column, tabRow, tabLine, '1') : ''
            else if (tab.letter === 'G') return tabLine === 3 ? updateNoteTabRow(notes, column, tabRow, tabLine, '0') : ''
            else if (tab.letter === 'F#') return tabLine === 4 ? updateNoteTabRow(notes, column, tabRow, tabLine, '4') : ''
            else if (tab.letter === 'F') return tabLine === 4 ? updateNoteTabRow(notes, column, tabRow, tabLine, '3') : ''
            else if (tab.letter === 'E') return tabLine === 4 ? updateNoteTabRow(notes, column, tabRow, tabLine, '2') : ''
            else if (tab.letter === 'D#') return tabLine === 4 ? updateNoteTabRow(notes, column, tabRow, tabLine, '1') : ''
        } else if (tab.row === 9) {
            if (tab.letter === 'F') return tabLine === 4 ? updateNoteTabRow(notes, column, tabRow, tabLine, '3') : ''
            else if (tab.letter === 'E') return tabLine === 4 ? updateNoteTabRow(notes, column, tabRow, tabLine, '2') : ''
            else if (tab.letter === 'D#') return tabLine === 4 ? updateNoteTabRow(notes, column, tabRow, tabLine, '1') : ''
            else if (tab.letter === 'D') return tabLine === 4 ? updateNoteTabRow(notes, column, tabRow, tabLine, '0') : ''
            else if (tab.letter === 'C#') return tabLine === 5 ? updateNoteTabRow(notes, column, tabRow, tabLine, '4') : ''
            else if (tab.letter === 'C') return tabLine === 5 ? updateNoteTabRow(notes, column, tabRow, tabLine, '3') : ''
            else if (tab.letter === 'B') return tabLine === 5 ? updateNoteTabRow(notes, column, tabRow, tabLine, '2') : ''
        } else if (tab.row === 10) {
            if (tab.letter === 'C#') return tabLine === 5 ? updateNoteTabRow(notes, column, tabRow, tabLine, '4') : ''
            else if (tab.letter === 'C') return tabLine === 5 ? updateNoteTabRow(notes, column, tabRow, tabLine, '3') : ''
            else if (tab.letter === 'B') return tabLine === 5 ? updateNoteTabRow(notes, column, tabRow, tabLine, '2') : ''
            else if (tab.letter === 'A#') return tabLine === 5 ? updateNoteTabRow(notes, column, tabRow, tabLine, '1') : ''
            else if (tab.letter === 'A') return tabLine === 5 ? updateNoteTabRow(notes, column, tabRow, tabLine, '0') : ''
            else if (tab.letter === 'G#') return tabLine === 6 ? updateNoteTabRow(notes, column, tabRow, tabLine, '4') : ''
        } else if (tab.row === 11) {
            if (tab.letter === 'A#') return tabLine === 5 ? updateNoteTabRow(notes, column, tabRow, tabLine, '1') : ''
            else if (tab.letter === 'A') return tabLine === 5 ? updateNoteTabRow(notes, column, tabRow, tabLine, '0') : ''
            else if (tab.letter === 'G#') return tabLine === 6 ? updateNoteTabRow(notes, column, tabRow, tabLine, '4') : ''
            else if (tab.letter === 'G') return tabLine === 6 ? updateNoteTabRow(notes, column, tabRow, tabLine, '3') : ''
            else if (tab.letter === 'F#') return tabLine === 6 ? updateNoteTabRow(notes, column, tabRow, tabLine, '2') : ''
            else if (tab.letter === 'F') return tabLine === 6 ? updateNoteTabRow(notes, column, tabRow, tabLine, '1') : ''
            else if (tab.letter === 'E') return tabLine === 6 ? updateNoteTabRow(notes, column, tabRow, tabLine, '0') : ''
        } else if (tab.row === 12) {
            if (tab.letter === 'F#') return tabLine === 6 ? updateNoteTabRow(notes, column, tabRow, tabLine, '2') : ''
            else if (tab.letter === 'F') return tabLine === 6 ? updateNoteTabRow(notes, column, tabRow, tabLine, '1') : ''
            else if (tab.letter === 'E') return tabLine === 6 ? updateNoteTabRow(notes, column, tabRow, tabLine, '0') : ''
        }
    }



    else if (tab.tabPosition === 2) {
        if (tab.row === 1) {
            if (tab.letter === 'F#') return tabLine === 1 ? updateNoteTabRow(notes, column, tabRow, tabLine, '14') : ''
            else if (tab.letter === 'F') return tabLine === 1 ? updateNoteTabRow(notes, column, tabRow, tabLine, '13') : ''
            else if (tab.letter === 'E') return tabLine === 1 ? updateNoteTabRow(notes, column, tabRow, tabLine, '12') : ''
            else if (tab.letter === 'D#') return tabLine === 1 ? updateNoteTabRow(notes, column, tabRow, tabLine, '11') : ''
        } else if (tab.row === 2) {
            if (tab.letter === 'F') return tabLine === 1 ? updateNoteTabRow(notes, column, tabRow, tabLine, '13') : ''
            else if (tab.letter === 'E') return tabLine === 1 ? updateNoteTabRow(notes, column, tabRow, tabLine, '12') : ''
            else if (tab.letter === 'D#') return tabLine === 1 ? updateNoteTabRow(notes, column, tabRow, tabLine, '11') : ''
            else if (tab.letter === 'D') return tabLine === 1 ? updateNoteTabRow(notes, column, tabRow, tabLine, '10') : ''
            else if (tab.letter === 'C#') return tabLine === 2 ? updateNoteTabRow(notes, column, tabRow, tabLine, '14') : ''
            else if (tab.letter === 'C') return tabLine === 2 ? updateNoteTabRow(notes, column, tabRow, tabLine, '13') : ''
            else if (tab.letter === 'B') return tabLine === 2 ? updateNoteTabRow(notes, column, tabRow, tabLine, '12') : ''
        } else if (tab.row === 3) {
            if (tab.letter === 'C#') return tabLine === 2 ? updateNoteTabRow(notes, column, tabRow, tabLine, '14') : ''
            else if (tab.letter === 'C') return tabLine === 2 ? updateNoteTabRow(notes, column, tabRow, tabLine, '13') : ''
            else if (tab.letter === 'B') return tabLine === 2 ? updateNoteTabRow(notes, column, tabRow, tabLine, '12') : ''
            else if (tab.letter === 'A#') return tabLine === 2 ? updateNoteTabRow(notes, column, tabRow, tabLine, '11') : ''
            else if (tab.letter === 'A') return tabLine === 2 ? updateNoteTabRow(notes, column, tabRow, tabLine, '10') : ''
            else if (tab.letter === 'G#') return tabLine === 2 ? updateNoteTabRow(notes, column, tabRow, tabLine, '9') : ''
        } else if (tab.row === 4) {
            if (tab.letter === 'A#') return tabLine === 2 ? updateNoteTabRow(notes, column, tabRow, tabLine, '11') : ''
            else if (tab.letter === 'A') return tabLine === 2 ? updateNoteTabRow(notes, column, tabRow, tabLine, '10') : ''
            else if (tab.letter === 'G#') return tabLine === 2 ? updateNoteTabRow(notes, column, tabRow, tabLine, '9') : ''
            else if (tab.letter === 'G') return tabLine === 2 ? updateNoteTabRow(notes, column, tabRow, tabLine, '8') : ''
            else if (tab.letter === 'F#') return tabLine === 2 ? updateNoteTabRow(notes, column, tabRow, tabLine, '7') : ''
            else if (tab.letter === 'F') return tabLine === 2 ? updateNoteTabRow(notes, column, tabRow, tabLine, '6') : ''
            else if (tab.letter === 'E') return tabLine === 2 ? updateNoteTabRow(notes, column, tabRow, tabLine, '5') : ''
        } else if (tab.row === 5) {
            if (tab.letter === 'F#') return tabLine === 2 ? updateNoteTabRow(notes, column, tabRow, tabLine, '7') : ''
            else if (tab.letter === 'F') return tabLine === 2 ? updateNoteTabRow(notes, column, tabRow, tabLine, '6') : ''
            else if (tab.letter === 'E') return tabLine === 2 ? updateNoteTabRow(notes, column, tabRow, tabLine, '5') : ''
            else if (tab.letter === 'D#') return tabLine === 3 ? updateNoteTabRow(notes, column, tabRow, tabLine, '8') : ''
            else if (tab.letter === 'D') return tabLine === 3 ? updateNoteTabRow(notes, column, tabRow, tabLine, '7') : ''
            else if (tab.letter === 'C#') return tabLine === 3 ? updateNoteTabRow(notes, column, tabRow, tabLine, '6') : ''
        } else if (tab.row === 6) {
            if (tab.letter === 'D#') return tabLine === 3 ? updateNoteTabRow(notes, column, tabRow, tabLine, '8') : ''
            else if (tab.letter === 'D') return tabLine === 3 ? updateNoteTabRow(notes, column, tabRow, tabLine, '7') : ''
            else if (tab.letter === 'C#') return tabLine === 3 ? updateNoteTabRow(notes, column, tabRow, tabLine, '6') : ''
            else if (tab.letter === 'C') return tabLine === 3 ? updateNoteTabRow(notes, column, tabRow, tabLine, '5') : ''
            else if (tab.letter === 'B') return tabLine === 3 ? updateNoteTabRow(notes, column, tabRow, tabLine, '4') : ''
            else if (tab.letter === 'A#') return tabLine === 4 ? updateNoteTabRow(notes, column, tabRow, tabLine, '8') : ''
        } else if (tab.row === 7) {
            if (tab.letter === 'C') return tabLine === 3 ? updateNoteTabRow(notes, column, tabRow, tabLine, '5') : ''
            else if (tab.letter === 'B') return tabLine === 3 ? updateNoteTabRow(notes, column, tabRow, tabLine, '4') : ''
            else if (tab.letter === 'A#') return tabLine === 4 ? updateNoteTabRow(notes, column, tabRow, tabLine, '8') : ''
            else if (tab.letter === 'A') return tabLine === 4 ? updateNoteTabRow(notes, column, tabRow, tabLine, '7') : ''
            else if (tab.letter === 'G#') return tabLine === 4 ? updateNoteTabRow(notes, column, tabRow, tabLine, '6') : ''
            else if (tab.letter === 'G') return tabLine === 4 ? updateNoteTabRow(notes, column, tabRow, tabLine, '5') : ''
            else if (tab.letter === 'F#') return tabLine === 5 ? updateNoteTabRow(notes, column, tabRow, tabLine, '9') : ''
        } else if (tab.row === 8) {
            if (tab.letter === 'G#') return tabLine === 4 ? updateNoteTabRow(notes, column, tabRow, tabLine, '6') : ''
            else if (tab.letter === 'G') return tabLine === 4 ? updateNoteTabRow(notes, column, tabRow, tabLine, '5') : ''
            else if (tab.letter === 'F#') return tabLine === 5 ? updateNoteTabRow(notes, column, tabRow, tabLine, '9') : ''
            else if (tab.letter === 'F') return tabLine === 5 ? updateNoteTabRow(notes, column, tabRow, tabLine, '8') : ''
            else if (tab.letter === 'E') return tabLine === 5 ? updateNoteTabRow(notes, column, tabRow, tabLine, '7') : ''
            else if (tab.letter === 'D#') return tabLine === 5 ? updateNoteTabRow(notes, column, tabRow, tabLine, '6') : ''
        } else if (tab.row === 9) {
            if (tab.letter === 'F') return tabLine === 5 ? updateNoteTabRow(notes, column, tabRow, tabLine, '8') : ''
            else if (tab.letter === 'E') return tabLine === 5 ? updateNoteTabRow(notes, column, tabRow, tabLine, '7') : ''
            else if (tab.letter === 'D#') return tabLine === 5 ? updateNoteTabRow(notes, column, tabRow, tabLine, '6') : ''
            else if (tab.letter === 'D') return tabLine === 5 ? updateNoteTabRow(notes, column, tabRow, tabLine, '5') : ''
            else if (tab.letter === 'C#') return tabLine === 6 ? updateNoteTabRow(notes, column, tabRow, tabLine, '9') : ''
            else if (tab.letter === 'C') return tabLine === 6 ? updateNoteTabRow(notes, column, tabRow, tabLine, '8') : ''
            else if (tab.letter === 'B') return tabLine === 6 ? updateNoteTabRow(notes, column, tabRow, tabLine, '7') : ''
        } else if (tab.row === 10) {
            if (tab.letter === 'C#') return tabLine === 6 ? updateNoteTabRow(notes, column, tabRow, tabLine, '9') : ''
            else if (tab.letter === 'C') return tabLine === 6 ? updateNoteTabRow(notes, column, tabRow, tabLine, '8') : ''
            else if (tab.letter === 'B') return tabLine === 6 ? updateNoteTabRow(notes, column, tabRow, tabLine, '7') : ''
            else if (tab.letter === 'A#') return tabLine === 6 ? updateNoteTabRow(notes, column, tabRow, tabLine, '6') : ''
            else if (tab.letter === 'A') return tabLine === 6 ? updateNoteTabRow(notes, column, tabRow, tabLine, '5') : ''
            else if (tab.letter === 'G#') return tabLine === 6 ? updateNoteTabRow(notes, column, tabRow, tabLine, '4') : ''
        } else if (tab.row === 11) {
            if (tab.letter === 'A#') return tabLine === 6 ? updateNoteTabRow(notes, column, tabRow, tabLine, '6') : ''
            else if (tab.letter === 'A') return tabLine === 6 ? updateNoteTabRow(notes, column, tabRow, tabLine, '5') : ''
            else if (tab.letter === 'G#') return tabLine === 6 ? updateNoteTabRow(notes, column, tabRow, tabLine, '4') : ''
            else if (tab.letter === 'G') return tabLine === 6 ? updateNoteTabRow(notes, column, tabRow, tabLine, '3') : ''
            else if (tab.letter === 'F#') return tabLine === 6 ? updateNoteTabRow(notes, column, tabRow, tabLine, '2') : ''
            else if (tab.letter === 'F') return tabLine === 6 ? updateNoteTabRow(notes, column, tabRow, tabLine, '1') : ''
            else if (tab.letter === 'E') return tabLine === 6 ? updateNoteTabRow(notes, column, tabRow, tabLine, '0') : ''
        } else if (tab.row === 12) {
            if (tab.letter === 'F#') return tabLine === 6 ? updateNoteTabRow(notes, column, tabRow, tabLine, '2') : ''
            else if (tab.letter === 'F') return tabLine === 6 ? updateNoteTabRow(notes, column, tabRow, tabLine, '1') : ''
            else if (tab.letter === 'E') return tabLine === 6 ? updateNoteTabRow(notes, column, tabRow, tabLine, '0') : ''
        }
    }


    else if (tab.tabPosition === 3) {
        if (tab.row === 1) {
            if (tab.letter === 'F#') return tabLine === 1 ? updateNoteTabRow(notes, column, tabRow, tabLine, '14') : ''
            else if (tab.letter === 'F') return tabLine === 1 ? updateNoteTabRow(notes, column, tabRow, tabLine, '13') : ''
            else if (tab.letter === 'E') return tabLine === 1 ? updateNoteTabRow(notes, column, tabRow, tabLine, '12') : ''
            else if (tab.letter === 'D#') return tabLine === 1 ? updateNoteTabRow(notes, column, tabRow, tabLine, '11') : ''
        } else if (tab.row === 2) {
            if (tab.letter === 'F') return tabLine === 1 ? updateNoteTabRow(notes, column, tabRow, tabLine, '13') : ''
            else if (tab.letter === 'E') return tabLine === 1 ? updateNoteTabRow(notes, column, tabRow, tabLine, '12') : ''
            else if (tab.letter === 'D#') return tabLine === 1 ? updateNoteTabRow(notes, column, tabRow, tabLine, '11') : ''
            else if (tab.letter === 'D') return tabLine === 1 ? updateNoteTabRow(notes, column, tabRow, tabLine, '10') : ''
            else if (tab.letter === 'C#') return tabLine === 2 ? updateNoteTabRow(notes, column, tabRow, tabLine, '14') : ''
            else if (tab.letter === 'C') return tabLine === 2 ? updateNoteTabRow(notes, column, tabRow, tabLine, '13') : ''
            else if (tab.letter === 'B') return tabLine === 2 ? updateNoteTabRow(notes, column, tabRow, tabLine, '12') : ''
        } else if (tab.row === 3) {
            if (tab.letter === 'C#') return tabLine === 2 ? updateNoteTabRow(notes, column, tabRow, tabLine, '14') : ''
            else if (tab.letter === 'C') return tabLine === 2 ? updateNoteTabRow(notes, column, tabRow, tabLine, '13') : ''
            else if (tab.letter === 'B') return tabLine === 2 ? updateNoteTabRow(notes, column, tabRow, tabLine, '12') : ''
            else if (tab.letter === 'A#') return tabLine === 3 ? updateNoteTabRow(notes, column, tabRow, tabLine, '15') : ''
            else if (tab.letter === 'A') return tabLine === 3 ? updateNoteTabRow(notes, column, tabRow, tabLine, '14') : ''
            else if (tab.letter === 'G#') return tabLine === 3 ? updateNoteTabRow(notes, column, tabRow, tabLine, '13') : ''
        } else if (tab.row === 4) {
            if (tab.letter === 'A#') return tabLine === 3 ? updateNoteTabRow(notes, column, tabRow, tabLine, '15') : ''
            else if (tab.letter === 'A') return tabLine === 3 ? updateNoteTabRow(notes, column, tabRow, tabLine, '14') : ''
            else if (tab.letter === 'G#') return tabLine === 3 ? updateNoteTabRow(notes, column, tabRow, tabLine, '13') : ''
            else if (tab.letter === 'G') return tabLine === 3 ? updateNoteTabRow(notes, column, tabRow, tabLine, '12') : ''
            else if (tab.letter === 'F#') return tabLine === 3 ? updateNoteTabRow(notes, column, tabRow, tabLine, '11') : ''
            else if (tab.letter === 'F') return tabLine === 3 ? updateNoteTabRow(notes, column, tabRow, tabLine, '10') : ''
            else if (tab.letter === 'E') return tabLine === 3 ? updateNoteTabRow(notes, column, tabRow, tabLine, '9') : ''
        } else if (tab.row === 5) {
            if (tab.letter === 'F#') return tabLine === 3 ? updateNoteTabRow(notes, column, tabRow, tabLine, '11') : ''
            else if (tab.letter === 'F') return tabLine === 3 ? updateNoteTabRow(notes, column, tabRow, tabLine, '10') : ''
            else if (tab.letter === 'E') return tabLine === 3 ? updateNoteTabRow(notes, column, tabRow, tabLine, '9') : ''
            else if (tab.letter === 'D#') return tabLine === 4 ? updateNoteTabRow(notes, column, tabRow, tabLine, '13') : ''
            else if (tab.letter === 'D') return tabLine === 4 ? updateNoteTabRow(notes, column, tabRow, tabLine, '12') : ''
            else if (tab.letter === 'C#') return tabLine === 4 ? updateNoteTabRow(notes, column, tabRow, tabLine, '11') : ''
        } else if (tab.row === 6) {
            if (tab.letter === 'D#') return tabLine === 4 ? updateNoteTabRow(notes, column, tabRow, tabLine, '13') : ''
            else if (tab.letter === 'D') return tabLine === 4 ? updateNoteTabRow(notes, column, tabRow, tabLine, '12') : ''
            else if (tab.letter === 'C#') return tabLine === 4 ? updateNoteTabRow(notes, column, tabRow, tabLine, '11') : ''
            else if (tab.letter === 'C') return tabLine === 4 ? updateNoteTabRow(notes, column, tabRow, tabLine, '10') : ''
            else if (tab.letter === 'B') return tabLine === 4 ? updateNoteTabRow(notes, column, tabRow, tabLine, '9') : ''
            else if (tab.letter === 'A#') return tabLine === 5 ? updateNoteTabRow(notes, column, tabRow, tabLine, '13') : ''
        } else if (tab.row === 7) {
            if (tab.letter === 'C') return tabLine === 4 ? updateNoteTabRow(notes, column, tabRow, tabLine, '10') : ''
            else if (tab.letter === 'B') return tabLine === 4 ? updateNoteTabRow(notes, column, tabRow, tabLine, '9') : ''
            else if (tab.letter === 'A#') return tabLine === 5 ? updateNoteTabRow(notes, column, tabRow, tabLine, '13') : ''
            else if (tab.letter === 'A') return tabLine === 5 ? updateNoteTabRow(notes, column, tabRow, tabLine, '12') : ''
            else if (tab.letter === 'G#') return tabLine === 5 ? updateNoteTabRow(notes, column, tabRow, tabLine, '11') : ''
            else if (tab.letter === 'G') return tabLine === 5 ? updateNoteTabRow(notes, column, tabRow, tabLine, '10') : ''
            else if (tab.letter === 'F#') return tabLine === 6 ? updateNoteTabRow(notes, column, tabRow, tabLine, '14') : ''
        } else if (tab.row === 8) {
            if (tab.letter === 'G#') return tabLine === 5 ? updateNoteTabRow(notes, column, tabRow, tabLine, '11') : ''
            else if (tab.letter === 'G') return tabLine === 5 ? updateNoteTabRow(notes, column, tabRow, tabLine, '10') : ''
            else if (tab.letter === 'F#') return tabLine === 6 ? updateNoteTabRow(notes, column, tabRow, tabLine, '14') : ''
            else if (tab.letter === 'F') return tabLine === 6 ? updateNoteTabRow(notes, column, tabRow, tabLine, '13') : ''
            else if (tab.letter === 'E') return tabLine === 6 ? updateNoteTabRow(notes, column, tabRow, tabLine, '12') : ''
            else if (tab.letter === 'D#') return tabLine === 6 ? updateNoteTabRow(notes, column, tabRow, tabLine, '11') : ''
        } else if (tab.row === 9) {
            if (tab.letter === 'F') return tabLine === 6 ? updateNoteTabRow(notes, column, tabRow, tabLine, '13') : ''
            else if (tab.letter === 'E') return tabLine === 6 ? updateNoteTabRow(notes, column, tabRow, tabLine, '12') : ''
            else if (tab.letter === 'D#') return tabLine === 6 ? updateNoteTabRow(notes, column, tabRow, tabLine, '11') : ''
            else if (tab.letter === 'D') return tabLine === 6 ? updateNoteTabRow(notes, column, tabRow, tabLine, '10') : ''
            else if (tab.letter === 'C#') return tabLine === 6 ? updateNoteTabRow(notes, column, tabRow, tabLine, '9') : ''
            else if (tab.letter === 'C') return tabLine === 6 ? updateNoteTabRow(notes, column, tabRow, tabLine, '8') : ''
            else if (tab.letter === 'B') return tabLine === 6 ? updateNoteTabRow(notes, column, tabRow, tabLine, '7') : ''
        } else if (tab.row === 10) {
            if (tab.letter === 'C#') return tabLine === 6 ? updateNoteTabRow(notes, column, tabRow, tabLine, '9') : ''
            else if (tab.letter === 'C') return tabLine === 6 ? updateNoteTabRow(notes, column, tabRow, tabLine, '8') : ''
            else if (tab.letter === 'B') return tabLine === 6 ? updateNoteTabRow(notes, column, tabRow, tabLine, '7') : ''
            else if (tab.letter === 'A#') return tabLine === 6 ? updateNoteTabRow(notes, column, tabRow, tabLine, '6') : ''
            else if (tab.letter === 'A') return tabLine === 6 ? updateNoteTabRow(notes, column, tabRow, tabLine, '5') : ''
            else if (tab.letter === 'G#') return tabLine === 6 ? updateNoteTabRow(notes, column, tabRow, tabLine, '4') : ''
        } else if (tab.row === 11) {
            if (tab.letter === 'A#') return tabLine === 6 ? updateNoteTabRow(notes, column, tabRow, tabLine, '6') : ''
            else if (tab.letter === 'A') return tabLine === 6 ? updateNoteTabRow(notes, column, tabRow, tabLine, '5') : ''
            else if (tab.letter === 'G#') return tabLine === 6 ? updateNoteTabRow(notes, column, tabRow, tabLine, '4') : ''
            else if (tab.letter === 'G') return tabLine === 6 ? updateNoteTabRow(notes, column, tabRow, tabLine, '3') : ''
            else if (tab.letter === 'F#') return tabLine === 6 ? updateNoteTabRow(notes, column, tabRow, tabLine, '2') : ''
            else if (tab.letter === 'F') return tabLine === 6 ? updateNoteTabRow(notes, column, tabRow, tabLine, '1') : ''
            else if (tab.letter === 'E') return tabLine === 6 ? updateNoteTabRow(notes, column, tabRow, tabLine, '0') : ''
        } else if (tab.row === 12) {
            if (tab.letter === 'F#') return tabLine === 6 ? updateNoteTabRow(notes, column, tabRow, tabLine, '2') : ''
            else if (tab.letter === 'F') return tabLine === 6 ? updateNoteTabRow(notes, column, tabRow, tabLine, '1') : ''
            else if (tab.letter === 'E') return tabLine === 6 ? updateNoteTabRow(notes, column, tabRow, tabLine, '0') : ''
        }
    }


    return ''
}