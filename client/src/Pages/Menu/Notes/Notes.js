import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { finishUpdating } from '../../../Redux/Actions/Notes'

const Notes = ({ showLogout, setShowLogout, setIsShowingMenu, isShowingMenu, createNull, addToSongArray, replaceNoteInSong, insertNoteInSong }) => {

    const dispatch = useDispatch()

    const notes = useSelector(state => state.notes.notes)
    const isReplacing = useSelector(state => state.notes.isReplacing)
    const isInserting = useSelector(state => state.notes.isInserting)
    const isEnabled = useSelector(state => state.notes.isEnabled)
    const key = useSelector(state => state.song.keySignature)

    const onClickWholeNote = () => {
        let nullArray = createNull(8)
        if (key.id < -1)
            addToSongArray("\uD834\uDD5D", 'Whole', 'D#', 5, nullArray)
        else if (key.id !== 7 || key.id === -1)
            addToSongArray("\uD834\uDD5D", 'Whole', 'E', 5, nullArray)
        else if (key.id === 7)
            addToSongArray("\uD834\uDD5D", 'Whole', 'F', 5, nullArray)

        if (isReplacing) {
            replaceNoteInSong(notes, "\uD834\uDD5D", 'Whole', nullArray)
            dispatch(finishUpdating())
            setIsShowingMenu(!isShowingMenu)
            setShowLogout(!showLogout)
        }

        if (isInserting) {
            insertNoteInSong(notes, "\uD834\uDD5D", 'Whole', nullArray)
            dispatch(finishUpdating())
            setIsShowingMenu(!isShowingMenu)
            setShowLogout(!showLogout)
        }
    }
    const onClickDottedWholeNote = () => {
        let nullArray = createNull(12)
        if (key.id < -1)
            addToSongArray(`${"\uD834\uDD5D"}.`, 'Dotted-Whole', 'D#', 5, nullArray)
        else if (key.id !== 7 || key.id === -1)
            addToSongArray(`${"\uD834\uDD5D"}.`, 'Dotted-Whole', 'E', 5, nullArray)
        else if (key.id === 7)
            addToSongArray(`${"\uD834\uDD5D"}.`, 'Dotted-Whole', 'F', 5, nullArray)

        if (isReplacing) {
            replaceNoteInSong(notes, `${"\uD834\uDD5D"}.`, 'Dotted-Whole', nullArray)
            dispatch(finishUpdating())
            setIsShowingMenu(!isShowingMenu)
            setShowLogout(!showLogout)
        }

        if (isInserting) {
            insertNoteInSong(notes, `${"\uD834\uDD5D"}.`, 'Dotted-Whole', nullArray)
            dispatch(finishUpdating())
            setIsShowingMenu(!isShowingMenu)
            setShowLogout(!showLogout)
        }
    }



    const onClickHalfNote = () => {
        let nullArray = createNull(4)
        if (key.id < -1)
            addToSongArray("\uD834\uDD5E", 'Half', 'D#', 5, nullArray)
        else if (key.id !== 7 || key.id === -1)
            addToSongArray("\uD834\uDD5E", 'Half', 'E', 5, nullArray)
        else if (key.id === 7)
            addToSongArray("\uD834\uDD5E", 'Half', 'F', 5, nullArray)

        if (isReplacing) {
            replaceNoteInSong(notes, "\uD834\uDD5E", 'Half', nullArray)
            dispatch(finishUpdating())
            setIsShowingMenu(!isShowingMenu)
            setShowLogout(!showLogout)
        }

        if (isInserting) {
            insertNoteInSong(notes, "\uD834\uDD5E", 'Half', nullArray)
            dispatch(finishUpdating())
            setIsShowingMenu(!isShowingMenu)
            setShowLogout(!showLogout)
        }
    }
    const onClickDottedHalfNote = () => {
        let nullArray = createNull(5)
        if (key.id < -1)
            addToSongArray(`${"\uD834\uDD5E"}.`, 'Dotted-Half', 'D#', 5, nullArray)
        else if (key.id !== 7 || key.id === -1)
            addToSongArray(`${"\uD834\uDD5E"}.`, 'Dotted-Half', 'E', 5, nullArray)
        else if (key.id === 7)
            addToSongArray(`${"\uD834\uDD5E"}.`, 'Dotted-Half', 'F', 5, nullArray)

        if (isReplacing) {
            replaceNoteInSong(notes, `${"\uD834\uDD5E"}.`, 'Dotted-Half', nullArray)
            dispatch(finishUpdating())
            setIsShowingMenu(!isShowingMenu)
            setShowLogout(!showLogout)
        }

        if (isInserting) {
            insertNoteInSong(notes, `${"\uD834\uDD5E"}.`, 'Dotted-Half', nullArray)
            dispatch(finishUpdating())
            setIsShowingMenu(!isShowingMenu)
            setShowLogout(!showLogout)
        }
    }




    const onClickQuarterNote = () => {
        let nullArray = createNull(2)
        if (key.id < -1)
            addToSongArray("\uD834\uDD5F", 'Quarter', 'D#', 5, nullArray)
        else if (key.id !== 7 || key.id === -1)
            addToSongArray("\uD834\uDD5F", 'Quarter', 'E', 5, nullArray)
        else if (key.id === 7)
            addToSongArray("\uD834\uDD5F", 'Quarter', 'F', 5, nullArray)

        if (isReplacing) {
            replaceNoteInSong(notes, "\uD834\uDD5F", 'Quarter', nullArray)
            dispatch(finishUpdating())
            setIsShowingMenu(!isShowingMenu)
            setShowLogout(!showLogout)
        }

        if (isInserting) {
            insertNoteInSong(notes, "\uD834\uDD5F", 'Quarter', nullArray)
            dispatch(finishUpdating())
            setIsShowingMenu(!isShowingMenu)
            setShowLogout(!showLogout)
        }
    }
    const onClickDottedQuarterNote = () => {
        let nullArray = createNull(3)
        if (key.id < -1)
            addToSongArray(`${"\uD834\uDD5F"}.`, 'Dotted-Quarter', 'D#', 5, nullArray)
        else if (key.id !== 7 || key.id === -1)
            addToSongArray(`${"\uD834\uDD5F"}.`, 'Dotted-Quarter', 'E', 5, nullArray)
        else if (key.id === 7)
            addToSongArray(`${"\uD834\uDD5F"}.`, 'Dotted-Quarter', 'F', 5, nullArray)

        if (isReplacing) {
            replaceNoteInSong(notes, `${"\uD834\uDD5F"}.`, 'Dotted-Quarter', nullArray)
            dispatch(finishUpdating())
            setIsShowingMenu(!isShowingMenu)
            setShowLogout(!showLogout)
        }

        if (isInserting) {
            insertNoteInSong(notes, `${"\uD834\uDD5F"}.`, 'Dotted-Quarter', nullArray)
            dispatch(finishUpdating())
            setIsShowingMenu(!isShowingMenu)
            setShowLogout(!showLogout)
        }
    }



    const onClickEighthNote = () => {
        if (key.id < -1)
            addToSongArray("\uD834\uDD60", 'Eighth', 'D#', 5)
        else if (key.id !== 7 || key.id === -1)
            addToSongArray("\uD834\uDD60", 'Eighth', 'E', 5)
        else if (key.id === 7)
            addToSongArray("\uD834\uDD60", 'Eighth', 'F', 5)

        if (isReplacing) {
            replaceNoteInSong(notes, "\uD834\uDD60", 'Eighth')
            dispatch(finishUpdating())
            setIsShowingMenu(!isShowingMenu)
            setShowLogout(!showLogout)
        }

        if (isInserting) {
            insertNoteInSong(notes, "\uD834\uDD60", 'Eighth')
            dispatch(finishUpdating())
            setIsShowingMenu(!isShowingMenu)
            setShowLogout(!showLogout)
        }
    }

    return (
        <div className='notes-section mb-1'>
            <h3 className='menu-section-label'>Notes</h3>
            <div className='row-container-col'>
                <div className='row'>
                    <div className='note-container'>
                        <h3 className='note-label'>Whole</h3>
                        <button disabled={isEnabled && !isReplacing && !isInserting} className='btn-translate-whole-note' onClick={() => onClickWholeNote()}>
                            <span id='wholeNote' className='note-menu-image'>&#119133;</span>
                        </button>
                    </div>

                    <div className='note-container'>
                        <h3 className='note-label'>Half</h3>
                        <button disabled={isEnabled && !isReplacing && !isInserting} onClick={() => onClickHalfNote()}>
                            <span id='HalfNote' className='note-menu-image'>&#119134;</span>
                        </button>
                    </div>
                </div>

                <div className='row mb-1'>
                    <div className='note-container'>
                        <h3 className='note-label'>Quarter</h3>
                        <button disabled={isEnabled && !isReplacing && !isInserting} onClick={() => onClickQuarterNote()}>
                            <span id='QuarterNote' className='note-menu-image'>&#119135;</span>
                        </button>
                    </div>

                    <div className='note-container'>
                        <h3 className='note-label'>Eighth</h3>
                        <button disabled={isEnabled && !isReplacing && !isInserting} onClick={() => onClickEighthNote()}>
                            <span id='EighthNote' className='note-menu-image'>&#119136;</span>
                        </button>
                    </div>
                </div>


                <div className='row'>
                    <h3 className='menu-section-label'>Dotted</h3>
                </div>
                <div className='row'>
                    <div className='note-container'>
                        <h3 className='note-label'>Whole</h3>
                        <button disabled={isEnabled && !isReplacing && !isInserting} className='btn-translate-whole-note' onClick={() => onClickDottedWholeNote()}>
                            <span id='wholeNote' className='note-menu-image'>&#119133;<span className='dot'>.</span></span>
                        </button>
                    </div>
                    <div className='note-container'>
                        <h3 className='note-label'>Half</h3>
                        <button disabled={isEnabled && !isReplacing && !isInserting} onClick={() => onClickDottedHalfNote()}>
                            <span id='HalfNote' className='note-menu-image'>&#119134;<span className='dot'>.</span></span>
                        </button>
                    </div>
                    <div className='note-container'>
                        <h3 className='note-label'>Quarter</h3>
                        <button disabled={isEnabled && !isReplacing && !isInserting} onClick={() => onClickDottedQuarterNote()}>
                            <span id='QuarterNote' className='note-menu-image'>&#119135;<span className='dot'>.</span></span>
                        </button>
                    </div>
                </div>
            </div>
        </div>);
}

export default Notes;