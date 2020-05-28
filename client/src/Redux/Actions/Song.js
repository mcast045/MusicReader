import axios from 'axios';
import { setAlert } from './Alert'
import { saveNotes } from './Notes'
import {
    GET_SONG_INFO,
    GET_ALL_SONGS,
    CREATE_SONG_INFO,
    DELETE_SONG,
    UPDATE_KEYSIGNATURE,
    CLEAR_SONG,
    CLEAR_NOTES,
    PUBLISH_SONG,
    GET_PUBLISHED_SONG,
    GET_NOTES,
} from '../Constants'

export const getUserSong = (userId, songId) => async dispatch => {
    try {
        const res = await axios.get(`songs/${userId}/${songId}`)

        dispatch({
            type: GET_SONG_INFO,
            payload: res.data
        })
    }
    catch (err) {
        const errors = err.response.data.errors

        if (errors)
            errors.forEach(error => dispatch(setAlert(error.msg, 'danger')))
    }
}

export const getAllSongs = () => async dispatch => {
    try {
        const res = await axios.get(`songs/`)
        dispatch({ type: GET_ALL_SONGS, payload: res.data })
    }
    catch (err) {
        const errors = err.response.data.errors

        if (errors)
            errors.forEach(error => dispatch(setAlert(error.msg, 'danger')))
    }
}

export const createSongInfo = ({ title, tempo, keySignature }) => async dispatch => {
    try {
        const config = {
            headers: {
                'Content-type': 'application/json'
            }
        }

        const body = JSON.stringify({ title, tempo, keySignature })

        const res = await axios.post('songs', body, config)

        dispatch({
            type: CREATE_SONG_INFO,
            payload: res.data
        })

        dispatch(saveNotes([], res.data._id, false))
    }
    catch (err) {
        const errors = err.response.data.errors

        if (errors)
            errors.forEach(error => dispatch(setAlert(error.msg, 'danger')))
    }
}

export const deleteSong = songId => async dispatch => {
    try {
        await axios.delete(`songs/${songId}`)

        dispatch({
            type: DELETE_SONG,
            payload: songId
        })

        dispatch(setAlert('Song Removed', 'success'))
    }
    catch (err) {
        const errors = err.response.data.errors

        if (errors)
            errors.forEach(error => dispatch(setAlert(error.msg, 'danger')))
    }
}

export const publishSong = songId => async dispatch => {
    try {
        const res = await axios.put(`songs/publish/${songId}`)
        dispatch({ type: PUBLISH_SONG, payload: res.data })
    }
    catch (err) {
        const errors = err.response.data.errors

        if (errors)
            errors.forEach(error => dispatch(setAlert(error.msg, 'danger')))
    }
}

export const getPublishedSong = songId => async dispatch => {
    try {
        const song = await axios.get(`songs/${songId}`)
        const notes = await axios.get(`notes/${songId}`)
        dispatch({ type: GET_PUBLISHED_SONG, payload: song.data })
        dispatch({ type: GET_NOTES, payload: notes.data[0].notes })
    }
    catch (err) {
        const errors = err.response.data.errors

        if (errors)
            errors.forEach(error => dispatch(setAlert(error.msg, 'danger')))
    }
}

export const redactSong = songId => async dispatch => {
    try {
        const res = await axios.put(`songs/redact/${songId}`)
        dispatch({ type: PUBLISH_SONG, payload: res.data })
    }
    catch (err) {
        const errors = err.response.data.errors

        if (errors)
            errors.forEach(error => dispatch(setAlert(error.msg, 'danger')))
    }
}

export const clearAll = () => async dispatch => {
    dispatch({ type: CLEAR_SONG })
    dispatch({ type: CLEAR_NOTES })
}

export const updateKeySignature = key => ({ type: UPDATE_KEYSIGNATURE, payload: key })