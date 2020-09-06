import React, { Fragment } from 'react'
import './btn.css'
import { useSelector } from 'react-redux'

const NonAuthBtn = ({ removeLastNote, clearSheet, copyPreviousNote }) => {

    const notes = useSelector(state => state.notes.notes)
    const isUpdating = useSelector(state => state.notes.isUpdating)

    return (
        <Fragment>
            <button className='btn' disabled={notes.length === 0} onClick={() => copyPreviousNote()}>Copy Last Note</button>
            <button className='btn' disabled={isUpdating} onClick={() => removeLastNote()}>Delete Last Note</button>
            <button className='btn clearBtn' disabled={isUpdating} onClick={() => clearSheet()}>Clear All</button>
        </Fragment>
    )
}

export default NonAuthBtn