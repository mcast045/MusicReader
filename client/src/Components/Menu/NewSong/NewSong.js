import React, { Fragment, useState } from 'react'
import './NewSong.css'
import KeySigDropDown from '../KeySigDropDown/KeySigDropDown'
import { getUserSong, createSongInfo, clearAll } from '../../../Redux/Actions/Song'
import { useDispatch, useSelector } from 'react-redux'

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
                                className='menu-song-title-input font-2 center'
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
                                className='tempoInput center'
                                value={newSongInfo.tempo !== 0 && newSongInfo.tempo}
                                onChange={e => newSongInfoChange(e)}
                                required
                            />
                        </div>

                        <div className='songInputDetails_prop'>
                            <label>Key Signature</label>
                            <KeySigDropDown setNewSongInfo={setNewSongInfo} newSongInfo={newSongInfo} />
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