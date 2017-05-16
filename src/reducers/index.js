import { combineReducers } from 'redux'
import heaters from './heaters'

const mooseApp = combineReducers({
  heaters
})

export default mooseApp