import React, { Fragment } from 'react'
import './EditNote.css'
import Notes from '../../Menu/Notes/Notes'
import Rest from '../../Menu/Notes/RestNotes'
import Buttons from './EditBtns'
import { useSelector, useDispatch } from 'react-redux'
import { finishUpdatingNote, updateNote } from '../../../Redux/Actions/Notes'
import { editIndex } from '../../../HelperFunctions/Helpers'

const EditNote = ({ showLogout, setShowLogout, createNull, setIsShowingMenu, isShowingMenu }) => {

    const dispatch = useDispatch()
    const notes = useSelector(state => state.notes.notes)
    const isReplacing = useSelector(state => state.notes.isReplacing)
    const isInserting = useSelector(state => state.notes.isInserting)

    const confirmCancel = () => {
        let copy = [...notes]
        let idx = editIndex(copy)
        delete copy[idx]['edit']
        copy[idx] = { ...copy[idx], draggable: false }
        dispatch(updateNote(copy))
        dispatch(finishUpdatingNote())
        setIsShowingMenu(!isShowingMenu)
        setShowLogout(!showLogout)
    }

    return (
        <div className='container'>
            <div className='confirm-edit-container'>
                <Buttons showLogout={showLogout} setShowLogout={setShowLogout} isShowingMenu={isShowingMenu} setIsShowingMenu={setIsShowingMenu} />
                {(isReplacing || isInserting) &&
                    <Fragment>
                        <Notes showLogout={showLogout} setShowLogout={setShowLogout} isShowingMenu={isShowingMenu} setIsShowingMenu={setIsShowingMenu} createNull={createNull} />
                        <Rest showLogout={showLogout} setShowLogout={setShowLogout} isShowingMenu={isShowingMenu} setIsShowingMenu={setIsShowingMenu} createNull={createNull} />
                    </Fragment>}
                <button className='btn confirm-edit-btn-col-cancel' onClick={() => confirmCancel()}>Cancel</button>
            </div>
        </div>
    );
}

export default EditNote;