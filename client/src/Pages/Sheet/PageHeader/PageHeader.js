import React from 'react'
import './PageHeader.css'
import { Link } from 'react-router-dom'
import { logoutUser } from '../../../Redux/Actions/Auth'
import { useSelector, useDispatch } from 'react-redux'

const SheetHeader = ({ setNumOfSheets, viewOnly, showLogout }) => {

    const dispatch = useDispatch()
    const isNotesLoading = useSelector(state => state.notes.loading)
    const isEnabled = useSelector(state => state.notes.isEnabled)
    const currentSong = useSelector(state => state.song.currentSong)
    const staffLineNumber = useSelector(state => state.song.staffLineNumber)
    const user = useSelector(state => state.auth.user)

    const onClickLogoutUser = () => {
        setNumOfSheets(staffLineNumber)
        dispatch(logoutUser())
    }

    return (
        <div className='sheet-header'>
            {(user._id && currentSong && !isNotesLoading) || (!user._id && viewOnly && !isNotesLoading) ?
                <div className='song-information'>
                    <h2 className='main_song_header'>{currentSong.title}</h2>
                    <h3 className='username'><span>{`by: ${currentSong.author}`}</span></h3>
                </div> :
                <div className='song-information'>
                    <h2 className='main_song_header logout'>Developer tools</h2>
                    <h3 className='username logout'>by: <span>The Beatles</span></h3>
                </div>
            }

            {!user._id &&
                < div className='userSignIn'>
                    <Link to='/auth' className='userSignIn_link'>Login</Link>
                    <Link to='/auth' className='userSignIn_link'>Register</Link>
                    {!isEnabled && <Link to='/search' className='search-songs'>Search</Link>}
                </div>
            }
            {user._id && (showLogout || viewOnly) && !isNotesLoading &&
                <div className='userSignIn'>
                    <Link to='/' className='userSignIn_link' onClick={() => onClickLogoutUser()}>Logout</Link>
                    {!isEnabled && <Link to='/search' className='search-songs'>Search</Link>}                </div>
            }
        </div >
    );
}

export default SheetHeader;