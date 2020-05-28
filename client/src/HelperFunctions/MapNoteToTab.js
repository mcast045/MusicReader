export const tabValue = (tabLine, noteIdx, notes) => {
    if (notes[noteIdx]) {
        if (notes[noteIdx].row === 1) {
            if (notes[noteIdx].letter === 'F#') return tabLine === 1 ? '14' : ''
            else if (notes[noteIdx].letter === 'F') return tabLine === 1 ? '13' : ''
            else if (notes[noteIdx].letter === 'E') return tabLine === 1 ? '12' : ''
            else if (notes[noteIdx].letter === 'D#') return tabLine === 1 ? '11' : ''
        }
        else if (notes[noteIdx].row === 2) {
            if (notes[noteIdx].letter === 'F') return tabLine === 1 ? '13' : ''
            else if (notes[noteIdx].letter === 'E') return tabLine === 1 ? '12' : ''
            else if (notes[noteIdx].letter === 'D#') return tabLine === 1 ? '11' : ''
            else if (notes[noteIdx].letter === 'D') return tabLine === 1 ? '10' : ''
            else if (notes[noteIdx].letter === 'C#') return tabLine === 1 ? '9' : ''
            else if (notes[noteIdx].letter === 'C') return tabLine === 1 ? '8' : ''
            else if (notes[noteIdx].letter === 'B') return tabLine === 1 ? '7' : ''
        }
        else if (notes[noteIdx].row === 3) {
            if (notes[noteIdx].letter === 'C#') return tabLine === 1 ? '9' : ''
            else if (notes[noteIdx].letter === 'C') return tabLine === 1 ? '8' : ''
            else if (notes[noteIdx].letter === 'B') return tabLine === 1 ? '7' : ''
            else if (notes[noteIdx].letter === 'A#') return tabLine === 1 ? '6' : ''
            else if (notes[noteIdx].letter === 'A') return tabLine === 1 ? '5' : ''
            else if (notes[noteIdx].letter === 'G#') return tabLine === 1 ? '4' : ''
        }
        else if (notes[noteIdx].row === 4) {
            if (notes[noteIdx].letter === 'A#') return tabLine === 1 ? '6' : ''
            else if (notes[noteIdx].letter === 'A') return tabLine === 1 ? '5' : ''
            else if (notes[noteIdx].letter === 'G#') return tabLine === 1 ? '4' : ''
            else if (notes[noteIdx].letter === 'G') return tabLine === 1 ? '3' : ''
            else if (notes[noteIdx].letter === 'F#') return tabLine === 1 ? '2' : ''
            else if (notes[noteIdx].letter === 'F') return tabLine === 1 ? '1' : ''
            else if (notes[noteIdx].letter === 'E') return tabLine === 1 ? '0' : ''
        }
        else if (notes[noteIdx].row === 5) {
            if (notes[noteIdx].letter === 'F#') return tabLine === 1 ? '2' : ''
            else if (notes[noteIdx].letter === 'F') return tabLine === 1 ? '1' : ''
            else if (notes[noteIdx].letter === 'E') return tabLine === 1 ? '0' : ''
            else if (notes[noteIdx].letter === 'D#') return tabLine === 2 ? '4' : ''
            else if (notes[noteIdx].letter === 'D') return tabLine === 2 ? '3' : ''
            else if (notes[noteIdx].letter === 'C#') return tabLine === 2 ? '2' : ''
        }
        else if (notes[noteIdx].row === 6) {
            if (notes[noteIdx].letter === 'D#') return tabLine === 2 ? '4' : ''
            else if (notes[noteIdx].letter === 'D') return tabLine === 2 ? '3' : ''
            else if (notes[noteIdx].letter === 'C#') return tabLine === 2 ? '2' : ''
            else if (notes[noteIdx].letter === 'C') return tabLine === 2 ? '1' : ''
            else if (notes[noteIdx].letter === 'B') return tabLine === 2 ? '0' : ''
            else if (notes[noteIdx].letter === 'A#') return tabLine === 3 ? '3' : ''
        }
        else if (notes[noteIdx].row === 7) {
            if (notes[noteIdx].letter === 'C') return tabLine === 2 ? '1' : ''
            else if (notes[noteIdx].letter === 'B') return tabLine === 2 ? '0' : ''
            else if (notes[noteIdx].letter === 'A#') return tabLine === 3 ? '3' : ''
            else if (notes[noteIdx].letter === 'A') return tabLine === 3 ? '2' : ''
            else if (notes[noteIdx].letter === 'G#') return tabLine === 3 ? '1' : ''
            else if (notes[noteIdx].letter === 'G') return tabLine === 3 ? '0' : ''
            else if (notes[noteIdx].letter === 'F#') return tabLine === 4 ? '4' : ''
        }
        else if (notes[noteIdx].row === 8) {
            if (notes[noteIdx].letter === 'G#') return tabLine === 3 ? '1' : ''
            else if (notes[noteIdx].letter === 'G') return tabLine === 3 ? '0' : ''
            else if (notes[noteIdx].letter === 'F#') return tabLine === 4 ? '4' : ''
            else if (notes[noteIdx].letter === 'F') return tabLine === 4 ? '3' : ''
            else if (notes[noteIdx].letter === 'E') return tabLine === 4 ? '2' : ''
            else if (notes[noteIdx].letter === 'D#') return tabLine === 4 ? '1' : ''
        }
        else if (notes[noteIdx].row === 9) {
            if (notes[noteIdx].letter === 'F') return tabLine === 4 ? '3' : ''
            else if (notes[noteIdx].letter === 'E') return tabLine === 4 ? '2' : ''
            else if (notes[noteIdx].letter === 'D#') return tabLine === 4 ? '1' : ''
            else if (notes[noteIdx].letter === 'D') return tabLine === 4 ? '0' : ''
            else if (notes[noteIdx].letter === 'C#') return tabLine === 5 ? '4' : ''
            else if (notes[noteIdx].letter === 'C') return tabLine === 5 ? '3' : ''
            else if (notes[noteIdx].letter === 'B') return tabLine === 5 ? '2' : ''
        }
        else if (notes[noteIdx].row === 10) {
            if (notes[noteIdx].letter === 'C#') return tabLine === 5 ? '4' : ''
            else if (notes[noteIdx].letter === 'C') return tabLine === 5 ? '3' : ''
            else if (notes[noteIdx].letter === 'B') return tabLine === 5 ? '2' : ''
            else if (notes[noteIdx].letter === 'A#') return tabLine === 5 ? '1' : ''
            else if (notes[noteIdx].letter === 'A') return tabLine === 5 ? '0' : ''
            else if (notes[noteIdx].letter === 'G#') return tabLine === 6 ? '4' : ''
        }
        else if (notes[noteIdx].row === 11) {
            if (notes[noteIdx].letter === 'A#') return tabLine === 5 ? '1' : ''
            else if (notes[noteIdx].letter === 'A') return tabLine === 5 ? '0' : ''
            else if (notes[noteIdx].letter === 'G#') return tabLine === 6 ? '4' : ''
            else if (notes[noteIdx].letter === 'G') return tabLine === 6 ? '3' : ''
            else if (notes[noteIdx].letter === 'F#') return tabLine === 6 ? '2' : ''
            else if (notes[noteIdx].letter === 'F') return tabLine === 6 ? '1' : ''
            else if (notes[noteIdx].letter === 'E') return tabLine === 6 ? '0' : ''
        }
        else if (notes[noteIdx].row === 12) {
            if (notes[noteIdx].letter === 'F#') return tabLine === 6 ? '2' : ''
            else if (notes[noteIdx].letter === 'F') return tabLine === 6 ? '1' : ''
            else if (notes[noteIdx].letter === 'E') return tabLine === 6 ? '0' : ''
        }
    }
    return ''
}