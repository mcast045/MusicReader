export const showTab = (n, idx, song) => {
    if (song[idx]) {
        if (song[idx].row === 1) {
            if (song[idx].letter === 'F#')
                return n === 1 ? '14' : ''
            else if (song[idx].letter === 'F')
                return n === 1 ? '13' : ''
            else if (song[idx].letter === 'E')
                return n === 1 ? '12' : ''
            else if (song[idx].letter === 'D#')
                return n === 1 ? '11' : ''
        }
        else if (song[idx].row === 2) {
            if (song[idx].letter === 'F')
                return n === 1 ? '13' : ''
            else if (song[idx].letter === 'E')
                return n === 1 ? '12' : ''
            else if (song[idx].letter === 'D#')
                return n === 1 ? '11' : ''
            else if (song[idx].letter === 'D')
                return n === 1 ? '10' : ''
            else if (song[idx].letter === 'C#')
                return n === 1 ? '9' : ''
            else if (song[idx].letter === 'C')
                return n === 1 ? '8' : ''
            else if (song[idx].letter === 'B')
                return n === 1 ? '7' : ''
        }
        else if (song[idx].row === 3) {
            if (song[idx].letter === 'C#')
                return n === 1 ? '9' : ''
            else if (song[idx].letter === 'C')
                return n === 1 ? '8' : ''
            else if (song[idx].letter === 'B')
                return n === 1 ? '7' : ''
            else if (song[idx].letter === 'A#')
                return n === 1 ? '6' : ''
            else if (song[idx].letter === 'A')
                return n === 1 ? '5' : ''
            else if (song[idx].letter === 'G#')
                return n === 1 ? '4' : ''
        }
        else if (song[idx].row === 4) {
            if (song[idx].letter === 'A#')
                return n === 1 ? '6' : ''
            else if (song[idx].letter === 'A')
                return n === 1 ? '5' : ''
            else if (song[idx].letter === 'G#')
                return n === 1 ? '4' : ''
            else if (song[idx].letter === 'G')
                return n === 1 ? '3' : ''
            else if (song[idx].letter === 'F#')
                return n === 1 ? '2' : ''
            else if (song[idx].letter === 'F')
                return n === 1 ? '1' : ''
            else if (song[idx].letter === 'E')
                return n === 1 ? '0' : ''
        }
        else if (song[idx].row === 5) {
            if (song[idx].letter === 'F#')
                return n === 1 ? '2' : ''
            else if (song[idx].letter === 'F')
                return n === 1 ? '1' : ''
            else if (song[idx].letter === 'E')
                return n === 1 ? '0' : ''
            else if (song[idx].letter === 'D#')
                return n === 2 ? '4' : ''
            else if (song[idx].letter === 'D')
                return n === 2 ? '3' : ''
            else if (song[idx].letter === 'C#')
                return n === 2 ? '2' : ''
        }
        else if (song[idx].row === 6) {
            if (song[idx].letter === 'D#')
                return n === 2 ? '4' : ''
            else if (song[idx].letter === 'D')
                return n === 2 ? '3' : ''
            else if (song[idx].letter === 'C#')
                return n === 2 ? '2' : ''
            else if (song[idx].letter === 'C')
                return n === 2 ? '1' : ''
            else if (song[idx].letter === 'B')
                return n === 2 ? '0' : ''
            else if (song[idx].letter === 'A#')
                return n === 3 ? '3' : ''
        }
        else if (song[idx].row === 7) {
            if (song[idx].letter === 'C')
                return n === 2 ? '1' : ''
            else if (song[idx].letter === 'B')
                return n === 2 ? '0' : ''
            else if (song[idx].letter === 'A#')
                return n === 3 ? '3' : ''
            else if (song[idx].letter === 'A')
                return n === 3 ? '2' : ''
            else if (song[idx].letter === 'G#')
                return n === 3 ? '1' : ''
            else if (song[idx].letter === 'G')
                return n === 3 ? '0' : ''
            else if (song[idx].letter === 'F#')
                return n === 4 ? '4' : ''
        }
        else if (song[idx].row === 8) {
            if (song[idx].letter === 'G#')
                return n === 3 ? '1' : ''
            else if (song[idx].letter === 'G')
                return n === 3 ? '0' : ''
            else if (song[idx].letter === 'F#')
                return n === 4 ? '4' : ''
            else if (song[idx].letter === 'F')
                return n === 4 ? '3' : ''
            else if (song[idx].letter === 'E')
                return n === 4 ? '2' : ''
            else if (song[idx].letter === 'D#')
                return n === 4 ? '1' : ''
        }
        else if (song[idx].row === 9) {
            if (song[idx].letter === 'F')
                return n === 4 ? '3' : ''
            else if (song[idx].letter === 'E')
                return n === 4 ? '2' : ''
            else if (song[idx].letter === 'D#')
                return n === 4 ? '1' : ''
            else if (song[idx].letter === 'D')
                return n === 4 ? '0' : ''
            else if (song[idx].letter === 'C#')
                return n === 5 ? '4' : ''
            else if (song[idx].letter === 'C')
                return n === 5 ? '3' : ''
            else if (song[idx].letter === 'B')
                return n === 5 ? '2' : ''
        }
        else if (song[idx].row === 10) {
            if (song[idx].letter === 'C#')
                return n === 5 ? '4' : ''
            else if (song[idx].letter === 'C')
                return n === 5 ? '3' : ''
            else if (song[idx].letter === 'B')
                return n === 5 ? '2' : ''
            else if (song[idx].letter === 'A#')
                return n === 5 ? '1' : ''
            else if (song[idx].letter === 'A')
                return n === 5 ? '0' : ''
            else if (song[idx].letter === 'G#')
                return n === 6 ? '4' : ''
        }
        else if (song[idx].row === 11) {
            if (song[idx].letter === 'A#')
                return n === 5 ? '1' : ''
            else if (song[idx].letter === 'A')
                return n === 5 ? '0' : ''
            else if (song[idx].letter === 'G#')
                return n === 6 ? '4' : ''
            else if (song[idx].letter === 'G')
                return n === 6 ? '3' : ''
            else if (song[idx].letter === 'F#')
                return n === 6 ? '2' : ''
            else if (song[idx].letter === 'F')
                return n === 6 ? '1' : ''
            else if (song[idx].letter === 'E')
                return n === 6 ? '0' : ''
        }
        else if (song[idx].row === 12) {
            if (song[idx].letter === 'F#')
                return n === 6 ? '2' : ''
            else if (song[idx].letter === 'F')
                return n === 6 ? '1' : ''
            else if (song[idx].letter === 'E')
                return n === 6 ? '0' : ''
        }
    }
    return ''
}