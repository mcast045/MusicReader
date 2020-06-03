import React, { Fragment } from 'react'
import './EditNote.css'
import Notes from '../../Menu/Notes/Notes'
import Rest from '../../Menu/Notes/RestNotes'
import Buttons from './EditBtns'
import { useSelector, useDispatch } from 'react-redux'
import { finishUpdatingNote, updateNote } from '../../../Redux/Actions/Notes'
import { editIndex } from '../../../HelperFunctions/Helpers'
import { isShowingMenu, isShowLogout } from '../../../Redux/Actions/Util'

const EditNote = () => {

    const dispatch = useDispatch()
    const notes = useSelector(state => state.notes.notes)
    const isReplacing = useSelector(state => state.notes.isReplacing)
    const isInserting = useSelector(state => state.notes.isInserting)
    const currentMenuState = useSelector(state => state.util.isShowingMenu)
    const currentLogoutState = useSelector(state => state.util.isShowingLogout)

    const confirmCancel = () => {
        let copy = [...notes]
        let idx = editIndex(copy)
        delete copy[idx]['edit']
        copy[idx] = { ...copy[idx], draggable: false }
        dispatch(updateNote(copy))
        dispatch(finishUpdatingNote())
        dispatch(isShowingMenu(!currentMenuState))
        dispatch(isShowLogout(!currentLogoutState))
    }

    return (
        <div className='container'>
            <div className='confirm-edit-container'>
                <Buttons />
                {(isReplacing || isInserting) &&
                    <Fragment>
                        <Notes />
                        <Rest />
                    </Fragment>}
                <button className='btn confirm-edit-btn-col-cancel' onClick={() => confirmCancel()}>Cancel</button>
            </div>
        </div>
    );
}

export default EditNote;