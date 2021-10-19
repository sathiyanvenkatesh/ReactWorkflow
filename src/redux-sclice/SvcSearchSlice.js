import {createSlice} from "@reduxjs/toolkit";
//import { useDispatch } from 'react-redux';
//import axios from 'axios';
export const initialState = {
    loading: false,
    hasErrors: false,
    svclist: []
  }
  const svcSearchSclice=createSlice({
    name: 'svcSearch',
    initialState,
    reducers: {
      getSvc: state => {
        state.loading = true
      },
      getSvcsSuccess: (state, { payload }) => {
       // console.log("PayLoad"+JSON.stringify(payload));
        state.svclist = payload
        state.loading = false
        state.hasErrors = false
      // console.log("svcList"+JSON.stringify(state.svclist));
      },
      getSvcsFailure: state => {
        state.loading = false
        state.hasErrors = true
      },
            
    },
    })
    // Three actions generated from the slice
export const { getSvc, getSvcsSuccess, getSvcsFailure} = svcSearchSclice.actions;
// A selector
export const svcSearchSelector = state => state.svcSearch
export function fetchSvcs(values) {
    return async dispatch => {
      dispatch(getSvc())
  
      try {
        console.log("values to pass to  get Svc api"+values);
       // console.log("values to pass to  get Svc api reqid values"+values['reqid']);
       var param='pageNo=0&pageSize=10&sortBy=seq_No';
       var valuesobj=JSON.parse(values);
       console.log(valuesobj.reqid);
       if(valuesobj.reqid!==''){
           param+='&reqid='+valuesobj.reqid
       }
       if(valuesobj.reqStatus!=='' && valuesobj.reqStatus!=='Select Status'){
         param+='&reqStatus='+valuesobj.reqStatus
       }
       if(valuesobj.raisedby !=='' && valuesobj.reqStatus!=='Select RaisedBy')
       {
         param+='&svcRaisedBy='+valuesobj.raisedby
       }
       if(valuesobj.fromdate!=='')
       {
         param+='&FromDate='+valuesobj.fromdate
       }
       if(valuesobj.todate!=='')
       {
         param+='&ToDate='+valuesobj.todate
       }

      
        
       

        console.log("param 1234"+param);

        const response = await fetch('https://conv.rakbankonline.ae/eida/svc/api/v1/svcs/search?'+param)
        const data = await response.json()
       console.log("data"+JSON.stringify(data.elements));  
        dispatch(getSvcsSuccess(data.elements))
      } catch (error) {
        dispatch(getSvcsFailure())
      }
    }
  }


// The reducer
export default svcSearchSclice.reducer