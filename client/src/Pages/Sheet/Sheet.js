import React, { useState, useEffect, Fragment } from 'react'
import './Sheet.css'
import { useSelector, useDispatch } from 'react-redux'
import Modal from '../Menu/SheetBtn/Modal/Modal'
import Staff from './Staff/Staff'
import Tab from './Tab/Tab'
import PageHeader from './PageHeader/PageHeader'
import SheetHeader from './StaffHeader/Clef&Tab/Clef&Tab'
import { getPublishedSong } from '../../Redux/Actions/Song'


const Sheet = ({ match, viewOnly, showLogout, setShowLogout, newSongClickState, setIsShowingMenu, isShowingMenu }) => {
    const dispatch = useDispatch()
    const notes = useSelector(state => state.notes.notes)
    const staffLineNumber = useSelector(state => state.song.staffLineNumber)
    // let screenSize = window.screen.width

    //Constants used to make music sheet 
    const staffLines = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]
    const eighthNotes = [1, 2, 3, 4, 5, 6, 7, 8]
    const tabLines = [1, 2, 3, 4, 5, 6]
    const bars = [1, 2, 3, 4]

    const [numOfSheets, setNumOfSheets] = useState(staffLineNumber)

    //Add/remove staff lines
    useEffect(() => {
        if ((notes.length > 0) && (notes.length > numOfSheets.length * 32))
            setNumOfSheets([...numOfSheets, (numOfSheets.length + 1)])
        else if ((notes.length > 0) && ((notes.length - 1) / ((numOfSheets.length - 1) * 32) < 1)) {
            let copyNumOfSheets = [...numOfSheets]
            copyNumOfSheets.pop()
            setNumOfSheets(copyNumOfSheets)
        }
    }, [notes, numOfSheets])

    //If refreshing or going back into '/search/:id', load song
    useEffect(() => {
        if (viewOnly && match.params.id)
            dispatch(getPublishedSong(match.params.id))
    }, [dispatch, viewOnly, match])

    return (
        <Fragment>
            <PageHeader showLogout={showLogout} viewOnly={viewOnly} setNumOfSheets={setNumOfSheets} />

            {numOfSheets.map((staves, numberOfStaves) => (
                <div key={numberOfStaves} className={viewOnly ? 'sheetView' : 'sheet'}>
                    <div className='stave-container'>
                        <SheetHeader />

                        <div id='mask'></div>

                        <Staff viewOnly={viewOnly} showLogout={showLogout} setShowLogout={setShowLogout} isShowingMenu={isShowingMenu} setIsShowingMenu={setIsShowingMenu} numberOfStaves={numberOfStaves} bars={bars} staffLines={staffLines} eighthNotes={eighthNotes} />
                        <Tab newSongClickState={newSongClickState} numberOfStaves={numberOfStaves} eighthNotes={eighthNotes} bars={bars} tabLines={tabLines} />
                    </div>
                </div>
            ))}

            <Modal setShowLogout={setShowLogout} setNumOfSheets={setNumOfSheets} />
        </Fragment >
    );
}

export default Sheet;