import React, { useState, useEffect, useContext } from 'react'
import './Signature.css'
import { useSelector } from 'react-redux'
import { StaffContext } from '../../../../Context/StaffContext'

const TimeSignature = () => {

    const { staffLineNumber, keySignature: key } = useSelector(({ song }) => song)

    const { numberOfStaves } = useContext(StaffContext)

    const [timeSignatureClassName, setTimeSignatureClassName] = useState('time-signature-placeholder')

    useEffect(() => {
        if (key?.id === 1)
            setTimeSignatureClassName('time-signature-natural')
        else if (key?.id === 2 || key?.id === 8)
            setTimeSignatureClassName('time-signature-1s')
        else if (key?.id === 3 || key?.id === 9)
            setTimeSignatureClassName('time-signature-2s')
        else if (key?.id === 4 || key?.id === 10)
            setTimeSignatureClassName('time-signature-3s')
        else if (key?.id === 5 || key?.id === 11)
            setTimeSignatureClassName('time-signature-4s')
        else if (key?.id === 6 || key?.id === 12)
            setTimeSignatureClassName('time-signature-5s')
        else if (key?.id === 7)
            setTimeSignatureClassName('time-signature-6s')
    }, [key, setTimeSignatureClassName])

    return (
        <>
            {numberOfStaves === 0 &&
                <div className='time-signature-container relative'>
                    <ul className={`time-signature font-4 nomarginpadding ${timeSignatureClassName}`}>
                        <li>{staffLineNumber[0].beats}</li>
                        <li>{staffLineNumber[0].bar}</li>
                    </ul>
                </div>
            }
        </>
    )
}

export default TimeSignature