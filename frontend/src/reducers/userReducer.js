import userService from '../services/users'

const userReducer = (state = { currentUser: null }, action) => {
  switch (action.type) {
    case 'SET_USER':
      const currentUser = action.payload.currentUser
      return { ...state, currentUser }
    case 'GET_ALL_USERS':
      const users = action.payload.users
      return { ...state, users }
    default:
      return state
  }
}

export const getAllUsers = () => {
  return async dispatch => {
    const users = await userService.getAll()
    dispatch({
      type: 'GET_ALL_USERS',
      payload: {
        users
      }
    })
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
