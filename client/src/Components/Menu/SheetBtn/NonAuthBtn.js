import React, { Fragment } from 'react'
import './btn.css'
import { useSelector } from 'react-redux'

const NonAuthBtn = ({ removeLastNote, clearSheet, }) => {

    const isUpdating = useSelector(state => state.notes.isUpdating)

    return (
        <Fragment>
            <button className='btn' disabled={isUpdating} onClick={() => removeLastNote()}>Delete Last Note</button>
            <button className='btn clearBtn' disabled={isUpdating} onClick={() => clearSheet()}>Clear All</button>
        </Fragment>
    );
}

export default NonAuthBtn;