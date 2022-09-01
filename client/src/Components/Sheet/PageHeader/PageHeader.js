import React, { useState, useEffect } from 'react'
import './PageHeader.css'
import Loader from '../../../Images/Loader/Loader'
import { Link } from 'react-router-dom'
import { logoutUser, flipAuthCard } from '../../../Redux/Actions/Auth'
import { clearAll } from '../../../Redux/Actions/Song'
import { isFetchingNotes } from '../../../Redux/Actions/Notes'
import { useSelector, useDispatch } from 'react-redux'

const SheetHeader = ({ setNumOfStaffs, viewOnly, screenSize }) => {

    const dispatch = useDispatch()

    const { notes, isUpdating, loading: isNotesLoading } = useSelector(({ notes }) => notes)
    const { currentSong, staffLineNumber } = useSelector(({ song }) => song)
    const { user, isAuthenticated } = useSelector(({ auth }) => auth)
    const { isShowingLogout } = useSelector(({ util }) => util)

    const { _id: songID, title, author, tempo } = currentSong

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

    const onClickAuth = cardFace => dispatch(flipAuthCard(cardFace))

    return (
        <>
            {(isNotesLoading && songID) || (viewOnly && isNotesLoading) ? <Loader /> :
                <div className='ml-15'>
                    <div className={sheetHeaderCN}>
                        {(user._id && songID) || (!user._id && viewOnly && notes.length > 0) ?
                            <div className='song-information'>
                                <h2 className='main_song_header font-4 nomargin'>{title}</h2>
                                <h3 className='username nomargin'><span>{`by: ${author}`}</span></h3>
                                {viewOnly && <h3 className='username nomargin'><span>{`Tempo: ${tempo} bpm`}</span></h3>}
                            </div> :
                            <div className='song-information'>
                                <h2 className='main_song_header nomargin logout'>Developer tools</h2>
                                <h3 className='username nomargin logout'>by: <span>The Beatles</span></h3>
                            </div>
                        }

                        {!user._id && !isUpdating &&
                            < div className='userSignIn'>
                                <Link to='/auth' className='userSignIn_link' onClick={() => onClickAuth('back')}>Login</Link>
                                <Link to='/auth' className='userSignIn_link' onClick={() => onClickAuth('front')}>Register</Link>
                                <Link to='/search?page=1' className='search-songs'>Search</Link>
                                {viewOnly && <Link to='/' onClick={onClickHome} className='search-songs'>Home</Link>}
                            </div>
                        }
                        {user._id && (isShowingLogout || viewOnly) &&
                            <div className='userSignIn'>
                                {!isUpdating &&
                                    <>
                                        <Link to='/' className='userSignIn_link' onClick={onClickLogoutUser}>Logout</Link>
                                        <Link to='/search?page=1' className='search-songs'>Search</Link>
                                    </>
                                }
                                {viewOnly && <Link to='/' onClick={onClickHome} className='search-songs'>Home</Link>}
                            </div>
                        }
                    </div>
                </div>
            }
        </>
    )
}

export default SheetHeader