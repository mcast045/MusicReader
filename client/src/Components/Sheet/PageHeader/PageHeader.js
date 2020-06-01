import React, { Fragment } from 'react'
import './PageHeader.css'
import Loader from '../../../Images/Loader/Loader'
import { Link } from 'react-router-dom'
import { logoutUser, flipAuthCard } from '../../../Redux/Actions/Auth'
import { clearAll } from '../../../Redux/Actions/Song'
import { useSelector, useDispatch } from 'react-redux'

const SheetHeader = ({ setNumOfSheets, viewOnly, showLogout }) => {

    const dispatch = useDispatch()

    const isNotesLoading = useSelector(state => state.notes.loading)
    const isUpdating = useSelector(state => state.notes.isUpdating)
    const currentSong = useSelector(state => state.song.currentSong)
    const staffLineNumber = useSelector(state => state.song.staffLineNumber)
    const user = useSelector(state => state.auth.user)

    const onClickLogoutUser = () => {
        setNumOfSheets(staffLineNumber)
        dispatch(logoutUser())
    }

    return (
        <Fragment>
            {(isNotesLoading && currentSong._id) || (viewOnly && isNotesLoading) ? <Loader /> :
                <div className='sheet-header'>
                    {(user._id && currentSong && !isNotesLoading) || (!user._id && viewOnly && !isNotesLoading) ?
                        <div className='song-information'>
                            <h2 className='main_song_header font-4 nomargin'>{currentSong.title}</h2>
                            <h3 className='username nomargin'><span>{`by: ${currentSong.author}`}</span></h3>
                        </div> :
                        <div className='song-information'>
                            <h2 className='main_song_header nomargin logout'>Developer tools</h2>
                            <h3 className='username nomargin logout'>by: <span>The Beatles</span></h3>
                        </div>
                    }

                    {!user._id &&
                        < div className='userSignIn'>
                            <Link to='/auth' className='userSignIn_link' onClick={() => dispatch(flipAuthCard('back'))}>Login</Link>
                            <Link to='/auth' className='userSignIn_link' onClick={() => dispatch(flipAuthCard('front'))}>Register</Link>
                            {!isUpdating && <Link to='/search?page=1' className='search-songs'>Search</Link>}
                            {viewOnly && <Link to='/' onClick={() => dispatch(clearAll())} className='search-songs'>Home</Link>}
                        </div>
                    }
                    {user._id && (showLogout || viewOnly) && !isNotesLoading &&
                        <div className='userSignIn'>
                            <Link to='/' className='userSignIn_link' onClick={() => onClickLogoutUser()}>Logout</Link>
                            {!isUpdating && <Link to='/search?page=1' className='search-songs'>Search</Link>}
                            {viewOnly && <Link to='/' onClick={() => dispatch(clearAll())} className='search-songs'>Home</Link>}
                        </div>
                    }
                </div>
            }
        </Fragment>
    );
}

export default SheetHeader;