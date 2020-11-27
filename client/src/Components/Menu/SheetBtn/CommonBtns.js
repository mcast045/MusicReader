import React, { useContext, Fragment } from 'react'
import { BtnContext } from '../../../Context/BtnContext'
import { useSelector } from 'react-redux'

const CommonBtns = () => {

    const { removeLastNote, copyPreviousNote, copyPreviousBar, disableLastbarBtn } = useContext(BtnContext)

    const notes = useSelector(state => state.notes.notes)
    const isUpdating = useSelector(state => state.notes.isUpdating)

    return (
        <Fragment>
            <button className='btn' disabled={notes.length === 0} onClick={() => copyPreviousNote()}>Copy Last Note</button>
            <button className={`btn ${disableLastbarBtn}`} disabled={notes.length % 8 !== 0 || notes.length === 0} onClick={() => copyPreviousBar()}>Copy Last Bar</button>
            <button className='btn' disabled={isUpdating} onClick={() => removeLastNote()}>Delete Last Note</button>
        </Fragment>
    );
}

export default CommonBtns;