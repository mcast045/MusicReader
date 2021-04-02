import React, { Fragment, useState, useEffect } from 'react'
import Accidental from './Accidental'
import { useSelector, useDispatch } from 'react-redux'
import { deleteAnyNote, replaceNote, insertNote, addNote, currentEditColumn } from '../../../Redux/Actions/Notes'
import { isRestNote, countNumberOfNulls, editIndex, getDifferentTabPosition, removeEdit } from '../../../HelperFunctions/Helpers'
import { moveNoteBetween, moveNoteDown, moveNoteUp } from '../../../HelperFunctions/MoveNote'
import { WHOLE_NOTE, HALF_NOTE, QUARTER_NOTE, EIGHTH_NOTE } from '../../../HelperFunctions/SourceCodeEncodings'
import { isShowingMenuAndLogout } from '../../../Redux/Actions/Util'

const EditBtns = () => {

    const dispatch = useDispatch()
    const notes = useSelector(state => state.notes.notes)
    const key = useSelector(state => state.song.keySignature)
    const isReplacing = useSelector(state => state.notes.isReplacing)
    const isInserting = useSelector(state => state.notes.isInserting)
    const editColumn = useSelector(state => state.notes.editColumnNumber)
    const currentLogoutState = useSelector(state => state.util.isShowingLogout)

    const [currentLetter, setCurrentLetter] = useState(notes[editColumn][editIndex(notes[editColumn])].letter)

    //Change letter on drop
    useEffect(() => {
        setCurrentLetter(notes[editColumn][editIndex(notes[editColumn])].letter)
    }, [notes, editColumn])

    const confirmRemove = () => {
        const notesCopy = [...notes]
        if (notesCopy[editColumn].length === 1) notesCopy.splice(editColumn, countNumberOfNulls(notesCopy, editColumn, 1))
        else notesCopy[editColumn].splice(editIndex(notesCopy[editColumn]), 1)

        dispatch(deleteAnyNote(notesCopy))
        dispatch(isShowingMenuAndLogout(!currentLogoutState))
        dispatch(currentEditColumn(-1))
    }


    const addNoteToChord = (chordArr, newNoteEntity, type, letter, row) => {
        const updateChord = { notePath: newNoteEntity, type, letter, row, transform: 'no-translate', accidental: null, tabPosition: 1, edit: 'edit-placeholder' }
        chordArr.push(updateChord)
        dispatch(addNote(notes))
        setCurrentLetter(letter)
    }

    //Prevent notes being on top of eachother
    const makeChord = (notePath, noteType) => {
        const column = notes[editColumn]

        const isRowEmpty = row => column.findIndex(note => note.row === row) === -1
        const isTabEmpty = tab => column.findIndex(note => note.tabRow === tab) === -1

        if (key.id === 1 || key.id === 2) {
            if (isRowEmpty(5) && isTabEmpty(1)) addNoteToChord(column, notePath, noteType, 'E', 5)
            else if (isRowEmpty(6) && isTabEmpty(2)) addNoteToChord(column, notePath, noteType, 'C', 6)
            else if (isRowEmpty(7) && isTabEmpty(3)) addNoteToChord(column, notePath, noteType, 'A', 7)
            else if (isRowEmpty(9) && isTabEmpty(4)) addNoteToChord(column, notePath, noteType, 'D', 9)
            else if (isRowEmpty(10) && isTabEmpty(5)) addNoteToChord(column, notePath, noteType, 'B', 10)
            else if (isRowEmpty(12) && isTabEmpty(6)) addNoteToChord(column, notePath, noteType, 'E', 12)
            else return
        } else if (key.id === 3 || key.id === 4) {
            if (isRowEmpty(5) && isTabEmpty(1)) addNoteToChord(column, notePath, noteType, 'E', 5)
            else if (isRowEmpty(6) && isTabEmpty(2)) addNoteToChord(column, notePath, noteType, 'C#', 6)
            else if (isRowEmpty(7) && isTabEmpty(3)) addNoteToChord(column, notePath, noteType, 'A', 7)
            else if (isRowEmpty(9) && isTabEmpty(4)) addNoteToChord(column, notePath, noteType, 'D', 9)
            else if (isRowEmpty(10) && isTabEmpty(5)) addNoteToChord(column, notePath, noteType, 'B', 10)
            else if (isRowEmpty(12) && isTabEmpty(6)) addNoteToChord(column, notePath, noteType, 'E', 12)
            else return
        } else if (key.id === 5) {
            if (isRowEmpty(5) && isTabEmpty(1)) addNoteToChord(column, notePath, noteType, 'E', 5)
            else if (isRowEmpty(6) && isTabEmpty(2)) addNoteToChord(column, notePath, noteType, 'C#', 6)
            else if (isRowEmpty(7) && isTabEmpty(3)) addNoteToChord(column, notePath, noteType, 'A', 7)
            else if (isRowEmpty(9) && isTabEmpty(4)) addNoteToChord(column, notePath, noteType, 'D#', 9)
            else if (isRowEmpty(10) && isTabEmpty(5)) addNoteToChord(column, notePath, noteType, 'B', 10)
            else if (isRowEmpty(12) && isTabEmpty(6)) addNoteToChord(column, notePath, noteType, 'E', 12)
            else return
        } else if (key.id === 6) {
            if (isRowEmpty(5) && isTabEmpty(1)) addNoteToChord(column, notePath, noteType, 'E', 5)
            else if (isRowEmpty(6) && isTabEmpty(2)) addNoteToChord(column, notePath, noteType, 'C#', 6)
            else if (isRowEmpty(7) && isTabEmpty(3)) addNoteToChord(column, notePath, noteType, 'A#', 7)
            else if (isRowEmpty(9) && isTabEmpty(4)) addNoteToChord(column, notePath, noteType, 'D#', 9)
            else if (isRowEmpty(10) && isTabEmpty(5)) addNoteToChord(column, notePath, noteType, 'B', 10)
            else if (isRowEmpty(12) && isTabEmpty(6)) addNoteToChord(column, notePath, noteType, 'E', 12)
            else return
        } else if (key.id === 7) {
            if (isRowEmpty(5) && isTabEmpty(1)) addNoteToChord(column, notePath, noteType, 'F', 5)
            else if (isRowEmpty(6) && isTabEmpty(2)) addNoteToChord(column, notePath, noteType, 'C#', 6)
            else if (isRowEmpty(7) && isTabEmpty(3)) addNoteToChord(column, notePath, noteType, 'A#', 7)
            else if (isRowEmpty(9) && isTabEmpty(4)) addNoteToChord(column, notePath, noteType, 'D#', 9)
            else if (isRowEmpty(10) && isTabEmpty(5)) addNoteToChord(column, notePath, noteType, 'B', 10)
            else if (isRowEmpty(12) && isTabEmpty(6)) addNoteToChord(column, notePath, noteType, 'F', 12)
        } else if (key.id === 8) {
            if (isRowEmpty(5) && isTabEmpty(1)) addNoteToChord(column, notePath, noteType, 'E', 5)
            else if (isRowEmpty(6) && isTabEmpty(2)) addNoteToChord(column, notePath, noteType, 'C', 6)
            else if (isRowEmpty(7) && isTabEmpty(3)) addNoteToChord(column, notePath, noteType, 'A', 7)
            else if (isRowEmpty(9) && isTabEmpty(4)) addNoteToChord(column, notePath, noteType, 'D', 9)
            else if (isRowEmpty(10) && isTabEmpty(5)) addNoteToChord(column, notePath, noteType, 'A#', 10)
            else if (isRowEmpty(12) && isTabEmpty(6)) addNoteToChord(column, notePath, noteType, 'E', 12)
            else return
        } else if (key.id === 9) {
            if (isRowEmpty(5) && isTabEmpty(2)) addNoteToChord(column, notePath, noteType, 'D#', 5)
            else if (isRowEmpty(4) && isTabEmpty(1)) addNoteToChord(column, notePath, noteType, 'G', 4)
            else if (isRowEmpty(7) && isTabEmpty(3)) addNoteToChord(column, notePath, noteType, 'A', 7)
            else if (isRowEmpty(9) && isTabEmpty(4)) addNoteToChord(column, notePath, noteType, 'D', 9)
            else if (isRowEmpty(10) && isTabEmpty(5)) addNoteToChord(column, notePath, noteType, 'A#', 10)
            else if (isRowEmpty(12) && isTabEmpty(6)) addNoteToChord(column, notePath, noteType, 'G', 11)
            else return
        } else if (key.id === 10) {
            if (isRowEmpty(5) && isTabEmpty(1)) addNoteToChord(column, notePath, noteType, 'D#', 5)
            else if (isRowEmpty(4) && isTabEmpty(1)) addNoteToChord(column, notePath, noteType, 'G', 4)
            else if (isRowEmpty(7) && isTabEmpty(3)) addNoteToChord(column, notePath, noteType, 'G#', 7)
            else if (isRowEmpty(9) && isTabEmpty(4)) addNoteToChord(column, notePath, noteType, 'D', 9)
            else if (isRowEmpty(10) && isTabEmpty(5)) addNoteToChord(column, notePath, noteType, 'A#', 10)
            else if (isRowEmpty(12) && isTabEmpty(6)) addNoteToChord(column, notePath, noteType, 'G', 11)
            else return
        } else if (key.id === 11) {
            if (isRowEmpty(5) && isTabEmpty(2)) addNoteToChord(column, notePath, noteType, 'D#', 5)
            else if (isRowEmpty(4) && isTabEmpty(1)) addNoteToChord(column, notePath, noteType, 'G', 4)
            else if (isRowEmpty(7) && isTabEmpty(3)) addNoteToChord(column, notePath, noteType, 'G#', 7)
            else if (isRowEmpty(8) && isTabEmpty(4)) addNoteToChord(column, notePath, noteType, 'F', 8)
            else if (isRowEmpty(9) && isTabEmpty(5)) addNoteToChord(column, notePath, noteType, 'C#', 9)
            else if (isRowEmpty(10) && isTabEmpty(6)) addNoteToChord(column, notePath, noteType, 'G', 11)
            else return
        } else if (key.id === 12) {
            if (isRowEmpty(5) && isTabEmpty(2)) addNoteToChord(column, notePath, noteType, 'D#', 5)
            else if (isRowEmpty(4) && isTabEmpty(1)) addNoteToChord(column, notePath, noteType, 'F#', 4)
            else if (isRowEmpty(7) && isTabEmpty(3)) addNoteToChord(column, notePath, noteType, 'G#', 7)
            else if (isRowEmpty(8) && isTabEmpty(4)) addNoteToChord(column, notePath, noteType, 'F', 8)
            else if (isRowEmpty(9) && isTabEmpty(5)) addNoteToChord(column, notePath, noteType, 'C#', 9)
            else if (isRowEmpty(10) && isTabEmpty(6)) addNoteToChord(column, notePath, noteType, 'F#', 11)
            else return
        }
        removeEdit(editIndex(notes[editColumn]), notes, editColumn)
    }

    const onClickAddNote = notes => {
        if (notes[editColumn].length < 6) {
            const currentNote = notes[editColumn][editIndex(notes[editColumn])]
            if (currentNote.type === 'Whole') makeChord(WHOLE_NOTE, 'Whole')
            else if (currentNote.type === 'Half') makeChord(HALF_NOTE, 'Half')
            else if (currentNote.type === 'Quarter') makeChord(QUARTER_NOTE, 'Quarter')
            else if (currentNote.type === 'Eighth') makeChord(EIGHTH_NOTE, 'Eighth')
            else if (currentNote.type === 'Dotted-Whole') makeChord(`${WHOLE_NOTE}.`, 'Dotted-Whole')
            else if (currentNote.type === 'Dotted-Half') makeChord(`${HALF_NOTE}.`, 'Dotted-Half')
            else if (currentNote.type === 'Dotted-Quarter') makeChord(`${QUARTER_NOTE}.`, 'Dotted-Quarter')
        }
    }

    return (
        <div className='confirm-edit-btn'>
            {notes[editColumn][editIndex(notes[editColumn])] && notes[editColumn][editIndex(notes[editColumn])].letter &&
                <div className='showNote font-2 center'>
                    <h5 className='nomarginpadding'>Note</h5>
                    {currentLetter}
                </div>
            }

            {!isReplacing && !isInserting &&
                <Fragment>
                    <div className='confirm-edit-btn-col'>
                        <button className='btn' onClick={() => dispatch(replaceNote(notes))}>Replace Note</button>
                        <button className='btn' onClick={() => dispatch(insertNote(notes))}>Insert Note</button>
                        <button className='btn' onClick={() => confirmRemove()}>Remove Note</button>
                    </div>
                    {!isRestNote(editColumn, null, notes) &&
                        <Fragment>
                            <div className='confirm-edit-btn-col'>
                                <button className='btn' onClick={() => moveNoteUp(notes, key, editColumn)} title='Shortcut: Q key'>Border Above</button>
                                <button className='btn' onClick={() => moveNoteBetween(notes, key, editColumn)} title='Shortcut: A key'>Between Border</button>
                                <button className='btn' onClick={() => moveNoteDown(notes, key, editColumn)} title='Shortcut: Z key'>Border Below</button>
                            </div>

                            <div className='confirm-edit-btn-col'>
                                <button className='btn' onClick={() => getDifferentTabPosition(notes, editColumn)}>
                                    <span title='Shortcut: Press T'>Move Tab</span>
                                </button>

                                <button className='btn' onClick={() => onClickAddNote(notes)}>Add Note</button>
                            </div>
                            <Accidental />
                        </Fragment>
                    }
                </Fragment>
            }
        </div>
    )
}

