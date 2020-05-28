import React, { Fragment } from 'react'
import './Modal.css'
import { useSelector, useDispatch } from 'react-redux'
import { hideModal } from '../../../../Redux/Actions/Modal'
import { deleteSong, clearAll } from '../../../../Redux/Actions/Song'
import { deleteUser } from '../../../../Redux/Actions/Auth'

const Modal = ({ setShowLogout, setNumOfSheets }) => {

    const dispatch = useDispatch()
    const isShowModal = useSelector(state => state.modal.showModal)
    const isDeleteUser = useSelector(state => state.auth.isDeleteUser)
    const staffLineNumber = useSelector(state => state.song.staffLineNumber)
    const isAuthenticated = useSelector(state => state.auth.isAuthenticated)
    const currentSong = useSelector(state => state.song.currentSong)
    const songs = useSelector(state => state.song.songs)

    const onClickOK = () => {
        setNumOfSheets(staffLineNumber)
        setShowLogout(true)

        if (isAuthenticated && songs.length > 0)
            dispatch(deleteSong(currentSong._id))

        if (isDeleteUser)
            dispatch(deleteUser())

        dispatch(clearAll())
        dispatch(hideModal())
    }

    const onClickCancel = () => {
        setShowLogout(true)
        dispatch(hideModal())
    }

    return (
        <Fragment>
            <div className='modal' style={{ display: isShowModal ? 'block' : 'none' }}>
                <div className='modal-container'>
                    <div className='modal-content-container'>
                        <header>Warning</header>
                        <p>You can <span>not</span> undo this action.</p>
                        <div className='modal-content-btn'>
                            <button className='btn modal-btn' onClick={() => onClickOK()}>OK</button>
                            <button className='btn modal-btn' onClick={() => onClickCancel()}>Cancel</button>
                        </div>
                    </div>
                </div>
            </div>
        </Fragment >
    );
}

export default Modal;