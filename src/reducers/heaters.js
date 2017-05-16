const heater = (state = {}, action) => {
  switch (action.type) {
    case 'ADD_HEATER':
      return {
        id: action.id,
        displayName: action.displayName,
        isOn: action.isOn,
        target: action.target,
        current: action.current
      }
    case 'SET_HEATING':
      if (state.id !== action.id) {
        return state
      }

      return Object.assign({}, state, {
        isOn: action.isOn
      })
    case 'SET_TARGET_TEMP':
      if (state.id !== action.id) {
        return state
      }
      
      return Object.assign({}, state, {
        target: action.target
      })
    case 'SET_CURRENT_TEMP':
      if (state.id !== action.id) {
        return state
      }

      return Object.assign({}, state, {
        current: action.current
      })
    
    default:
      return state
  }
}

const heaters = (state = [], action) => {
  switch (action.type) {
    case 'ADD_HEATER':
      return [
        ...state,
        heater(undefined, action)
      ]
    case 'SET_HEATING':
      return state.map(h =>
        heater(h, action)
      )
    case 'SET_TARGET_TEMP':
      return state.map(h =>
        heater(h, action)
      )
    case 'SET_CURRENT_TEMP':
      return state.map(h =>
        heater(h, action)
      )

    default:
      return state
  }
}

export default heaters