export default EditBtns



// import React, { Fragment, useState, useEffect } from 'react'
// import Accidental from './Accidental'
// import { useSelector, useDispatch } from 'react-redux'
// import { deleteAnyNote, replaceNote, insertNote, addNote, currentEditColumn } from '../../../Redux/Actions/Notes'
// import { isRestNote, countNumberOfNulls, editIndex, getDifferentTabPosition, removeEdit } from '../../../HelperFunctions/Helpers'
// import { moveNoteBetween, moveNoteDown, moveNoteUp } from '../../../HelperFunctions/MoveNote'
// import { WHOLE_NOTE, HALF_NOTE, QUARTER_NOTE, EIGHTH_NOTE } from '../../../HelperFunctions/SourceCodeEncodings'
// import { isShowingMenuAndLogout } from '../../../Redux/Actions/Util'

// const EditBtns = () => {

//     const dispatch = useDispatch()
//     const notes = useSelector(state => state.notes.notes)
//     const key = useSelector(state => state.song.keySignature)
//     const isReplacing = useSelector(state => state.notes.isReplacing)
//     const isInserting = useSelector(state => state.notes.isInserting)
//     const editColumn = useSelector(state => state.notes.editColumnNumber)
//     const currentLogoutState = useSelector(state => state.util.isShowingLogout)

