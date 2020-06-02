import { updateNote } from '../Redux/Actions/Notes'
import { SHARP_NOTE, NATURAL_NOTE, FLAT_NOTE } from './SourceCodeEncodings'
import store from '../Redux/Store'

export const allNotes = ['A', 'A#', 'B', 'C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#']

const updateLetterToDispatch = (noteToEditIndex, letter, row, accidental, song) => {
    let copy = [...song]
    copy.splice(noteToEditIndex, 1, { ...copy[noteToEditIndex], letter: letter, row: row, accidental: accidental })
    store.dispatch(updateNote(copy))
}

const transformNote = (form, noteToEditIndex, row, num, accidental, song) => {
    if (song[noteToEditIndex].transform === form) {
        let letter = allNotes[num]
        updateLetterToDispatch(noteToEditIndex, letter, row, accidental, song)
    }
}

//Updates allNotes index when accidentals are used
const correctLetter = (i, accidental, key) => {
    if (key.id > 0) {
        if (accidental === SHARP_NOTE) return i + 1
        else if (accidental === FLAT_NOTE || (accidental === NATURAL_NOTE && key.id !== 1)) return i === 0 ? 11 : (i - 1)
        else return i
    }

    else if (key.id < 0) {
        //Make note higher pitch when natural, dependent of key signature
        if (accidental === SHARP_NOTE || accidental === NATURAL_NOTE) return i === 11 ? 0 : (i + 1)
        else if (accidental === FLAT_NOTE) return i === 0 ? 11 : (i - 1)
        else return i
    }
}

