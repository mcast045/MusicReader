import React, { useEffect } from 'react'
import './Search.css'
import { Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { getViewableSeachSongs, getPublishedSong, clearAll } from '../../Redux/Actions/Song'
import { dateFormat } from '../../HelperFunctions/Helpers'
import Loader from '../../Images/Loader/Loader'
import { isFetchingNotes } from '../../Redux/Actions/Notes'
import SearchMenu from '../../Components/SearchMenu/SearchMenu'
import { FLAT_NOTE } from '../../HelperFunctions/SourceCodeEncodings'

const Search = props => {

    const dispatch = useDispatch()
    const { songsSearch: songs } = useSelector(({ song }) => song)

    //Load and display published songs based on search page
    let query = props.location.search

    useEffect(() => {
        //Remove notes if browser's back button is pressed
        dispatch(clearAll())

        dispatch(getViewableSeachSongs(query))
    }, [dispatch, query])

    const onClickSong = id => {
        dispatch(isFetchingNotes())
        dispatch(getPublishedSong(id))
    }

    const showFlatEntity = keyValue => {
        if (keyValue[1] === 'f') {
            let returnWord = keyValue[0] + FLAT_NOTE + keyValue.slice(5)
            if (keyValue[0] === 'D') returnWord = returnWord.substr(0, 10) + FLAT_NOTE + returnWord.slice(14)
            return returnWord
        }
        return keyValue
    }

    return (
        <div className='search'>
            {songs.length === 0 ? <Loader /> :
                <div className='search-block'>
                    <SearchMenu query={query} />
                    <div className='search-songs'>
                        {songs.map((song, i) => (
                            <div key={i} className='search-songs_list'>
                                {i === 0 &&
                                    <div className='search-songs_list-headings font-2'>
                                        <span className='search-songs_title-heading'>Title</span>
                                        <span className='search-songs_key-heading'>Key</span>
                                        <span className='search-songs_author-heading'>Author</span>
                                        <span className='search-songs_tempo-heading'>Tempo</span>
                                        <span className='search-songs_date-heading'>Date Created</span>
                                    </div>}

                                <Link to={`/${song._id}`} onClick={() => onClickSong(song._id)} className='search-songs_list-item font-2'>
                                    <span className='search-songs_title'>{song.title}</span>
                                    <span className='search-songs_key'>{showFlatEntity(song.keySignature.value)}</span>
                                    <span className='search-songs_author'>{song.author}</span>
                                    <span className='search-songs_tempo'>{song.tempo}</span>
                                    <span className='search-songs_date'>{dateFormat(song.date)}</span>
                                </Link>
                            </div>
                        ))}
                    </div>
                </div>
            }
        </div>
    )
}

export default Search