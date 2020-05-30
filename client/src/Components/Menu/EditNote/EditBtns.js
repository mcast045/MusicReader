import React from 'react'
import Accidental from './Accidental'
import { useSelector, useDispatch } from 'react-redux'
import { deleteAnyNote, replaceNote, insertNote } from '../../../Redux/Actions/Notes'
import { allNotes } from '../../../HelperFunctions/UpdateNoteLetter'
import { isRestNote, countNumberOfNulls, editIndex } from '../../../HelperFunctions/Helpers'
import { moveNoteBetween, moveNoteDown, moveNoteUp, findLetterIdx } from '../../../HelperFunctions/MoveNote'

const EditBtns = ({ showLogout, setShowLogout, isShowingMenu, setIsShowingMenu }) => {

    const dispatch = useDispatch()
    const notes = useSelector(state => state.notes.notes)
    const key = useSelector(state => state.song.keySignature)
    const isReplacing = useSelector(state => state.notes.isReplacing)
    const isInserting = useSelector(state => state.notes.isInserting)

    //If button has already been clicked for specific note
    //the button will be disabled to prevent the key(letter) from changing incorrectly
    const isDisabled = currentTransformClassName => {
        let idx = editIndex(notes)
        if (notes[idx])
            return notes[idx].transform === currentTransformClassName
    }

    const confirmRemove = () => {
        let copy = [...notes]
        let idx = editIndex(notes)
        copy.splice(idx, countNumberOfNulls(copy, idx, 1))
        dispatch(deleteAnyNote(copy))
        setIsShowingMenu(!isShowingMenu)
        setShowLogout(!showLogout)
    }

    return (
        <div className='confirm-edit-btn'>
            {notes[editIndex(notes)] && notes[editIndex(notes)].letter &&
                <div className='showNote'>
                    <h5>Note</h5>
                    {notes[editIndex(notes)].letter}
                </div>
            }
            {!isRestNote(editIndex(notes), null, notes) &&
                <div className='confirm-edit-btn-col'>
                    <button className='btn' onClick={() => moveNoteUp(notes, key)} disabled={isDisabled('move-up')} title='Shortcut: Q key'>Border Above</button>
                    <button className='btn' onClick={() => moveNoteBetween(notes, key)} disabled={isDisabled('no-translate')} title='Shortcut: A key'>Between Border</button>
                    <button className='btn' onClick={() => moveNoteDown(notes, key)} disabled={isDisabled('move-down')} title='Shortcut: Z key'>Border Below</button>
                </div>
            }
            {!isReplacing && !isInserting &&
                <div className='confirm-edit-btn-col'>
                    <button className='btn' onClick={() => dispatch(replaceNote(notes))}>Replace Note</button>
                    <button className='btn' onClick={() => dispatch(insertNote(notes))}>Insert Note</button>
                    <button className='btn' onClick={() => confirmRemove()}>Remove Note</button>
                </div>
            }
            {!isRestNote(editIndex(notes), null, notes) &&
                <Accidental allNotes={allNotes} findLetterIdx={findLetterIdx} moveNoteBetween={moveNoteBetween} moveNoteDown={moveNoteDown} moveNoteUp={moveNoteUp} isRestNote={isRestNote} />
            }
        </div>
    );
}

export default EditBtns;