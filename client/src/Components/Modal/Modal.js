import React, { Fragment } from 'react'
import './Modal.css'
import { useSelector, useDispatch } from 'react-redux'
import { hideModal } from '../../Redux/Actions/Modal'
import { deleteSong, clearAll } from '../../Redux/Actions/Song'
import { deleteUser } from '../../Redux/Actions/Auth'
import { isShowLogout } from '../../Redux/Actions/Util'

const Modal = ({ setNumOfStaffs }) => {

    const dispatch = useDispatch()
    const { showModal } = useSelector(({ modal }) => modal)
    const { isDeleteUser, isAuthenticated } = useSelector(({ auth }) => auth)
    const { songs, currentSong, staffLineNumber } = useSelector(({ song }) => song)
    const { isShowingLogout } = useSelector(({ util }) => util)

    const onClickOK = () => {
        setNumOfStaffs(staffLineNumber)

        if (isAuthenticated && songs?.length > 0) dispatch(deleteSong(currentSong._id))
        if (isDeleteUser) dispatch(deleteUser())

        dispatch(clearAll())
        dispatch(hideModal())
    }

    const onClickCancel = () => {
        dispatch(isShowLogout(!isShowingLogout))
        dispatch(hideModal())
    }

    return (
        <Fragment>
            {showModal &&
                <div className='modal'>
                    <div className='modal-container'>
                        <div className='modal-content-container font-2 center'>
                            <header className='font-3'>Warning</header>
                            <p>You can <span>not</span> undo this action.</p>
                            <div className='modal-content-btn'>
                                <button className='btn modal-btn' onClick={onClickOK}>OK</button>
                                <button className='btn modal-btn' onClick={onClickCancel}>Cancel</button>
                            </div>
                        </div>
                    </div>
                </div>
            }
        </Fragment >
    )
}

export default Modal