import React, { useState, useEffect } from 'react'
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
    const { notes } = useSelector(({ notes }) => notes)
    const { staffLineNumber, currentSong } = useSelector(({ song }) => song)
    // const key = useSelector(({ song }) => song.keySignature)
    let screenSize = window.screen.width

    //Constants used to make music sheet 
    const staffLines = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]
    const eighthNotes = [1, 2, 3, 4, 5, 6, 7, 8]
    const tabLines = [1, 2, 3, 4, 5, 6]
    let bars = [1, 2, 3, 4]
    let columnsPerStaff = 32

    //Prevent low end 'D#' note, which has no tab
    if (currentSong?.keySignature?.id > 8) staffLines.pop()

    if (screenSize < 800) {
        bars = [1]
        columnsPerStaff = 8
    } else if (screenSize < 1340) {
        bars = [1, 2]
        columnsPerStaff = 16
    }

    const [numOfStaffs, setNumOfStaffs] = useState(staffLineNumber)

    //Without 'isUpdating' chord notes/tab does not render till user clicks 'Cancel'
    const isUpdating = useSelector(({ notes }) => notes.isUpdating)

    //Add/remove staff lines
    useEffect(() => {
        //Prevent infinite loop on load
        if (notes.length !== 0) {
            const copyNote = [...notes]
            //Add Staff line if there are more than 32 notes/staff
            //And if overloaded notes are not all null
            if ((notes.length > numOfStaffs.length * columnsPerStaff) &&
                !copyNote.splice(numOfStaffs.length * columnsPerStaff).every(note => note === null))
                setNumOfStaffs([...numOfStaffs, (numOfStaffs.length + 1)])
            //Remove staff line
            else if (((notes.length - 1) / ((numOfStaffs.length - 1) * columnsPerStaff) < 1)) {
                let copyNumOfSheets = [...numOfStaffs]
                copyNumOfSheets.pop()
                setNumOfStaffs(copyNumOfSheets)
            }
        } else setNumOfStaffs(staffLineNumber)
    }, [notes, numOfStaffs, columnsPerStaff, staffLineNumber])

    //If refreshing or going back into '/search/:id', load song
    useEffect(() => {
        if (viewOnly && match.params.id) dispatch(getPublishedSong(match.params.id))
    }, [dispatch, viewOnly, match])

    return (
        <>
            <PageHeader viewOnly={viewOnly} setNumOfStaffs={setNumOfStaffs} screenSize={screenSize} />

            {numOfStaffs.map((staves, numberOfStaves) => (
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

            <Modal setNumOfStaffs={setNumOfStaffs} />
        </ >
    )
}

export default Sheet