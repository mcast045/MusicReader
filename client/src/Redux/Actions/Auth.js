import axios from 'axios';
import { setAlert } from './Alert'
import {
    LOGIN_USER,
    LOGOUT_USER,
    LOGIN_FAIL,
    REGISTER_SUCCESS,
    REGISTER_FAIL,
    DELETE_ACCOUNT,
    DELETE_ACCOUNT_ERROR,
    IS_DELETING_USER,
    IS_FETCHING,
    CLEAR_NOTES,
    CLEAR_SONG,
    LOAD_USER,
    LOAD_ERROR,

    GET_SONG_INFO,
    GET_SONGS_INFO,
    GET_NOTES
} from '../Constants'

export const loginUser = ({ email, password }) => async dispatch => {
    const config = {
        headers: {
            'Content-type': 'application/json'
        }
    }

    const body = JSON.stringify({ email, password })

    try {
        //Allows CORS requests to be made with credentials(i.e. cookies, authorization headers or TLS client certificates)
        // axios.defaults.withCredentials = true
        const res = await axios.post('user/login', body, config)

        //To prevent login into account from 'Search' and loading incorrect song/notes
        dispatch({ type: CLEAR_NOTES })
        dispatch({ type: CLEAR_SONG })
        dispatch({ type: LOGIN_USER, payload: res.data })
    }
    catch (err) {
        const errors = err.response.data.errors

        if (errors)
            errors.forEach(error => dispatch(setAlert(error.msg, 'danger')))

        dispatch({ type: LOGIN_FAIL })
    }
}

export const logoutUser = () => async dispatch => {
    //Allows CORS requests to be made with credentials(i.e. cookies, authorization headers or TLS client certificates)
    // axios.defaults.withCredentials = true
    axios.post('user/logout')
    dispatch({ type: LOGOUT_USER })
    dispatch({ type: CLEAR_NOTES })
    dispatch({ type: CLEAR_SONG })
}

export const registerUser = ({ email, password, confirmPassword, username }) => async dispatch => {
    const config = {
        headers: {
            'Content-type': 'application/json'
        }
    }

    const body = JSON.stringify({ email, password, confirmPassword, username })

    try {
        const res = await axios.post('user/register', body, config)

        //To prevent login into account from 'Search' and loading incorrect song/notes
        dispatch({ type: CLEAR_NOTES })
        dispatch({ type: CLEAR_SONG })
        dispatch({ type: REGISTER_SUCCESS, payload: res.data })
    }
    catch (err) {
        const errors = err.response.data.errors

        if (errors)
            errors.forEach(error => dispatch(setAlert(error.msg, 'danger')))

        dispatch({ type: REGISTER_FAIL })
    }
}

export const isDeleteUser = () => ({ type: IS_DELETING_USER })

export const deleteUser = () => async dispatch => {
    try {
        await axios.delete('user')
        dispatch({ type: DELETE_ACCOUNT })
        dispatch(setAlert('Account Removed', 'success'))
    }
    catch (err) {
        dispatch({
            type: DELETE_ACCOUNT_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status }
        });
    }
}

export const loadUser = userId => async dispatch => {
    try {
        let res = await axios.get(`user/${userId}`)

        if (res.data.song.length !== 0)
            dispatch({ type: GET_SONG_INFO, payload: res.data.song[0] })

        dispatch({ type: GET_SONGS_INFO, payload: res.data.song })
        dispatch({ type: LOAD_USER, payload: res.data.user })
    }
    catch (err) {
        dispatch(setAlert('Error Loading User', 'danger'))
        dispatch({ type: LOAD_ERROR, payload: { msg: 'Error Loading User' } });
    }
}

export const isFetching = () => ({ type: IS_FETCHING })