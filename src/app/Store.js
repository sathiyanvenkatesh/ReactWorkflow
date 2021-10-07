import {configureStore} from "@reduxjs/toolkit";
import userReducer from "../redux-sclice/UserSclice";
import svcReducer from "../redux-sclice/SvcSclice";

export default configureStore({
  reducer:{
      user:userReducer,   // user is store name from usersclice
      svc:svcReducer

  } ,

});