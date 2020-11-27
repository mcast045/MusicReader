import React, { Fragment } from 'react'
import './SongInfo.css'
import Loader from '../../../Images/Loader/Loader'
import { isFetchingNotes } from '../../../Redux/Actions/Notes'
import { getUserSong, publishSong, redactSong } from '../../../Redux/Actions/Song'
import { useSelector, useDispatch } from 'react-redux'
import { dateFormat, clearSheet } from '../../../HelperFunctions/Helpers'
import { setAlert } from '../../../Redux/Actions/Alert'
import { isShowLogout, isShowInfo } from '../../../Redux/Actions/Util'

const SongInformation = () => {
    const dispatch = useDispatch()

    const user = useSelector(state => state.auth.user)
    const isAuthenticated = useSelector(state => state.auth.isAuthenticated)
    const notes = useSelector(state => state.notes.notes)
    const isNotesLoading = useSelector(state => state.notes.loading)
    const isUpdating = useSelector(state => state.notes.isUpdating)
    const songs = useSelector(state => state.song.songs)
    const currentSong = useSelector(state => state.song.currentSong)
    const songLoading = useSelector(state => state.song.loading)
    const currentLogoutState = useSelector(state => state.util.isShowingLogout)
    const currentSongInfomenuState = useSelector(state => state.util.isShowingInfo)

    const onSongInfoChange = e => {
        dispatch(isFetchingNotes())
        dispatch(getUserSong(user._id, e.target.value))
    }

    const onClickEdit = () => {
        dispatch(isShowInfo(!currentSongInfomenuState))
        dispatch(isShowLogout(!currentLogoutState))
    }

    const onClickPublish = () => {
        dispatch(publishSong(currentSong._id))
        dispatch(setAlert('Published', 'success'))
    }

    const onClickRedact = () => {
        dispatch(redactSong(currentSong._id))
        dispatch(setAlert('Redacted', 'success'))
    }

    return (
        <Fragment>
            {user._id && songLoading && songs.length > 0 ? <Loader /> :
                <Fragment>
                    {currentSongInfomenuState && currentSong &&
                        <div>
                            {songs.length > 0 &&
                                <select defaultValue='none' onChange={e => onSongInfoChange(e)} className='songInfo_dropdown'>
                                    <option value='none' className='songInfo_option' disabled hidden>Your Songs</option>
                                    {songs.map((song, i) => (
                                        <option value={song._id} key={i} className='songInfo_option'>{song.title}</option>
                                    ))}
                                </select>}

                            {user._id && currentSong && currentSong.keySignature && !isNotesLoading &&
                                <div className='songInfo'>
                                    <div className='songInfo_prop font-2'>
                                        <label>Title</label>
                                        <div>{currentSong.title}</div>
                                    </div>

                                    <div className='songInfo_prop font-2'>
                                        <label>Tempo</label>
                                        <div>{currentSong.tempo} bpm</div>
                                    </div>

                                    <div className='songInfo_prop font-2'>
                                        <label>Key</label>
                                        <div>{currentSong.keySignature.value}</div>
                                    </div>

                                    <div className='songInfo_prop font-2'>
                                        <label>Date Created</label>
                                        <div>{dateFormat(currentSong.date)}</div>
                                    </div>
                                </div>
                            }
                            <div className='songInfo_btns-container'>
                                <div className='editBtns-container'>
                                    <button className='btn songInfo_btn' onClick={() => onClickEdit()}>Edit</button>
                                    {currentSong.isPublished ?
                                        <button className='btn songInfo_btn' onClick={() => onClickRedact()}>Redact</button>
                                        :
                                        <button className='btn songInfo_btn' onClick={() => onClickPublish()}>Publish</button>
                                    }
                                </div>

                                <div className='clearBtn-container'>
                                    <button className='btn clearBtn' disabled={isUpdating} onClick={() => clearSheet(notes, isAuthenticated)}>Delete Song</button>
                                </div>
                            </div>
                        </div>
                    }
                </Fragment>
            }
        </Fragment >
    )
}

export default SongInformation