import React, { Fragment, useState } from 'react';
import './NewSong.css'
import { getUserSong, createSongInfo, updateKeySignature, clearAll } from '../../../Redux/Actions/Song';
import { useDispatch, useSelector } from 'react-redux';

const NewSongMenu = ({ showLogout, setShowLogout, showInfo, newSongClickState, setNewSongClickState }) => {

    const dispatch = useDispatch()
    const user = useSelector(state => state.auth.user)
    const currentSong = useSelector(state => state.song.currentSong)

    const initialState = {
        tempo: 0,
        title: 'Your Song Title',
        keySignature: { id: 1, value: 'C-major/A-minor' },
    }
    const [newSongInfo, setNewSongInfo] = useState(initialState)
    const [previousSong, setPreviousSong] = useState()

    const updateKey = e => {
        let id = null;
        let value = e.target.value
        if (e.target.value === 'C-major/A-minor')
            id = 1
        else if (e.target.value === 'G-major/E-minor')
            id = 2
        else if (e.target.value === 'D-major/B-minor')
            id = 3
        else if (e.target.value === 'A-major/F#-minor')
            id = 4
        else if (e.target.value === 'E-major/C#-minor')
            id = 5
        else if (e.target.value === 'B-major/G#-minor')
            id = 6
        else if (e.target.value === 'F#-major/D#-minor')
            id = 7

        else if (e.target.value === 'Dflat-major/Bflat-minor')
            id = -5
        else if (e.target.value === 'Aflat-major/F-minor')
            id = -4
        else if (e.target.value === 'Eflat-major/C-minor')
            id = -3
        else if (e.target.value === 'Bflat-major/G-minor')
            id = -2
        else if (e.target.value === 'F-major/D-minor')
            id = -1
        dispatch(updateKeySignature({ id, value }))
        setNewSongInfo({ ...newSongInfo, keySignature: { id, value } })
    }

    const newSongOnClick = (isCancelBtn) => {
        setNewSongInfo(initialState)
        setShowLogout(!showLogout)

        //To save last current used song before clearing data
        if (currentSong)
            setPreviousSong(currentSong._id)
        dispatch(clearAll())

        //Get user's last song info back
        if (isCancelBtn)
            dispatch(getUserSong(user._id, previousSong))

        setNewSongClickState(!newSongClickState)
    }

    const newSongInfoChange = e =>
        setNewSongInfo({ ...newSongInfo, [e.target.name]: e.target.value })

    const newSong = () => {
        dispatch(createSongInfo(newSongInfo))
        setNewSongInfo(initialState)
        setNewSongClickState(!newSongClickState)
        setShowLogout(!showLogout)
    }

    return (
        <Fragment>
            <div className='songInputDetails'>
                {newSongClickState &&
                    <Fragment>
                        <div className='songInputDetails_prop'>
                            <label>Title</label>
                            <input
                                className='menu-song-title-input'
                                type='text'
                                name='title'
                                value={newSongInfo.title}
                                onChange={e => newSongInfoChange(e)}
                            />
                        </div>

                        <div className='songInputDetails_prop'>
                            <label>Tempo</label>
                            <input
                                type='number'
                                min='1'
                                max='200'
                                name='tempo'
                                placeholder='85'
                                className='tempoInput'
                                value={newSongInfo.tempo !== 0 && newSongInfo.tempo}
                                onChange={e => newSongInfoChange(e)}
                                required
                            />
                        </div>

                        <div className='songInputDetails_prop'>
                            <label>Key Signature</label>
                            <div className='menu-notes_dropdown'>
                                <select
                                    id='key-signature'
                                    name='keySignature'
                                    onChange={e => updateKey(e)}
                                >
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
                        </div>
                    </Fragment>
                }

                {!newSongClickState && !showInfo &&
                    <button className='btn newSongbtn' onClick={() => newSongOnClick(false)}>New Song</button>
                }

                {newSongClickState &&
                    <div className='create_btns'>
                        <button className='btn create_btn' onClick={() => newSong()}>Submit</button>
                        <button className='btn create_btn' onClick={() => newSongOnClick(true)}>Cancel</button>
                    </div>
                }
            </div>
        </Fragment>
    );
}

export default NewSongMenu;