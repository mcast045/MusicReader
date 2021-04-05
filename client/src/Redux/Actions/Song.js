import axios from 'axios'
import { setAlert } from './Alert'
import {
    GET_NOTES,
    GET_USER_SONG,
    GET_PUBLISHED_SONG,
    GET_ALL_PUBLISHED_SONGS,
    CREATE_SONG,
    PUBLISH_SONG,
    UPDATE_KEYSIGNATURE,
    CLEAR_SONG,
    CLEAR_NOTES,
    REDACT_SONG,
    DELETE_SONG,
    IS_FETCHING_SONGS,
    FILTER_SONGS,
    END_LOAD
} from '../Constants'

export const getUserSong = (userId, songId) => async dispatch => {
    try {
        const res = await axios.get(`songs/${userId}/${songId}`)

        dispatch({ type: GET_USER_SONG, payload: res.data })
    }
    catch (err) {
        dispatch(setAlert('Song Not Found', 'danger'))
    }
}

export const getViewableSeachSongs = page => async dispatch => {
    try {
        const res = await axios.get(`songs${page}`)
        dispatch({ type: GET_ALL_PUBLISHED_SONGS, payload: { published: res.data.published, count: res.data.count } })
    }
    catch (err) {
        dispatch(setAlert('Error Loading Songs', 'danger'))
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

        dispatch({ type: CREATE_SONG, payload: res.data })
    }
    catch (err) {
        dispatch(setAlert('Error Creating Song', 'danger'))
    }
}

export const deleteSong = songId => async dispatch => {
    try {
        await axios.delete(`songs/${songId}`)

        dispatch({ type: DELETE_SONG, payload: songId })
        dispatch(setAlert('Song Removed', 'success'))
    }
    catch (err) {
        dispatch(setAlert('Error Deleteing Song ', 'danger'))
    }
}

export const publishSong = songId => async dispatch => {
    try {
        const res = await axios.put(`songs/publish/${songId}`)
        dispatch({ type: PUBLISH_SONG, payload: res.data })
    }
    catch (err) {
        dispatch(setAlert('Error Publishing Song', 'danger'))
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
        dispatch(setAlert('Error Receving Songs', 'danger'))
    }
}

export const redactSong = songId => async dispatch => {
    try {
        const res = await axios.put(`songs/redact/${songId}`)
        dispatch({ type: REDACT_SONG, payload: res.data })
    }
    catch (err) {
        dispatch(setAlert('Error Redacting Song', 'danger'))
    }
}

export const filterSongs = searchParameters => async dispatch => {
    try {
        const config = {
            headers: {
                'Content-type': 'application/json'
            }
        }
        const body = JSON.stringify(searchParameters)
        const res = await axios.post(`songs/filter`, body, config)

        if (res.data.length !== 0)
            dispatch({ type: FILTER_SONGS, payload: { songs: res.data.song, count: res.data.totalMatches } })
        else
            dispatch({ type: END_LOAD })
    }
    catch (err) {
        dispatch(setAlert('Error Redacting Song', 'danger'))
    }
}

export const clearAll = () => async dispatch => {
    dispatch({ type: CLEAR_NOTES })
    dispatch({ type: CLEAR_SONG })
}

export const updateKeySignature = key => ({ type: UPDATE_KEYSIGNATURE, payload: key })
export const isFetchingSongs = () => ({ type: IS_FETCHING_SONGS })
