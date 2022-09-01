import React, { useContext } from 'react'
import { BtnContext } from '../../../Context/BtnContext'
import { useSelector } from 'react-redux'

const CommonBtns = () => {

    const { removeLastNote, copyPreviousNote, copyPreviousBar, copyPreviousPhrase } = useContext(BtnContext)

    const { notes, isUpdating } = useSelector(({ notes }) => notes)

    return (
        <>
            <button className='btn' disabled={notes.length === 0} onClick={copyPreviousNote}>Copy Last Note</button>
            <button className='btn' onClick={copyPreviousBar}>Copy Last Bar</button>
            <button className='btn' onClick={copyPreviousPhrase}>Copy Last Phrase</button>
            <button className='btn' disabled={isUpdating} onClick={removeLastNote}>Delete Last Note</button>
        </>
    );
}

export default CommonBtns;