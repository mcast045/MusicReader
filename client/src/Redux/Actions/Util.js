import {
    SHOW_MENU,
    SHOW_NEW_SONG_MENU,
    SHOW_LOGOUT,
    SHOW_SONG_INFO
} from '../Constants'

export const isShowingMenu = state => ({ type: SHOW_MENU, payload: state })
export const isNewSongMenu = state => ({ type: SHOW_NEW_SONG_MENU, payload: state })
export const isShowLogout = state => ({ type: SHOW_LOGOUT, payload: state })
export const isShowInfo = state => ({ type: SHOW_SONG_INFO, payload: state })