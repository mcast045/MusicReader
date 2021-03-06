import {
    SHOW_MENU,
    SHOW_NEW_SONG_MENU,
    SHOW_LOGOUT,
    SHOW_SONG_INFO,
    SHOW_MENU_AND_LOGOUT,
} from '../Constants'

const initialState = {
    isShowingMenu: true,
    newSongClickState: false,
    isShowingLogout: true,
    isShowingInfo: false
}

export default function (state = initialState, action) {

    const { type, payload } = action

    switch (type) {
        case SHOW_MENU:
            return {
                ...state,
                isShowingMenu: payload
            }
        case SHOW_NEW_SONG_MENU:
            return {
                ...state,
                newSongClickState: payload
            }
        case SHOW_LOGOUT:
            return {
                ...state,
                isShowingLogout: payload
            }
        case SHOW_MENU_AND_LOGOUT:
            return {
                ...state,
                isShowingMenu: payload,
                isShowingLogout: payload
            }
        case SHOW_SONG_INFO:
            return {
                ...state,
                isShowingInfo: payload
            }
        default:
            return state
    }
}