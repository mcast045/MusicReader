import React, { Fragment } from 'react'
import './Menu.css'
import Edit from './EditNote/EditNote'
import StaffBtn from './SheetBtn/btn'
import Notes from './Notes/Notes'
import Rest from './Notes/RestNotes'
import NewSong from './NewSong/NewSong'
import { useSelector } from 'react-redux';

const Menu = ({ showInfo, setShowInfo, showLogout, setShowLogout, newSongClickState, setNewSongClickState, isShowingMenu, setIsShowingMenu }) => {

    const user = useSelector(state => state.auth.user)

    return (
        <div>
            {isShowingMenu ?
                <div className='menu-notes'>
                    {user._id && <NewSong showLogout={showLogout} setShowLogout={setShowLogout} showInfo={showInfo} setShowInfo={setShowInfo} setNewSongClickState={setNewSongClickState} newSongClickState={newSongClickState} />}
                    {!newSongClickState &&
                        <Fragment>
                            <StaffBtn showLogout={showLogout} setShowLogout={setShowLogout} setShowInfo={setShowInfo} showInfo={showInfo} />
                            {!showInfo &&
                                <Fragment>
                                    <Notes showLogout={showLogout} setShowLogout={setShowLogout} />
                                    <Rest showLogout={showLogout} setShowLogout={setShowLogout} />
                                </Fragment>
                            }
                        </Fragment>
                    }
                </div> :
                <Edit showLogout={showLogout} setShowLogout={setShowLogout} isShowingMenu={isShowingMenu} setIsShowingMenu={setIsShowingMenu} />
            }
        </div>
    );
}

export default Menu;