//     const [currentLetter, setCurrentLetter] = useState(notes[editColumn][editIndex(notes[editColumn])].letter)

//     //Change letter on drop
//     useEffect(() => {
//         setCurrentLetter(notes[editColumn][editIndex(notes[editColumn])].letter)
//     }, [notes, editColumn])

//     const confirmRemove = () => {
//         const notesCopy = [...notes]
//         if (notesCopy[editColumn].length === 1) notesCopy.splice(editColumn, countNumberOfNulls(notesCopy, editColumn, 1))
//         else notesCopy[editColumn].splice(editIndex(notesCopy[editColumn]), 1)

//         dispatch(deleteAnyNote(notesCopy))
//         dispatch(isShowingMenuAndLogout(!currentLogoutState))
//         dispatch(currentEditColumn(-1))
//     }


//     const addNoteToChord = (chordArr, newNoteEntity, type, letter, row) => {
//         const updateChord = { notePath: newNoteEntity, type, letter, row, transform: 'no-translate', accidental: null, tabPosition: 1, edit: 'edit-placeholder' }
//         chordArr.push(updateChord)
//         dispatch(addNote(notes))
//         setCurrentLetter(letter)
//     }

//     //Prevent notes being on top of eachother
//     const makeChord = (notePath, noteType) => {
//         const column = notes[editColumn]

