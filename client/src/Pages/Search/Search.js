import React, { Fragment, useEffect } from 'react'
import './Search.css'
import { Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { getAllSongs, getPublishedSong, clearAll } from '../../Redux/Actions/Song'
import { dateFormat } from '../../HelperFunctions/Helpers'
import Loader from '../../Images/Loader/Loader'
import { isFetchingNotes } from '../../Redux/Actions/Notes'

const Search = props => {

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getAllSongs())
    }, [dispatch])

    const songs = useSelector(state => state.song.songsSearch)
    const isAuthenticated = useSelector(state => state.auth.isAuthenticated)

    const onClickSong = id => {
        dispatch(isFetchingNotes())
        dispatch(getPublishedSong(id))
    }

    const onClickHome = () => {
        if (!isAuthenticated)
            dispatch(clearAll())

        props.history.push('/')
    }

    return (
        <div className='search'>
            {songs.length === 0 ? <Loader /> :
                <Fragment>
                    <div className='search-menu'>
                        <label className='search-menu_label'>Song Title: </label>
                        <input type='text' name='songName' />
                        <button className='btn search-menu_btn'>Select</button>
                        <button className='btn search-menu_btn' onClick={() => onClickHome()}>Home</button>
                    </div>

                    <div className='search-songs'>
                        {songs.map((song, i) => (
                            <div key={i} className='search-songs_list'>
                                {i === 0 &&
                                    <div className='search-songs_list-headings'>
                                        <span>Title</span>
                                        <span>Key</span>
                                        <span>Author</span>
                                        <span>Tempo</span>
                                        <span>Date Created</span>
                                    </div>
                                }
                                <Link to={`/${song._id}`} onClick={() => onClickSong(song._id)} className='search-songs_list-item'>
                                    <span>{song.title}</span>
                                    <span>{song.keySignature.value}</span>
                                    <span>{song.author}</span>
                                    <span>{song.tempo}</span>
                                    <span>{dateFormat(song.date)}</span>
                                </Link>
                            </div>
                        ))}
                    </div>
                </Fragment>
            }
        </div>
    );
}

export default Search;