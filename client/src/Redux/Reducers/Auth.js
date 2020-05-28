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
    LOAD_USER,
    LOAD_ERROR,
    HIDE_MODAL
} from '../Constants'

const initialState = {
    isAuthenticated: false,
    user: {},
    loading: true,
    isDeleteUser: false,
    errors: []
};

export default function (state = initialState, action) {

    const { type, payload } = action;

    switch (type) {
        case LOGIN_USER:
        case REGISTER_SUCCESS:
        case LOAD_USER:
            return {
                ...state,
                isAuthenticated: true,
                user: payload,
                loading: false,
                errors: []
            }
        case LOGOUT_USER:
        case DELETE_ACCOUNT:
            return {
                ...state,
                isAuthenticated: false,
                user: {},
                loading: false,
                errors: []
            }
        case DELETE_ACCOUNT_ERROR:
        case LOAD_ERROR:
        case REGISTER_FAIL:
        case LOGIN_FAIL:
            return {
                ...state,
                errors: [...state.errors, payload],
                loading: false
            }
        case IS_DELETING_USER:
            return {
                ...state,
                isDeleteUser: true
            }
        case IS_FETCHING:
            return {
                ...state,
                loading: true
            }
        case HIDE_MODAL:
            return {
                ...state,
                isDeleteUser: false
            }
        default:
            return state;
    }
}