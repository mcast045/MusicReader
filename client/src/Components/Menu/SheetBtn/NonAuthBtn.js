import React, { Fragment } from 'react'
import './btn.css'
import { useSelector } from 'react-redux'
import { clearSheet } from '../../../HelperFunctions/Helpers'
import CommonBtns from './CommonBtns'

const NonAuthBtn = () => {

    const notes = useSelector(state => state.notes.notes)
    const isUpdating = useSelector(state => state.notes.isUpdating)

    return (
        <Fragment>
            <CommonBtns />
            <button className='btn clearBtn' disabled={isUpdating} onClick={() => clearSheet(notes)}>Clear All</button>
        </Fragment>
    )
}

export default NonAuthBtn