import React from 'react'
import './Tab.css'
import '../../../Pages/Sheet/Sheet.css'
import { useSelector } from 'react-redux'
import { tabValue } from '../../../HelperFunctions/MapNoteToTab'
import { getNoteColumn } from '../../../HelperFunctions/Helpers'

const Tab = ({ bars, tabLines, eighthNotes, numberOfStaves }) => {

    const notes = useSelector(state => state.notes.notes)

    return (
        <div className='tab-music-container'>
            {bars.map(measure => (
                <ul className='tab-music' key={measure}>
                    {tabLines.map(rowNumber => (
                        <li key={rowNumber} className={`tab-row-${rowNumber}`}>
                            {eighthNotes.map(columnsPerMeasure => (
                                <input type='text'
                                    name={`tab-input-${getNoteColumn(measure, columnsPerMeasure, numberOfStaves)}`}
                                    className='tabLine-input'
                                    readOnly
                                    key={columnsPerMeasure}
                                    value={tabValue(rowNumber, getNoteColumn(measure, columnsPerMeasure, numberOfStaves), notes)} >
                                </input>
                            ))}
                        </li>
                    ))}
                </ul>
            ))
            }
        </div >
    );
}

export default Tab;