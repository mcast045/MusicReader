import React, { useState, useEffect, Fragment } from 'react'
import './Sheet.css'
import { useSelector, useDispatch } from 'react-redux'
import Modal from '../../Components/Modal/Modal'
import Staff from '../../Components/Sheet/Staff/Staff'
import Tab from '../../Components/Sheet/Tab/Tab'
import PageHeader from '../../Components/Sheet/PageHeader/PageHeader'
import SheetHeader from '../../Components/Sheet/StaffHeader/Clef&Tab/Clef&Tab'
import { getPublishedSong } from '../../Redux/Actions/Song'
import { StaffContext } from '../../Context/StaffContext'

const Sheet = ({ match, viewOnly }) => {

    const dispatch = useDispatch()
    const notes = useSelector(state => state.notes.notes)
    const keySignature = useSelector(state => state.song.keySignature)
    const staffLineNumber = useSelector(state => state.song.staffLineNumber)
    let screenSize = window.screen.width

    //Constants used to make music sheet 
    const staffLines = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]
    const eighthNotes = [1, 2, 3, 4, 5, 6, 7, 8]
    const tabLines = [1, 2, 3, 4, 5, 6]
    let bars = [1, 2, 3, 4]
    let columnsPerStaff = 32

    //Prevent low end 'D#' note, which has no tab
    if (keySignature.id < -1)
        staffLines.pop()

    if (screenSize < 800) {
        bars = [1]
        columnsPerStaff = 8
    } else if (screenSize < 1340) {
        bars = [1, 2]
        columnsPerStaff = 16
    }

    const [numOfSheets, setNumOfSheets] = useState(staffLineNumber)

    //Add/remove staff lines
    useEffect(() => {
        if ((notes.length > 0) && (notes.length > numOfSheets.length * columnsPerStaff))
            setNumOfSheets([...numOfSheets, (numOfSheets.length + 1)])
        else if ((notes.length > 0) && ((notes.length - 1) / ((numOfSheets.length - 1) * columnsPerStaff) < 1)) {
            let copyNumOfSheets = [...numOfSheets]
            copyNumOfSheets.pop()
            setNumOfSheets(copyNumOfSheets)
        }
    }, [notes, numOfSheets, columnsPerStaff])

    //If refreshing or going back into '/search/:id', load song
    useEffect(() => {
        if (viewOnly && match.params.id)
            dispatch(getPublishedSong(match.params.id))
    }, [dispatch, viewOnly, match])

    return (
        <Fragment>
            <PageHeader viewOnly={viewOnly} setNumOfSheets={setNumOfSheets} screenSize={screenSize} />

            {numOfSheets.map((staves, numberOfStaves) => (
                <div key={numberOfStaves} className={viewOnly ? 'fullScreenStaff' : 'sheet'}>
                    <div className='stave-container'>
                        <StaffContext.Provider value={{ numberOfStaves, screenSize, viewOnly, bars, eighthNotes }}>
                            <SheetHeader />

                            <div id='mask'></div>

                            <Staff staffLines={staffLines} />
                            <Tab tabLines={tabLines} />
                        </StaffContext.Provider>
                    </div>
                </div>
            ))}

            <Modal setNumOfSheets={setNumOfSheets} />
        </Fragment >
    )
}

export default Sheet