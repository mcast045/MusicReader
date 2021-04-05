import React, { useEffect, useContext, useState } from 'react'
import './Staff.css'
import '../../../Pages/Sheet/Sheet.css'
import { useSelector, useDispatch } from 'react-redux'
import { getUserNotes } from '../../../Redux/Actions/Notes'
import StaffRow from './StaffRow'
import { StaffContext } from '../../../Context/StaffContext'

const Staff = ({ staffLines }) => {

    const dispatch = useDispatch()

    const currentSong = useSelector(state => state.song.currentSong)
    const isAuthenticated = useSelector(state => state.auth.isAuthenticated)

    const { numberOfStaves, viewOnly, bars } = useContext(StaffContext)

    const [isMounted, setIsMount] = useState(false)
    //Load currentSong notes when user changes song
    useEffect(() => {
        //if user has at least 1 song
        if (isMounted && currentSong._id && !viewOnly && isAuthenticated)
            dispatch(getUserNotes(currentSong._id))

        //Without isMounted, notes resets to the original notes array
        return () => { setIsMount(!isMounted) }
    }, [isAuthenticated, currentSong._id, dispatch, viewOnly, isMounted])

    return (
        <div className='sheet-music-container'>
            {bars.map(measure => (
                <ul id={(measure + (numberOfStaves * 4))} className='sheet-music nomarginpadding' key={measure}>
                    {staffLines.map(rowNumber => (
                        <StaffRow key={rowNumber} rowNumber={rowNumber} measure={measure} />
                    ))}
                </ul>
            ))}
        </div>
    )
}

export default Staff