//         const isRowEmpty = row => column.findIndex(note => note.row === row) === -1
//         const isTabEmpty = tab => column.findIndex(note => note.tabRow === tab) === -1

//         if (key.id === 1 || key.id === 2) {
//             if (isRowEmpty(5) && isTabEmpty(1)) addNoteToChord(column, notePath, noteType, 'E', 5)
//             else if (isRowEmpty(6) && isTabEmpty(2)) addNoteToChord(column, notePath, noteType, 'C', 6)
//             else if (isRowEmpty(7) && isTabEmpty(3)) addNoteToChord(column, notePath, noteType, 'A', 7)
//             else if (isRowEmpty(9) && isTabEmpty(4)) addNoteToChord(column, notePath, noteType, 'D', 9)
//             else if (isRowEmpty(10) && isTabEmpty(5)) addNoteToChord(column, notePath, noteType, 'B', 10)
//             else if (isRowEmpty(12) && isTabEmpty(6)) addNoteToChord(column, notePath, noteType, 'E', 12)
//             else return
//         } else if (key.id === 3 || key.id === 4) {
//             if (isRowEmpty(5) && isTabEmpty(1)) addNoteToChord(column, notePath, noteType, 'E', 5)
//             else if (isRowEmpty(6) && isTabEmpty(2)) addNoteToChord(column, notePath, noteType, 'C#', 6)
//             else if (isRowEmpty(7) && isTabEmpty(3)) addNoteToChord(column, notePath, noteType, 'A', 7)
//             else if (isRowEmpty(9) && isTabEmpty(4)) addNoteToChord(column, notePath, noteType, 'D', 9)
//             else if (isRowEmpty(10) && isTabEmpty(5)) addNoteToChord(column, notePath, noteType, 'B', 10)
//             else if (isRowEmpty(12) && isTabEmpty(6)) addNoteToChord(column, notePath, noteType, 'E', 12)
//             else return
//         } else if (key.id === 5) {
//             if (isRowEmpty(5) && isTabEmpty(1)) addNoteToChord(column, notePath, noteType, 'E', 5)
//             else if (isRowEmpty(6) && isTabEmpty(2)) addNoteToChord(column, notePath, noteType, 'C#', 6)
//             else if (isRowEmpty(7) && isTabEmpty(3)) addNoteToChord(column, notePath, noteType, 'A', 7)
//             else if (isRowEmpty(9) && isTabEmpty(4)) addNoteToChord(column, notePath, noteType, 'D#', 9)
//             else if (isRowEmpty(10) && isTabEmpty(5)) addNoteToChord(column, notePath, noteType, 'B', 10)
//             else if (isRowEmpty(12) && isTabEmpty(6)) addNoteToChord(column, notePath, noteType, 'E', 12)
//             else return
//         } else if (key.id === 6) {
//             if (isRowEmpty(5) && isTabEmpty(1)) addNoteToChord(column, notePath, noteType, 'E', 5)
//             else if (isRowEmpty(6) && isTabEmpty(2)) addNoteToChord(column, notePath, noteType, 'C#', 6)
//             else if (isRowEmpty(7) && isTabEmpty(3)) addNoteToChord(column, notePath, noteType, 'A#', 7)
//             else if (isRowEmpty(9) && isTabEmpty(4)) addNoteToChord(column, notePath, noteType, 'D#', 9)
//             else if (isRowEmpty(10) && isTabEmpty(5)) addNoteToChord(column, notePath, noteType, 'B', 10)
//             else if (isRowEmpty(12) && isTabEmpty(6)) addNoteToChord(column, notePath, noteType, 'E', 12)
//             else return
//         } else if (key.id === 7) {
//             if (isRowEmpty(5) && isTabEmpty(1)) addNoteToChord(column, notePath, noteType, 'F', 5)
//             else if (isRowEmpty(6) && isTabEmpty(2)) addNoteToChord(column, notePath, noteType, 'C#', 6)
//             else if (isRowEmpty(7) && isTabEmpty(3)) addNoteToChord(column, notePath, noteType, 'A#', 7)
//             else if (isRowEmpty(9) && isTabEmpty(4)) addNoteToChord(column, notePath, noteType, 'D#', 9)
//             else if (isRowEmpty(10) && isTabEmpty(5)) addNoteToChord(column, notePath, noteType, 'B', 10)
//             else if (isRowEmpty(12) && isTabEmpty(6)) addNoteToChord(column, notePath, noteType, 'F', 12)
//         } else if (key.id === -1) {
//             if (isRowEmpty(5) && isTabEmpty(1)) addNoteToChord(column, notePath, noteType, 'E', 5)
//             else if (isRowEmpty(6) && isTabEmpty(2)) addNoteToChord(column, notePath, noteType, 'C', 6)
//             else if (isRowEmpty(7) && isTabEmpty(3)) addNoteToChord(column, notePath, noteType, 'A', 7)
//             else if (isRowEmpty(9) && isTabEmpty(4)) addNoteToChord(column, notePath, noteType, 'D', 9)
//             else if (isRowEmpty(10) && isTabEmpty(5)) addNoteToChord(column, notePath, noteType, 'A#', 10)
//             else if (isRowEmpty(12) && isTabEmpty(6)) addNoteToChord(column, notePath, noteType, 'E', 12)
//             else return
//         } else if (key.id === -2) {
//             if (isRowEmpty(5) && isTabEmpty(2)) addNoteToChord(column, notePath, noteType, 'D#', 5)
//             else if (isRowEmpty(4) && isTabEmpty(1)) addNoteToChord(column, notePath, noteType, 'G', 4)
//             else if (isRowEmpty(7) && isTabEmpty(3)) addNoteToChord(column, notePath, noteType, 'A', 7)
//             else if (isRowEmpty(9) && isTabEmpty(4)) addNoteToChord(column, notePath, noteType, 'D', 9)
//             else if (isRowEmpty(10) && isTabEmpty(5)) addNoteToChord(column, notePath, noteType, 'A#', 10)
//             else if (isRowEmpty(12) && isTabEmpty(6)) addNoteToChord(column, notePath, noteType, 'G', 11)
//             else return
//         } else if (key.id === -3) {
//             if (isRowEmpty(5) && isTabEmpty(1)) addNoteToChord(column, notePath, noteType, 'D#', 5)
//             else if (isRowEmpty(4) && isTabEmpty(1)) addNoteToChord(column, notePath, noteType, 'G', 4)
//             else if (isRowEmpty(7) && isTabEmpty(3)) addNoteToChord(column, notePath, noteType, 'G#', 7)
//             else if (isRowEmpty(9) && isTabEmpty(4)) addNoteToChord(column, notePath, noteType, 'D', 9)
//             else if (isRowEmpty(10) && isTabEmpty(5)) addNoteToChord(column, notePath, noteType, 'A#', 10)
//             else if (isRowEmpty(12) && isTabEmpty(6)) addNoteToChord(column, notePath, noteType, 'G', 11)
//             else return
//         } else if (key.id === -4) {
//             if (isRowEmpty(5) && isTabEmpty(2)) addNoteToChord(column, notePath, noteType, 'D#', 5)
//             else if (isRowEmpty(4) && isTabEmpty(1)) addNoteToChord(column, notePath, noteType, 'G', 4)
//             else if (isRowEmpty(7) && isTabEmpty(3)) addNoteToChord(column, notePath, noteType, 'G#', 7)
//             else if (isRowEmpty(8) && isTabEmpty(4)) addNoteToChord(column, notePath, noteType, 'F', 8)
//             else if (isRowEmpty(9) && isTabEmpty(5)) addNoteToChord(column, notePath, noteType, 'C#', 9)
//             else if (isRowEmpty(10) && isTabEmpty(6)) addNoteToChord(column, notePath, noteType, 'G', 11)
//             else return
//         } else if (key.id === -5) {
//             if (isRowEmpty(5) && isTabEmpty(2)) addNoteToChord(column, notePath, noteType, 'D#', 5)
//             else if (isRowEmpty(4) && isTabEmpty(1)) addNoteToChord(column, notePath, noteType, 'F#', 4)
//             else if (isRowEmpty(7) && isTabEmpty(3)) addNoteToChord(column, notePath, noteType, 'G#', 7)
//             else if (isRowEmpty(8) && isTabEmpty(4)) addNoteToChord(column, notePath, noteType, 'F', 8)
//             else if (isRowEmpty(9) && isTabEmpty(5)) addNoteToChord(column, notePath, noteType, 'C#', 9)
//             else if (isRowEmpty(10) && isTabEmpty(6)) addNoteToChord(column, notePath, noteType, 'F#', 11)
//             else return
//         }
//         removeEdit(editIndex(notes[editColumn]), notes, editColumn)
//     }

