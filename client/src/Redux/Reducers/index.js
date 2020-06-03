import { combineReducers } from 'redux'
import alert from './Alert'
import auth from './Auth'
import song from './Song'
import notes from './Notes'
import modal from './Modal'
import util from './Util'

export default combineReducers({
    alert,
    auth,
    song,
    notes,
    modal,
    util
});