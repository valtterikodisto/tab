const initialState = { text: null, className: null }

const notificationReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_NOTIFICATION':
      const { text, className } = action.payload

      return { ...state, text, className }
    case 'DELETE_NOTIFICATION':
      return { ...state, ...initialState }
    default:
      return state
  }
}

export const setNotification = (text, className) => {
  return {
    type: 'SET_NOTIFICATION',
    payload: {
      text,
      className
    }
  }
}

export const deleteNotification = () => {
  return {
    type: 'DELETE_NOTIFICATION'
  }
}

export default notificationReducer
