import React, { Fragment } from 'react'
import './EditNote.css'
import Notes from '../../Menu/Notes/Notes'
import Rest from '../../Menu/Notes/RestNotes'
import Buttons from './EditBtns'
import { useSelector, useDispatch } from 'react-redux'
import { currentEditColumn } from '../../../Redux/Actions/Notes'
import { editIndex, removeEdit } from '../../../HelperFunctions/Helpers'
import { isShowingMenuAndLogout } from '../../../Redux/Actions/Util'

const EditNote = () => {
    const dispatch = useDispatch()
    const notes = useSelector(state => state.notes.notes)
    const isReplacing = useSelector(state => state.notes.isReplacing)
    const isInserting = useSelector(state => state.notes.isInserting)
    const editColumn = useSelector(state => state.notes.editColumnNumber)
    const currentLogoutState = useSelector(state => state.util.isShowingLogout)

    const confirmCancel = () => {
        const copyNotes = [...notes]
        const idx = editIndex(copyNotes[editColumn])
        let columnWithEdit = copyNotes[editColumn][idx]

        //Remove unedited note that is on same tabLine as edited note
        const conflictingTabId = copyNotes[editColumn].findIndex(note => (note.tabRow === columnWithEdit.tabRow) && (!note.edit))
        if (conflictingTabId !== -1) copyNotes[editColumn].splice(conflictingTabId, 1, 0)

        removeEdit(idx, copyNotes, editColumn)
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