import React, { Fragment } from 'react'
import './btn.css'
import SongInfo from '../SongInfo/SongInfo'
import AuthBtn from './AuthBtn'
import NonAuthBtn from './NonAuthBtn'
import { useSelector, useDispatch } from 'react-redux'
import { deleteLastNote, finishUpdatingNote, updateNote } from '../../../Redux/Actions/Notes'
import { createNull } from '../../../HelperFunctions/Helpers'
import { DOTTED_QUARTER, WHOLE, DOTTED_WHOLE, HALF, DOTTED_HALF, QUARTER } from '../../../HelperFunctions/SourceCodeEncodings'
import { BtnContext } from '../../../Context/BtnContext'

const StaveBtn = () => {

    const dispatch = useDispatch()
    const { notes, loading } = useSelector(({ notes }) => notes)
    const { currentSong } = useSelector(({ song }) => song)
    const { isAuthenticated } = useSelector(({ auth }) => auth)
    const { isShowingInfo } = useSelector(({ util }) => util)

    const removeLastNote = () => {
        const copyNotes = [...notes]
        const idx = copyNotes.reverse().map(note => note && note.length > 0).findIndex(note => note)
        copyNotes.splice(0, idx + 1)
        copyNotes.reverse()
        dispatch(deleteLastNote(copyNotes))
    }

    //Reuse notes/chords
    const copyPreviousNote = () => {
        const copyNotes = [...notes]
        const idx = copyNotes.reverse().map(note => note && note.length > 0).findIndex(note => note)
        const copyiedNoted = copyNotes[idx]

        let nullArray = []
        if (copyiedNoted[0].type === WHOLE) nullArray = createNull(8)
        else if (copyiedNoted[0].type === HALF) nullArray = createNull(4)
        else if (copyiedNoted[0].type === QUARTER) nullArray = createNull(2)
        else if (copyiedNoted[0].type === DOTTED_WHOLE) nullArray = createNull(12)
        else if (copyiedNoted[0].type === DOTTED_HALF) nullArray = createNull(5)
        else if (copyiedNoted[0].type === DOTTED_QUARTER) nullArray = createNull(3)

        copyNotes.reverse()
        copyNotes.push(copyiedNoted, ...nullArray)
        dispatch(updateNote(copyNotes))
        dispatch(finishUpdatingNote())
    }

    const createNullArray = (numberOfNulls) => {
        const lastIndex = (notes.length - 1) % numberOfNulls
        const numOfAdditionalNulls = numberOfNulls - lastIndex - 1

        const extraNulls = []
        for (let i = 0; i < numOfAdditionalNulls; i++) {
            extraNulls.push(null)
        }

        return extraNulls
    }

    const copyPreviousBar = () => {
        const extraNulls = createNullArray(8)

        const copyNotes = [...notes, ...extraNulls]
        const notesToPush = copyNotes.slice(copyNotes.length - 8)
        copyNotes.push(...notesToPush)

        dispatch(updateNote(copyNotes))
        dispatch(finishUpdatingNote())
    }

    const copyPreviousPhrase = () => {
        const extraNulls = createNullArray(32)

        const copyNotes = [...notes, ...extraNulls]
        const notesToPush = copyNotes.slice(copyNotes.length - 32)
        copyNotes.push(...notesToPush)

        dispatch(updateNote(copyNotes))
        dispatch(finishUpdatingNote())
    }

    return (
        <Fragment>
            {currentSong?._id ? <SongInfo /> : null}
            <div className='btn-sheets'>
                {!isShowingInfo ?
                    <Fragment>
                        <BtnContext.Provider value={{ removeLastNote, copyPreviousNote, copyPreviousBar, copyPreviousPhrase }}>
                            {!isAuthenticated && <NonAuthBtn />}
                            {isAuthenticated && !loading && <AuthBtn />}
                        </BtnContext.Provider>
                    </Fragment> : null
                }
            </div>
        </Fragment>
    )
}

export default StaveBtn
