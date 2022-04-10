import React, { Fragment, useState, useEffect } from 'react'
import Accidental from './Accidental'
import { useSelector, useDispatch } from 'react-redux'
import { replaceNote, insertNote } from '../../../Redux/Actions/Notes'
import { isRestNote, editIndex, getDifferentTabPosition, removeEdit, confirmRemove } from '../../../HelperFunctions/Helpers'
import { moveNoteDown, moveNoteUp } from '../../../HelperFunctions/MoveNote'
import { allNotes } from '../../../HelperFunctions/UpdateNoteLetter'
import {
    ARROW_UP_ENTITY,
    ARROW_DOWN_ENTITY,
    NO_TRANSLATE,
    EDIT,
    WHOLE_NOTE,
    HALF_NOTE,
    QUARTER_NOTE,
    EIGHTH_NOTE,
    WHOLE,
    HALF,
    EIGHTH,
    QUARTER,
    DOTTED_QUARTER,
    DOTTED_HALF,
    DOTTED_WHOLE,
} from '../../../HelperFunctions/SourceCodeEncodings'

const EditBtns = () => {

    const dispatch = useDispatch()
    const { notes, isReplacing, isInserting, editColumnNumber } = useSelector(({ notes }) => notes)
    const key = useSelector(({ song }) => song.keySignature)
    const { isShowingLogout } = useSelector(({ util }) => util)

    const [currentLetter, setCurrentLetter] = useState()

    //Change letter on drop
    useEffect(() => {
        setCurrentLetter(notes[editColumnNumber][editIndex(notes[editColumnNumber])]?.letter)
    }, [notes, editColumnNumber])

    const addNoteToChord = (chordArr, newNoteEntity, type, letter, row) => {
        const updateChord = { notePath: newNoteEntity, type, letter, row, transform: NO_TRANSLATE, accidental: null, tabPosition: 1, edit: EDIT }
        chordArr.push(updateChord)
        setCurrentLetter(letter)
    }

    //Prevent overlapping notes
    const makeChord = (notePath, noteType) => {
        const column = notes[editColumnNumber]

        const isRowEmpty = row => column.findIndex(note => note?.row === row) === -1
        const isTabEmpty = tab => column.findIndex(note => note?.tabRow === tab) === -1

        if (key.id === 1 || key.id === 2) {
            if (isRowEmpty(5) && isTabEmpty(1)) addNoteToChord(column, notePath, noteType, allNotes[7], 5)
            else if (isRowEmpty(6) && isTabEmpty(2)) addNoteToChord(column, notePath, noteType, allNotes[3], 6)
            else if (isRowEmpty(7) && isTabEmpty(3)) addNoteToChord(column, notePath, noteType, allNotes[0], 7)
            else if (isRowEmpty(9) && isTabEmpty(4)) addNoteToChord(column, notePath, noteType, allNotes[5], 9)
            else if (isRowEmpty(10) && isTabEmpty(5)) addNoteToChord(column, notePath, noteType, allNotes[2], 10)
            else if (isRowEmpty(12) && isTabEmpty(6)) addNoteToChord(column, notePath, noteType, allNotes[7], 12)
            else return
        } else if (key.id === 3 || key.id === 4) {
            if (isRowEmpty(5) && isTabEmpty(1)) addNoteToChord(column, notePath, noteType, allNotes[7], 5)
            else if (isRowEmpty(6) && isTabEmpty(2)) addNoteToChord(column, notePath, noteType, allNotes[4], 6)
            else if (isRowEmpty(7) && isTabEmpty(3)) addNoteToChord(column, notePath, noteType, allNotes[0], 7)
            else if (isRowEmpty(9) && isTabEmpty(4)) addNoteToChord(column, notePath, noteType, allNotes[5], 9)
            else if (isRowEmpty(10) && isTabEmpty(5)) addNoteToChord(column, notePath, noteType, allNotes[2], 10)
            else if (isRowEmpty(12) && isTabEmpty(6)) addNoteToChord(column, notePath, noteType, allNotes[7], 12)
            else return
        } else if (key.id === 5) {
            if (isRowEmpty(5) && isTabEmpty(1)) addNoteToChord(column, notePath, noteType, allNotes[7], 5)
            else if (isRowEmpty(6) && isTabEmpty(2)) addNoteToChord(column, notePath, noteType, allNotes[4], 6)
            else if (isRowEmpty(7) && isTabEmpty(3)) addNoteToChord(column, notePath, noteType, allNotes[0], 7)
            else if (isRowEmpty(9) && isTabEmpty(4)) addNoteToChord(column, notePath, noteType, allNotes[6], 9)
            else if (isRowEmpty(10) && isTabEmpty(5)) addNoteToChord(column, notePath, noteType, allNotes[2], 10)
            else if (isRowEmpty(12) && isTabEmpty(6)) addNoteToChord(column, notePath, noteType, allNotes[7], 12)
            else return
        } else if (key.id === 6) {
            if (isRowEmpty(5) && isTabEmpty(1)) addNoteToChord(column, notePath, noteType, allNotes[7], 5)
            else if (isRowEmpty(6) && isTabEmpty(2)) addNoteToChord(column, notePath, noteType, allNotes[4], 6)
            else if (isRowEmpty(7) && isTabEmpty(3)) addNoteToChord(column, notePath, noteType, allNotes[1], 7)
            else if (isRowEmpty(9) && isTabEmpty(4)) addNoteToChord(column, notePath, noteType, allNotes[6], 9)
            else if (isRowEmpty(10) && isTabEmpty(5)) addNoteToChord(column, notePath, noteType, allNotes[2], 10)
            else if (isRowEmpty(12) && isTabEmpty(6)) addNoteToChord(column, notePath, noteType, allNotes[7], 12)
            else return
        } else if (key.id === 7) {
            if (isRowEmpty(5) && isTabEmpty(1)) addNoteToChord(column, notePath, noteType, allNotes[8], 5)
            else if (isRowEmpty(6) && isTabEmpty(2)) addNoteToChord(column, notePath, noteType, allNotes[4], 6)
            else if (isRowEmpty(7) && isTabEmpty(3)) addNoteToChord(column, notePath, noteType, allNotes[1], 7)
            else if (isRowEmpty(9) && isTabEmpty(4)) addNoteToChord(column, notePath, noteType, allNotes[6], 9)
            else if (isRowEmpty(10) && isTabEmpty(5)) addNoteToChord(column, notePath, noteType, allNotes[2], 10)
            else if (isRowEmpty(12) && isTabEmpty(6)) addNoteToChord(column, notePath, noteType, allNotes[8], 12)
        } else if (key.id === 8) {
            if (isRowEmpty(5) && isTabEmpty(1)) addNoteToChord(column, notePath, noteType, allNotes[7], 5)
            else if (isRowEmpty(6) && isTabEmpty(2)) addNoteToChord(column, notePath, noteType, allNotes[3], 6)
            else if (isRowEmpty(7) && isTabEmpty(3)) addNoteToChord(column, notePath, noteType, allNotes[0], 7)
            else if (isRowEmpty(9) && isTabEmpty(4)) addNoteToChord(column, notePath, noteType, allNotes[5], 9)
            else if (isRowEmpty(10) && isTabEmpty(5)) addNoteToChord(column, notePath, noteType, allNotes[1], 10)
            else if (isRowEmpty(12) && isTabEmpty(6)) addNoteToChord(column, notePath, noteType, allNotes[7], 12)
            else return
        } else if (key.id === 9) {
            if (isRowEmpty(5) && isTabEmpty(2)) addNoteToChord(column, notePath, noteType, allNotes[6], 5)
            else if (isRowEmpty(4) && isTabEmpty(1)) addNoteToChord(column, notePath, noteType, allNotes[10], 4)
            else if (isRowEmpty(7) && isTabEmpty(3)) addNoteToChord(column, notePath, noteType, allNotes[0], 7)
            else if (isRowEmpty(9) && isTabEmpty(4)) addNoteToChord(column, notePath, noteType, allNotes[5], 9)
            else if (isRowEmpty(10) && isTabEmpty(5)) addNoteToChord(column, notePath, noteType, allNotes[1], 10)
            else if (isRowEmpty(12) && isTabEmpty(6)) addNoteToChord(column, notePath, noteType, allNotes[10], 11)
            else return
        } else if (key.id === 10) {
            if (isRowEmpty(5) && isTabEmpty(1)) addNoteToChord(column, notePath, noteType, allNotes[6], 5)
            else if (isRowEmpty(4) && isTabEmpty(1)) addNoteToChord(column, notePath, noteType, allNotes[10], 4)
            else if (isRowEmpty(7) && isTabEmpty(3)) addNoteToChord(column, notePath, noteType, allNotes[11], 7)
            else if (isRowEmpty(9) && isTabEmpty(4)) addNoteToChord(column, notePath, noteType, allNotes[5], 9)
            else if (isRowEmpty(10) && isTabEmpty(5)) addNoteToChord(column, notePath, noteType, allNotes[1], 10)
            else if (isRowEmpty(12) && isTabEmpty(6)) addNoteToChord(column, notePath, noteType, allNotes[10], 11)
            else return
        } else if (key.id === 11) {
            if (isRowEmpty(5) && isTabEmpty(2)) addNoteToChord(column, notePath, noteType, allNotes[6], 5)
            else if (isRowEmpty(4) && isTabEmpty(1)) addNoteToChord(column, notePath, noteType, allNotes[10], 4)
            else if (isRowEmpty(7) && isTabEmpty(3)) addNoteToChord(column, notePath, noteType, allNotes[11], 7)
            else if (isRowEmpty(8) && isTabEmpty(4)) addNoteToChord(column, notePath, noteType, allNotes[8], 8)
            else if (isRowEmpty(9) && isTabEmpty(5)) addNoteToChord(column, notePath, noteType, allNotes[4], 9)
            else if (isRowEmpty(10) && isTabEmpty(6)) addNoteToChord(column, notePath, noteType, allNotes[10], 11)
            else return
        } else if (key.id === 12) {
            if (isRowEmpty(5) && isTabEmpty(2)) addNoteToChord(column, notePath, noteType, allNotes[6], 5)
            else if (isRowEmpty(4) && isTabEmpty(1)) addNoteToChord(column, notePath, noteType, allNotes[9], 4)
            else if (isRowEmpty(7) && isTabEmpty(3)) addNoteToChord(column, notePath, noteType, allNotes[11], 7)
            else if (isRowEmpty(8) && isTabEmpty(4)) addNoteToChord(column, notePath, noteType, allNotes[8], 8)
            else if (isRowEmpty(9) && isTabEmpty(5)) addNoteToChord(column, notePath, noteType, allNotes[4], 9)
            else if (isRowEmpty(10) && isTabEmpty(6)) addNoteToChord(column, notePath, noteType, allNotes[9], 11)
            else return
        }

        removeEdit(editIndex(notes[editColumnNumber]), notes, editColumnNumber)
    }

    const onClickAddNote = notes => {
        if (notes[editColumnNumber].length < 6) {
            const currentNote = notes[editColumnNumber][editIndex(notes[editColumnNumber])]
            if (currentNote.type === WHOLE) makeChord(WHOLE_NOTE, WHOLE)
            else if (currentNote.type === HALF) makeChord(HALF_NOTE, HALF)
            else if (currentNote.type === QUARTER) makeChord(QUARTER_NOTE, QUARTER)
            else if (currentNote.type === EIGHTH) makeChord(EIGHTH_NOTE, EIGHTH)
            else if (currentNote.type === DOTTED_WHOLE) makeChord(`${WHOLE_NOTE}.`, DOTTED_WHOLE)
            else if (currentNote.type === DOTTED_HALF) makeChord(`${HALF_NOTE}.`, DOTTED_HALF)
            else if (currentNote.type === DOTTED_QUARTER) makeChord(`${QUARTER_NOTE}.`, DOTTED_QUARTER)
        }
    }
    return (
        <div className='confirm-edit-btn'>
            {notes[editColumnNumber][editIndex(notes[editColumnNumber])]?.letter &&
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
                        <button className='btn' onClick={() => confirmRemove(notes, editColumnNumber, isShowingLogout)} title='Shortcut: Del key'>Remove Note</button>
                    </div>
                    {!isRestNote(editColumnNumber, null, notes) &&
                        <Fragment>
                            <div className='confirm-edit-btn-col'>
                                <button className='btn' onClick={() => moveNoteUp(notes, key, editColumnNumber)} title={`Shortcut: ${ARROW_UP_ENTITY} key`}>Border Above</button>
                                <button className='btn' onClick={() => moveNoteDown(notes, key, editColumnNumber)} title={`Shortcut: ${ARROW_DOWN_ENTITY} key`}>Border Below</button>
                            </div>

                            <div className='confirm-edit-btn-col'>
                                <button className='btn' onClick={() => getDifferentTabPosition(notes, editColumnNumber)}>
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