import {createSlice} from "@reduxjs/toolkit";

const initialUser = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : null
console.log("initialUser"+initialUser);



export const userSclice= createSlice({
name:"user", //store Name 
initialState:{
    user:initialUser ,
    loading: false,
    hasErrors: false

},
reducers:{
    loginSuccess:(state,action)=>{ // login action
        state.user=action.payload;
        state.hasErrors=false;
        state.loading=false;
        localStorage.setItem("user",JSON.stringify(action.payload))  
    },
    loginFailure: state => {
      state.loading = false
      state.hasErrors = true
    },
    logoutSuccess:(state)=>{ // logout action
        state.user=null;
        state.hasErrors=false;
        state.loading=false;
        localStorage.removeItem('user')

    },
    logoutFailure: state => {
      state.loading = false
      state.hasErrors = true
    }
}

});

// Export Actions 
export const {loginSuccess,logoutSuccess,loginFailure,logoutFailure}=userSclice.actions;
// export User to access globally 
export const selectUser=(state)=>state.user;
//export reducer
export default userSclice.reducer;
export const login = ({ name, password }) => async dispatch => {
    try {
      // const res = await api.post('/api/auth/login/', { username, password })
      if(name==='sathiyan'&& password==='123'){
      dispatch(loginSuccess({name,password}));
      }else{
        dispatch(loginFailure());
      }
    } catch (e) {
      //return console.error(e.message);
      dispatch(loginFailure());
    }
  }
  export const logout = () => async dispatch => {
    try {
      // const res = await api.post('/api/auth/logout/')
      return dispatch(logoutSuccess())
    } catch (e) {
      //return console.error(e.message);
      dispatch(logoutFailure())
    }
}