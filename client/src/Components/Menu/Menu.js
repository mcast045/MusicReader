import React from 'react'
import './Menu.css'
import Edit from './EditNote/EditNote'
import StaffBtn from './SheetBtn/btn'
import Notes from './Notes/Notes'
import Rest from './Notes/RestNotes'
import NewSong from './NewSong/NewSong'
import { useSelector } from 'react-redux'

const Menu = () => {

    const { loading: isNotesLoading } = useSelector(({ notes }) => notes)
    const { user } = useSelector(({ auth }) => auth)
    const { isShowingMenu, newSongClickState, isShowingInfo } = useSelector(({ util }) => util)
    const { currentSong } = useSelector(({ song }) => song)

    return (
        <div>
            {isShowingMenu ?
                <div className='menu-notes'>
                    {user._id && <NewSong />}
                    {!newSongClickState &&
                        <>
                            <StaffBtn />
                            {!isShowingInfo && !isNotesLoading &&
                                <>
                                    {/* Prevent Notes from showing when loading a newly created song */}
                                    {!user._id ? <Notes /> : currentSong?._id && <Notes />}
                                    {!user._id ? <Rest /> : currentSong?._id && <Rest />}
                                </>
                            }
                        </>
                    }
                </div> :
                <Edit />
            }
        </div>
    )
}

export default Menu