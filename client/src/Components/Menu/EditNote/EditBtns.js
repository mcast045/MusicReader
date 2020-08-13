import React from 'react'
import Accidental from './Accidental'
import { useSelector, useDispatch } from 'react-redux'
import { deleteAnyNote, replaceNote, insertNote, updateNote, makeChord } from '../../../Redux/Actions/Notes'
import { allNotes } from '../../../HelperFunctions/UpdateNoteLetter'
import { isRestNote, countNumberOfNulls, editIndex, getDifferentTabPosition } from '../../../HelperFunctions/Helpers'
import { moveNoteBetween, moveNoteDown, moveNoteUp } from '../../../HelperFunctions/MoveNote'
import { WHOLE_NOTE, HALF_NOTE, QUARTER_NOTE, EIGHTH_NOTE } from '../../../HelperFunctions/SourceCodeEncodings'
import { isShowingMenu, isShowLogout } from '../../../Redux/Actions/Util'

const EditBtns = () => {

    const dispatch = useDispatch()
    const notes = useSelector(state => state.notes.notes)
    const key = useSelector(state => state.song.keySignature)
    const isReplacing = useSelector(state => state.notes.isReplacing)
    const isInserting = useSelector(state => state.notes.isInserting)
    const currentMenuState = useSelector(state => state.util.isShowingMenu)
    const currentLogoutState = useSelector(state => state.util.isShowingLogout)

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
        dispatch(isShowingMenu(!currentMenuState))
        dispatch(isShowLogout(!currentLogoutState))
    }

    // const getDifferentTabPosition = () => {
    //     let copy = [...notes]
    //     let idx = editIndex(copy)
    //     copy[idx].position < 3 ? copy[idx].position++ : copy[idx].position = 1

    //     //Move position to 1 or 2 if only 2 tab positions are possible
    //     if (((copy[idx].row === 2 || copy[idx].row === 3) && (copy[idx].letter === 'B' || copy[idx].letter === 'C' || copy[idx].letter === 'C#')) || (copy[idx].row === 9 && (copy[idx].letter === 'C' || copy[idx].letter === 'C#')) || (copy[idx].row === 10 && copy[idx].letter !== 'G#') || (copy[idx].row === 11 && (copy[idx].letter === 'A#' || copy[idx].letter === 'A')))
    //         copy[idx].position === 2 ? copy[idx].position = 2 : copy[idx].position = 1
    //     //Do not change position if only 1 tab position is possible
    //     else if (copy[idx].row === 1 || copy[idx].row === 12 || (copy[idx].row === 2 && (copy[idx].letter === 'D' || copy[idx].letter === 'D#' || copy[idx].letter === 'E')) || (copy[idx].row === 10 && copy[idx].letter === 'G#') || (copy[idx].row === 11 && (copy[idx].letter !== 'A' || copy[idx].letter !== 'A#')))
    //         copy[idx].position = 1

    //     dispatch(updateNote(copy))
    // }

    // const addNoteToChord = (notes, currentNoteObj, newNoteEntity, type, letter, row) => {
    //     let updateChord = { ...currentNoteObj, chordNote: [{ notePath: newNoteEntity, type, letter, row, draggable: false, transform: 'no-translate', accidental: null }] }
    //     dispatch(makeChord(notes, updateChord))
    // }

    // const onClickAddNote = (notes) => {
    //     let currentNote = notes[editIndex(notes)]

    //     if (currentNote.notePath === WHOLE_NOTE) {
    //         if (key.id < 0)
    //             addNoteToChord(notes, currentNote, WHOLE_NOTE, 'Whole', 'F', 1)
    //         else if (key.id > 0)
    //             addNoteToChord(notes, currentNote, WHOLE_NOTE, 'Whole', 'F#', 1)
    //     }
    // }

    return (
        <div className='confirm-edit-btn'>
            {notes[editIndex(notes)] && notes[editIndex(notes)].letter &&
                <div className='showNote font-2 center'>
                    <h5 className='nomarginpadding'>Note</h5>
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
                <div className='confirm-edit-btn-col'>
                    <button className='btn' onClick={() => getDifferentTabPosition(notes)}>
                        <span title='Shortcut: Press T'>Move Tab</span>
                    </button>
                </div>
            }

            {/* <div className='confirm-edit-btn-col'>
                <button className='btn' onClick={() => onClickAddNote(notes)}>Add Note</button>
            </div> */}

            {!isRestNote(editIndex(notes), null, notes) && <Accidental />}
        </div>
    );
}

export default EditBtns;