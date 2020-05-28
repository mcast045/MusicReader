import { updateNote } from '../Redux/Actions/Notes'
import store from '../Redux/Store'

export const allNotes = ['A', 'A#', 'B', 'C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#']

const letterUpdate = (index, letter, row, accidental, song) => {
    let copy = [...song]
    copy.splice(index, 1, { ...copy[index], letter: letter, row: row, accidental: accidental })
    store.dispatch(updateNote(copy))
}

const currentNoteTransform = (form, index, row, num, accidental, song) => {
    if (song[index].transform === form) {
        let letter = allNotes[num]
        letterUpdate(index, letter, row, accidental, song)
    }
}

//Updates allNotes index when accidentals are used
const correctLetter = (i, accidental, key) => {
    if (key.id > 0) {
        if (accidental === "\u266F")
            return i + 1
        else if (accidental === "\u266D" || (accidental === "\u266E" && key.id !== 1))
            return i === 0 ? 11 : (i - 1)
        else
            return i
    }

    else if (key.id < 0) {
        //Make note higher pitch when natural, dependent of key signature
        if (accidental === "\u266F" || accidental === "\u266E")
            return i === 11 ? 0 : (i + 1)
        else if (accidental === "\u266D")
            return i === 0 ? 11 : (i - 1)
        else
            return i
    }
}

