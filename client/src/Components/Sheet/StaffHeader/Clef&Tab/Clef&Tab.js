import React from 'react'
import './Clef&Tab.css'
import Clef from '../../../../Images/clef.svg'
import TimeSignature from '../Signatures/TimeSignature'
import KeySignature from '../Signatures/KeySignature'

const Cleftab = () => {
    return (
        <>
            <div className='clef'>
                <img src={Clef} alt='clef' draggable="false" />
            </div>

            <TimeSignature />
            <KeySignature />

            <div className="tab-contaner">
                <div className='tab-label'>
                    <span>t</span>
                    <span>a</span>
                    <span>b</span>
                </div>
            </div>
        </>
    )
}

export default Cleftab