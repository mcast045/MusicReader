import React, { Fragment } from 'react'
import './Menu.css'
import Edit from './EditNote/EditNote'
import StaffBtn from './SheetBtn/btn'
import Notes from './Notes/Notes'
import Rest from './Notes/RestNotes'
import NewSong from './NewSong/NewSong'
import { useSelector, useDispatch } from 'react-redux';
import { addNote, replaceNote, insertNote } from '../../Redux/Actions/Notes';
import { isRestNote, countNumberOfNulls, editIndex } from '../../HelperFunctions/Helpers'

const Menu = ({ showInfo, setShowInfo, showLogout, setShowLogout, newSongClickState, setNewSongClickState, isShowingMenu, setIsShowingMenu }) => {

    const dispatch = useDispatch()

    const notes = useSelector(state => state.notes.notes)
    const user = useSelector(state => state.auth.user)

    const createNull = num => {
        let array = []
        for (let i = 1; i < num; i++)
            array.push(null)
        return array
    }

    const addToSongArray = (note, type, letter, row, array = []) =>
        dispatch(addNote([...notes, { notePath: note, type: type, draggable: false, transform: 'no-translate', letter: letter, row: row, accidental: null }, ...array]))

    const dispatchReplaceNote = (oldNotesArray, index, notePath, noteType, transform, letter, row, accidental, nullArray = []) => {
        oldNotesArray[index] = { notePath: notePath, draggable: false, type: noteType, transform: transform, letter: letter, row: row, accidental: accidental }
        oldNotesArray.splice(index + 1, countNumberOfNulls(oldNotesArray, index), ...nullArray)
        dispatch(replaceNote(oldNotesArray))
    }

    const dispatchInsertNote = (copy, idx, notePath, noteType, transform, letter, row, accidental, nullArray = []) => {
        copy.splice(idx, 0, { notePath: notePath, draggable: false, type: noteType, transform: transform, letter: letter, row: row, accidental: accidental }, ...nullArray)
        dispatch(insertNote(copy))
    }

    const replaceNoteInSong = (notesArray, notePath, noteType, nullArray = []) => {
        let copy = [...notesArray]
        let idx = editIndex(copy)
        //Replacing note to a regular note
        if (!isRestNote(-1, noteType, copy)) {
            //If replacing rest note to regular note, show tab
            if (isRestNote(idx, noteType, copy))
                dispatchReplaceNote(copy, idx, notePath, noteType, 'no-translate', 'E', 5, null, nullArray)
            //Replacing regular note with another regular note
            else
                dispatchReplaceNote(copy, idx, notePath, noteType, notesArray[idx].transform, notesArray[idx].letter, notesArray[idx].row, notesArray[idx].accidental, nullArray)
        }
        //Replacing note to a rest note
        else
            dispatchReplaceNote(copy, idx, notePath, noteType, 'no-translate', null, 6, null, nullArray)
    }

    const insertNoteInSong = (notesArray, notePath, noteType, nullArray = []) => {
        let copy = [...notesArray]
        let idx = editIndex(copy)
        delete copy[idx]['edit']
        //If inserting rest note to regular note, show tab
        if (!isRestNote(-1, noteType, copy)) {
            //If inserting rest note to regular note, 
            //Add to normal staff line and show tab
            if (isRestNote(idx, noteType, copy))
                dispatchInsertNote(copy, idx, notePath, noteType, 'no-translate', 'E', 5, null, nullArray)
            //Inserting regular note with another regular note
            else
                dispatchInsertNote(copy, idx, notePath, noteType, notesArray[idx].transform, notesArray[idx].letter, notesArray[idx].row, notesArray[idx].accidental, nullArray)
        }
        //Inserting a rest note
        else
            dispatchInsertNote(copy, idx, notePath, noteType, 'no-translate', null, 6, null, nullArray)
    }

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
                                    <Notes showLogout={showLogout} setShowLogout={setShowLogout} createNull={createNull} insertNoteInSong={insertNoteInSong} replaceNoteInSong={replaceNoteInSong} addToSongArray={addToSongArray} />
                                    <Rest showLogout={showLogout} setShowLogout={setShowLogout} createNull={createNull} insertNoteInSong={insertNoteInSong} replaceNoteInSong={replaceNoteInSong} addToSongArray={addToSongArray} />
                                </Fragment>
                            }
                        </Fragment>
                    }
                </div> :
                <Edit showLogout={showLogout} setShowLogout={setShowLogout} insertNoteInSong={insertNoteInSong} replaceNoteInSong={replaceNoteInSong} addToSongArray={addToSongArray} createNull={createNull} isShowingMenu={isShowingMenu} setIsShowingMenu={setIsShowingMenu} />
            }
        </div>
    );
}

export default Menu;