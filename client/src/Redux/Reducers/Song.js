import {
    GET_USER_SONG,
    GET_USER_SONGS,
    GET_PUBLISHED_SONG,
    GET_ALL_PUBLISHED_SONGS,
    CREATE_SONG,
    PUBLISH_SONG,
    UPDATE_KEYSIGNATURE,
    CLEAR_SONG,
    REDACT_SONG,
    DELETE_SONG,
    LOGOUT_USER
} from '../Constants'

const initialState = {
    songs: [],
    currentSong: {},
    songsSearch: [],
    title: 'Your Song Title',
    keySignature: { id: 1, value: 'C-major/A-minor' },
    staffLineNumber: [{ beats: '4', bar: '4' }],
    loading: true
};

export default function (state = initialState, action) {

    const { type, payload } = action;
    switch (type) {
        case GET_USER_SONG:
        case PUBLISH_SONG:
        case REDACT_SONG:
            return {
                ...state,
                currentSong: payload,
                loading: false
            }
        case GET_PUBLISHED_SONG:
            return {
                ...state,
                currentSong: payload,
                keySignature: payload.keySignature,
                loading: false
            }
        case GET_USER_SONGS:
            return {
                ...state,
                songs: payload,
                loading: false
            }
        case GET_ALL_PUBLISHED_SONGS:
            return {
                ...state,
                songsSearch: payload,
                loading: false
            }
        case CREATE_SONG:
            return {
                ...state,
                currentSong: payload,
                songs: [payload, ...state.songs],
                loading: false
            }
        case DELETE_SONG:
            return {
                ...state,
                keySignature: { id: 1, value: 'C-major/A-minor' },
                songs: state.songs.filter(song => song._id !== payload),
                currentSong:
                    state.songs.length > 0 ?
                        state.songs[state.songs.findIndex(song => (song._id === payload) - 1)] :
                        {},
                loading: false
            }
        case UPDATE_KEYSIGNATURE:
            return {
                ...state,
                keySignature: payload,
                loading: false
            }
        case CLEAR_SONG:
            return {
                ...state,
                title: 'Your Song Title',
                keySignature: { id: 1, value: 'C-major/A-minor' },
                loading: false,
                currentSong: {},
                songsSearch: []
            }
        case LOGOUT_USER:
            return {
                ...state,
                title: 'Your Song Title',
                keySignature: { id: 1, value: 'C-major/A-minor' },
                songsSearch: [],
                loading: false,
                currentSong: {},
                songs: []
            }
        default:
            return state;
    }
}