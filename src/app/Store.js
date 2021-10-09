import {configureStore} from "@reduxjs/toolkit";
import userReducer from "../redux-sclice/UserSclice";
import svcReducer from "../redux-sclice/SvcSclice";
import popupReducer from '../redux-sclice/popupwindow';

export default configureStore({
  reducer:{
      user:userReducer,   // user is store name from usersclice
      svc:svcReducer,
      popup:popupReducer
  } ,

});