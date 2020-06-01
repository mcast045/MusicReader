import React, { useEffect } from 'react'
import './Search.css'
import { Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { getViewableSeachSongs, getPublishedSong } from '../../Redux/Actions/Song'
import { dateFormat } from '../../HelperFunctions/Helpers'
import Loader from '../../Images/Loader/Loader'
import { isFetchingNotes } from '../../Redux/Actions/Notes'
import SearchMenu from '../../Components/SearchMenu/SearchMenu'

const Search = props => {

    const dispatch = useDispatch()
    const songs = useSelector(state => state.song.songsSearch)
    const songsLoaded = useSelector(state => state.song.loading)

    //Load and display published songs based on search page
    let query = props.location.search
    useEffect(() => {
        dispatch(getViewableSeachSongs(query))
    }, [dispatch, query])

    const onClickSong = id => {
        dispatch(isFetchingNotes())
        dispatch(getPublishedSong(id))
    }

    const showFlatEntity = keyValue => {
        if (keyValue[1] === 'f') {
            let returnWord = keyValue[0] + "\u266D" + keyValue.slice(5)
            if (keyValue[0] === 'D') returnWord = returnWord.substr(0, 10) + "\u266D" + returnWord.slice(14)
            return returnWord
        }
        else return keyValue
    }

    return (
        <div className='search'>
            {songsLoaded ? <Loader /> :
                <div className='search-block'>
                    <SearchMenu query={query} />
                    <div className='search-songs'>
                        {songs.map((song, i) => (
                            <div key={i} className='search-songs_list'>
                                {i === 0 &&
                                    <div className='search-songs_list-headings font-2'>
                                        <span>Title</span>
                                        <span>Key</span>
                                        <span>Author</span>
                                        <span>Tempo</span>
                                        <span>Date Created</span>
                                    </div>}

                                <Link to={`/${song._id}`} onClick={() => onClickSong(song._id)} className='search-songs_list-item font-2'>
                                    <span>{song.title}</span>
                                    <span>{showFlatEntity(song.keySignature.value)}</span>
                                    <span>{song.author}</span>
                                    <span>{song.tempo}</span>
                                    <span>{dateFormat(song.date)}</span>
                                </Link>
                            </div>
                        ))}
                    </div>
                </div>
            }
        </div>
    );
}

export default Search;