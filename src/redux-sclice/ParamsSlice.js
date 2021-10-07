import { createSlice } from '@reduxjs/toolkit'

export const initialState = {
  loading: false,
  hasErrors: false,
  tools: [],
  devmanagers:[],
  applictionname:[]

}

// A slice for recipes with our three reducers
const paramsSlice = createSlice({
  name: 'params',
  initialState,
  reducers: {
    getParam: state => {
      state.loading = true
    },
    getToolsSuccess: (state, { payload }) => {
      state.recipes = payload
      state.loading = false
      state.hasErrors = false
    },
    getToolsFailure: state => {
      state.loading = false
      state.hasErrors = true
    },
    getDevManagerSuccess: (state, { payload }) => {
        state.recipes = payload
        state.loading = false
        state.hasErrors = false
      },
      getDevManagerFailure: state => {
        state.loading = false
        state.hasErrors = true
      },
      getApplicationNameSuccess: (state, { payload }) => {
        state.recipes = payload
        state.loading = false
        state.hasErrors = false
      },
      getApplicationNameFailure: state => {
        state.loading = false
        state.hasErrors = true
      },
  },
})

// Three actions generated from the slice
export const { getParam, getToolsSuccess, getToolsFailure,getDevManagerSuccess,getDevManagerFailure,getApplicationNameSuccess,getApplicationNameFailure } = paramsSlice.actions

// A selector
export const recipesSelector = state => state.params

// The reducer
export default paramsSlice.reducer

// Asynchronous thunk action
export function fetchTools() {
  return async dispatch => {
    dispatch(getParam())

    try {
      const response = await fetch('https://www.themealdb.com/api/json/v1/1/search.php?s=')
      const data = await response.json()

      dispatch(getToolsSuccess(data.meals))
    } catch (error) {
      dispatch(getToolsFailure())
    }
  }
}

export function fetchDevManagers() {
    return async dispatch => {
      dispatch(getParam())
  
      try {
        const response = await fetch('https://www.themealdb.com/api/json/v1/1/search.php?s=')
        const data = await response.json()
  
        dispatch(getDevManagerSuccess(data.meals))
      } catch (error) {
        dispatch(getDevManagerFailure())
      }
    }
  }
  export function fetchApplicationsNames() {
    return async dispatch => {
      dispatch(getParam())
  
      try {
        const response = await fetch('https://www.themealdb.com/api/json/v1/1/search.php?s=')
        const data = await response.json()
  
        dispatch(getApplicationNameSuccess(data.meals))
      } catch (error) {
        dispatch(getApplicationNameFailure())
      }
    }
  }


