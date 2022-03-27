import { allNotes } from './UpdateNoteLetter'

const updateNoteTabRow = (notes, column, tabRow, tabLine, tab) => {
    notes[column][tabRow].tabRow = tabLine
    return tab
}

export const tabValue = (tabLine, tab, notes, column, tabRow) => {
    const { tabPosition, row, letter } = tab
    if (tabPosition === 1) {
        if (row === 1) {
            if (letter === allNotes[9]) return tabLine === 1 ? updateNoteTabRow(notes, column, tabRow, tabLine, '14') : ''
            else if (letter === allNotes[8]) return tabLine === 1 ? updateNoteTabRow(notes, column, tabRow, tabLine, '13') : ''
            else if (letter === allNotes[7]) return tabLine === 1 ? updateNoteTabRow(notes, column, tabRow, tabLine, '12') : ''
            else if (letter === allNotes[6]) return tabLine === 1 ? updateNoteTabRow(notes, column, tabRow, tabLine, '11') : ''
        } else if (row === 2) {
            if (letter === allNotes[8]) return tabLine === 1 ? updateNoteTabRow(notes, column, tabRow, tabLine, '13') : ''
            else if (letter === allNotes[7]) return tabLine === 1 ? updateNoteTabRow(notes, column, tabRow, tabLine, '12') : ''
            else if (letter === allNotes[6]) return tabLine === 1 ? updateNoteTabRow(notes, column, tabRow, tabLine, '11') : ''
            else if (letter === allNotes[5]) return tabLine === 1 ? updateNoteTabRow(notes, column, tabRow, tabLine, '10') : ''
            else if (letter === allNotes[4]) return tabLine === 1 ? updateNoteTabRow(notes, column, tabRow, tabLine, '9') : ''
            else if (letter === allNotes[3]) return tabLine === 1 ? updateNoteTabRow(notes, column, tabRow, tabLine, '8') : ''
            else if (letter === allNotes[2]) return tabLine === 1 ? updateNoteTabRow(notes, column, tabRow, tabLine, '7') : ''
        } else if (row === 3) {
            if (letter === allNotes[4]) return tabLine === 1 ? updateNoteTabRow(notes, column, tabRow, tabLine, '9') : ''
            else if (letter === allNotes[3]) return tabLine === 1 ? updateNoteTabRow(notes, column, tabRow, tabLine, '8') : ''
            else if (letter === allNotes[2]) return tabLine === 1 ? updateNoteTabRow(notes, column, tabRow, tabLine, '7') : ''
            else if (letter === allNotes[1]) return tabLine === 1 ? updateNoteTabRow(notes, column, tabRow, tabLine, '6') : ''
            else if (letter === allNotes[0]) return tabLine === 1 ? updateNoteTabRow(notes, column, tabRow, tabLine, '5') : ''
            else if (letter === allNotes[11]) return tabLine === 1 ? updateNoteTabRow(notes, column, tabRow, tabLine, '4') : ''
        } else if (row === 4) {
            if (letter === allNotes[1]) return tabLine === 1 ? updateNoteTabRow(notes, column, tabRow, tabLine, '6') : ''
            else if (letter === allNotes[0]) return tabLine === 1 ? updateNoteTabRow(notes, column, tabRow, tabLine, '5') : ''
            else if (letter === allNotes[11]) return tabLine === 1 ? updateNoteTabRow(notes, column, tabRow, tabLine, '4') : ''
            else if (letter === allNotes[10]) return tabLine === 1 ? updateNoteTabRow(notes, column, tabRow, tabLine, '3') : ''
            else if (letter === allNotes[9]) return tabLine === 1 ? updateNoteTabRow(notes, column, tabRow, tabLine, '2') : ''
            else if (letter === allNotes[8]) return tabLine === 1 ? updateNoteTabRow(notes, column, tabRow, tabLine, '1') : ''
            else if (letter === allNotes[7]) return tabLine === 1 ? updateNoteTabRow(notes, column, tabRow, tabLine, '0') : ''
        } else if (row === 5) {
            if (letter === allNotes[9]) return tabLine === 1 ? updateNoteTabRow(notes, column, tabRow, tabLine, '2') : ''
            else if (letter === allNotes[8]) return tabLine === 1 ? updateNoteTabRow(notes, column, tabRow, tabLine, '1') : ''
            else if (letter === allNotes[7]) return tabLine === 1 ? updateNoteTabRow(notes, column, tabRow, tabLine, '0') : ''
            else if (letter === allNotes[6]) return tabLine === 2 ? updateNoteTabRow(notes, column, tabRow, tabLine, '4') : ''
            else if (letter === allNotes[5]) return tabLine === 2 ? updateNoteTabRow(notes, column, tabRow, tabLine, '3') : ''
            else if (letter === allNotes[4]) return tabLine === 2 ? updateNoteTabRow(notes, column, tabRow, tabLine, '2') : ''
        } else if (row === 6) {
            if (letter === allNotes[6]) return tabLine === 2 ? updateNoteTabRow(notes, column, tabRow, tabLine, '4') : ''
            else if (letter === allNotes[5]) return tabLine === 2 ? updateNoteTabRow(notes, column, tabRow, tabLine, '3') : ''
            else if (letter === allNotes[4]) return tabLine === 2 ? updateNoteTabRow(notes, column, tabRow, tabLine, '2') : ''
            else if (letter === allNotes[3]) return tabLine === 2 ? updateNoteTabRow(notes, column, tabRow, tabLine, '1') : ''
            else if (letter === allNotes[2]) return tabLine === 2 ? updateNoteTabRow(notes, column, tabRow, tabLine, '0') : ''
            else if (letter === allNotes[1]) return tabLine === 3 ? updateNoteTabRow(notes, column, tabRow, tabLine, '3') : ''
        } else if (row === 7) {
            if (letter === allNotes[3]) return tabLine === 2 ? updateNoteTabRow(notes, column, tabRow, tabLine, '1') : ''
            else if (letter === allNotes[2]) return tabLine === 2 ? updateNoteTabRow(notes, column, tabRow, tabLine, '0') : ''
            else if (letter === allNotes[1]) return tabLine === 3 ? updateNoteTabRow(notes, column, tabRow, tabLine, '3') : ''
            else if (letter === allNotes[0]) return tabLine === 3 ? updateNoteTabRow(notes, column, tabRow, tabLine, '2') : ''
            else if (letter === allNotes[11]) return tabLine === 3 ? updateNoteTabRow(notes, column, tabRow, tabLine, '1') : ''
            else if (letter === allNotes[10]) return tabLine === 3 ? updateNoteTabRow(notes, column, tabRow, tabLine, '0') : ''
            else if (letter === allNotes[9]) return tabLine === 4 ? updateNoteTabRow(notes, column, tabRow, tabLine, '4') : ''
        } else if (row === 8) {
            if (letter === allNotes[11]) return tabLine === 3 ? updateNoteTabRow(notes, column, tabRow, tabLine, '1') : ''
            else if (letter === allNotes[10]) return tabLine === 3 ? updateNoteTabRow(notes, column, tabRow, tabLine, '0') : ''
            else if (letter === allNotes[9]) return tabLine === 4 ? updateNoteTabRow(notes, column, tabRow, tabLine, '4') : ''
            else if (letter === allNotes[8]) return tabLine === 4 ? updateNoteTabRow(notes, column, tabRow, tabLine, '3') : ''
            else if (letter === allNotes[7]) return tabLine === 4 ? updateNoteTabRow(notes, column, tabRow, tabLine, '2') : ''
            else if (letter === allNotes[6]) return tabLine === 4 ? updateNoteTabRow(notes, column, tabRow, tabLine, '1') : ''
        } else if (row === 9) {
            if (letter === allNotes[8]) return tabLine === 4 ? updateNoteTabRow(notes, column, tabRow, tabLine, '3') : ''
            else if (letter === allNotes[7]) return tabLine === 4 ? updateNoteTabRow(notes, column, tabRow, tabLine, '2') : ''
            else if (letter === allNotes[6]) return tabLine === 4 ? updateNoteTabRow(notes, column, tabRow, tabLine, '1') : ''
            else if (letter === allNotes[5]) return tabLine === 4 ? updateNoteTabRow(notes, column, tabRow, tabLine, '0') : ''
            else if (letter === allNotes[4]) return tabLine === 5 ? updateNoteTabRow(notes, column, tabRow, tabLine, '4') : ''
            else if (letter === allNotes[3]) return tabLine === 5 ? updateNoteTabRow(notes, column, tabRow, tabLine, '3') : ''
            else if (letter === allNotes[2]) return tabLine === 5 ? updateNoteTabRow(notes, column, tabRow, tabLine, '2') : ''
        } else if (row === 10) {
            if (letter === allNotes[4]) return tabLine === 5 ? updateNoteTabRow(notes, column, tabRow, tabLine, '4') : ''
            else if (letter === allNotes[3]) return tabLine === 5 ? updateNoteTabRow(notes, column, tabRow, tabLine, '3') : ''
            else if (letter === allNotes[2]) return tabLine === 5 ? updateNoteTabRow(notes, column, tabRow, tabLine, '2') : ''
            else if (letter === allNotes[1]) return tabLine === 5 ? updateNoteTabRow(notes, column, tabRow, tabLine, '1') : ''
            else if (letter === allNotes[0]) return tabLine === 5 ? updateNoteTabRow(notes, column, tabRow, tabLine, '0') : ''
            else if (letter === allNotes[11]) return tabLine === 6 ? updateNoteTabRow(notes, column, tabRow, tabLine, '4') : ''
        } else if (row === 11) {
            if (letter === allNotes[1]) return tabLine === 5 ? updateNoteTabRow(notes, column, tabRow, tabLine, '1') : ''
            else if (letter === allNotes[0]) return tabLine === 5 ? updateNoteTabRow(notes, column, tabRow, tabLine, '0') : ''
            else if (letter === allNotes[11]) return tabLine === 6 ? updateNoteTabRow(notes, column, tabRow, tabLine, '4') : ''
            else if (letter === allNotes[10]) return tabLine === 6 ? updateNoteTabRow(notes, column, tabRow, tabLine, '3') : ''
            else if (letter === allNotes[9]) return tabLine === 6 ? updateNoteTabRow(notes, column, tabRow, tabLine, '2') : ''
            else if (letter === allNotes[8]) return tabLine === 6 ? updateNoteTabRow(notes, column, tabRow, tabLine, '1') : ''
            else if (letter === allNotes[7]) return tabLine === 6 ? updateNoteTabRow(notes, column, tabRow, tabLine, '0') : ''
        } else if (row === 12) {
            if (letter === allNotes[9]) return tabLine === 6 ? updateNoteTabRow(notes, column, tabRow, tabLine, '2') : ''
            else if (letter === allNotes[8]) return tabLine === 6 ? updateNoteTabRow(notes, column, tabRow, tabLine, '1') : ''
            else if (letter === allNotes[7]) return tabLine === 6 ? updateNoteTabRow(notes, column, tabRow, tabLine, '0') : ''
        }
    }



    else if (tabPosition === 2) {
        if (row === 1) {
            if (letter === allNotes[9]) return tabLine === 1 ? updateNoteTabRow(notes, column, tabRow, tabLine, '14') : ''
            else if (letter === allNotes[8]) return tabLine === 1 ? updateNoteTabRow(notes, column, tabRow, tabLine, '13') : ''
            else if (letter === allNotes[7]) return tabLine === 1 ? updateNoteTabRow(notes, column, tabRow, tabLine, '12') : ''
            else if (letter === allNotes[6]) return tabLine === 1 ? updateNoteTabRow(notes, column, tabRow, tabLine, '11') : ''
        } else if (row === 2) {
            if (letter === allNotes[8]) return tabLine === 1 ? updateNoteTabRow(notes, column, tabRow, tabLine, '13') : ''
            else if (letter === allNotes[7]) return tabLine === 1 ? updateNoteTabRow(notes, column, tabRow, tabLine, '12') : ''
            else if (letter === allNotes[6]) return tabLine === 1 ? updateNoteTabRow(notes, column, tabRow, tabLine, '11') : ''
            else if (letter === allNotes[5]) return tabLine === 1 ? updateNoteTabRow(notes, column, tabRow, tabLine, '10') : ''
            else if (letter === allNotes[4]) return tabLine === 2 ? updateNoteTabRow(notes, column, tabRow, tabLine, '14') : ''
            else if (letter === allNotes[3]) return tabLine === 2 ? updateNoteTabRow(notes, column, tabRow, tabLine, '13') : ''
            else if (letter === allNotes[2]) return tabLine === 2 ? updateNoteTabRow(notes, column, tabRow, tabLine, '12') : ''
        } else if (row === 3) {
            if (letter === allNotes[4]) return tabLine === 2 ? updateNoteTabRow(notes, column, tabRow, tabLine, '14') : ''
            else if (letter === allNotes[3]) return tabLine === 2 ? updateNoteTabRow(notes, column, tabRow, tabLine, '13') : ''
            else if (letter === allNotes[2]) return tabLine === 2 ? updateNoteTabRow(notes, column, tabRow, tabLine, '12') : ''
            else if (letter === allNotes[1]) return tabLine === 2 ? updateNoteTabRow(notes, column, tabRow, tabLine, '11') : ''
            else if (letter === allNotes[0]) return tabLine === 2 ? updateNoteTabRow(notes, column, tabRow, tabLine, '10') : ''
            else if (letter === allNotes[11]) return tabLine === 2 ? updateNoteTabRow(notes, column, tabRow, tabLine, '9') : ''
        } else if (row === 4) {
            if (letter === allNotes[1]) return tabLine === 2 ? updateNoteTabRow(notes, column, tabRow, tabLine, '11') : ''
            else if (letter === allNotes[0]) return tabLine === 2 ? updateNoteTabRow(notes, column, tabRow, tabLine, '10') : ''
            else if (letter === allNotes[11]) return tabLine === 2 ? updateNoteTabRow(notes, column, tabRow, tabLine, '9') : ''
            else if (letter === allNotes[10]) return tabLine === 2 ? updateNoteTabRow(notes, column, tabRow, tabLine, '8') : ''
            else if (letter === allNotes[9]) return tabLine === 2 ? updateNoteTabRow(notes, column, tabRow, tabLine, '7') : ''
            else if (letter === allNotes[8]) return tabLine === 2 ? updateNoteTabRow(notes, column, tabRow, tabLine, '6') : ''
            else if (letter === allNotes[7]) return tabLine === 2 ? updateNoteTabRow(notes, column, tabRow, tabLine, '5') : ''
        } else if (row === 5) {
            if (letter === allNotes[9]) return tabLine === 2 ? updateNoteTabRow(notes, column, tabRow, tabLine, '7') : ''
            else if (letter === allNotes[8]) return tabLine === 2 ? updateNoteTabRow(notes, column, tabRow, tabLine, '6') : ''
            else if (letter === allNotes[7]) return tabLine === 2 ? updateNoteTabRow(notes, column, tabRow, tabLine, '5') : ''
            else if (letter === allNotes[6]) return tabLine === 3 ? updateNoteTabRow(notes, column, tabRow, tabLine, '8') : ''
            else if (letter === allNotes[5]) return tabLine === 3 ? updateNoteTabRow(notes, column, tabRow, tabLine, '7') : ''
            else if (letter === allNotes[4]) return tabLine === 3 ? updateNoteTabRow(notes, column, tabRow, tabLine, '6') : ''
        } else if (row === 6) {
            if (letter === allNotes[6]) return tabLine === 3 ? updateNoteTabRow(notes, column, tabRow, tabLine, '8') : ''
            else if (letter === allNotes[5]) return tabLine === 3 ? updateNoteTabRow(notes, column, tabRow, tabLine, '7') : ''
            else if (letter === allNotes[4]) return tabLine === 3 ? updateNoteTabRow(notes, column, tabRow, tabLine, '6') : ''
            else if (letter === allNotes[3]) return tabLine === 3 ? updateNoteTabRow(notes, column, tabRow, tabLine, '5') : ''
            else if (letter === allNotes[2]) return tabLine === 3 ? updateNoteTabRow(notes, column, tabRow, tabLine, '4') : ''
            else if (letter === allNotes[1]) return tabLine === 4 ? updateNoteTabRow(notes, column, tabRow, tabLine, '8') : ''
        } else if (row === 7) {
            if (letter === allNotes[3]) return tabLine === 3 ? updateNoteTabRow(notes, column, tabRow, tabLine, '5') : ''
            else if (letter === allNotes[2]) return tabLine === 3 ? updateNoteTabRow(notes, column, tabRow, tabLine, '4') : ''
            else if (letter === allNotes[1]) return tabLine === 4 ? updateNoteTabRow(notes, column, tabRow, tabLine, '8') : ''
            else if (letter === allNotes[0]) return tabLine === 4 ? updateNoteTabRow(notes, column, tabRow, tabLine, '7') : ''
            else if (letter === allNotes[11]) return tabLine === 4 ? updateNoteTabRow(notes, column, tabRow, tabLine, '6') : ''
            else if (letter === allNotes[10]) return tabLine === 4 ? updateNoteTabRow(notes, column, tabRow, tabLine, '5') : ''
            else if (letter === allNotes[9]) return tabLine === 5 ? updateNoteTabRow(notes, column, tabRow, tabLine, '9') : ''
        } else if (row === 8) {
            if (letter === allNotes[11]) return tabLine === 4 ? updateNoteTabRow(notes, column, tabRow, tabLine, '6') : ''
            else if (letter === allNotes[10]) return tabLine === 4 ? updateNoteTabRow(notes, column, tabRow, tabLine, '5') : ''
            else if (letter === allNotes[9]) return tabLine === 5 ? updateNoteTabRow(notes, column, tabRow, tabLine, '9') : ''
            else if (letter === allNotes[8]) return tabLine === 5 ? updateNoteTabRow(notes, column, tabRow, tabLine, '8') : ''
            else if (letter === allNotes[7]) return tabLine === 5 ? updateNoteTabRow(notes, column, tabRow, tabLine, '7') : ''
            else if (letter === allNotes[6]) return tabLine === 5 ? updateNoteTabRow(notes, column, tabRow, tabLine, '6') : ''
        } else if (row === 9) {
            if (letter === allNotes[8]) return tabLine === 5 ? updateNoteTabRow(notes, column, tabRow, tabLine, '8') : ''
            else if (letter === allNotes[7]) return tabLine === 5 ? updateNoteTabRow(notes, column, tabRow, tabLine, '7') : ''
            else if (letter === allNotes[6]) return tabLine === 5 ? updateNoteTabRow(notes, column, tabRow, tabLine, '6') : ''
            else if (letter === allNotes[5]) return tabLine === 5 ? updateNoteTabRow(notes, column, tabRow, tabLine, '5') : ''
            else if (letter === allNotes[4]) return tabLine === 6 ? updateNoteTabRow(notes, column, tabRow, tabLine, '9') : ''
            else if (letter === allNotes[3]) return tabLine === 6 ? updateNoteTabRow(notes, column, tabRow, tabLine, '8') : ''
            else if (letter === allNotes[2]) return tabLine === 6 ? updateNoteTabRow(notes, column, tabRow, tabLine, '7') : ''
        } else if (row === 10) {
            if (letter === allNotes[4]) return tabLine === 6 ? updateNoteTabRow(notes, column, tabRow, tabLine, '9') : ''
            else if (letter === allNotes[3]) return tabLine === 6 ? updateNoteTabRow(notes, column, tabRow, tabLine, '8') : ''
            else if (letter === allNotes[2]) return tabLine === 6 ? updateNoteTabRow(notes, column, tabRow, tabLine, '7') : ''
            else if (letter === allNotes[1]) return tabLine === 6 ? updateNoteTabRow(notes, column, tabRow, tabLine, '6') : ''
            else if (letter === allNotes[0]) return tabLine === 6 ? updateNoteTabRow(notes, column, tabRow, tabLine, '5') : ''
            else if (letter === allNotes[11]) return tabLine === 6 ? updateNoteTabRow(notes, column, tabRow, tabLine, '4') : ''
        } else if (row === 11) {
            if (letter === allNotes[1]) return tabLine === 6 ? updateNoteTabRow(notes, column, tabRow, tabLine, '6') : ''
            else if (letter === allNotes[0]) return tabLine === 6 ? updateNoteTabRow(notes, column, tabRow, tabLine, '5') : ''
            else if (letter === allNotes[11]) return tabLine === 6 ? updateNoteTabRow(notes, column, tabRow, tabLine, '4') : ''
            else if (letter === allNotes[10]) return tabLine === 6 ? updateNoteTabRow(notes, column, tabRow, tabLine, '3') : ''
            else if (letter === allNotes[9]) return tabLine === 6 ? updateNoteTabRow(notes, column, tabRow, tabLine, '2') : ''
            else if (letter === allNotes[8]) return tabLine === 6 ? updateNoteTabRow(notes, column, tabRow, tabLine, '1') : ''
            else if (letter === allNotes[7]) return tabLine === 6 ? updateNoteTabRow(notes, column, tabRow, tabLine, '0') : ''
        } else if (row === 12) {
            if (letter === allNotes[9]) return tabLine === 6 ? updateNoteTabRow(notes, column, tabRow, tabLine, '2') : ''
            else if (letter === allNotes[8]) return tabLine === 6 ? updateNoteTabRow(notes, column, tabRow, tabLine, '1') : ''
            else if (letter === allNotes[7]) return tabLine === 6 ? updateNoteTabRow(notes, column, tabRow, tabLine, '0') : ''
        }
    }


    else if (tabPosition === 3) {
        if (row === 1) {
            if (letter === allNotes[9]) return tabLine === 1 ? updateNoteTabRow(notes, column, tabRow, tabLine, '14') : ''
            else if (letter === allNotes[8]) return tabLine === 1 ? updateNoteTabRow(notes, column, tabRow, tabLine, '13') : ''
            else if (letter === allNotes[7]) return tabLine === 1 ? updateNoteTabRow(notes, column, tabRow, tabLine, '12') : ''
            else if (letter === allNotes[6]) return tabLine === 1 ? updateNoteTabRow(notes, column, tabRow, tabLine, '11') : ''
        } else if (row === 2) {
            if (letter === allNotes[8]) return tabLine === 1 ? updateNoteTabRow(notes, column, tabRow, tabLine, '13') : ''
            else if (letter === allNotes[7]) return tabLine === 1 ? updateNoteTabRow(notes, column, tabRow, tabLine, '12') : ''
            else if (letter === allNotes[6]) return tabLine === 1 ? updateNoteTabRow(notes, column, tabRow, tabLine, '11') : ''
            else if (letter === allNotes[5]) return tabLine === 1 ? updateNoteTabRow(notes, column, tabRow, tabLine, '10') : ''
            else if (letter === allNotes[4]) return tabLine === 2 ? updateNoteTabRow(notes, column, tabRow, tabLine, '14') : ''
            else if (letter === allNotes[3]) return tabLine === 2 ? updateNoteTabRow(notes, column, tabRow, tabLine, '13') : ''
            else if (letter === allNotes[2]) return tabLine === 2 ? updateNoteTabRow(notes, column, tabRow, tabLine, '12') : ''
        } else if (row === 3) {
            if (letter === allNotes[4]) return tabLine === 2 ? updateNoteTabRow(notes, column, tabRow, tabLine, '14') : ''
            else if (letter === allNotes[3]) return tabLine === 2 ? updateNoteTabRow(notes, column, tabRow, tabLine, '13') : ''
            else if (letter === allNotes[2]) return tabLine === 2 ? updateNoteTabRow(notes, column, tabRow, tabLine, '12') : ''
            else if (letter === allNotes[1]) return tabLine === 3 ? updateNoteTabRow(notes, column, tabRow, tabLine, '15') : ''
            else if (letter === allNotes[0]) return tabLine === 3 ? updateNoteTabRow(notes, column, tabRow, tabLine, '14') : ''
            else if (letter === allNotes[11]) return tabLine === 3 ? updateNoteTabRow(notes, column, tabRow, tabLine, '13') : ''
        } else if (row === 4) {
            if (letter === allNotes[1]) return tabLine === 3 ? updateNoteTabRow(notes, column, tabRow, tabLine, '15') : ''
            else if (letter === allNotes[0]) return tabLine === 3 ? updateNoteTabRow(notes, column, tabRow, tabLine, '14') : ''
            else if (letter === allNotes[11]) return tabLine === 3 ? updateNoteTabRow(notes, column, tabRow, tabLine, '13') : ''
            else if (letter === allNotes[10]) return tabLine === 3 ? updateNoteTabRow(notes, column, tabRow, tabLine, '12') : ''
            else if (letter === allNotes[9]) return tabLine === 3 ? updateNoteTabRow(notes, column, tabRow, tabLine, '11') : ''
            else if (letter === allNotes[8]) return tabLine === 3 ? updateNoteTabRow(notes, column, tabRow, tabLine, '10') : ''
            else if (letter === allNotes[7]) return tabLine === 3 ? updateNoteTabRow(notes, column, tabRow, tabLine, '9') : ''
        } else if (row === 5) {
            if (letter === allNotes[9]) return tabLine === 3 ? updateNoteTabRow(notes, column, tabRow, tabLine, '11') : ''
            else if (letter === allNotes[8]) return tabLine === 3 ? updateNoteTabRow(notes, column, tabRow, tabLine, '10') : ''
            else if (letter === allNotes[7]) return tabLine === 3 ? updateNoteTabRow(notes, column, tabRow, tabLine, '9') : ''
            else if (letter === allNotes[6]) return tabLine === 4 ? updateNoteTabRow(notes, column, tabRow, tabLine, '13') : ''
            else if (letter === allNotes[5]) return tabLine === 4 ? updateNoteTabRow(notes, column, tabRow, tabLine, '12') : ''
            else if (letter === allNotes[4]) return tabLine === 4 ? updateNoteTabRow(notes, column, tabRow, tabLine, '11') : ''
        } else if (row === 6) {
            if (letter === allNotes[6]) return tabLine === 4 ? updateNoteTabRow(notes, column, tabRow, tabLine, '13') : ''
            else if (letter === allNotes[5]) return tabLine === 4 ? updateNoteTabRow(notes, column, tabRow, tabLine, '12') : ''
            else if (letter === allNotes[4]) return tabLine === 4 ? updateNoteTabRow(notes, column, tabRow, tabLine, '11') : ''
            else if (letter === allNotes[3]) return tabLine === 4 ? updateNoteTabRow(notes, column, tabRow, tabLine, '10') : ''
            else if (letter === allNotes[2]) return tabLine === 4 ? updateNoteTabRow(notes, column, tabRow, tabLine, '9') : ''
            else if (letter === allNotes[1]) return tabLine === 5 ? updateNoteTabRow(notes, column, tabRow, tabLine, '13') : ''
        } else if (row === 7) {
            if (letter === allNotes[3]) return tabLine === 4 ? updateNoteTabRow(notes, column, tabRow, tabLine, '10') : ''
            else if (letter === allNotes[2]) return tabLine === 4 ? updateNoteTabRow(notes, column, tabRow, tabLine, '9') : ''
            else if (letter === allNotes[1]) return tabLine === 5 ? updateNoteTabRow(notes, column, tabRow, tabLine, '13') : ''
            else if (letter === allNotes[0]) return tabLine === 5 ? updateNoteTabRow(notes, column, tabRow, tabLine, '12') : ''
            else if (letter === allNotes[11]) return tabLine === 5 ? updateNoteTabRow(notes, column, tabRow, tabLine, '11') : ''
            else if (letter === allNotes[10]) return tabLine === 5 ? updateNoteTabRow(notes, column, tabRow, tabLine, '10') : ''
            else if (letter === allNotes[9]) return tabLine === 6 ? updateNoteTabRow(notes, column, tabRow, tabLine, '14') : ''
        } else if (row === 8) {
            if (letter === allNotes[11]) return tabLine === 5 ? updateNoteTabRow(notes, column, tabRow, tabLine, '11') : ''
            else if (letter === allNotes[10]) return tabLine === 5 ? updateNoteTabRow(notes, column, tabRow, tabLine, '10') : ''
            else if (letter === allNotes[9]) return tabLine === 6 ? updateNoteTabRow(notes, column, tabRow, tabLine, '14') : ''
            else if (letter === allNotes[8]) return tabLine === 6 ? updateNoteTabRow(notes, column, tabRow, tabLine, '13') : ''
            else if (letter === allNotes[7]) return tabLine === 6 ? updateNoteTabRow(notes, column, tabRow, tabLine, '12') : ''
            else if (letter === allNotes[6]) return tabLine === 6 ? updateNoteTabRow(notes, column, tabRow, tabLine, '11') : ''
        } else if (row === 9) {
            if (letter === allNotes[8]) return tabLine === 6 ? updateNoteTabRow(notes, column, tabRow, tabLine, '13') : ''
            else if (letter === allNotes[7]) return tabLine === 6 ? updateNoteTabRow(notes, column, tabRow, tabLine, '12') : ''
            else if (letter === allNotes[6]) return tabLine === 6 ? updateNoteTabRow(notes, column, tabRow, tabLine, '11') : ''
            else if (letter === allNotes[5]) return tabLine === 6 ? updateNoteTabRow(notes, column, tabRow, tabLine, '10') : ''
            else if (letter === allNotes[4]) return tabLine === 6 ? updateNoteTabRow(notes, column, tabRow, tabLine, '9') : ''
            else if (letter === allNotes[3]) return tabLine === 6 ? updateNoteTabRow(notes, column, tabRow, tabLine, '8') : ''
            else if (letter === allNotes[2]) return tabLine === 6 ? updateNoteTabRow(notes, column, tabRow, tabLine, '7') : ''
        } else if (row === 10) {
            if (letter === allNotes[4]) return tabLine === 6 ? updateNoteTabRow(notes, column, tabRow, tabLine, '9') : ''
            else if (letter === allNotes[3]) return tabLine === 6 ? updateNoteTabRow(notes, column, tabRow, tabLine, '8') : ''
            else if (letter === allNotes[2]) return tabLine === 6 ? updateNoteTabRow(notes, column, tabRow, tabLine, '7') : ''
            else if (letter === allNotes[1]) return tabLine === 6 ? updateNoteTabRow(notes, column, tabRow, tabLine, '6') : ''
            else if (letter === allNotes[0]) return tabLine === 6 ? updateNoteTabRow(notes, column, tabRow, tabLine, '5') : ''
            else if (letter === allNotes[11]) return tabLine === 6 ? updateNoteTabRow(notes, column, tabRow, tabLine, '4') : ''
        } else if (row === 11) {
            if (letter === allNotes[1]) return tabLine === 6 ? updateNoteTabRow(notes, column, tabRow, tabLine, '6') : ''
            else if (letter === allNotes[0]) return tabLine === 6 ? updateNoteTabRow(notes, column, tabRow, tabLine, '5') : ''
            else if (letter === allNotes[11]) return tabLine === 6 ? updateNoteTabRow(notes, column, tabRow, tabLine, '4') : ''
            else if (letter === allNotes[10]) return tabLine === 6 ? updateNoteTabRow(notes, column, tabRow, tabLine, '3') : ''
            else if (letter === allNotes[9]) return tabLine === 6 ? updateNoteTabRow(notes, column, tabRow, tabLine, '2') : ''
            else if (letter === allNotes[8]) return tabLine === 6 ? updateNoteTabRow(notes, column, tabRow, tabLine, '1') : ''
            else if (letter === allNotes[7]) return tabLine === 6 ? updateNoteTabRow(notes, column, tabRow, tabLine, '0') : ''
        } else if (row === 12) {
            if (letter === allNotes[9]) return tabLine === 6 ? updateNoteTabRow(notes, column, tabRow, tabLine, '2') : ''
            else if (letter === allNotes[8]) return tabLine === 6 ? updateNoteTabRow(notes, column, tabRow, tabLine, '1') : ''
            else if (letter === allNotes[7]) return tabLine === 6 ? updateNoteTabRow(notes, column, tabRow, tabLine, '0') : ''
        }
    }


    return ''
}