//     const onClickAddNote = notes => {
//         if (notes[editColumn].length < 6) {
//             const currentNote = notes[editColumn][editIndex(notes[editColumn])]
//             if (currentNote.type === 'Whole') makeChord(WHOLE_NOTE, 'Whole')
//             else if (currentNote.type === 'Half') makeChord(HALF_NOTE, 'Half')
//             else if (currentNote.type === 'Quarter') makeChord(QUARTER_NOTE, 'Quarter')
//             else if (currentNote.type === 'Eighth') makeChord(EIGHTH_NOTE, 'Eighth')
//             else if (currentNote.type === 'Dotted-Whole') makeChord(`${WHOLE_NOTE}.`, 'Dotted-Whole')
//             else if (currentNote.type === 'Dotted-Half') makeChord(`${HALF_NOTE}.`, 'Dotted-Half')
//             else if (currentNote.type === 'Dotted-Quarter') makeChord(`${QUARTER_NOTE}.`, 'Dotted-Quarter')
//         }
//     }

//     return (
//         <div className='confirm-edit-btn'>
//             {notes[editColumn][editIndex(notes[editColumn])] && notes[editColumn][editIndex(notes[editColumn])].letter &&
//                 <div className='showNote font-2 center'>
//                     <h5 className='nomarginpadding'>Note</h5>
//                     {currentLetter}
//                 </div>
//             }