export const updateNoteLetter = (row, noteToEditIndex, accidental, song, key) => {
    if (row === 1) {
        if (key.id > -2 && key.id < 2) {
            transformNote('no-translate', noteToEditIndex, row, correctLetter(8, accidental, key), accidental, song)
            transformNote('move-down', noteToEditIndex, row, correctLetter(7, accidental, key), accidental, song)
        } else if (key.id > 1 && key.id < 7) {
            transformNote('no-translate', noteToEditIndex, row, correctLetter(9, accidental, key), accidental, song)
            transformNote('move-down', noteToEditIndex, row, correctLetter(7, accidental, key), accidental, song)
        } else if (key.id === 7) {
            transformNote('no-translate', noteToEditIndex, row, correctLetter(9, accidental, key), accidental, song)
            transformNote('move-down', noteToEditIndex, row, correctLetter(8, accidental, key), accidental, song)
        } else if (key.id < -1) {
            transformNote('no-translate', noteToEditIndex, row, correctLetter(8, accidental, key), accidental, song)
            transformNote('move-down', noteToEditIndex, row, correctLetter(6, accidental, key), accidental, song)
        }
    }
    if (row === 2) {
        if (key.id > -2 && key.id < 3) {
            transformNote('move-up', noteToEditIndex, row, correctLetter(7, accidental, key), accidental, song)
            transformNote('no-translate', noteToEditIndex, row, correctLetter(5, accidental, key), accidental, song)
            transformNote('move-down', noteToEditIndex, row, correctLetter(3, accidental, key), accidental, song)
        } else if (key.id === 3 || key.id === 4) {
            transformNote('move-up', noteToEditIndex, row, correctLetter(7, accidental, key), accidental, song)
            transformNote('no-translate', noteToEditIndex, row, correctLetter(5, accidental, key), accidental, song)
            transformNote('move-down', noteToEditIndex, row, correctLetter(4, accidental, key), accidental, song)
        } else if (key.id === 5 || key.id === 6) {
            transformNote('move-up', noteToEditIndex, row, correctLetter(7, accidental, key), accidental, song)
            transformNote('no-translate', noteToEditIndex, row, correctLetter(6, accidental, key), accidental, song)
            transformNote('move-down', noteToEditIndex, row, correctLetter(4, accidental, key), accidental, song)
        } else if (key.id === 7) {
            transformNote('move-up', noteToEditIndex, row, correctLetter(8, accidental, key), accidental, song)
            transformNote('no-translate', noteToEditIndex, row, correctLetter(6, accidental, key), accidental, song)
            transformNote('move-down', noteToEditIndex, row, correctLetter(4, accidental, key), accidental, song)
        } else if (key.id === -2 || key.id === -3) {
            transformNote('move-up', noteToEditIndex, row, correctLetter(6, accidental, key), accidental, song)
            transformNote('no-translate', noteToEditIndex, row, correctLetter(5, accidental, key), accidental, song)
            transformNote('move-down', noteToEditIndex, row, correctLetter(3, accidental, key), accidental, song)
        } else if (key.id === -4 || key.id === -5) {
            transformNote('move-up', noteToEditIndex, row, correctLetter(6, accidental, key), accidental, song)
            transformNote('no-translate', noteToEditIndex, row, correctLetter(4, accidental, key), accidental, song)
            transformNote('move-down', noteToEditIndex, row, correctLetter(3, accidental, key), accidental, song)
        }
    }
    if (row === 3) {
        if (key.id > 0 && key.id < 3) {
            transformNote('move-up', noteToEditIndex, row, correctLetter(3, accidental, key), accidental, song)
            transformNote('no-translate', noteToEditIndex, row, correctLetter(2, accidental, key), accidental, song)
            transformNote('move-down', noteToEditIndex, row, correctLetter(0, accidental, key), accidental, song)
        } else if (key.id === 3 || key.id === 4 || key.id === 5) {
            transformNote('move-up', noteToEditIndex, row, correctLetter(4, accidental, key), accidental, song)
            transformNote('no-translate', noteToEditIndex, row, correctLetter(2, accidental, key), accidental, song)
            transformNote('move-down', noteToEditIndex, row, correctLetter(0, accidental, key), accidental, song)
        } else if (key.id === 6 || key.id === 7) {
            transformNote('move-up', noteToEditIndex, row, correctLetter(4, accidental, key), accidental, song)
            transformNote('no-translate', noteToEditIndex, row, correctLetter(2, accidental, key), accidental, song)
            transformNote('move-down', noteToEditIndex, row, correctLetter(1, accidental, key), accidental, song)
        } else if (key.id === -1 || key.id === -2) {
            transformNote('move-up', noteToEditIndex, row, correctLetter(3, accidental, key), accidental, song)
            transformNote('no-translate', noteToEditIndex, row, correctLetter(1, accidental, key), accidental, song)
            transformNote('move-down', noteToEditIndex, row, correctLetter(0, accidental, key), accidental, song)
        } else if (key.id < -2) {
            transformNote('move-up', noteToEditIndex, row, correctLetter(3, accidental, key), accidental, song)
            transformNote('no-translate', noteToEditIndex, row, correctLetter(1, accidental, key), accidental, song)
            transformNote('move-down', noteToEditIndex, row, correctLetter(11, accidental, key), accidental, song)
        }
    }
    if (row === 4) {
        if (key.id > -3 && key.id < 2) {
            transformNote('move-up', noteToEditIndex, row, correctLetter(0, accidental, key), accidental, song)
            transformNote('no-translate', noteToEditIndex, row, correctLetter(10, accidental, key), accidental, song)
            transformNote('move-down', noteToEditIndex, row, correctLetter(8, accidental, key), accidental, song)
        } else if (key.id === 2 || key.id === 3) {
            transformNote('move-up', noteToEditIndex, row, correctLetter(0, accidental, key), accidental, song)
            transformNote('no-translate', noteToEditIndex, row, correctLetter(10, accidental, key), accidental, song)
            transformNote('move-down', noteToEditIndex, row, correctLetter(9, accidental, key), accidental, song)
        } else if (key.id === 4 || key.id === 5) {
            transformNote('move-up', noteToEditIndex, row, correctLetter(0, accidental, key), accidental, song)
            transformNote('no-translate', noteToEditIndex, row, correctLetter(11, accidental, key), accidental, song)
            transformNote('move-down', noteToEditIndex, row, correctLetter(9, accidental, key), accidental, song)
        } else if (key.id === 6 || key.id === 7) {
            transformNote('move-up', noteToEditIndex, row, correctLetter(1, accidental, key), accidental, song)
            transformNote('no-translate', noteToEditIndex, row, correctLetter(11, accidental, key), accidental, song)
            transformNote('move-down', noteToEditIndex, row, correctLetter(9, accidental, key), accidental, song)
        } else if (key.id === -3 || key.id === -4) {
            transformNote('move-up', noteToEditIndex, row, correctLetter(11, accidental, key), accidental, song)
            transformNote('no-translate', noteToEditIndex, row, correctLetter(10, accidental, key), accidental, song)
            transformNote('move-down', noteToEditIndex, row, correctLetter(8, accidental, key), accidental, song)
        } else if (key.id === -5) {
            transformNote('move-up', noteToEditIndex, row, correctLetter(11, accidental, key), accidental, song)
            transformNote('no-translate', noteToEditIndex, row, correctLetter(9, accidental, key), accidental, song)
            transformNote('move-down', noteToEditIndex, row, correctLetter(8, accidental, key), accidental, song)
        }
    }
    if (row === 5) {
        if (key.id > -2 && key.id < 2) {
            transformNote('move-up', noteToEditIndex, row, correctLetter(8, accidental, key), accidental, song)
            transformNote('no-translate', noteToEditIndex, row, correctLetter(7, accidental, key), accidental, song)
            transformNote('move-down', noteToEditIndex, row, correctLetter(5, accidental, key), accidental, song)
        } else if (key.id === 2 || key.id === 3 || key.id === 4) {
            transformNote('move-up', noteToEditIndex, row, correctLetter(9, accidental, key), accidental, song)
            transformNote('no-translate', noteToEditIndex, row, correctLetter(7, accidental, key), accidental, song)
            transformNote('move-down', noteToEditIndex, row, correctLetter(5, accidental, key), accidental, song)
        } else if (key.id === 5 || key.id === 6) {
            transformNote('move-up', noteToEditIndex, row, correctLetter(9, accidental, key), accidental, song)
            transformNote('no-translate', noteToEditIndex, row, correctLetter(7, accidental, key), accidental, song)
            transformNote('move-down', noteToEditIndex, row, correctLetter(6, accidental, key), accidental, song)
        } else if (key.id === 7) {
            transformNote('move-up', noteToEditIndex, row, correctLetter(9, accidental, key), accidental, song)
            transformNote('no-translate', noteToEditIndex, row, correctLetter(8, accidental, key), accidental, song)
            transformNote('move-down', noteToEditIndex, row, correctLetter(6, accidental, key), accidental, song)
        } else if (key.id === -2 || key.id === -3) {
            transformNote('move-up', noteToEditIndex, row, correctLetter(8, accidental, key), accidental, song)
            transformNote('no-translate', noteToEditIndex, row, correctLetter(6, accidental, key), accidental, song)
            transformNote('move-down', noteToEditIndex, row, correctLetter(5, accidental, key), accidental, song)
        } else if (key.id === -4 || key.id === -5) {
            transformNote('move-up', noteToEditIndex, row, correctLetter(8, accidental, key), accidental, song)
            transformNote('no-translate', noteToEditIndex, row, correctLetter(6, accidental, key), accidental, song)
            transformNote('move-down', noteToEditIndex, row, correctLetter(4, accidental, key), accidental, song)
        }
    }
    else if (row === 6) {
        if (key.id > 0 && key.id < 3) {
            transformNote('move-up', noteToEditIndex, row, correctLetter(5, accidental, key), accidental, song)
            transformNote('no-translate', noteToEditIndex, row, correctLetter(3, accidental, key), accidental, song)
            transformNote('move-down', noteToEditIndex, row, correctLetter(2, accidental, key), accidental, song)
        } else if (key.id === 3 || key.id === 4) {
            transformNote('move-up', noteToEditIndex, row, correctLetter(5, accidental, key), accidental, song)
            transformNote('no-translate', noteToEditIndex, row, correctLetter(4, accidental, key), accidental, song)
            transformNote('move-down', noteToEditIndex, row, correctLetter(2, accidental, key), accidental, song)
        } else if (key.id > 4) {
            transformNote('move-up', noteToEditIndex, row, correctLetter(6, accidental, key), accidental, song)
            transformNote('no-translate', noteToEditIndex, row, correctLetter(4, accidental, key), accidental, song)
            transformNote('move-down', noteToEditIndex, row, correctLetter(2, accidental, key), accidental, song)
        } else if (key.id === -1 || key.id === -2 || key.id === -3) {
            transformNote('move-up', noteToEditIndex, row, correctLetter(5, accidental, key), accidental, song)
            transformNote('no-translate', noteToEditIndex, row, correctLetter(3, accidental, key), accidental, song)
            transformNote('move-down', noteToEditIndex, row, correctLetter(1, accidental, key), accidental, song)
        } else if (key.id === -4 || key.id === -5) {
            transformNote('move-up', noteToEditIndex, row, correctLetter(4, accidental, key), accidental, song)
            transformNote('no-translate', noteToEditIndex, row, correctLetter(3, accidental, key), accidental, song)
            transformNote('move-down', noteToEditIndex, row, correctLetter(1, accidental, key), accidental, song)
        }
    }
    else if (row === 7) {
        if (key.id > 0 && key.id < 4) {
            transformNote('move-up', noteToEditIndex, row, correctLetter(2, accidental, key), accidental, song)
            transformNote('no-translate', noteToEditIndex, row, correctLetter(0, accidental, key), accidental, song)
            transformNote('move-down', noteToEditIndex, row, correctLetter(10, accidental, key), accidental, song)
        } else if (key.id === 4 || key.id === 5) {
            transformNote('move-up', noteToEditIndex, row, correctLetter(2, accidental, key), accidental, song)
            transformNote('no-translate', noteToEditIndex, row, correctLetter(0, accidental, key), accidental, song)
            transformNote('move-down', noteToEditIndex, row, correctLetter(11, accidental, key), accidental, song)
        } else if (key.id === 6 || key.id === 7) {
            transformNote('move-up', noteToEditIndex, row, correctLetter(2, accidental, key), accidental, song)
            transformNote('no-translate', noteToEditIndex, row, correctLetter(1, accidental, key), accidental, song)
            transformNote('move-down', noteToEditIndex, row, correctLetter(11, accidental, key), accidental, song)
        } else if (key.id === -1 || key.id === -2) {
            transformNote('move-up', noteToEditIndex, row, correctLetter(1, accidental, key), accidental, song)
            transformNote('no-translate', noteToEditIndex, row, correctLetter(0, accidental, key), accidental, song)
            transformNote('move-down', noteToEditIndex, row, correctLetter(10, accidental, key), accidental, song)
        } else if (key.id === -3 || key.id === -4) {
            transformNote('move-up', noteToEditIndex, row, correctLetter(1, accidental, key), accidental, song)
            transformNote('no-translate', noteToEditIndex, row, correctLetter(11, accidental, key), accidental, song)
            transformNote('move-down', noteToEditIndex, row, correctLetter(10, accidental, key), accidental, song)
        } else if (key.id === -5) {
            transformNote('move-up', noteToEditIndex, row, correctLetter(1, accidental, key), accidental, song)
            transformNote('no-translate', noteToEditIndex, row, correctLetter(11, accidental, key), accidental, song)
            transformNote('move-down', noteToEditIndex, row, correctLetter(9, accidental, key), accidental, song)
        }
    }
    else if (row === 8) {
        if (key.id > -2 && key.id < 2) {
            transformNote('move-up', noteToEditIndex, row, correctLetter(10, accidental, key), accidental, song)
            transformNote('no-translate', noteToEditIndex, row, correctLetter(8, accidental, key), accidental, song)
            transformNote('move-down', noteToEditIndex, row, correctLetter(7, accidental, key), accidental, song)
        } else if (key.id === 2 || key.id === 3) {
            transformNote('move-up', noteToEditIndex, row, correctLetter(10, accidental, key), accidental, song)
            transformNote('no-translate', noteToEditIndex, row, correctLetter(9, accidental, key), accidental, song)
            transformNote('move-down', noteToEditIndex, row, correctLetter(7, accidental, key), accidental, song)
        } else if (key.id === 4 || key.id === 5 || key.id === 6) {
            transformNote('move-up', noteToEditIndex, row, correctLetter(11, accidental, key), accidental, song)
            transformNote('no-translate', noteToEditIndex, row, correctLetter(9, accidental, key), accidental, song)
            transformNote('move-down', noteToEditIndex, row, correctLetter(7, accidental, key), accidental, song)
        } else if (key.id === 7) {
            transformNote('move-up', noteToEditIndex, row, correctLetter(11, accidental, key), accidental, song)
            transformNote('no-translate', noteToEditIndex, row, correctLetter(9, accidental, key), accidental, song)
            transformNote('move-down', noteToEditIndex, row, correctLetter(8, accidental, key), accidental, song)
        } else if (key.id === -2 || key.id === -3 || key.id === -4) {
            transformNote('move-up', noteToEditIndex, row, correctLetter(10, accidental, key), accidental, song)
            transformNote('no-translate', noteToEditIndex, row, correctLetter(8, accidental, key), accidental, song)
            transformNote('move-down', noteToEditIndex, row, correctLetter(6, accidental, key), accidental, song)
        } else if (key.id === -5) {
            transformNote('move-up', noteToEditIndex, row, correctLetter(9, accidental, key), accidental, song)
            transformNote('no-translate', noteToEditIndex, row, correctLetter(8, accidental, key), accidental, song)
            transformNote('move-down', noteToEditIndex, row, correctLetter(6, accidental, key), accidental, song)
        }
    }
    else if (row === 9) {
        if (key.id > -2 && key.id < 3) {
            transformNote('move-up', noteToEditIndex, row, correctLetter(7, accidental, key), accidental, song)
            transformNote('no-translate', noteToEditIndex, row, correctLetter(5, accidental, key), accidental, song)
            transformNote('move-down', noteToEditIndex, row, correctLetter(3, accidental, key), accidental, song)
        } else if (key.id === 3 || key.id === 4) {
            transformNote('move-up', noteToEditIndex, row, correctLetter(7, accidental, key), accidental, song)
            transformNote('no-translate', noteToEditIndex, row, correctLetter(5, accidental, key), accidental, song)
            transformNote('move-down', noteToEditIndex, row, correctLetter(4, accidental, key), accidental, song)
        } else if (key.id === 5 || key.id === 6) {
            transformNote('move-up', noteToEditIndex, row, correctLetter(7, accidental, key), accidental, song)
            transformNote('no-translate', noteToEditIndex, row, correctLetter(6, accidental, key), accidental, song)
            transformNote('move-down', noteToEditIndex, row, correctLetter(4, accidental, key), accidental, song)
        } else if (key.id === 7) {
            transformNote('move-up', noteToEditIndex, row, correctLetter(8, accidental, key), accidental, song)
            transformNote('no-translate', noteToEditIndex, row, correctLetter(6, accidental, key), accidental, song)
            transformNote('move-down', noteToEditIndex, row, correctLetter(4, accidental, key), accidental, song)
        } else if (key.id === -2 || key.id === -3) {
            transformNote('move-up', noteToEditIndex, row, correctLetter(6, accidental, key), accidental, song)
            transformNote('no-translate', noteToEditIndex, row, correctLetter(5, accidental, key), accidental, song)
            transformNote('move-down', noteToEditIndex, row, correctLetter(3, accidental, key), accidental, song)
        } else if (key.id === -4 || key.id === -5) {
            transformNote('move-up', noteToEditIndex, row, correctLetter(6, accidental, key), accidental, song)
            transformNote('no-translate', noteToEditIndex, row, correctLetter(4, accidental, key), accidental, song)
            transformNote('move-down', noteToEditIndex, row, correctLetter(3, accidental, key), accidental, song)
        }
    }
    else if (row === 10) {
        if (key.id > 0 && key.id < 3) {
            transformNote('move-up', noteToEditIndex, row, correctLetter(3, accidental, key), accidental, song)
            transformNote('no-translate', noteToEditIndex, row, correctLetter(2, accidental, key), accidental, song)
            transformNote('move-down', noteToEditIndex, row, correctLetter(0, accidental, key), accidental, song)
        } else if (key.id === 3 || key.id === 4 || key.id === 5) {
            transformNote('move-up', noteToEditIndex, row, correctLetter(4, accidental, key), accidental, song)
            transformNote('no-translate', noteToEditIndex, row, correctLetter(2, accidental, key), accidental, song)
            transformNote('move-down', noteToEditIndex, row, correctLetter(0, accidental, key), accidental, song)
        } else if (key.id === 6 || key.id === 7) {
            transformNote('move-up', noteToEditIndex, row, correctLetter(4, accidental, key), accidental, song)
            transformNote('no-translate', noteToEditIndex, row, correctLetter(2, accidental, key), accidental, song)
            transformNote('move-down', noteToEditIndex, row, correctLetter(1, accidental, key), accidental, song)
        }

        else if (key.id === -1 || key.id === -2) {
            transformNote('move-up', noteToEditIndex, row, correctLetter(3, accidental, key), accidental, song)
            transformNote('no-translate', noteToEditIndex, row, correctLetter(1, accidental, key), accidental, song)
            transformNote('move-down', noteToEditIndex, row, correctLetter(0, accidental, key), accidental, song)
        } else if (key.id < -2) {
            transformNote('move-up', noteToEditIndex, row, correctLetter(3, accidental, key), accidental, song)
            transformNote('no-translate', noteToEditIndex, row, correctLetter(1, accidental, key), accidental, song)
            transformNote('move-down', noteToEditIndex, row, correctLetter(11, accidental, key), accidental, song)
        }
    }
    else if (row === 11) {
        if (key.id > -3 && key.id < 2) {
            transformNote('move-up', noteToEditIndex, row, correctLetter(0, accidental, key), accidental, song)
            transformNote('no-translate', noteToEditIndex, row, correctLetter(10, accidental, key), accidental, song)
            transformNote('move-down', noteToEditIndex, row, correctLetter(8, accidental, key), accidental, song)
        } else if (key.id === 2 || key.id === 3) {
            transformNote('move-up', noteToEditIndex, row, correctLetter(0, accidental, key), accidental, song)
            transformNote('no-translate', noteToEditIndex, row, correctLetter(10, accidental, key), accidental, song)
            transformNote('move-down', noteToEditIndex, row, correctLetter(9, accidental, key), accidental, song)
        } else if (key.id === 4 || key.id === 5) {
            transformNote('move-up', noteToEditIndex, row, correctLetter(0, accidental, key), accidental, song)
            transformNote('no-translate', noteToEditIndex, row, correctLetter(11, accidental, key), accidental, song)
            transformNote('move-down', noteToEditIndex, row, correctLetter(9, accidental, key), accidental, song)
        } else if (key.id === 6 || key.id === 7) {
            transformNote('move-up', noteToEditIndex, row, correctLetter(1, accidental, key), accidental, song)
            transformNote('no-translate', noteToEditIndex, row, correctLetter(11, accidental, key), accidental, song)
            transformNote('move-down', noteToEditIndex, row, correctLetter(9, accidental, key), accidental, song)
        } else if (key.id === -3 || key.id === -4) {
            transformNote('move-up', noteToEditIndex, row, correctLetter(11, accidental, key), accidental, song)
            transformNote('no-translate', noteToEditIndex, row, correctLetter(10, accidental, key), accidental, song)
            transformNote('move-down', noteToEditIndex, row, correctLetter(8, accidental, key), accidental, song)
        } else if (key.id === -5) {
            transformNote('move-up', noteToEditIndex, row, correctLetter(11, accidental, key), accidental, song)
            transformNote('no-translate', noteToEditIndex, row, correctLetter(9, accidental, key), accidental, song)
            transformNote('move-down', noteToEditIndex, row, correctLetter(8, accidental, key), accidental, song)
        }
    }
    else if (row === 12) {
        if (key.id > -2 && key.id < 2) {
            transformNote('move-up', noteToEditIndex, row, correctLetter(8, accidental, key), accidental, song)
            transformNote('no-translate', noteToEditIndex, row, correctLetter(7, accidental, key), accidental, song)
        } else if (key.id > 1 && key.id < 7) {
            transformNote('move-up', noteToEditIndex, row, correctLetter(9, accidental, key), accidental, song)
            transformNote('no-translate', noteToEditIndex, row, correctLetter(7, accidental, key), accidental, song)
        } else if (key.id === 7) {
            transformNote('move-up', noteToEditIndex, row, correctLetter(9, accidental, key), accidental, song)
            transformNote('no-translate', noteToEditIndex, row, correctLetter(8, accidental, key), accidental, song)
        } else if (key.id < -1) {
            transformNote('move-up', noteToEditIndex, row, correctLetter(8, accidental, key), accidental, song)
            transformNote('no-translate', noteToEditIndex, row, correctLetter(6, accidental, key), accidental, song)
        }
    }
}
