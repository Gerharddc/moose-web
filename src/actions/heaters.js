export const addHeater = (id, displayName, isOn, target, current) => {
  return {
    type: 'ADD_HEATER',
    id,
    displayName,
    isOn,
    target,
    current
  }
}

export const setHeating = (id, isOn) => {
  return {
    type: 'SET_HEATING',
    id,
    isOn
  }
}

export const setTargetTemp = (id, target) => {
  return {
    type: 'SET_TARGET_TEMP',
    id,
    target
  }
}