//             {!isReplacing && !isInserting &&
//                 <Fragment>
//                     <div className='confirm-edit-btn-col'>
//                         <button className='btn' onClick={() => dispatch(replaceNote(notes))}>Replace Note</button>
//                         <button className='btn' onClick={() => dispatch(insertNote(notes))}>Insert Note</button>
//                         <button className='btn' onClick={() => confirmRemove()}>Remove Note</button>
//                     </div>
//                     {!isRestNote(editColumn, null, notes) &&
//                         <Fragment>
//                             <div className='confirm-edit-btn-col'>
//                                 <button className='btn' onClick={() => moveNoteUp(notes, key, editColumn)} title='Shortcut: Q key'>Border Above</button>
//                                 <button className='btn' onClick={() => moveNoteBetween(notes, key, editColumn)} title='Shortcut: A key'>Between Border</button>
//                                 <button className='btn' onClick={() => moveNoteDown(notes, key, editColumn)} title='Shortcut: Z key'>Border Below</button>
//                             </div>

//                             <div className='confirm-edit-btn-col'>
//                                 <button className='btn' onClick={() => getDifferentTabPosition(notes, editColumn)}>
//                                     <span title='Shortcut: Press T'>Move Tab</span>
//                                 </button>

//                                 <button className='btn' onClick={() => onClickAddNote(notes)}>Add Note</button>
//                             </div>
//                             <Accidental />
//                         </Fragment>
//                     }
//                 </Fragment>
//             }
//         </div>
//     )
// }

// export default EditBtns