import { updateNote } from '../Redux/Actions/Notes'
import { SHARP_NOTE, NATURAL_NOTE, FLAT_NOTE } from './SourceCodeEncodings'
import store from '../Redux/Store'
import { editIndex } from './Helpers'

export const allNotes = ['A', 'A#', 'B', 'C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#']

const updateLetterToDispatch = (noteToEditIndex, letter, row, accidental, song) => {
    const copy = [...song]
    copy[noteToEditIndex][editIndex(copy[noteToEditIndex])] = { ...copy[noteToEditIndex][editIndex(copy[noteToEditIndex])], letter: letter, row: row, accidental: accidental }
    store.dispatch(updateNote(copy))
}

const transformNote = (form, noteToEditIndex, row, num, accidental, song) => {
    if (song[noteToEditIndex][editIndex(song[noteToEditIndex])].transform === form) {
        const letter = allNotes[num]
        updateLetterToDispatch(noteToEditIndex, letter, row, accidental, song)
    }
}

//Updates allNotes index when accidentals are used
const correctLetter = (i, accidental, key) => {
    if (key.id < 8) {
        if (accidental === SHARP_NOTE) return i + 1
        else if (accidental === FLAT_NOTE || (accidental === NATURAL_NOTE && key.id !== 1)) return i === 0 ? 11 : (i - 1)
        return i
    }

    else if (key.id > 7) {
        //Make note higher pitch when natural, dependent of key signature
        if (accidental === SHARP_NOTE || accidental === NATURAL_NOTE) return i === 11 ? 0 : (i + 1)
        else if (accidental === FLAT_NOTE) return i === 0 ? 11 : (i - 1)
        return i
    }
}

