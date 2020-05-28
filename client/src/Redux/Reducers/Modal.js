import { SHOW_MODAL, HIDE_MODAL } from '../Constants'

const initialState = {
    showModal: false,
    isDeleteUser: false,
    loading: true,
};

export default function (state = initialState, action) {

    const { type } = action;

    switch (type) {
        case SHOW_MODAL:
            return {
                ...state,
                loading: false,
                showModal: true
            }
        case HIDE_MODAL:
            return {
                ...state,
                loading: false,
                showModal: false,
                isDeleteUser: false
            }
        default:
            return state;
    }
}