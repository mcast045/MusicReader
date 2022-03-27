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

    const { user, isAuthenticated } = useSelector(({ auth }) => auth)
    const { notes, isUpdating, loading: isNotesLoading } = useSelector(({ notes }) => notes)
    const { songs, currentSong, loading: isSongsLoading } = useSelector(({ song }) => song)
    const { isShowingInfo, isShowingLogout } = useSelector(({ util }) => util)

    const { isPublished, title, tempo, date, _id: songID, keySignature } = currentSong

    const onSongInfoChange = e => {
        dispatch(isFetchingNotes())
        dispatch(getUserSong(user._id, e.target.value))
    }

    const onClickEdit = () => {
        dispatch(isShowInfo(!isShowingInfo))
        dispatch(isShowLogout(!isShowingLogout))
    }

    const onClickPublish = () => {
        dispatch(publishSong(songID))
        dispatch(setAlert('Published', 'success'))
    }

    const onClickRedact = () => {
        dispatch(redactSong(songID))
        dispatch(setAlert('Redacted', 'success'))
    }

    return (
        <Fragment>
            {user._id && isSongsLoading && songs?.length > 0 ? <Loader /> :
                <Fragment>
                    {isShowingInfo && currentSong &&
                        <div>
                            {songs.length > 0 &&
                                <select defaultValue='none' onChange={onSongInfoChange} className='songInfo_dropdown'>
                                    <option value='none' className='songInfo_option' disabled hidden>Your Songs</option>
                                    {songs?.map((song, i) => (
                                        <option value={song._id} key={i} className='songInfo_option'>{song.title}</option>
                                    ))}
                                </select>}

                            {user._id && currentSong && currentSong?.keySignature && !isNotesLoading &&
                                <div className='songInfo'>
                                    <div className='songInfo_prop font-2'>
                                        <label>Title</label>
                                        <div>{title}</div>
                                    </div>

                                    <div className='songInfo_prop font-2'>
                                        <label>Tempo</label>
                                        <div>{tempo} bpm</div>
                                    </div>

                                    <div className='songInfo_prop font-2'>
                                        <label>Key</label>
                                        <div>{keySignature?.value}</div>
                                    </div>

                                    <div className='songInfo_prop font-2'>
                                        <label>Date Created</label>
                                        <div>{dateFormat(date)}</div>
                                    </div>
                                </div>
                            }
                            <div className='songInfo_btns-container'>
                                <div className='editBtns-container'>
                                    <button className='btn songInfo_btn' onClick={onClickEdit}>Edit</button>
                                    {isPublished ?
                                        <button className='btn songInfo_btn' onClick={onClickRedact}>Redact</button>
                                        :
                                        <button className='btn songInfo_btn' onClick={onClickPublish}>Publish</button>
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