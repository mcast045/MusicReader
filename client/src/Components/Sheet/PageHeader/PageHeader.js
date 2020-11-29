import React, { Fragment, useState, useEffect } from 'react'
import './PageHeader.css'
import Loader from '../../../Images/Loader/Loader'
import { Link } from 'react-router-dom'
import { logoutUser, flipAuthCard } from '../../../Redux/Actions/Auth'
import { clearAll } from '../../../Redux/Actions/Song'
import { isFetchingNotes } from '../../../Redux/Actions/Notes'
import { useSelector, useDispatch } from 'react-redux'

const SheetHeader = ({ setNumOfStaffs, viewOnly, screenSize }) => {

    const dispatch = useDispatch()

    const notes = useSelector(state => state.notes.notes)
    const isNotesLoading = useSelector(state => state.notes.loading)
    const isUpdating = useSelector(state => state.notes.isUpdating)
    const currentSong = useSelector(state => state.song.currentSong)
    const staffLineNumber = useSelector(state => state.song.staffLineNumber)
    const user = useSelector(state => state.auth.user)
    const isAuthenticated = useSelector(state => state.auth.isAuthenticated)
    const currentLogoutState = useSelector(state => state.util.isShowingLogout)

    //Give Page Header better responsiveness
    const [sheetHeaderCN, setSheetHeaderCN] = useState('sheet-header')
    useEffect(() => {
        if (screenSize < 1001 && !viewOnly && !isAuthenticated)
            setSheetHeaderCN('non-search_Sheet-Header')
    }, [screenSize, viewOnly, isAuthenticated])

    const onClickLogoutUser = () => {
        setNumOfStaffs(staffLineNumber)
        dispatch(logoutUser())
    }

    const onClickHome = () => {
        dispatch(clearAll())

        if (isAuthenticated)
            dispatch(isFetchingNotes())
    }

    return (
        <Fragment>
            {(isNotesLoading && currentSong._id) || (viewOnly && isNotesLoading) ? <Loader /> :
                <div className='ml-15'>
                    <div className={sheetHeaderCN}>
                        {(user._id && currentSong._id && notes.length > 0) || (!user._id && viewOnly && notes.length > 0) ?
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
                                {viewOnly && <Link to='/' onClick={() => onClickHome()} className='search-songs'>Home</Link>}
                            </div>
                        }
                        {user._id && (currentLogoutState || viewOnly) &&
                            <div className='userSignIn'>
                                <Link to='/' className='userSignIn_link' onClick={() => onClickLogoutUser()}>Logout</Link>
                                {!isUpdating && <Link to='/search?page=1' className='search-songs'>Search</Link>}
                                {viewOnly && <Link to='/' onClick={() => onClickHome()} className='search-songs'>Home</Link>}
                            </div>
                        }
                    </div>
                </div>
            }
        </Fragment>
    )
}

export default SheetHeader