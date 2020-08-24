import React, { Fragment } from 'react'
import './EditNote.css'
import Notes from '../../Menu/Notes/Notes'
import Rest from '../../Menu/Notes/RestNotes'
import Buttons from './EditBtns'
import { useSelector, useDispatch } from 'react-redux'
import { finishUpdatingNote, updateNote, currentEditColumn } from '../../../Redux/Actions/Notes'
import { editIndex } from '../../../HelperFunctions/Helpers'
import { isShowingMenuAndLogout } from '../../../Redux/Actions/Util'

const EditNote = () => {
    const dispatch = useDispatch()
    const notes = useSelector(state => state.notes.notes)
    const isReplacing = useSelector(state => state.notes.isReplacing)
    const isInserting = useSelector(state => state.notes.isInserting)
    const editColumn = useSelector(state => state.notes.editColumnNumber)
    const currentMenuState = useSelector(state => state.util.isShowingMenu)
    const currentLogoutState = useSelector(state => state.util.isShowingLogout)

    const confirmCancel = () => {
        const idx = editIndex(notes[editColumn])
        let columnWithEdit = notes[editColumn][idx]
        delete columnWithEdit['edit']
        notes[editColumn][idx] = { ...columnWithEdit, draggable: false }

        dispatch(updateNote(notes))
        dispatch(finishUpdatingNote())
        dispatch(isShowingMenuAndLogout(!currentLogoutState))
        dispatch(currentEditColumn(-1))
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
    )
}

export default EditNote