import React, { useEffect, useRef, useContext } from 'react'
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
    const isMounted = useRef(false)

    //Load currentSong notes when user changes song
    //Without isMounted, mounting error when adding notes to new staff lines
    useEffect(() => {
        //Only run when the dependencies change & if user has at least 1 song
        if (isMounted.current && currentSong && !viewOnly)
            isAuthenticated && currentSong._id && dispatch(getUserNotes(currentSong._id))

        return () => { isMounted.current = true; }
    }, [isAuthenticated, currentSong, dispatch, viewOnly])

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