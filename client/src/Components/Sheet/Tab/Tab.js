import React, { useContext } from 'react'
import './Tab.css'
import '../../../Pages/Sheet/Sheet.css'
import { useSelector } from 'react-redux'
import { tabValue } from '../../../HelperFunctions/MapNoteToTab'
import { getNoteColumn } from '../../../HelperFunctions/Helpers'
import { StaffContext } from '../../../Context/StaffContext'

const Tab = ({ tabLines }) => {

    const notes = useSelector(state => state.notes.notes)
    const isUpdating = useSelector(state => state.notes.isUpdating)

    const { numberOfStaves, eighthNotes, bars } = useContext(StaffContext)

    return (
        <div className='tab-music-container'>
            {bars.map(measure => (
                <ul className='tab-music nomarginpadding' key={measure}>
                    {tabLines.map(rowNumber => (
                        <li key={rowNumber} className={`tab-row-${rowNumber}`}>
                            {eighthNotes.map(columnsPerMeasure => (
                                <input type='text'
                                    key={columnsPerMeasure}
                                    name={`tab-input-${getNoteColumn(measure, columnsPerMeasure, numberOfStaves)}`}
                                    className='tabLine-input center'
                                    readOnly
                                    // Or statement prevents 'changing an uncontrolled input of type text to be controlled'
                                    value={(notes[getNoteColumn(measure, columnsPerMeasure, numberOfStaves)] && notes[getNoteColumn(measure, columnsPerMeasure, numberOfStaves)].map((tab, i) => (
                                        tab && tabValue(rowNumber, tab, notes, getNoteColumn(measure, columnsPerMeasure, numberOfStaves), i))).join('')) || ''}>
                                </input>
                            ))}
                        </li>
                    ))}
                </ul>
            ))}
        </div>
    )
}

export default Tab