export const updateNoteLetter = (row, noteToEditIndex, accidental, song, key) => {
    if (row === 1) {
        if (key.id === 1 || key.id === 8) {
            transformNote('no-translate', noteToEditIndex, row, correctLetter(8, accidental, key), accidental, song)
            transformNote('move-down', noteToEditIndex, row, correctLetter(7, accidental, key), accidental, song)
        } else if (key.id > 1 && key.id < 7) {
            transformNote('no-translate', noteToEditIndex, row, correctLetter(9, accidental, key), accidental, song)
            transformNote('move-down', noteToEditIndex, row, correctLetter(7, accidental, key), accidental, song)
        } else if (key.id === 7) {
            transformNote('no-translate', noteToEditIndex, row, correctLetter(9, accidental, key), accidental, song)
            transformNote('move-down', noteToEditIndex, row, correctLetter(8, accidental, key), accidental, song)
        } else if (key.id > 8) {
            transformNote('no-translate', noteToEditIndex, row, correctLetter(8, accidental, key), accidental, song)
            transformNote('move-down', noteToEditIndex, row, correctLetter(6, accidental, key), accidental, song)
        }
    }
    if (row === 2) {
        if (key.id < 3 || key.id === 8) {
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
        } else if (key.id === 9 || key.id === 10) {
            transformNote('move-up', noteToEditIndex, row, correctLetter(6, accidental, key), accidental, song)
            transformNote('no-translate', noteToEditIndex, row, correctLetter(5, accidental, key), accidental, song)
            transformNote('move-down', noteToEditIndex, row, correctLetter(3, accidental, key), accidental, song)
        } else if (key.id === 11 || key.id === 12) {
            transformNote('move-up', noteToEditIndex, row, correctLetter(6, accidental, key), accidental, song)
            transformNote('no-translate', noteToEditIndex, row, correctLetter(4, accidental, key), accidental, song)
            transformNote('move-down', noteToEditIndex, row, correctLetter(3, accidental, key), accidental, song)
        }
    }
    if (row === 3) {
        if (key.id < 3) {
            transformNote('move-up', noteToEditIndex, row, correctLetter(3, accidental, key), accidental, song)
            transformNote('no-translate', noteToEditIndex, row, correctLetter(2, accidental, key), accidental, song)
            transformNote('move-down', noteToEditIndex, row, correctLetter(0, accidental, key), accidental, song)
        } else if (key.id > 2 && key.id < 6) {
            transformNote('move-up', noteToEditIndex, row, correctLetter(4, accidental, key), accidental, song)
            transformNote('no-translate', noteToEditIndex, row, correctLetter(2, accidental, key), accidental, song)
            transformNote('move-down', noteToEditIndex, row, correctLetter(0, accidental, key), accidental, song)
        } else if (key.id === 6 || key.id === 7) {
            transformNote('move-up', noteToEditIndex, row, correctLetter(4, accidental, key), accidental, song)
            transformNote('no-translate', noteToEditIndex, row, correctLetter(2, accidental, key), accidental, song)
            transformNote('move-down', noteToEditIndex, row, correctLetter(1, accidental, key), accidental, song)
        } else if (key.id === 8 || key.id === 9) {
            transformNote('move-up', noteToEditIndex, row, correctLetter(3, accidental, key), accidental, song)
            transformNote('no-translate', noteToEditIndex, row, correctLetter(1, accidental, key), accidental, song)
            transformNote('move-down', noteToEditIndex, row, correctLetter(0, accidental, key), accidental, song)
        } else if (key.id > 9) {
            transformNote('move-up', noteToEditIndex, row, correctLetter(3, accidental, key), accidental, song)
            transformNote('no-translate', noteToEditIndex, row, correctLetter(1, accidental, key), accidental, song)
            transformNote('move-down', noteToEditIndex, row, correctLetter(11, accidental, key), accidental, song)
        }
    }
    if (row === 4) {
        if (key.id === 1 || (key.id > 7 && key.id < 10)) {
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
        } else if (key.id === 10 || key.id === 11) {
            transformNote('move-up', noteToEditIndex, row, correctLetter(11, accidental, key), accidental, song)
            transformNote('no-translate', noteToEditIndex, row, correctLetter(10, accidental, key), accidental, song)
            transformNote('move-down', noteToEditIndex, row, correctLetter(8, accidental, key), accidental, song)
        } else if (key.id === 12) {
            transformNote('move-up', noteToEditIndex, row, correctLetter(11, accidental, key), accidental, song)
            transformNote('no-translate', noteToEditIndex, row, correctLetter(9, accidental, key), accidental, song)
            transformNote('move-down', noteToEditIndex, row, correctLetter(8, accidental, key), accidental, song)
        }
    }
    if (row === 5) {
        if (key.id === 1 || key.id === 8) {
            transformNote('move-up', noteToEditIndex, row, correctLetter(8, accidental, key), accidental, song)
            transformNote('no-translate', noteToEditIndex, row, correctLetter(7, accidental, key), accidental, song)
            transformNote('move-down', noteToEditIndex, row, correctLetter(5, accidental, key), accidental, song)
        } else if (key.id > 1 && key.id < 5) {
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
        } else if (key.id === 9 || key.id === 10) {
            transformNote('move-up', noteToEditIndex, row, correctLetter(8, accidental, key), accidental, song)
            transformNote('no-translate', noteToEditIndex, row, correctLetter(6, accidental, key), accidental, song)
            transformNote('move-down', noteToEditIndex, row, correctLetter(5, accidental, key), accidental, song)
        } else if (key.id === 11 || key.id === 12) {
            transformNote('move-up', noteToEditIndex, row, correctLetter(8, accidental, key), accidental, song)
            transformNote('no-translate', noteToEditIndex, row, correctLetter(6, accidental, key), accidental, song)
            transformNote('move-down', noteToEditIndex, row, correctLetter(4, accidental, key), accidental, song)
        }
    }
    else if (row === 6) {
        if (key.id < 3) {
            transformNote('move-up', noteToEditIndex, row, correctLetter(5, accidental, key), accidental, song)
            transformNote('no-translate', noteToEditIndex, row, correctLetter(3, accidental, key), accidental, song)
            transformNote('move-down', noteToEditIndex, row, correctLetter(2, accidental, key), accidental, song)
        } else if (key.id === 3 || key.id === 4) {
            transformNote('move-up', noteToEditIndex, row, correctLetter(5, accidental, key), accidental, song)
            transformNote('no-translate', noteToEditIndex, row, correctLetter(4, accidental, key), accidental, song)
            transformNote('move-down', noteToEditIndex, row, correctLetter(2, accidental, key), accidental, song)
        } else if (key.id > 4 && key.id < 8) {
            transformNote('move-up', noteToEditIndex, row, correctLetter(6, accidental, key), accidental, song)
            transformNote('no-translate', noteToEditIndex, row, correctLetter(4, accidental, key), accidental, song)
            transformNote('move-down', noteToEditIndex, row, correctLetter(2, accidental, key), accidental, song)
        } else if (key.id > 7 && key.id < 11) {
            transformNote('move-up', noteToEditIndex, row, correctLetter(5, accidental, key), accidental, song)
            transformNote('no-translate', noteToEditIndex, row, correctLetter(3, accidental, key), accidental, song)
            transformNote('move-down', noteToEditIndex, row, correctLetter(1, accidental, key), accidental, song)
        } else if (key.id === 11 || key.id === 12) {
            transformNote('move-up', noteToEditIndex, row, correctLetter(4, accidental, key), accidental, song)
            transformNote('no-translate', noteToEditIndex, row, correctLetter(3, accidental, key), accidental, song)
            transformNote('move-down', noteToEditIndex, row, correctLetter(1, accidental, key), accidental, song)
        }
    }
    else if (row === 7) {
        if (key.id < 4) {
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
        } else if (key.id === 8 || key.id === 9) {
            transformNote('move-up', noteToEditIndex, row, correctLetter(1, accidental, key), accidental, song)
            transformNote('no-translate', noteToEditIndex, row, correctLetter(0, accidental, key), accidental, song)
            transformNote('move-down', noteToEditIndex, row, correctLetter(10, accidental, key), accidental, song)
        } else if (key.id === 10 || key.id === 11) {
            transformNote('move-up', noteToEditIndex, row, correctLetter(1, accidental, key), accidental, song)
            transformNote('no-translate', noteToEditIndex, row, correctLetter(11, accidental, key), accidental, song)
            transformNote('move-down', noteToEditIndex, row, correctLetter(10, accidental, key), accidental, song)
        } else if (key.id === 12) {
            transformNote('move-up', noteToEditIndex, row, correctLetter(1, accidental, key), accidental, song)
            transformNote('no-translate', noteToEditIndex, row, correctLetter(11, accidental, key), accidental, song)
            transformNote('move-down', noteToEditIndex, row, correctLetter(9, accidental, key), accidental, song)
        }
    }
    else if (row === 8) {
        if (key.id === 1 || key.id === 8) {
            transformNote('move-up', noteToEditIndex, row, correctLetter(10, accidental, key), accidental, song)
            transformNote('no-translate', noteToEditIndex, row, correctLetter(8, accidental, key), accidental, song)
            transformNote('move-down', noteToEditIndex, row, correctLetter(7, accidental, key), accidental, song)
        } else if (key.id === 2 || key.id === 3) {
            transformNote('move-up', noteToEditIndex, row, correctLetter(10, accidental, key), accidental, song)
            transformNote('no-translate', noteToEditIndex, row, correctLetter(9, accidental, key), accidental, song)
            transformNote('move-down', noteToEditIndex, row, correctLetter(7, accidental, key), accidental, song)
        } else if (key.id > 3 && key.id < 7) {
            transformNote('move-up', noteToEditIndex, row, correctLetter(11, accidental, key), accidental, song)
            transformNote('no-translate', noteToEditIndex, row, correctLetter(9, accidental, key), accidental, song)
            transformNote('move-down', noteToEditIndex, row, correctLetter(7, accidental, key), accidental, song)
        } else if (key.id === 7) {
            transformNote('move-up', noteToEditIndex, row, correctLetter(11, accidental, key), accidental, song)
            transformNote('no-translate', noteToEditIndex, row, correctLetter(9, accidental, key), accidental, song)
            transformNote('move-down', noteToEditIndex, row, correctLetter(8, accidental, key), accidental, song)
        } else if (key.id > 8 && key.id < 12) {
            transformNote('move-up', noteToEditIndex, row, correctLetter(10, accidental, key), accidental, song)
            transformNote('no-translate', noteToEditIndex, row, correctLetter(8, accidental, key), accidental, song)
            transformNote('move-down', noteToEditIndex, row, correctLetter(6, accidental, key), accidental, song)
        } else if (key.id === 12) {
            transformNote('move-up', noteToEditIndex, row, correctLetter(9, accidental, key), accidental, song)
            transformNote('no-translate', noteToEditIndex, row, correctLetter(8, accidental, key), accidental, song)
            transformNote('move-down', noteToEditIndex, row, correctLetter(6, accidental, key), accidental, song)
        }
    }
    else if (row === 9) {
        if (key.id < 3 || key.id === 8) {
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
        } else if (key.id === 9 || key.id === 10) {
            transformNote('move-up', noteToEditIndex, row, correctLetter(6, accidental, key), accidental, song)
            transformNote('no-translate', noteToEditIndex, row, correctLetter(5, accidental, key), accidental, song)
            transformNote('move-down', noteToEditIndex, row, correctLetter(3, accidental, key), accidental, song)
        } else if (key.id === 11 || key.id === 12) {
            transformNote('move-up', noteToEditIndex, row, correctLetter(6, accidental, key), accidental, song)
            transformNote('no-translate', noteToEditIndex, row, correctLetter(4, accidental, key), accidental, song)
            transformNote('move-down', noteToEditIndex, row, correctLetter(3, accidental, key), accidental, song)
        }
    }
    else if (row === 10) {
        if (key.id < 3) {
            transformNote('move-up', noteToEditIndex, row, correctLetter(3, accidental, key), accidental, song)
            transformNote('no-translate', noteToEditIndex, row, correctLetter(2, accidental, key), accidental, song)
            transformNote('move-down', noteToEditIndex, row, correctLetter(0, accidental, key), accidental, song)
        } else if (key.id > 2 && key.id < 6) {
            transformNote('move-up', noteToEditIndex, row, correctLetter(4, accidental, key), accidental, song)
            transformNote('no-translate', noteToEditIndex, row, correctLetter(2, accidental, key), accidental, song)
            transformNote('move-down', noteToEditIndex, row, correctLetter(0, accidental, key), accidental, song)
        } else if (key.id === 6 || key.id === 7) {
            transformNote('move-up', noteToEditIndex, row, correctLetter(4, accidental, key), accidental, song)
            transformNote('no-translate', noteToEditIndex, row, correctLetter(2, accidental, key), accidental, song)
            transformNote('move-down', noteToEditIndex, row, correctLetter(1, accidental, key), accidental, song)
        }

        else if (key.id === 8 || key.id === 9) {
            transformNote('move-up', noteToEditIndex, row, correctLetter(3, accidental, key), accidental, song)
            transformNote('no-translate', noteToEditIndex, row, correctLetter(1, accidental, key), accidental, song)
            transformNote('move-down', noteToEditIndex, row, correctLetter(0, accidental, key), accidental, song)
        } else if (key.id > 9) {
            transformNote('move-up', noteToEditIndex, row, correctLetter(3, accidental, key), accidental, song)
            transformNote('no-translate', noteToEditIndex, row, correctLetter(1, accidental, key), accidental, song)
            transformNote('move-down', noteToEditIndex, row, correctLetter(11, accidental, key), accidental, song)
        }
    }
    else if (row === 11) {
        if (key.id === 1 || key.id === 8 || key.id === 9) {
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
        } else if (key.id === 10 || key.id === 11) {
            transformNote('move-up', noteToEditIndex, row, correctLetter(11, accidental, key), accidental, song)
            transformNote('no-translate', noteToEditIndex, row, correctLetter(10, accidental, key), accidental, song)
            transformNote('move-down', noteToEditIndex, row, correctLetter(8, accidental, key), accidental, song)
        } else if (key.id === 12) {
            transformNote('move-up', noteToEditIndex, row, correctLetter(11, accidental, key), accidental, song)
            transformNote('no-translate', noteToEditIndex, row, correctLetter(9, accidental, key), accidental, song)
            transformNote('move-down', noteToEditIndex, row, correctLetter(8, accidental, key), accidental, song)
        }
    }
    else if (row === 12) {
        if (key.id === 1 || key.id === 8) {
            transformNote('move-up', noteToEditIndex, row, correctLetter(8, accidental, key), accidental, song)
            transformNote('no-translate', noteToEditIndex, row, correctLetter(7, accidental, key), accidental, song)
        } else if (key.id > 1 && key.id < 7) {
            transformNote('move-up', noteToEditIndex, row, correctLetter(9, accidental, key), accidental, song)
            transformNote('no-translate', noteToEditIndex, row, correctLetter(7, accidental, key), accidental, song)
        } else if (key.id === 7) {
            transformNote('move-up', noteToEditIndex, row, correctLetter(9, accidental, key), accidental, song)
            transformNote('no-translate', noteToEditIndex, row, correctLetter(8, accidental, key), accidental, song)
        } else if (key.id > 8) {
            transformNote('move-up', noteToEditIndex, row, correctLetter(8, accidental, key), accidental, song)
            transformNote('no-translate', noteToEditIndex, row, correctLetter(6, accidental, key), accidental, song)
        }
    }
}
