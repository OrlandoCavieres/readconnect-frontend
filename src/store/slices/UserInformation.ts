import { createSlice } from '@reduxjs/toolkit'


const UserInformation = createSlice({
  name: 'user',
  initialState: {
    token: '',
    expires: '',
    user: {
      id: '',
      name: '',
      email: ''
    }
  },
  reducers: {
    loginAction(state, action) {
      state.token = action.payload.token
      state.expires = action.payload.expires
      state.user = action.payload.user
    },
    logoutAction(state, action) {
      if (action.payload.exit) {
        state.token = ''
        state.expires = ''
        state.user = {
          id: '',
          name: '',
          email: ''
        }
      }
    },
    editNameAction(state, action) {
      state.user.name = action.payload.name
    },
    removeToken(state) {
      state.token = ''
    }
  }
})

const { actions, reducer } = UserInformation

export const {
  loginAction,
  logoutAction,
  editNameAction,
  removeToken
} = actions

export default reducer
