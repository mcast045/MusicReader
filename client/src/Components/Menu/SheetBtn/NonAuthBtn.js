import React from 'react'
import './btn.css'
import { useSelector } from 'react-redux'
import { clearSheet } from '../../../HelperFunctions/Helpers'
import CommonBtns from './CommonBtns'

const NonAuthBtn = () => {

    const { notes, isUpdating } = useSelector(({ notes }) => notes)

    return (
        <>
            <CommonBtns />
            <button className='btn clearBtn' disabled={isUpdating} onClick={() => clearSheet(notes)}>Clear All</button>
        </>
    )
}

export default NonAuthBtn