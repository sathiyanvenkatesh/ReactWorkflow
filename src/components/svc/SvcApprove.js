import React, { useState, useEffect } from 'react'
import { getSVCbyId, svcsSelector,approveORrejectFailure } from "../../redux-sclice/SvcSclice";
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom'
import { getOpen, setAlertBox } from '../../redux-sclice/popupwindow'
import axios from 'axios';
import moment from 'moment';

//const DEVMANAGER = ['Manager1', 'Manager2'];
const RISKAPPROER = [{ key: 1, value: 'mallika' }, { key: 2, value: 'sathiyan' }, { key: 3, value: 'venkatesh' }]
const VRESIONCONTROLPROVIDER = [{key:1,value:'ajit pillai'}, {key:2,value:'ramesh'}, {key:3,value:'mallika'}]



function SvcApprove() {

  const [localSvcDetails, setsvcDetails] = useState(null);
  const svcDetails = useSelector(svcsSelector)
  const user = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : null
  const { id } = useParams();
  console.log("id" + id);
  const dispatch = useDispatch(); // add dispatch function to dipatch action to reducers and update the store 
  const [rarid,setrarId] = useState('');
  const [accessProvider,setaccessProvider] = useState('');

  
  const [values, setValues] = useState({
    requestId: id, unitManger: svcDetails.unitManger, userId: user.name, remarks: '', accessProvider: '', rarId: ''
  });
  function NewlineText(props) {
    const text = props.text;
    console.log("text"+text);
  // const newText = text.split('\n').map(str => <p>{str}</p>); 
  const newText=<p>{text}</p> 
    return newText;
  }
  function getdiscription(text){
    console.log("status code"+text);
    var description='';
    if(text==='APD1'){
      description="Approved by Unit/Dev Manager"
    }
    if(text==='SUB'){
      description="Submitted"
    }
    if(text==='APD2'){
      description="Approved by Risk & Assurance Review"
    }
    if(text==='CLS'){
      description="Closed"
    }
    if(text==='XLD'){
      description="Cancelled"
    }
    if(text==='REJ'){
      description="Rejected"
    }
    return description;

  }
  //const allremaks=;
  const set = name => {
    return ({ target: { value } }) => {
      setValues(oldValues => ({ ...oldValues, [name]: value }));
    }
  };

  useEffect(() => {
    const { loading } = svcDetails;
    const bool = (Object.keys(svcDetails.svcDetails).length > 0);
    console.log(bool)
    if (!loading && bool) {
      setaccessProvider('ramesh')
      setrarId('sathiyan');
      setsvcDetails(svcDetails.svcDetails);
      console.log(localSvcDetails)
    }
  }, [svcDetails])

  useEffect(() => {
    //dispatch(getSVCbyId(id) )
    fetchSVCDetailsById()
  }, []);

  const fetchSVCDetailsById = () => {
    dispatch(getSVCbyId(id))
  }
  
  //console.log("svcDetails in update page " + JSON.stringify(svcDetails));
  //console.log(svcDetails.tool);
  /* const [values, setValues] = useState({  
     requestId:svcDetails.requestId,tool:svcDetails.tool,requestorName:user.name,requestDate:svcDetails.requestDate,applicationName:svcDetails.applicationName,version:svcDetails.version,durationFrom:svcDetails.durationFrom,
     durationTo:svcDetails.durationTo,
     reasonforReq:svcDetails.requstorRemarks,checkOut:svcDetails.checkOut,checkIn:svcDetails.checkIn,unitManger:svcDetails.unitManger,checkInReq:"N",deployment:"N",emergencyCheck:"Y",fromArchive:"N",getLatest:"Y",
     toOtherEnv:"N",userId:user.name
   });
  
   
  console.log("values"+JSON.stringify(values));*/


  /*const contaierstyle = {
    maxWidth: "1500px"
  }*/
  const spanstylegreen = {
    color: "green",
    fontWeight: "bold"
  }
  const spanstylered = {
    color: "red",
    fontWeight: "bold"
  }

  const handleSubmit = event => {
    event.preventDefault();
    console.log(values);

    apicallForUserRequest(values).then(result => {
      console.log(result)
      const payload = { type: "success", headerText: "Message", bodyText: result.data, saveButton: false };
      dispatch(setAlertBox(payload))
      dispatch(getOpen());
      dispatch(getSVCbyId(values.requestId));
    }, error => {
      dispatch(approveORrejectFailure(error))
    })

  }

  const apicallForUserRequest = (values) => {
    var valuesoption = '';
    const headers = {
      'Content-Type': 'application/json;charset=UTF-8',
      'Access-Control-Allow-Origin': "*"
    }
    if (localSvcDetails.requestStatus === 'SUB' && localSvcDetails.unitManagerApprival !== 'ok') {
      valuesoption = {
        'approver_Unit_Dev_Mngr': 'Y',
        'remarks': values.remarks
      }
    }
    if (localSvcDetails.requestStatus === 'APD2' && values.accessProviderApproval !== 'ok') {
      valuesoption = {
        'Access_Provider': 'Y',
        'remarks': values.remarks
      }
    }
    if (localSvcDetails.requestStatus === 'APD1' && values.rarApproval !== 'ok') {
      valuesoption = {
        'Approver_Risk_Assur_Review': 'Y',
        'remarks': values.remarks
      }

    }
    return axios.post('https://conv.rakbankonline.ae/eida/svc-local/api/v1/svc/approveorrejct/' + values.requestId + '/' + 'mbshetty', valuesoption, {
      headers: headers
    })
  }

  const handlecheckinChange = (e) => {
    let isChecked = e.target.checked ? "Y" : "N";
    console.log("isChecked" + isChecked);
    //values.checkIn = isChecked;
  }
  const handlecheckoutChange = (e) => {
    let isChecked = e.target.checked ? "Y" : "N";
    console.log("isChecked" + isChecked);
    // values.checkOut = isChecked;
  }


  //render() {
  return (
    <div className="container pb-2">
      <h5 className="font-weight-bold">SVC Access Request Approval Form</h5>
      <form onSubmit={handleSubmit}>
        {localSvcDetails ? (
          <>
            <div className="form-group row p-0 mb-3">
              <label htmlFor="requestid" className="col-sm-2 col-form-label text-danger "><h6>Request ID</h6></label>
              <div className="col-sm-4">
                <input type="text" className="form-control" id="requestid" disabled value={localSvcDetails?.requestId} />
              </div>
              <label htmlFor="tools" className="col-sm-2 col-form-label text-danger"><h6>Tool</h6></label>
              <div className="col-sm-4">
                <input type="text" className="form-control" id="requestid" disabled value={localSvcDetails?.tool} />
              </div>
            </div>
            <div className="form-group row p-0 mb-3">
              <label htmlFor="requestorname" className="col-sm-2 col-form-label text-danger "><h6>Requestor Name</h6></label>
              <div className="col-sm-4">
                <input type="text" className="form-control" id="requestorname" value={localSvcDetails.requestorName} disabled />
              </div>
              <label htmlFor="requestdate" className="col-sm-2 col-form-label text-danger"><h6>Request Date</h6></label>
              <div className="col-sm-4">
                <input type="text" className="form-control" id="requestdate" value={localSvcDetails.requestDate} disabled />
              </div>
            </div>
       
          <div className="form-group row p-0 mb-3">
            <label htmlFor="applicationname" className="col-sm-2 col-form-label text-danger "><h6>Application Name</h6></label>
            <div className="col-sm-4">
              <input type="text" className="form-control" id="applicationname" value={localSvcDetails.applicationName} disabled />
            </div>
            <label htmlFor="version" className="col-sm-2 col-form-label text-danger"><h6>Version</h6></label>
            <div className="col-sm-4">
              <input type="text" className="form-control" id="version" value={localSvcDetails.version} disabled />
            </div>
          </div>
          
          <div className="form-group row p-0 mb-3">
            <label htmlFor="durationfrom" className="col-sm-2 col-form-label text-danger "><h6>Duration From</h6></label>
            <div className="col-sm-4">
              <input type="text" className="form-control" id="durationfrom" value={moment(localSvcDetails.durationFrom).format("DD/MM/YYYY")} disabled />
            </div>
            <label htmlFor="durationto" className="col-sm-2 col-form-label text-danger"><h6>Duration To</h6></label>
            <div className="col-sm-4">
              <input type="text" className="form-control" id="durationto" value={moment(localSvcDetails.durationTo).format("DD/MM/YYYY")} disabled />
            </div>
          </div>
         
 
          <div className="form-row">
            <div className="form-group col-md-12">
              <label htmlFor="description" className="text-danger"><h6>Description/Reason</h6></label>
              <textarea className="form-control" id="description" disabled value={localSvcDetails.reasonforReq}  ></textarea>
            </div>
          </div>
         
          <div className="col-md-12 p-0 mb-2">
            <h5 className="font-weight-bold">Access Rights</h5>
            <div className="col-md-4 form-inline p-0">
              <div >
                <div className="form-check p-0">
                  <label className="form-check-label text-danger" htmlFor="checkOut">Check Out</label>
                  <input className="form-check-input ml-2 p-2" type="checkbox"  checked={localSvcDetails.checkOut?'Y':'N'} value={localSvcDetails.checkOut} id="checkOut" disabled onChange={e => handlecheckoutChange(e)} />  
                </div>
              </div>
              <div className="ml-4">
                <div className="form-check p-0">
                  <label className="form-check-label text-danger" htmlFor="checkIn">Check In</label>
                  <input className="form-check-input ml-2 p-2" type="checkbox" checked={localSvcDetails.checkIn?'Y':'N'}  value={localSvcDetails.checkIn} id="checkIn" disabled onChange={e => handlecheckinChange(e)} />
                </div>
              </div>
            </div>
          </div>
         
           <div className="col-md-12 p-0 mt-2">
             <h5 className="font-weight-bold">Approvals</h5>
             <div className="form-group row p-0 mb-3">
              <label htmlFor="devmgr" className="col-sm-2 col-form-label text-danger">Development Manager</label>
                  <div className="form-check col-sm-4">
                    <input type="text" className="form-control" id="devmgr"  value={localSvcDetails.unitManger} disabled />
                  </div>
            </div>
          </div>
           
            <div className="form-group row p-0 mb-3">
              <label htmlFor="devmgr" className="col-sm-2 col-form-label text-danger">Approved</label>
              <div className="form-check col-sm-4">
              <input className="form-radio-input mr-1" type="radio" value="Y"  defaultChecked={localSvcDetails.unitManagerApprival === 'ok'} id="approved" name="appstatus" />   <label htmlFor="approved" >Yes</label>
               <input className="form-radio-input ml-2 mr-1" type="radio" value="N" defaultChecked={localSvcDetails.unitManagerApprival!=='ok'} id="rejected" name="appstatus" /> <label htmlFor="rejected">No</label>
              </div>
            </div>

         { localSvcDetails.requestStatus==='APD1' &&( <div><div className="form-group row p-0 mb-3">
              <label htmlFor="devmgr" className="col-sm-2 col-form-label text-danger">Risk Assurance Review</label>
              <div className="form-check col-sm-4">
                <select id="riskassurancereview" className="form-control" value={rarid} onChange={set('riskassurancereview')} >
                <option >Select Access Provider </option>
                {RISKAPPROER.map(r => <option key={r.key}>{r.value}</option>) }
                {/* {RISKAPPROER.map((r,index) => <option key={index}>{r}</option>)} */}
              </select>
              </div>
            </div>

            <div className="form-group row p-0 mb-3">
              <label htmlFor="devmgr" className="col-sm-2 col-form-label text-danger">Reviewed</label>
              <div className="form-check col-sm-4 d-flex align-items-center">
              <input className="form-radio-input mr-1" type="radio" value="Y" defaultChecked={localSvcDetails.rarApproval === 'ok'} id="approved" name="rarstatus" />  <span>Yes</span>
              <input className="form-radio-input ml-2 mr-1" type="radio" value="N" defaultChecked={localSvcDetails.rarApproval !== 'ok'} id="rejected" name="rarstatus" /> <span>No</span>
              </div>
            </div></div>
         )}
          { localSvcDetails.requestStatus==='APD2' &&( <div> <div className="form-group row p-0 mb-3">
              <label htmlFor="devmgr" className="col-sm-2 col-form-label text-danger">Access Provider</label>
              <div className="form-check col-sm-4">               
                <select id="accessProvider" className="form-control" value={accessProvider} onChange={set('accessProvider')} >
                <option >Select Access Provider </option>
                {VRESIONCONTROLPROVIDER.map(v => <option key={v.key}>{v.value}</option>)}
              </select>
              </div>
            </div>
              <div className="form-group row p-0 mb-3">
                  <label htmlFor="devmgr" className="col-sm-2 col-form-label text-danger">Approved</label>
                  <div className="form-check col-sm-4 d-flex align-items-center">
                    <input className="form-radio-input mr-1" type="radio" value="Y" defaultChecked={svcDetails.accessProviderApproval === 'ok'} id="approved" name="accstatus" /> <span>Yes</span>
                    <input className="form-radio-input ml-2 mr-1" type="radio" value="N" defaultChecked={svcDetails.accessProviderApproval !== 'ok'} id="rejected" name="accstatus" /><span>No</span>
                  </div>
              </div>
          </div>)}
          <div className="form-row">
              <div className="form-group col-md-12 ">
                <label htmlFor="remarks" className="text-danger"><h6>Remarks</h6></label>
                <textarea className="form-control" id="remaks" value={values.remarks} onChange={set('remarks')} ></textarea>
              </div>
          </div>
          <div className="form-row">
            <div className="form-group col-md-12 ">
              <label htmlFor="allremarks" className="text-danger"><h6>All Remarks</h6></label>              
             {/* <textarea className="form-control" id="allremaks" value={localSvcDetails.allRemarks}  ></textarea>*/}
            
             <NewlineText text={localSvcDetails.allRemarks} />
           {  /*<p>{localSvcDetails.allRemarks}</p>*/}
            </div>
          </div>
          <div className="form-group row p-0 mb-3">
            <label htmlFor="requestStatus" className="col-sm-2 col-form-label text-danger "><h6>Request Status</h6></label>
            <div className="col-sm-4">
              <span style={localSvcDetails.requestStatus === 'REJ' ? spanstylered : spanstylegreen}>{getdiscription(localSvcDetails.requestStatus)}</span>
            </div>
          </div> 

        <div className="form-group mb-4">
          <button type="button" className="btn btn-md btn-danger"  >Reset</button> &nbsp;&nbsp;
          <button type="submit" className="btn btn-primary btn-md" >Submit</button>
        </div>
        </>)
            : (<div>Loading</div>)
          }
      </form>
    </div>
  )
}
//}

export default SvcApprove