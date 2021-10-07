import {createSlice} from "@reduxjs/toolkit";
export const initialState = {
    loading: false,
    hasErrors: false,
    users: []
  }

  const usersSclice=createSlice({
  name: 'users',
  initialState,
  reducers: {
    getUsers: state => {
      state.loading = true
    },
    getUsersSuccess: (state, { payload }) => {
      state.users = payload
      state.loading = false
      state.hasErrors = false
    },
    getUsersFailure: state => {
      state.loading = false
      state.hasErrors = true
    },
  },
  })
// Three actions generated from the slice
export const { getUsers, getUsersSuccess, getUsersFailure } = usersSclice.actions

// A selector
export const usersSelector = state => state.users

// The reducer
export default usersSclice.reducer

// Asynchronous thunk action
export function fetchUsers() {
    return async dispatch => {
      dispatch(getUsers())
  
      try {
        const response = await fetch('https://jsonplaceholder.typicode.com/users')
        const data = await response.json()
  
        dispatch(getUsersSuccess(data))
      } catch (error) {
        dispatch(getUsersFailure())
      }
    }
  }



