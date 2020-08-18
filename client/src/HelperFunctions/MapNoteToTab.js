export const tabValue = (tabLine, tab) => {
    if (tab.tabPosition === 1) {
        if (tab.row === 1) {
            if (tab.letter === 'F#') return tabLine === 1 ? '14' : ''
            else if (tab.letter === 'F') return tabLine === 1 ? '13' : ''
            else if (tab.letter === 'E') return tabLine === 1 ? '12' : ''
            else if (tab.letter === 'D#') return tabLine === 1 ? '11' : ''
        } else if (tab.row === 2) {
            if (tab.letter === 'F') return tabLine === 1 ? '13' : ''
            else if (tab.letter === 'E') return tabLine === 1 ? '12' : ''
            else if (tab.letter === 'D#') return tabLine === 1 ? '11' : ''
            else if (tab.letter === 'D') return tabLine === 1 ? '10' : ''
            else if (tab.letter === 'C#') return tabLine === 1 ? '9' : ''
            else if (tab.letter === 'C') return tabLine === 1 ? '8' : ''
            else if (tab.letter === 'B') return tabLine === 1 ? '7' : ''
        } else if (tab.row === 3) {
            if (tab.letter === 'C#') return tabLine === 1 ? '9' : ''
            else if (tab.letter === 'C') return tabLine === 1 ? '8' : ''
            else if (tab.letter === 'B') return tabLine === 1 ? '7' : ''
            else if (tab.letter === 'A#') return tabLine === 1 ? '6' : ''
            else if (tab.letter === 'A') return tabLine === 1 ? '5' : ''
            else if (tab.letter === 'G#') return tabLine === 1 ? '4' : ''
        } else if (tab.row === 4) {
            if (tab.letter === 'A#') return tabLine === 1 ? '6' : ''
            else if (tab.letter === 'A') return tabLine === 1 ? '5' : ''
            else if (tab.letter === 'G#') return tabLine === 1 ? '4' : ''
            else if (tab.letter === 'G') return tabLine === 1 ? '3' : ''
            else if (tab.letter === 'F#') return tabLine === 1 ? '2' : ''
            else if (tab.letter === 'F') return tabLine === 1 ? '1' : ''
            else if (tab.letter === 'E') return tabLine === 1 ? '0' : ''
        } else if (tab.row === 5) {
            if (tab.letter === 'F#') return tabLine === 1 ? '2' : ''
            else if (tab.letter === 'F') return tabLine === 1 ? '1' : ''
            else if (tab.letter === 'E') return tabLine === 1 ? '0' : ''
            else if (tab.letter === 'D#') return tabLine === 2 ? '4' : ''
            else if (tab.letter === 'D') return tabLine === 2 ? '3' : ''
            else if (tab.letter === 'C#') return tabLine === 2 ? '2' : ''
        } else if (tab.row === 6) {
            if (tab.letter === 'D#') return tabLine === 2 ? '4' : ''
            else if (tab.letter === 'D') return tabLine === 2 ? '3' : ''
            else if (tab.letter === 'C#') return tabLine === 2 ? '2' : ''
            else if (tab.letter === 'C') return tabLine === 2 ? '1' : ''
            else if (tab.letter === 'B') return tabLine === 2 ? '0' : ''
            else if (tab.letter === 'A#') return tabLine === 3 ? '3' : ''
        } else if (tab.row === 7) {
            if (tab.letter === 'C') return tabLine === 2 ? '1' : ''
            else if (tab.letter === 'B') return tabLine === 2 ? '0' : ''
            else if (tab.letter === 'A#') return tabLine === 3 ? '3' : ''
            else if (tab.letter === 'A') return tabLine === 3 ? '2' : ''
            else if (tab.letter === 'G#') return tabLine === 3 ? '1' : ''
            else if (tab.letter === 'G') return tabLine === 3 ? '0' : ''
            else if (tab.letter === 'F#') return tabLine === 4 ? '4' : ''
        } else if (tab.row === 8) {
            if (tab.letter === 'G#') return tabLine === 3 ? '1' : ''
            else if (tab.letter === 'G') return tabLine === 3 ? '0' : ''
            else if (tab.letter === 'F#') return tabLine === 4 ? '4' : ''
            else if (tab.letter === 'F') return tabLine === 4 ? '3' : ''
            else if (tab.letter === 'E') return tabLine === 4 ? '2' : ''
            else if (tab.letter === 'D#') return tabLine === 4 ? '1' : ''
        } else if (tab.row === 9) {
            if (tab.letter === 'F') return tabLine === 4 ? '3' : ''
            else if (tab.letter === 'E') return tabLine === 4 ? '2' : ''
            else if (tab.letter === 'D#') return tabLine === 4 ? '1' : ''
            else if (tab.letter === 'D') return tabLine === 4 ? '0' : ''
            else if (tab.letter === 'C#') return tabLine === 5 ? '4' : ''
            else if (tab.letter === 'C') return tabLine === 5 ? '3' : ''
            else if (tab.letter === 'B') return tabLine === 5 ? '2' : ''
        } else if (tab.row === 10) {
            if (tab.letter === 'C#') return tabLine === 5 ? '4' : ''
            else if (tab.letter === 'C') return tabLine === 5 ? '3' : ''
            else if (tab.letter === 'B') return tabLine === 5 ? '2' : ''
            else if (tab.letter === 'A#') return tabLine === 5 ? '1' : ''
            else if (tab.letter === 'A') return tabLine === 5 ? '0' : ''
            else if (tab.letter === 'G#') return tabLine === 6 ? '4' : ''
        } else if (tab.row === 11) {
            if (tab.letter === 'A#') return tabLine === 5 ? '1' : ''
            else if (tab.letter === 'A') return tabLine === 5 ? '0' : ''
            else if (tab.letter === 'G#') return tabLine === 6 ? '4' : ''
            else if (tab.letter === 'G') return tabLine === 6 ? '3' : ''
            else if (tab.letter === 'F#') return tabLine === 6 ? '2' : ''
            else if (tab.letter === 'F') return tabLine === 6 ? '1' : ''
            else if (tab.letter === 'E') return tabLine === 6 ? '0' : ''
        } else if (tab.row === 12) {
            if (tab.letter === 'F#') return tabLine === 6 ? '2' : ''
            else if (tab.letter === 'F') return tabLine === 6 ? '1' : ''
            else if (tab.letter === 'E') return tabLine === 6 ? '0' : ''
        }
    }



    else if (tab.tabPosition === 2) {
        if (tab.row === 1) {
            if (tab.letter === 'F#') return tabLine === 1 ? '14' : ''
            else if (tab.letter === 'F') return tabLine === 1 ? '13' : ''
            else if (tab.letter === 'E') return tabLine === 1 ? '12' : ''
            else if (tab.letter === 'D#') return tabLine === 1 ? '11' : ''
        } else if (tab.row === 2) {
            if (tab.letter === 'F') return tabLine === 1 ? '13' : ''
            else if (tab.letter === 'E') return tabLine === 1 ? '12' : ''
            else if (tab.letter === 'D#') return tabLine === 1 ? '11' : ''
            else if (tab.letter === 'D') return tabLine === 1 ? '10' : ''
            else if (tab.letter === 'C#') return tabLine === 2 ? '14' : ''
            else if (tab.letter === 'C') return tabLine === 2 ? '13' : ''
            else if (tab.letter === 'B') return tabLine === 2 ? '12' : ''
        } else if (tab.row === 3) {
            if (tab.letter === 'C#') return tabLine === 2 ? '14' : ''
            else if (tab.letter === 'C') return tabLine === 2 ? '13' : ''
            else if (tab.letter === 'B') return tabLine === 2 ? '12' : ''
            else if (tab.letter === 'A#') return tabLine === 2 ? '11' : ''
            else if (tab.letter === 'A') return tabLine === 2 ? '10' : ''
            else if (tab.letter === 'G#') return tabLine === 2 ? '9' : ''
        } else if (tab.row === 4) {
            if (tab.letter === 'A#') return tabLine === 2 ? '11' : ''
            else if (tab.letter === 'A') return tabLine === 2 ? '10' : ''
            else if (tab.letter === 'G#') return tabLine === 2 ? '9' : ''
            else if (tab.letter === 'G') return tabLine === 2 ? '8' : ''
            else if (tab.letter === 'F#') return tabLine === 2 ? '7' : ''
            else if (tab.letter === 'F') return tabLine === 2 ? '6' : ''
            else if (tab.letter === 'E') return tabLine === 2 ? '5' : ''
        } else if (tab.row === 5) {
            if (tab.letter === 'F#') return tabLine === 2 ? '7' : ''
            else if (tab.letter === 'F') return tabLine === 2 ? '6' : ''
            else if (tab.letter === 'E') return tabLine === 2 ? '5' : ''
            else if (tab.letter === 'D#') return tabLine === 3 ? '8' : ''
            else if (tab.letter === 'D') return tabLine === 3 ? '7' : ''
            else if (tab.letter === 'C#') return tabLine === 3 ? '6' : ''
        } else if (tab.row === 6) {
            if (tab.letter === 'D#') return tabLine === 3 ? '8' : ''
            else if (tab.letter === 'D') return tabLine === 3 ? '7' : ''
            else if (tab.letter === 'C#') return tabLine === 3 ? '6' : ''
            else if (tab.letter === 'C') return tabLine === 3 ? '5' : ''
            else if (tab.letter === 'B') return tabLine === 3 ? '4' : ''
            else if (tab.letter === 'A#') return tabLine === 4 ? '8' : ''
        } else if (tab.row === 7) {
            if (tab.letter === 'C') return tabLine === 3 ? '5' : ''
            else if (tab.letter === 'B') return tabLine === 3 ? '4' : ''
            else if (tab.letter === 'A#') return tabLine === 4 ? '8' : ''
            else if (tab.letter === 'A') return tabLine === 4 ? '7' : ''
            else if (tab.letter === 'G#') return tabLine === 4 ? '6' : ''
            else if (tab.letter === 'G') return tabLine === 4 ? '5' : ''
            else if (tab.letter === 'F#') return tabLine === 5 ? '9' : ''
        } else if (tab.row === 8) {
            if (tab.letter === 'G#') return tabLine === 4 ? '6' : ''
            else if (tab.letter === 'G') return tabLine === 4 ? '5' : ''
            else if (tab.letter === 'F#') return tabLine === 5 ? '9' : ''
            else if (tab.letter === 'F') return tabLine === 5 ? '8' : ''
            else if (tab.letter === 'E') return tabLine === 5 ? '7' : ''
            else if (tab.letter === 'D#') return tabLine === 5 ? '6' : ''
        } else if (tab.row === 9) {
            if (tab.letter === 'F') return tabLine === 5 ? '8' : ''
            else if (tab.letter === 'E') return tabLine === 5 ? '7' : ''
            else if (tab.letter === 'D#') return tabLine === 5 ? '6' : ''
            else if (tab.letter === 'D') return tabLine === 5 ? '5' : ''
            else if (tab.letter === 'C#') return tabLine === 6 ? '9' : ''
            else if (tab.letter === 'C') return tabLine === 6 ? '8' : ''
            else if (tab.letter === 'B') return tabLine === 6 ? '7' : ''
        } else if (tab.row === 10) {
            if (tab.letter === 'C#') return tabLine === 6 ? '9' : ''
            else if (tab.letter === 'C') return tabLine === 6 ? '8' : ''
            else if (tab.letter === 'B') return tabLine === 6 ? '7' : ''
            else if (tab.letter === 'A#') return tabLine === 6 ? '6' : ''
            else if (tab.letter === 'A') return tabLine === 6 ? '5' : ''
            else if (tab.letter === 'G#') return tabLine === 6 ? '4' : ''
        } else if (tab.row === 11) {
            if (tab.letter === 'A#') return tabLine === 6 ? '6' : ''
            else if (tab.letter === 'A') return tabLine === 6 ? '5' : ''
            else if (tab.letter === 'G#') return tabLine === 6 ? '4' : ''
            else if (tab.letter === 'G') return tabLine === 6 ? '3' : ''
            else if (tab.letter === 'F#') return tabLine === 6 ? '2' : ''
            else if (tab.letter === 'F') return tabLine === 6 ? '1' : ''
            else if (tab.letter === 'E') return tabLine === 6 ? '0' : ''
        } else if (tab.row === 12) {
            if (tab.letter === 'F#') return tabLine === 6 ? '2' : ''
            else if (tab.letter === 'F') return tabLine === 6 ? '1' : ''
            else if (tab.letter === 'E') return tabLine === 6 ? '0' : ''
        }
    }


    else if (tab.tabPosition === 3) {
        if (tab.row === 1) {
            if (tab.letter === 'F#') return tabLine === 1 ? '14' : ''
            else if (tab.letter === 'F') return tabLine === 1 ? '13' : ''
            else if (tab.letter === 'E') return tabLine === 1 ? '12' : ''
            else if (tab.letter === 'D#') return tabLine === 1 ? '11' : ''
        } else if (tab.row === 2) {
            if (tab.letter === 'F') return tabLine === 1 ? '13' : ''
            else if (tab.letter === 'E') return tabLine === 1 ? '12' : ''
            else if (tab.letter === 'D#') return tabLine === 1 ? '11' : ''
            else if (tab.letter === 'D') return tabLine === 1 ? '10' : ''
            else if (tab.letter === 'C#') return tabLine === 2 ? '14' : ''
            else if (tab.letter === 'C') return tabLine === 2 ? '13' : ''
            else if (tab.letter === 'B') return tabLine === 2 ? '12' : ''
        } else if (tab.row === 3) {
            if (tab.letter === 'C#') return tabLine === 2 ? '14' : ''
            else if (tab.letter === 'C') return tabLine === 2 ? '13' : ''
            else if (tab.letter === 'B') return tabLine === 2 ? '12' : ''
            else if (tab.letter === 'A#') return tabLine === 3 ? '15' : ''
            else if (tab.letter === 'A') return tabLine === 3 ? '14' : ''
            else if (tab.letter === 'G#') return tabLine === 3 ? '13' : ''
        } else if (tab.row === 4) {
            if (tab.letter === 'A#') return tabLine === 3 ? '15' : ''
            else if (tab.letter === 'A') return tabLine === 3 ? '14' : ''
            else if (tab.letter === 'G#') return tabLine === 3 ? '13' : ''
            else if (tab.letter === 'G') return tabLine === 3 ? '12' : ''
            else if (tab.letter === 'F#') return tabLine === 3 ? '11' : ''
            else if (tab.letter === 'F') return tabLine === 3 ? '10' : ''
            else if (tab.letter === 'E') return tabLine === 3 ? '9' : ''
        } else if (tab.row === 5) {
            if (tab.letter === 'F#') return tabLine === 3 ? '11' : ''
            else if (tab.letter === 'F') return tabLine === 3 ? '10' : ''
            else if (tab.letter === 'E') return tabLine === 3 ? '9' : ''
            else if (tab.letter === 'D#') return tabLine === 4 ? '13' : ''
            else if (tab.letter === 'D') return tabLine === 4 ? '12' : ''
            else if (tab.letter === 'C#') return tabLine === 4 ? '11' : ''
        } else if (tab.row === 6) {
            if (tab.letter === 'D#') return tabLine === 4 ? '13' : ''
            else if (tab.letter === 'D') return tabLine === 4 ? '12' : ''
            else if (tab.letter === 'C#') return tabLine === 4 ? '11' : ''
            else if (tab.letter === 'C') return tabLine === 4 ? '10' : ''
            else if (tab.letter === 'B') return tabLine === 4 ? '9' : ''
            else if (tab.letter === 'A#') return tabLine === 5 ? '13' : ''
        } else if (tab.row === 7) {
            if (tab.letter === 'C') return tabLine === 4 ? '10' : ''
            else if (tab.letter === 'B') return tabLine === 4 ? '9' : ''
            else if (tab.letter === 'A#') return tabLine === 5 ? '13' : ''
            else if (tab.letter === 'A') return tabLine === 5 ? '12' : ''
            else if (tab.letter === 'G#') return tabLine === 5 ? '11' : ''
            else if (tab.letter === 'G') return tabLine === 5 ? '10' : ''
            else if (tab.letter === 'F#') return tabLine === 6 ? '14' : ''
        } else if (tab.row === 8) {
            if (tab.letter === 'G#') return tabLine === 5 ? '11' : ''
            else if (tab.letter === 'G') return tabLine === 5 ? '10' : ''
            else if (tab.letter === 'F#') return tabLine === 6 ? '14' : ''
            else if (tab.letter === 'F') return tabLine === 6 ? '13' : ''
            else if (tab.letter === 'E') return tabLine === 6 ? '12' : ''
            else if (tab.letter === 'D#') return tabLine === 6 ? '11' : ''
        } else if (tab.row === 9) {
            if (tab.letter === 'F') return tabLine === 6 ? '13' : ''
            else if (tab.letter === 'E') return tabLine === 6 ? '12' : ''
            else if (tab.letter === 'D#') return tabLine === 6 ? '11' : ''
            else if (tab.letter === 'D') return tabLine === 6 ? '10' : ''
            else if (tab.letter === 'C#') return tabLine === 6 ? '9' : ''
            else if (tab.letter === 'C') return tabLine === 6 ? '8' : ''
            else if (tab.letter === 'B') return tabLine === 6 ? '7' : ''
        } else if (tab.row === 10) {
            if (tab.letter === 'C#') return tabLine === 6 ? '9' : ''
            else if (tab.letter === 'C') return tabLine === 6 ? '8' : ''
            else if (tab.letter === 'B') return tabLine === 6 ? '7' : ''
            else if (tab.letter === 'A#') return tabLine === 6 ? '6' : ''
            else if (tab.letter === 'A') return tabLine === 6 ? '5' : ''
            else if (tab.letter === 'G#') return tabLine === 6 ? '4' : ''
        } else if (tab.row === 11) {
            if (tab.letter === 'A#') return tabLine === 6 ? '6' : ''
            else if (tab.letter === 'A') return tabLine === 6 ? '5' : ''
            else if (tab.letter === 'G#') return tabLine === 6 ? '4' : ''
            else if (tab.letter === 'G') return tabLine === 6 ? '3' : ''
            else if (tab.letter === 'F#') return tabLine === 6 ? '2' : ''
            else if (tab.letter === 'F') return tabLine === 6 ? '1' : ''
            else if (tab.letter === 'E') return tabLine === 6 ? '0' : ''
        } else if (tab.row === 12) {
            if (tab.letter === 'F#') return tabLine === 6 ? '2' : ''
            else if (tab.letter === 'F') return tabLine === 6 ? '1' : ''
            else if (tab.letter === 'E') return tabLine === 6 ? '0' : ''
        }
    }


    return ''
}