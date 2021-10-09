import {createSlice} from "@reduxjs/toolkit";
//import { useDispatch } from 'react-redux';
import axios from 'axios';

export const initialState = {
    loading: false,
    hasErrors: false,
    svclist: [],
    svcaddresult:'',
    svcupdateresult:'',
    svcaddSucessflag:false,
    svcDetails:{},
    svcapproveDetails:''
  }
  const svcSclice=createSlice({
    name: 'svc',
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
      svcAddSuccess:(state,{payload} )=>{
        console.log("SVC Create Success Payload"+JSON.stringify(payload));
        state.svcaddresult = payload.data.requestId
        state.loading = false
        state.hasErrors = false
        state.svcaddSucessflag=true
      },
      svcAddFailure:state =>{
        state.loading =false
        state.hasErrors=true
      },
      svcUpdateSuccess:(state,{payload})=>{
         state.svcupdateresult=JSON.stringify(payload)
         state.loading=false
         state.hasErrors=false  
      },
      svcUdateFailure:state=>{
        state.loading=false
        state.hasErrors=true
      },
      getSVCbyidSucess :(state,{payload}) => {
       // console.log("Result SVC Details"+JSON.stringify(payload));
        state.svcDetails=payload
        state.loading=false
        state.hasErrors=false
      },
      getSVCbyidFailure:state =>{
        state.loading=false
        state.hasErrors=true
      }
      ,
      approveORrejectSucess :(state,{payload}) => {
        //console.log("ApprovOrReject Response"+payload.data);
        state.svcapproveDetails=payload
        state.loading=false
        state.hasErrors=false
      },
      approveORrejectFailure :(state,{payload}) => {        
        state.loading=false
        state.hasErrors=true
      }
    },
    })
    // Three actions generated from the slice
export const { getSvc, getSvcsSuccess, getSvcsFailure,svcAddSuccess,svcAddFailure,svcUpdateSuccess,svcUdateFailure,getSVCbyidSucess,getSVCbyidFailure,approveORrejectSucess,approveORrejectFailure } = svcSclice.actions

// A selector
export const svcsSelector = state => state.svc


// The reducer
export default svcSclice.reducer

// Asynchronous thunk action
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

      
        
        //param+=jsonToQueryString(values);

        console.log("param 1234"+param);

        const response = await fetch('https://conv.rakbankonline.ae/eida/svc/api/v1/svcs/search?'+param)
        const data = await response.json()
       console.log("data"+JSON.stringify(data.elements));  
        dispatch(getSvcsSuccess(data.elements))
      // axios.get('https://conv.rakbankonline.ae/eida/svc/api/v1/svcs/'+values)
        //.then(data => {
           //console.log(response.data.products);
           //store.dispatch(products.actions.reducer2(response.data.products))
          // dispatch(getSvcsSuccess(data.elements))
      //})

      } catch (error) {
        dispatch(getSvcsFailure())
      }
    }
  }

  export function getSVCbyId(values) {
    return async dispatch => {
      dispatch(getSvc())
  
      try {
        
        console.log("svc id to get details"+values);
         const response = await fetch('https://conv.rakbankonline.ae/eida/svc/api/v1/svcs/'+values)
        const data = await response.json()
        console.log("data"+JSON.stringify(data));  
       // axios.get('https://conv.rakbankonline.ae/eida/svc/api/v1/svcs/'+values)
        //.then(data => {
           //console.log(response.data.products);
           //store.dispatch(products.actions.reducer2(response.data.products))
           dispatch(getSVCbyidSucess(data))
      //})

       // dispatch(getSVCbyidSucess(data))
      } catch (error) {
        dispatch(getSVCbyidFailure())
      }
    }
  }






export function createNewSvcRequest(values){
return async dispatch =>{
   try{
     console.log("values to pass to api"+values);
    /* const response=await fetch('https://conv.rakbankonline.ae/eida/svc-local/api/v1/svc',{
       mode: 'no-cors', 
      //credentials: 'omit',
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(values)
    });
     const data = await response.json()*/
    /// console.log('data'+data)
    const headers = {
      'Content-Type': 'application/json;charset=UTF-8',
      'Access-Control-Allow-Origin': "*"
    }
    

     axios.post('https://conv.rakbankonline.ae/eida/svc-local/api/v1/svc',values,{
      headers: headers
    })
        .then(data =>  dispatch(svcAddSuccess(data)))
        .catch(error => {
             dispatch(svcAddFailure())
            console.error('There was an error!', error);
        });



    // dispatch(svcAddSuccess(data))
   }catch(error){
     console.log("error block");
     dispatch(svcAddFailure())
   }

}
}


export function  udateSvcRequest(values){
  return async dispatch =>{
     try{
      // const response=await fetch('API URL')
       //const data = await response.json()
       console.log("values to pass update api "+values);

       const headers = {
        'Content-Type': 'application/json;charset=UTF-8',
        'Access-Control-Allow-Origin': "*"
      }
      const valuesoption ={
        'approver_Unit_Dev_Mngr':values.unitManger
      }
  
       axios.post('https://conv.rakbankonline.ae/eida/svc-local/api/v1/svc/request/'+values.requestId,valuesoption,{
        headers: headers
      })
          .then(data =>  dispatch(svcUpdateSuccess(data)))
          .catch(error => {
               dispatch(svcUdateFailure())
              console.error('There was an error!', error);
          });

     }catch(error){
       dispatch(svcUdateFailure())
     }
  
  }
  }

  export function  approveOrRejectSVCRequest( values,userid){
   // const dispatch=useDispatch();
    return async dispatch =>{
       try{
         console.log("values to pass api"+JSON.stringify(values));
         console.log("userid"+userid);
        // const response=await fetch('https://conv.rakbankonline.ae/eida/svc/api/v1/svc/approveorrejct/'+values.requestId+'/'+userid)
         //const data = await response.json()
         //dispatch(approveORrejectSucess(data))


         const headers = {
          'Content-Type': 'application/json;charset=UTF-8',
          'Access-Control-Allow-Origin': "*"
        }
        const valuesoption ={
          'approver_Unit_Dev_Mngr':'Y',
          'remarks':'ok'
        }
    
         axios.post('https://conv.rakbankonline.ae/eida/svc-local/api/v1/svc/approveorrejct/'+values+'/'+userid,valuesoption,{
          headers: headers
        })
            .then(data =>  dispatch(approveORrejectSucess(data.data)))
            .catch(error => {
                 dispatch(approveORrejectFailure())
                console.error('There was an error!', error);
            });
    



       }catch(error){
         dispatch(approveORrejectFailure())
       }
    
    }
    }
  
