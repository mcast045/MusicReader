import React from 'react'
import './Tab.css'
import '../Sheet.css'
import { useSelector } from 'react-redux'
import { showTab } from '../../../HelperFunctions/TabHelper'
import { getIndex } from '../../../HelperFunctions/Helpers'

const Tab = ({ bars, tabLines, eighthNotes, i }) => {

    const notes = useSelector(state => state.notes.notes)

    return (
        <div className='tab-music-container'>
            {bars.map(m => (
                <ul className='tab-music' key={m}>
                    {tabLines.map(n => (
                        <li key={n} className={`tab-row-${n}`}>
                            {eighthNotes.map(o => (
                                <input type='text'
                                    name={`tab-input-${getIndex(m, o, i)}`}
                                    className='tabLine-input'
                                    readOnly
                                    key={o}
                                    value={showTab(n, getIndex(m, o, i), notes)} >
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