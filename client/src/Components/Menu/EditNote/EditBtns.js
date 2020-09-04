import React from 'react'
import Accidental from './Accidental'
import { useSelector, useDispatch } from 'react-redux'
import { deleteAnyNote, replaceNote, insertNote, addNote, currentEditColumn } from '../../../Redux/Actions/Notes'
import { isRestNote, countNumberOfNulls, editIndex, getDifferentTabPosition } from '../../../HelperFunctions/Helpers'
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

    const confirmRemove = () => {
        const notesCopy = [...notes]
        if (notesCopy[editColumn].length === 1) notesCopy.splice(editColumn, countNumberOfNulls(notesCopy, editColumn, 1))
        else notesCopy[editColumn].splice(editIndex(notesCopy[editColumn]), 1)

        dispatch(deleteAnyNote(notesCopy))
        dispatch(isShowingMenuAndLogout(!currentLogoutState))

        dispatch(currentEditColumn(-1))
    }

    const addNoteToChord = (chordArr, newNoteEntity, type, letter, row) => {
        const updateChord = { notePath: newNoteEntity, type, letter, row, draggable: false, transform: 'no-translate', accidental: null, tabPosition: 1 }
        chordArr.push(updateChord)
        dispatch(addNote(notes))
    }

    //Prevent notes being on top of eachother
    const chordsInCMaj = (notePath, noteType) => {
        const column = notes[editColumn]

        const tabRow1 = column.findIndex(note => note.tabRow === 1)
        const tabRow2 = column.findIndex(note => note.tabRow === 2)
        const tabRow3 = column.findIndex(note => note.tabRow === 3)
        const tabRow4 = column.findIndex(note => note.tabRow === 4)
        const tabRow5 = column.findIndex(note => note.tabRow === 5)
        const tabRow6 = column.findIndex(note => note.tabRow === 6)
        const sheetRow1 = column.findIndex(note => note.row === 5)
        const sheetRow2 = column.findIndex(note => note.row === 6)
        const sheetRow3 = column.findIndex(note => note.row === 7)
        const sheetRow4 = column.findIndex(note => note.row === 9)
        const sheetRow5 = column.findIndex(note => note.row === 10)
        const sheetRow6 = column.findIndex(note => note.row === 12)

        if (sheetRow6 === -1 && tabRow6 === -1) addNoteToChord(column, notePath, noteType, 'E', 12)
        else if (sheetRow5 === -1 && tabRow5 === -1) addNoteToChord(column, notePath, noteType, 'B', 10)
        else if (sheetRow4 === -1 && tabRow4 === -1) addNoteToChord(column, notePath, noteType, 'D', 9)
        else if (sheetRow3 === -1 && tabRow3 === -1) addNoteToChord(column, notePath, noteType, 'A', 7)
        else if (sheetRow2 === -1 && tabRow2 === -1) addNoteToChord(column, notePath, noteType, 'C', 6)
        else if (sheetRow1 === -1 && tabRow1 === -1) addNoteToChord(column, notePath, noteType, 'E', 5)
    }

    const onClickAddNote = notes => {
        if (notes[editColumn].length < 6) {
            const currentNote = notes[editColumn][editIndex(notes[editColumn])]

            if (currentNote.type === 'Whole') {
                if (key.id === 7) addNoteToChord(notes[editColumn], WHOLE_NOTE, 'Whole', 'F', 12, currentNote.tabPosition)
                else if (key.id === -5) addNoteToChord(notes[editColumn], WHOLE_NOTE, 'Whole', 'F#', 11, currentNote.tabPosition)
                else if (key.id > -2) chordsInCMaj(WHOLE_NOTE, 'Whole')
                else if (key.id < -1) addNoteToChord(notes[editColumn], WHOLE_NOTE, 'Whole', 'G', 11, currentNote.tabPosition)
            }

            else if (currentNote.type === 'Dotted-Whole') {
                if (key.id === 7) addNoteToChord(notes[editColumn], `${WHOLE_NOTE}.`, 'Dotted-Whole', 'F', 12, currentNote.tabPosition)
                else if (key.id === -5) addNoteToChord(notes[editColumn], `${WHOLE_NOTE}.`, 'Dotted-Whole', 'F#', 11, currentNote.tabPosition)
                else if (key.id > -2) chordsInCMaj(`${WHOLE_NOTE}.`, 'Dotted-Whole')
                else if (key.id < -1) addNoteToChord(notes[editColumn], `${WHOLE_NOTE}.`, 'Dotted-Whole', 'G', 11, currentNote.tabPosition)
            }

            else if (currentNote.type === 'Half') {
                if (key.id === 7) addNoteToChord(notes[editColumn], HALF_NOTE, 'Half', 'F', 12, currentNote.tabPosition)
                else if (key.id === -5) addNoteToChord(notes[editColumn], HALF_NOTE, 'Half', 'F#', 11, currentNote.tabPosition)
                else if (key.id > -2) chordsInCMaj(HALF_NOTE, 'Half')
                else if (key.id < -1) addNoteToChord(notes[editColumn], HALF_NOTE, 'Half', 'G', 11, currentNote.tabPosition)
            }

            else if (currentNote.type === 'Dotted-Half') {
                if (key.id === 7) addNoteToChord(notes[editColumn], `${HALF_NOTE}.`, 'Dotted-Half', 'F', 12, currentNote.tabPosition)
                else if (key.id === -5) addNoteToChord(notes[editColumn], `${HALF_NOTE}.`, 'Dotted-Half', 'F#', 11, currentNote.tabPosition)
                else if (key.id > -2) chordsInCMaj(`${HALF_NOTE}.`, 'Dotted-Half')
                else if (key.id < -1) addNoteToChord(notes[editColumn], `${HALF_NOTE}.`, 'Dotted-Half', 'G', 11, currentNote.tabPosition)
            }

            else if (currentNote.type === 'Quarter') {
                if (key.id === 7) addNoteToChord(notes[editColumn], QUARTER_NOTE, 'Quarter', 'F', 12, currentNote.tabPosition)
                else if (key.id === -5) addNoteToChord(notes[editColumn], QUARTER_NOTE, 'Quarter', 'F#', 11, currentNote.tabPosition)
                else if (key.id > -2) chordsInCMaj(QUARTER_NOTE, 'Quarter')
                else if (key.id < -1) addNoteToChord(notes[editColumn], QUARTER_NOTE, 'Quarter', 'G', 11, currentNote.tabPosition)
            }

            else if (currentNote.type === 'Dotted-Quarter') {
                if (key.id === 7) addNoteToChord(notes[editColumn], `${QUARTER_NOTE}.`, 'Dotted-Quarter', 'F', 12, currentNote.tabPosition)
                else if (key.id === -5) addNoteToChord(notes[editColumn], `${QUARTER_NOTE}.`, 'Dotted-Quarter', 'F#', 11, currentNote.tabPosition)
                else if (key.id > -2) chordsInCMaj(`${QUARTER_NOTE}.`, 'Dotted-Quarter')
                else if (key.id < -1) addNoteToChord(notes[editColumn], `${QUARTER_NOTE}.`, 'Dotted-Quarter', 'G', 11, currentNote.tabPosition)
            }

            else if (currentNote.type === 'Eighth') {
                if (key.id === 7) addNoteToChord(notes[editColumn], EIGHTH_NOTE, 'Eighth', 'F', 12, currentNote.tabPosition)
                else if (key.id === -5) addNoteToChord(notes[editColumn], EIGHTH_NOTE, 'Eighth', 'F#', 11, currentNote.tabPosition)
                else if (key.id > -2) chordsInCMaj(EIGHTH_NOTE, 'Eighth')
                else if (key.id < -1) addNoteToChord(notes[editColumn], EIGHTH_NOTE, 'Eighth', 'G', 11, currentNote.tabPosition)
            }
        }
    }

    return (
        <div className='confirm-edit-btn'>
            {notes[editColumn][editIndex(notes[editColumn])] && notes[editColumn][editIndex(notes[editColumn])].letter &&
                <div className='showNote font-2 center'>
                    <h5 className='nomarginpadding'>Note</h5>
                    {notes[editColumn][editIndex(notes[editColumn])].letter}
                </div>
            }
            {!isRestNote(editColumn, null, notes) &&
                <div className='confirm-edit-btn-col'>
                    <button className='btn' onClick={() => moveNoteUp(notes, key, editColumn)} title='Shortcut: Q key'>Border Above</button>
                    <button className='btn' onClick={() => moveNoteBetween(notes, key, editColumn)} title='Shortcut: A key'>Between Border</button>
                    <button className='btn' onClick={() => moveNoteDown(notes, key, editColumn)} title='Shortcut: Z key'>Border Below</button>
                </div>
            }
            {!isReplacing && !isInserting &&
                <div className='confirm-edit-btn-col'>
                    <button className='btn' onClick={() => dispatch(replaceNote(notes))}>Replace Note</button>
                    <button className='btn' onClick={() => dispatch(insertNote(notes))}>Insert Note</button>
                    <button className='btn' onClick={() => confirmRemove()}>Remove Note</button>
                </div>
            }

            {!isRestNote(editColumn, null, notes) &&
                <div className='confirm-edit-btn-col'>
                    <button className='btn' onClick={() => getDifferentTabPosition(notes, editColumn)}>
                        <span title='Shortcut: Press T'>Move Tab</span>
                    </button>
                </div>
            }

            {!isRestNote(editColumn, null, notes) &&
                <div className='confirm-edit-btn-col'>
                    <button className='btn' onClick={() => onClickAddNote(notes)}>Add Note</button>
                </div>
            }

            {!isRestNote(editColumn, null, notes) && <Accidental />}
        </div>
    )
}

export default EditBtns