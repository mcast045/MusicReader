import { SHOW_MODAL, HIDE_MODAL } from '../Constants'

const initialState = {
    showModal: false,
    loading: true
}

export default function (state = initialState, action) {

    const { type } = action

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
                showModal: false
            }
        default:
            return state
    }
}