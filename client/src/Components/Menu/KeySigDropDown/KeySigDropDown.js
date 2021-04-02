import React from 'react'
import './KeySigDropDown.css'
import { useDispatch } from 'react-redux'
import { updateKeySignature } from '../../../Redux/Actions/Song'

const KeySigDropDown = ({ setNewSongInfo, newSongInfo }) => {

    const dispatch = useDispatch()

    const updateKey = e => {
        let id
        let value = e.target.value

        if (value === 'C-major/A-minor') id = 1
        else if (value === 'G-major/E-minor') id = 2
        else if (value === 'D-major/B-minor') id = 3
        else if (value === 'A-major/F#-minor') id = 4
        else if (value === 'E-major/C#-minor') id = 5
        else if (value === 'B-major/G#-minor') id = 6
        else if (value === 'F#-major/D#-minor') id = 7

        else if (value === 'F-major/D-minor') id = 8
        else if (value === 'Bflat-major/G-minor') id = 9
        else if (value === 'Eflat-major/C-minor') id = 10
        else if (value === 'Aflat-major/F-minor') id = 11
        else if (value === 'Dflat-major/Bflat-minor') id = 12

        dispatch(updateKeySignature({ id, value }))
        setNewSongInfo({ ...newSongInfo, keySignature: { id, value } })
    }

    return (
        <div className='menu-notes_dropdown font-2'>
            <select id='key-signature' name='keySignature' onChange={e => updateKey(e)} >
                <option value='C-major/A-minor'>C-major/A-minor</option>
                <option value='G-major/E-minor'>G-major/E-minor</option>
                <option value='D-major/B-minor'>D-major/B-minor</option>
                <option value='A-major/F#-minor'>A-major/F&#9839;-minor</option>
                <option value='E-major/C#-minor'>E-major/C&#9839;-minor</option>
                <option value='B-major/G#-minor'>B-major/G&#9839;-minor</option>
                <option value='F#-major/D#-minor'>F&#9839;-major/D&#9839;-minor</option>
                <option value='F-major/D-minor'>F-major/D-minor</option>
                <option value='Bflat-major/G-minor'>B&#9837;-major/G-minor</option>
                <option value='Eflat-major/C-minor'>E&#9837;-major/C-minor</option>
                <option value='Aflat-major/F-minor'>A&#9837;-major/F-minor</option>
                <option value='Dflat-major/Bflat-minor'>D&#9837;-major/B&#9837;-minor</option>
            </select>
        </div>
    )
}

export default KeySigDropDown