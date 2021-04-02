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
    CLEAR_NOTES,
    IS_FETCHING_NOTES,
    EDIT_COLUMN,
} from '../Constants'

const initialState = {
    notes: [],
    editColumnNumber: -1,
    loading: false,
    isReplacing: false,
    isInserting: false,
    isUpdating: false
}

export default function (state = initialState, action) {

    const { type, payload } = action

    switch (type) {
        case GET_NOTES:
            return {
                ...state,
                notes: payload,
                loading: false
            }
        case SAVE_NOTES:
            return {
                ...state,
                loading: false
            }
        case ADD_NOTE:
        case DELETE_LAST_NOTE:
        case DELETE_ANY_NOTE:
            return {
                ...state,
                notes: payload,
                isReplacing: false,
                isInserting: false,
                isUpdating: false
            }
        case UPDATE_NOTE:
            return {
                ...state,
                notes: payload,
                isUpdating: true
            }
        case REPLACE_NOTE:
            return {
                ...state,
                notes: payload,
                isReplacing: true,
                isUpdating: true
            }
        case INSERT_NOTE:
            return {
                ...state,
                notes: payload,
                isInserting: true,
                isUpdating: true
            }
        case FINISH_UPDATE_NOTE:
            return {
                ...state,
                isReplacing: false,
                isInserting: false,
                isUpdating: false
            }
        case EDIT_COLUMN:
            return {
                ...state,
                editColumnNumber: payload
            }
        case CLEAR_NOTES:
            return {
                ...state,
                loading: false,
                isUpdating: false,
                notes: []
            }
        case IS_FETCHING_NOTES:
            return {
                ...state,
                loading: true,
                isUpdating: false,
                notes: []
            }
        default:
            return state
    }
}