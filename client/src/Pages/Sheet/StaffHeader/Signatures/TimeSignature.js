import React, { useState, useEffect, Fragment } from 'react'
import './Signature.css'
import { useSelector } from 'react-redux'

const TimeSignature = ({ x }) => {

    const key = useSelector(state => state.song.keySignature)

    const [timeSignatureClassName, setTimeSignatureClassName] = useState('time-signature-placeholder')

    useEffect(() => {
        if (key.id === 1)
            setTimeSignatureClassName('time-signature-natural')
        else if (key.id === 2 || key.id === -1)
            setTimeSignatureClassName('time-signature-1s')
        else if (key.id === 3 || key.id === -2)
            setTimeSignatureClassName('time-signature-2s')
        else if (key.id === 4 || key.id === -3)
            setTimeSignatureClassName('time-signature-3s')
        else if (key.id === 5 || key.id === -4)
            setTimeSignatureClassName('time-signature-4s')
        else if (key.id === 6 || key.id === -5)
            setTimeSignatureClassName('time-signature-5s')
        else if (key.id === 7)
            setTimeSignatureClassName('time-signature-6s')
    }, [key.id, setTimeSignatureClassName])

    return (
        <Fragment>
            {x[0] &&
                <div className='time-signature-container'>
                    <ul className={`time-signature ${timeSignatureClassName}`}>
                        <li>{x[0]}</li>
                        <li>{x[1]}</li>
                    </ul>
                </div>
            }
        </Fragment>
    );
}

export default TimeSignature;