export const updateNoteLetter = (row, index, accidental, song, key) => {
    if (row === 1) {
        if (key.id > -2 && key.id < 2) {
            currentNoteTransform('no-translate', index, row, correctLetter(8, accidental, key), accidental, song)
            currentNoteTransform('move-down', index, row, correctLetter(7, accidental, key), accidental, song)
        }

        else if (key.id > 1 && key.id < 7) {
            currentNoteTransform('no-translate', index, row, correctLetter(9, accidental, key), accidental, song)
            currentNoteTransform('move-down', index, row, correctLetter(7, accidental, key), accidental, song)
        }

        else if (key.id === 7) {
            currentNoteTransform('no-translate', index, row, correctLetter(9, accidental, key), accidental, song)
            currentNoteTransform('move-down', index, row, correctLetter(8, accidental, key), accidental, song)
        }

        else if (key.id < -1) {
            currentNoteTransform('no-translate', index, row, correctLetter(8, accidental, key), accidental, song)
            currentNoteTransform('move-down', index, row, correctLetter(6, accidental, key), accidental, song)
        }
    }
    if (row === 2) {
        if (key.id > -2 && key.id < 3) {
            currentNoteTransform('move-up', index, row, correctLetter(7, accidental, key), accidental, song)
            currentNoteTransform('no-translate', index, row, correctLetter(5, accidental, key), accidental, song)
            currentNoteTransform('move-down', index, row, correctLetter(3, accidental, key), accidental, song)
        }

        else if (key.id === 3 || key.id === 4) {
            currentNoteTransform('move-up', index, row, correctLetter(7, accidental, key), accidental, song)
            currentNoteTransform('no-translate', index, row, correctLetter(5, accidental, key), accidental, song)
            currentNoteTransform('move-down', index, row, correctLetter(4, accidental, key), accidental, song)
        }

        else if (key.id === 5 || key.id === 6) {
            currentNoteTransform('move-up', index, row, correctLetter(7, accidental, key), accidental, song)
            currentNoteTransform('no-translate', index, row, correctLetter(6, accidental, key), accidental, song)
            currentNoteTransform('move-down', index, row, correctLetter(4, accidental, key), accidental, song)
        }

        else if (key.id === 7) {
            currentNoteTransform('move-up', index, row, correctLetter(8, accidental, key), accidental, song)
            currentNoteTransform('no-translate', index, row, correctLetter(6, accidental, key), accidental, song)
            currentNoteTransform('move-down', index, row, correctLetter(4, accidental, key), accidental, song)
        }

        else if (key.id === -2 || key.id === -3) {
            currentNoteTransform('move-up', index, row, correctLetter(6, accidental, key), accidental, song)
            currentNoteTransform('no-translate', index, row, correctLetter(5, accidental, key), accidental, song)
            currentNoteTransform('move-down', index, row, correctLetter(3, accidental, key), accidental, song)
        }

        else if (key.id === -4 || key.id === -5) {
            currentNoteTransform('move-up', index, row, correctLetter(6, accidental, key), accidental, song)
            currentNoteTransform('no-translate', index, row, correctLetter(4, accidental, key), accidental, song)
            currentNoteTransform('move-down', index, row, correctLetter(3, accidental, key), accidental, song)
        }
    }
    if (row === 3) {
        if (key.id > 0 && key.id < 3) {
            currentNoteTransform('move-up', index, row, correctLetter(3, accidental, key), accidental, song)
            currentNoteTransform('no-translate', index, row, correctLetter(2, accidental, key), accidental, song)
            currentNoteTransform('move-down', index, row, correctLetter(0, accidental, key), accidental, song)
        }

        else if (key.id === 3 || key.id === 4 || key.id === 5) {
            currentNoteTransform('move-up', index, row, correctLetter(4, accidental, key), accidental, song)
            currentNoteTransform('no-translate', index, row, correctLetter(2, accidental, key), accidental, song)
            currentNoteTransform('move-down', index, row, correctLetter(0, accidental, key), accidental, song)
        }

        else if (key.id === 6 || key.id === 7) {
            currentNoteTransform('move-up', index, row, correctLetter(4, accidental, key), accidental, song)
            currentNoteTransform('no-translate', index, row, correctLetter(2, accidental, key), accidental, song)
            currentNoteTransform('move-down', index, row, correctLetter(1, accidental, key), accidental, song)
        }

        else if (key.id === -1 || key.id === -2) {
            currentNoteTransform('move-up', index, row, correctLetter(3, accidental, key), accidental, song)
            currentNoteTransform('no-translate', index, row, correctLetter(1, accidental, key), accidental, song)
            currentNoteTransform('move-down', index, row, correctLetter(0, accidental, key), accidental, song)
        }

        else if (key.id < -2) {
            currentNoteTransform('move-up', index, row, correctLetter(3, accidental, key), accidental, song)
            currentNoteTransform('no-translate', index, row, correctLetter(1, accidental, key), accidental, song)
            currentNoteTransform('move-down', index, row, correctLetter(11, accidental, key), accidental, song)
        }
    }
    if (row === 4) {
        if (key.id > -3 && key.id < 2) {
            currentNoteTransform('move-up', index, row, correctLetter(0, accidental, key), accidental, song)
            currentNoteTransform('no-translate', index, row, correctLetter(10, accidental, key), accidental, song)
            currentNoteTransform('move-down', index, row, correctLetter(8, accidental, key), accidental, song)
        }

        else if (key.id === 2 || key.id === 3) {
            currentNoteTransform('move-up', index, row, correctLetter(0, accidental, key), accidental, song)
            currentNoteTransform('no-translate', index, row, correctLetter(10, accidental, key), accidental, song)
            currentNoteTransform('move-down', index, row, correctLetter(9, accidental, key), accidental, song)
        }

        else if (key.id === 4 || key.id === 5) {
            currentNoteTransform('move-up', index, row, correctLetter(0, accidental, key), accidental, song)
            currentNoteTransform('no-translate', index, row, correctLetter(11, accidental, key), accidental, song)
            currentNoteTransform('move-down', index, row, correctLetter(9, accidental, key), accidental, song)
        }

        else if (key.id === 6 || key.id === 7) {
            currentNoteTransform('move-up', index, row, correctLetter(1, accidental, key), accidental, song)
            currentNoteTransform('no-translate', index, row, correctLetter(11, accidental, key), accidental, song)
            currentNoteTransform('move-down', index, row, correctLetter(9, accidental, key), accidental, song)
        }

        else if (key.id === -3 || key.id === -4) {
            currentNoteTransform('move-up', index, row, correctLetter(11, accidental, key), accidental, song)
            currentNoteTransform('no-translate', index, row, correctLetter(10, accidental, key), accidental, song)
            currentNoteTransform('move-down', index, row, correctLetter(8, accidental, key), accidental, song)
        }

        else if (key.id === -5) {
            currentNoteTransform('move-up', index, row, correctLetter(11, accidental, key), accidental, song)
            currentNoteTransform('no-translate', index, row, correctLetter(9, accidental, key), accidental, song)
            currentNoteTransform('move-down', index, row, correctLetter(8, accidental, key), accidental, song)
        }
    }
    if (row === 5) {
        if (key.id > -2 && key.id < 2) {
            currentNoteTransform('move-up', index, row, correctLetter(8, accidental, key), accidental, song)
            currentNoteTransform('no-translate', index, row, correctLetter(7, accidental, key), accidental, song)
            currentNoteTransform('move-down', index, row, correctLetter(5, accidental, key), accidental, song)
        }

        else if (key.id === 2 || key.id === 3 || key.id === 4) {
            currentNoteTransform('move-up', index, row, correctLetter(9, accidental, key), accidental, song)
            currentNoteTransform('no-translate', index, row, correctLetter(7, accidental, key), accidental, song)
            currentNoteTransform('move-down', index, row, correctLetter(5, accidental, key), accidental, song)
        }

        else if (key.id === 5 || key.id === 6) {
            currentNoteTransform('move-up', index, row, correctLetter(9, accidental, key), accidental, song)
            currentNoteTransform('no-translate', index, row, correctLetter(7, accidental, key), accidental, song)
            currentNoteTransform('move-down', index, row, correctLetter(6, accidental, key), accidental, song)
        }

        else if (key.id === 7) {
            currentNoteTransform('move-up', index, row, correctLetter(9, accidental, key), accidental, song)
            currentNoteTransform('no-translate', index, row, correctLetter(8, accidental, key), accidental, song)
            currentNoteTransform('move-down', index, row, correctLetter(6, accidental, key), accidental, song)
        }

        else if (key.id === -2 || key.id === -3) {
            currentNoteTransform('move-up', index, row, correctLetter(8, accidental, key), accidental, song)
            currentNoteTransform('no-translate', index, row, correctLetter(6, accidental, key), accidental, song)
            currentNoteTransform('move-down', index, row, correctLetter(5, accidental, key), accidental, song)
        }

        else if (key.id === -4 || key.id === -5) {
            currentNoteTransform('move-up', index, row, correctLetter(8, accidental, key), accidental, song)
            currentNoteTransform('no-translate', index, row, correctLetter(6, accidental, key), accidental, song)
            currentNoteTransform('move-down', index, row, correctLetter(4, accidental, key), accidental, song)
        }
    }
    else if (row === 6) {
        if (key.id > 0 && key.id < 3) {
            currentNoteTransform('move-up', index, row, correctLetter(5, accidental, key), accidental, song)
            currentNoteTransform('no-translate', index, row, correctLetter(3, accidental, key), accidental, song)
            currentNoteTransform('move-down', index, row, correctLetter(2, accidental, key), accidental, song)
        }

        else if (key.id === 3 || key.id === 4) {
            currentNoteTransform('move-up', index, row, correctLetter(5, accidental, key), accidental, song)
            currentNoteTransform('no-translate', index, row, correctLetter(4, accidental, key), accidental, song)
            currentNoteTransform('move-down', index, row, correctLetter(2, accidental, key), accidental, song)
        }

        else if (key.id > 4) {
            currentNoteTransform('move-up', index, row, correctLetter(6, accidental, key), accidental, song)
            currentNoteTransform('no-translate', index, row, correctLetter(4, accidental, key), accidental, song)
            currentNoteTransform('move-down', index, row, correctLetter(2, accidental, key), accidental, song)
        }

        else if (key.id === -1 || key.id === -2 || key.id === -3) {
            currentNoteTransform('move-up', index, row, correctLetter(5, accidental, key), accidental, song)
            currentNoteTransform('no-translate', index, row, correctLetter(3, accidental, key), accidental, song)
            currentNoteTransform('move-down', index, row, correctLetter(1, accidental, key), accidental, song)
        }

        else if (key.id === -4 || key.id === -5) {
            currentNoteTransform('move-up', index, row, correctLetter(4, accidental, key), accidental, song)
            currentNoteTransform('no-translate', index, row, correctLetter(3, accidental, key), accidental, song)
            currentNoteTransform('move-down', index, row, correctLetter(1, accidental, key), accidental, song)
        }
    }
    else if (row === 7) {
        if (key.id > 0 && key.id < 4) {
            currentNoteTransform('move-up', index, row, correctLetter(2, accidental, key), accidental, song)
            currentNoteTransform('no-translate', index, row, correctLetter(0, accidental, key), accidental, song)
            currentNoteTransform('move-down', index, row, correctLetter(10, accidental, key), accidental, song)
        }

        else if (key.id === 4 || key.id === 5) {
            currentNoteTransform('move-up', index, row, correctLetter(2, accidental, key), accidental, song)
            currentNoteTransform('no-translate', index, row, correctLetter(0, accidental, key), accidental, song)
            currentNoteTransform('move-down', index, row, correctLetter(11, accidental, key), accidental, song)
        }

        else if (key.id === 6 || key.id === 7) {
            currentNoteTransform('move-up', index, row, correctLetter(2, accidental, key), accidental, song)
            currentNoteTransform('no-translate', index, row, correctLetter(1, accidental, key), accidental, song)
            currentNoteTransform('move-down', index, row, correctLetter(11, accidental, key), accidental, song)
        }

        else if (key.id === -1 || key.id === -2) {
            currentNoteTransform('move-up', index, row, correctLetter(1, accidental, key), accidental, song)
            currentNoteTransform('no-translate', index, row, correctLetter(0, accidental, key), accidental, song)
            currentNoteTransform('move-down', index, row, correctLetter(10, accidental, key), accidental, song)
        }

        else if (key.id === -3 || key.id === -4) {
            currentNoteTransform('move-up', index, row, correctLetter(1, accidental, key), accidental, song)
            currentNoteTransform('no-translate', index, row, correctLetter(11, accidental, key), accidental, song)
            currentNoteTransform('move-down', index, row, correctLetter(10, accidental, key), accidental, song)
        }

        else if (key.id === -5) {
            currentNoteTransform('move-up', index, row, correctLetter(1, accidental, key), accidental, song)
            currentNoteTransform('no-translate', index, row, correctLetter(11, accidental, key), accidental, song)
            currentNoteTransform('move-down', index, row, correctLetter(9, accidental, key), accidental, song)
        }
    }
    else if (row === 8) {
        if (key.id > -2 && key.id < 2) {
            currentNoteTransform('move-up', index, row, correctLetter(10, accidental, key), accidental, song)
            currentNoteTransform('no-translate', index, row, correctLetter(8, accidental, key), accidental, song)
            currentNoteTransform('move-down', index, row, correctLetter(7, accidental, key), accidental, song)
        }

        else if (key.id === 2 || key.id === 3) {
            currentNoteTransform('move-up', index, row, correctLetter(10, accidental, key), accidental, song)
            currentNoteTransform('no-translate', index, row, correctLetter(9, accidental, key), accidental, song)
            currentNoteTransform('move-down', index, row, correctLetter(7, accidental, key), accidental, song)
        }

        else if (key.id === 4 || key.id === 5 || key.id === 6) {
            currentNoteTransform('move-up', index, row, correctLetter(11, accidental, key), accidental, song)
            currentNoteTransform('no-translate', index, row, correctLetter(9, accidental, key), accidental, song)
            currentNoteTransform('move-down', index, row, correctLetter(7, accidental, key), accidental, song)
        }

        else if (key.id === 7) {
            currentNoteTransform('move-up', index, row, correctLetter(11, accidental, key), accidental, song)
            currentNoteTransform('no-translate', index, row, correctLetter(9, accidental, key), accidental, song)
            currentNoteTransform('move-down', index, row, correctLetter(8, accidental, key), accidental, song)
        }

        else if (key.id === -2 || key.id === -3 || key.id === -4) {
            currentNoteTransform('move-up', index, row, correctLetter(10, accidental, key), accidental, song)
            currentNoteTransform('no-translate', index, row, correctLetter(8, accidental, key), accidental, song)
            currentNoteTransform('move-down', index, row, correctLetter(6, accidental, key), accidental, song)
        }

        else if (key.id === -5) {
            currentNoteTransform('move-up', index, row, correctLetter(9, accidental, key), accidental, song)
            currentNoteTransform('no-translate', index, row, correctLetter(8, accidental, key), accidental, song)
            currentNoteTransform('move-down', index, row, correctLetter(6, accidental, key), accidental, song)
        }
    }
    else if (row === 9) {
        if (key.id > -2 && key.id < 3) {
            currentNoteTransform('move-up', index, row, correctLetter(7, accidental, key), accidental, song)
            currentNoteTransform('no-translate', index, row, correctLetter(5, accidental, key), accidental, song)
            currentNoteTransform('move-down', index, row, correctLetter(3, accidental, key), accidental, song)
        }

        else if (key.id === 3 || key.id === 4) {
            currentNoteTransform('move-up', index, row, correctLetter(7, accidental, key), accidental, song)
            currentNoteTransform('no-translate', index, row, correctLetter(5, accidental, key), accidental, song)
            currentNoteTransform('move-down', index, row, correctLetter(4, accidental, key), accidental, song)
        }

        else if (key.id === 5 || key.id === 6) {
            currentNoteTransform('move-up', index, row, correctLetter(7, accidental, key), accidental, song)
            currentNoteTransform('no-translate', index, row, correctLetter(6, accidental, key), accidental, song)
            currentNoteTransform('move-down', index, row, correctLetter(4, accidental, key), accidental, song)
        }

        else if (key.id === 7) {
            currentNoteTransform('move-up', index, row, correctLetter(8, accidental, key), accidental, song)
            currentNoteTransform('no-translate', index, row, correctLetter(6, accidental, key), accidental, song)
            currentNoteTransform('move-down', index, row, correctLetter(4, accidental, key), accidental, song)
        }

        else if (key.id === -2 || key.id === -3) {
            currentNoteTransform('move-up', index, row, correctLetter(6, accidental, key), accidental, song)
            currentNoteTransform('no-translate', index, row, correctLetter(5, accidental, key), accidental, song)
            currentNoteTransform('move-down', index, row, correctLetter(3, accidental, key), accidental, song)
        }
        else if (key.id === -4 || key.id === -5) {
            currentNoteTransform('move-up', index, row, correctLetter(6, accidental, key), accidental, song)
            currentNoteTransform('no-translate', index, row, correctLetter(4, accidental, key), accidental, song)
            currentNoteTransform('move-down', index, row, correctLetter(3, accidental, key), accidental, song)
        }
    }
    else if (row === 10) {
        if (key.id > 0 && key.id < 3) {
            currentNoteTransform('move-up', index, row, correctLetter(3, accidental, key), accidental, song)
            currentNoteTransform('no-translate', index, row, correctLetter(2, accidental, key), accidental, song)
            currentNoteTransform('move-down', index, row, correctLetter(0, accidental, key), accidental, song)
        }

        else if (key.id === 3 || key.id === 4 || key.id === 5) {
            currentNoteTransform('move-up', index, row, correctLetter(4, accidental, key), accidental, song)
            currentNoteTransform('no-translate', index, row, correctLetter(2, accidental, key), accidental, song)
            currentNoteTransform('move-down', index, row, correctLetter(0, accidental, key), accidental, song)
        }

        else if (key.id === 6 || key.id === 7) {
            currentNoteTransform('move-up', index, row, correctLetter(4, accidental, key), accidental, song)
            currentNoteTransform('no-translate', index, row, correctLetter(2, accidental, key), accidental, song)
            currentNoteTransform('move-down', index, row, correctLetter(1, accidental, key), accidental, song)
        }

        else if (key.id === -1 || key.id === -2) {
            currentNoteTransform('move-up', index, row, correctLetter(3, accidental, key), accidental, song)
            currentNoteTransform('no-translate', index, row, correctLetter(1, accidental, key), accidental, song)
            currentNoteTransform('move-down', index, row, correctLetter(0, accidental, key), accidental, song)
        }

        else if (key.id < -2) {
            currentNoteTransform('move-up', index, row, correctLetter(3, accidental, key), accidental, song)
            currentNoteTransform('no-translate', index, row, correctLetter(1, accidental, key), accidental, song)
            currentNoteTransform('move-down', index, row, correctLetter(11, accidental, key), accidental, song)
        }
    }
    else if (row === 11) {
        if (key.id > -3 && key.id < 2) {
            currentNoteTransform('move-up', index, row, correctLetter(0, accidental, key), accidental, song)
            currentNoteTransform('no-translate', index, row, correctLetter(10, accidental, key), accidental, song)
            currentNoteTransform('move-down', index, row, correctLetter(8, accidental, key), accidental, song)
        }

        else if (key.id === 2 || key.id === 3) {
            currentNoteTransform('move-up', index, row, correctLetter(0, accidental, key), accidental, song)
            currentNoteTransform('no-translate', index, row, correctLetter(10, accidental, key), accidental, song)
            currentNoteTransform('move-down', index, row, correctLetter(9, accidental, key), accidental, song)
        }

        else if (key.id === 4 || key.id === 5) {
            currentNoteTransform('move-up', index, row, correctLetter(0, accidental, key), accidental, song)
            currentNoteTransform('no-translate', index, row, correctLetter(11, accidental, key), accidental, song)
            currentNoteTransform('move-down', index, row, correctLetter(9, accidental, key), accidental, song)
        }

        else if (key.id === 6 || key.id === 7) {
            currentNoteTransform('move-up', index, row, correctLetter(1, accidental, key), accidental, song)
            currentNoteTransform('no-translate', index, row, correctLetter(11, accidental, key), accidental, song)
            currentNoteTransform('move-down', index, row, correctLetter(9, accidental, key), accidental, song)
        }

        else if (key.id === -3 || key.id === -4) {
            currentNoteTransform('move-up', index, row, correctLetter(11, accidental, key), accidental, song)
            currentNoteTransform('no-translate', index, row, correctLetter(10, accidental, key), accidental, song)
            currentNoteTransform('move-down', index, row, correctLetter(8, accidental, key), accidental, song)
        }

        else if (key.id === -5) {
            currentNoteTransform('move-up', index, row, correctLetter(11, accidental, key), accidental, song)
            currentNoteTransform('no-translate', index, row, correctLetter(9, accidental, key), accidental, song)
            currentNoteTransform('move-down', index, row, correctLetter(8, accidental, key), accidental, song)
        }
    }
    else if (row === 12) {
        if (key.id > -2 && key.id < 2) {
            currentNoteTransform('move-up', index, row, correctLetter(8, accidental, key), accidental, song)
            currentNoteTransform('no-translate', index, row, correctLetter(7, accidental, key), accidental, song)
        }

        else if (key.id > 1 && key.id < 7) {
            currentNoteTransform('move-up', index, row, correctLetter(9, accidental, key), accidental, song)
            currentNoteTransform('no-translate', index, row, correctLetter(7, accidental, key), accidental, song)
        }

        else if (key.id === 7) {
            currentNoteTransform('move-up', index, row, correctLetter(9, accidental, key), accidental, song)
            currentNoteTransform('no-translate', index, row, correctLetter(8, accidental, key), accidental, song)
        }

        else if (key.id < -1) {
            currentNoteTransform('move-up', index, row, correctLetter(8, accidental, key), accidental, song)
            currentNoteTransform('no-translate', index, row, correctLetter(6, accidental, key), accidental, song)
        }
    }
}
