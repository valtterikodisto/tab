const userReducer = (state = { currentUser: null }, action) => {
  switch (action.type) {
    case 'SET_USER':
      const currentUser = action.payload.currentUser
      return { ...state, currentUser }
    default:
      return state
  }
}

export const setUser = currentUser => {
  return {
    type: 'SET_USER',
    payload: {
      currentUser
    }
  }
}

export default userReducer
