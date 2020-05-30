import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { finishUpdatingNote } from '../../../Redux/Actions/Notes';

const RestNotes = ({ showLogout, setShowLogout, setIsShowingMenu, isShowingMenu, createNull, addToSongArray, replaceNoteInSong, insertNoteInSong }) => {

    const dispatch = useDispatch()

    const notes = useSelector(state => state.notes.notes)
    const isReplacing = useSelector(state => state.notes.isReplacing)
    const isInserting = useSelector(state => state.notes.isInserting)
    const isUpdating = useSelector(state => state.notes.isUpdating)

    const onClickWholeRestNote = () => {
        let nullArray = createNull(8)
        addToSongArray("\uD834\uDD3B", 'WholeRest', null, 6, nullArray)

        if (isReplacing) {
            replaceNoteInSong(notes, "\uD834\uDD3B", 'WholeRest', nullArray)
            dispatch(finishUpdatingNote())
            setIsShowingMenu(!isShowingMenu)
            setShowLogout(!showLogout)
        }

        if (isInserting) {
            insertNoteInSong(notes, "\uD834\uDD3B", 'WholeRest', nullArray)
            dispatch(finishUpdatingNote())
            setIsShowingMenu(!isShowingMenu)
            setShowLogout(!showLogout)
        }
    }
    const onClickDottedWholeRestNote = () => {
        let nullArray = createNull(12)
        addToSongArray("\uD834\uDD3B", 'Dotted-WholeRest', null, 6, nullArray)

        if (isReplacing) {
            replaceNoteInSong(notes, "\uD834\uDD3B", 'Dotted-WholeRest', nullArray)
            dispatch(finishUpdatingNote())
            setIsShowingMenu(!isShowingMenu)
            setShowLogout(!showLogout)
        }

        if (isInserting) {
            insertNoteInSong(notes, "\uD834\uDD3B", 'Dotted-WholeRest', nullArray)
            dispatch(finishUpdatingNote())
            setIsShowingMenu(!isShowingMenu)
            setShowLogout(!showLogout)
        }
    }



    const onClickHalfRestNote = () => {
        let nullArray = createNull(4)
        addToSongArray("\uD834\uDD3C", 'HalfRest', null, 6, nullArray)

        if (isReplacing) {
            replaceNoteInSong(notes, "\uD834\uDD3C", 'HalfRest', nullArray)
            dispatch(finishUpdatingNote())
            setIsShowingMenu(!isShowingMenu)
            setShowLogout(!showLogout)
        }

        if (isInserting) {
            insertNoteInSong(notes, "\uD834\uDD3C", 'HalfRest', nullArray)
            dispatch(finishUpdatingNote())
            setIsShowingMenu(!isShowingMenu)
            setShowLogout(!showLogout)
        }
    }

    const onClickDottedeHalfRestNote = () => {
        let nullArray = createNull(6)
        addToSongArray("\uD834\uDD3C", 'Dotted-HalfRest', null, 6, nullArray)

        if (isReplacing) {
            replaceNoteInSong(notes, "\uD834\uDD3C", 'Dotted-HalfRest', nullArray)
            dispatch(finishUpdatingNote())
            setIsShowingMenu(!isShowingMenu)
            setShowLogout(!showLogout)
        }

        if (isInserting) {
            insertNoteInSong(notes, "\uD834\uDD3C", 'Dotted-HalfRest', nullArray)
            dispatch(finishUpdatingNote())
            setIsShowingMenu(!isShowingMenu)
            setShowLogout(!showLogout)
        }
    }

    const onClickQuarterRestNote = () => {
        let nullArray = createNull(2)
        addToSongArray("\uD834\uDD3D", 'QuarterRest', null, 6, nullArray)

        if (isReplacing) {
            replaceNoteInSong(notes, "\uD834\uDD3D", 'QuarterRest', nullArray)
            dispatch(finishUpdatingNote())
            setIsShowingMenu(!isShowingMenu)
            setShowLogout(!showLogout)
        }

        if (isInserting) {
            insertNoteInSong(notes, "\uD834\uDD3D", 'QuarterRest', nullArray)
            dispatch(finishUpdatingNote())
            setIsShowingMenu(!isShowingMenu)
            setShowLogout(!showLogout)
        }
    }

    const onClickDottedQuarterRestNote = () => {
        let nullArray = createNull(3)
        addToSongArray("\uD834\uDD3D", 'Dotted-QuarterRest', null, 6, nullArray)

        if (isReplacing) {
            replaceNoteInSong(notes, "\uD834\uDD3D", 'Dotted-QuarterRest', nullArray)
            dispatch(finishUpdatingNote())
            setIsShowingMenu(!isShowingMenu)
            setShowLogout(!showLogout)
        }

        if (isInserting) {
            insertNoteInSong(notes, "\uD834\uDD3D", 'Dotted-QuarterRest', nullArray)
            dispatch(finishUpdatingNote())
            setIsShowingMenu(!isShowingMenu)
            setShowLogout(!showLogout)
        }
    }

    const onClickEighthRestNote = () => {
        addToSongArray("\uD834\uDD3E", 'EighthRest', null, 6)

        if (isReplacing) {
            replaceNoteInSong(notes, "\uD834\uDD3E", 'EighthRest')
            dispatch(finishUpdatingNote())
            setIsShowingMenu(!isShowingMenu)
            setShowLogout(!showLogout)
        }

        if (isInserting) {
            insertNoteInSong(notes, "\uD834\uDD3E", 'EighthRest')
            dispatch(finishUpdatingNote())
            setIsShowingMenu(!isShowingMenu)
            setShowLogout(!showLogout)
        }
    }

    return (
        <div className='notes-section mb-1'>
            <h3 className='menu-section-label'>Rest Notes</h3>
            <div className='row-container-col'>
                <div className='row'>
                    <div className='note-container'>
                        <h3 className='note-label'>Whole</h3>
                        <button disabled={isUpdating && !isReplacing && !isInserting} className='btn-translate note-btn' onClick={() => onClickWholeRestNote()}>
                            <span id='WholeRest' className='note-menu-image'>&#119099;</span>
                        </button>
                    </div>

                    <div className='note-container'>
                        <h3 className='note-label'>Half</h3>
                        <button disabled={isUpdating && !isReplacing && !isInserting} onClick={() => onClickHalfRestNote()}>
                            <span id='HalfRest' className='note-menu-image'>&#119100;</span>
                        </button>
                    </div>
                </div>

                <div className='row'>
                    <div className='note-container'>
                        <h3 className='note-label'>Quarter</h3>
                        <button disabled={isUpdating && !isReplacing && !isInserting} onClick={() => onClickQuarterRestNote()}>
                            <span id='QuarterRest' className='note-menu-image'>&#119101;</span>
                        </button>
                    </div>

                    <div className='note-container'>
                        <h3 className='note-label'>Eighth</h3>
                        <button disabled={isUpdating && !isReplacing && !isInserting} onClick={() => onClickEighthRestNote()}>
                            <span id='EighthRest' className='note-menu-image'>&#119102;</span>
                        </button>
                    </div>
                </div>

                <div className='row'>
                    <h3 className='menu-section-label'>Dotted</h3>
                </div>
                <div className='row'>
                    <div className='note-container'>
                        <h3 className='note-label'>Whole</h3>
                        <button disabled={isUpdating && !isReplacing && !isInserting} className='btn-translate note-btn' onClick={() => onClickDottedWholeRestNote()}>
                            <span id='WholeRest' className='note-menu-image'>&#119099;<span className='dot rest-dot'>.</span></span>
                        </button>
                    </div>
                    <div className='note-container'>
                        <h3 className='note-label'>Half</h3>
                        <button disabled={isUpdating && !isReplacing && !isInserting} onClick={() => onClickDottedeHalfRestNote()}>
                            <span id='HalfRest' className='note-menu-image'>&#119100;<span className='dot rest-dot'>.</span></span>
                        </button>
                    </div>
                    <div className='note-container'>
                        <h3 className='note-label'>Quarter</h3>
                        <button disabled={isUpdating && !isReplacing && !isInserting} onClick={() => onClickDottedQuarterRestNote()}>
                            <span id='QuarterRest' className='note-menu-image'>&#119101;<span className='dot'>.</span></span>
                        </button>
                    </div>
                </div>
            </div>
        </div>);
}

export default RestNotes;