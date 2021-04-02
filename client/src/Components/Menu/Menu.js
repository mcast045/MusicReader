import React, { Fragment } from 'react'
import './Menu.css'
import Edit from './EditNote/EditNote'
import StaffBtn from './SheetBtn/btn'
import Notes from './Notes/Notes'
import Rest from './Notes/RestNotes'
import NewSong from './NewSong/NewSong'
import { useSelector } from 'react-redux'

const Menu = () => {

    const isNotesLoading = useSelector(state => state.notes.loading)
    const user = useSelector(state => state.auth.user)

    const currentSong = useSelector(state => state.song.currentSong)

    const currentMenuState = useSelector(state => state.util.isShowingMenu)
    const currentNewSongMenuState = useSelector(state => state.util.newSongClickState)
    const currentSongInfoMenuState = useSelector(state => state.util.isShowingInfo)

    return (
        <div>
            {currentMenuState ?
                <div className='menu-notes'>
                    {user._id && <NewSong />}
                    {!currentNewSongMenuState &&
                        <Fragment>
                            <StaffBtn />
                            {!currentSongInfoMenuState && !isNotesLoading &&
                                <Fragment>
                                    {/* Prevent Notes from showing when loading a newly created song */}
                                    {!user._id ? <Notes /> : currentSong._id && <Notes />}
                                    {!user._id ? <Rest /> : currentSong._id && <Rest />}
                                </Fragment>
                            }
                        </Fragment>
                    }
                </div> :
                <Edit />
            }
        </div>
    )
}

export default Menu