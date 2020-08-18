import axios from 'axios'
import { setAlert } from './Alert'
import {
    GET_NOTES,
    SAVE_NOTES,
    ADD_NOTE,
    DELETE_LAST_NOTE,
    DELETE_ANY_NOTE,
    UPDATE_NOTE,
    REPLACE_NOTE,
    INSERT_NOTE,
    FINISH_UPDATE_NOTE,
    IS_FETCHING_NOTES,
    EDIT_COLUMN
} from '../Constants'

export const getUserNotes = songId => async dispatch => {
    try {
        const res = await axios.get(`notes/${songId}`)

        let notes = []
        if (res.data[0])
            notes = res.data[0].notes

        //Replace [null] with null
        for (let i = 0; i < notes.length; i++) {
            if (!notes[i][0])
                notes[i] = notes[i][0]
        }

        dispatch({ type: GET_NOTES, payload: notes })
    }
    catch (err) {
        dispatch(setAlert('No Notes Found', 'danger'))
    }
}

export const saveNotes = (notes, songId, isSaveBtn) => async dispatch => {
    try {
        const config = {
            headers: {
                'Content-type': 'application/json'
            }
        }

        const body = JSON.stringify(notes)

        await axios.post(`notes/${songId}`, body, config)

        dispatch({ type: SAVE_NOTES })

        if (isSaveBtn)
            dispatch(setAlert('Save Successful', 'success'))
    }
    catch (err) {
        dispatch(setAlert('Save Failed', 'danger'))
    }
}

export const isFetchingNotes = () => ({ type: IS_FETCHING_NOTES })
export const addNote = note => ({ type: ADD_NOTE, payload: note })
export const updateNote = note => ({ type: UPDATE_NOTE, payload: note })
export const replaceNote = note => ({ type: REPLACE_NOTE, payload: note })
export const insertNote = note => ({ type: INSERT_NOTE, payload: note })
export const finishUpdatingNote = () => ({ type: FINISH_UPDATE_NOTE })
export const deleteLastNote = note => ({ type: DELETE_LAST_NOTE, payload: note })
export const deleteAnyNote = note => ({ type: DELETE_ANY_NOTE, payload: note })
export const currentEditColumn = columnNumber => ({ type: EDIT_COLUMN, payload: columnNumber })