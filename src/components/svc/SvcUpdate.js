import React, { useState, useEffect } from 'react'
import { getSVCbyId, svcsSelector } from "../../redux-sclice/SvcSclice";
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom'
//import { toast } from 'react-toastify';
import { unwrapResult } from '@reduxjs/toolkit'
import { getOpen,setAlertBox } from '../../redux-sclice/popupwindow'

//import 'react-toastify/dist/ReactToastify.css';
const DEVMANAGER = ['Manager1', 'Manager2']


function SvcUpdate() {

  const toastId = React.useRef(null);

  const user = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : null
  //const user=localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : null
  const { id } = useParams();
  console.log("id" + id);
  const dispatch = useDispatch(); // add dispatch function to dipatch action to reducers and update the store 
  const { svcDetails, hasErrors } = useSelector(svcsSelector)

  const [values, setValues] = useState({
    requestId: id, unitManger: '', userId: user.name
  });

  const set = name => {
    return ({ target: { value } }) => {
      setValues(oldValues => ({ ...oldValues, [name]: value }));
    }
  };

  useEffect(() => {
    //dispatch(getSVCbyId(id) )
    fetchSVCDetailsById()

  }, []);

  const fetchSVCDetailsById = () => {
    console.log("inside fetchSVCDetailsById");
    const resultAction = dispatch(getSVCbyId(id))
    console.log("resultAction" + resultAction);
    const originalPromiseResult = unwrapResult(resultAction)
    console.log("originalPromiseResult" + originalPromiseResult);

  }

  console.log("svcDetails in update page " + JSON.stringify(svcDetails));
  console.log(svcDetails.tool);
  if (svcDetails !== '' && !hasErrors) {
   /* if (!toast.isActive(toastId.current)) {
      toastId.current = toast.success("SVC Request Created Successfully" + id, {
        toastId: 'success1',
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: true,
        closeOnClick: true,
        draggablePercent: 80
      })
    }*/
    const payload = {type:"success",headerText:"Info",bodyText:"SVC Request Created Successfully" + id,saveButton:false};
    dispatch(setAlertBox(payload))
    dispatch(getOpen());
   // event.preventDefault();

  }
  /* const [values, setValues] = useState({  
     requestId:svcDetails.requestId,tool:svcDetails.tool,requestorName:user.name,requestDate:svcDetails.requestDate,applicationName:svcDetails.applicationName,version:svcDetails.version,durationFrom:svcDetails.durationFrom,
     durationTo:svcDetails.durationTo,
     reasonforReq:svcDetails.requstorRemarks,checkOut:svcDetails.checkOut,checkIn:svcDetails.checkIn,unitManger:svcDetails.unitManger,checkInReq:"N",deployment:"N",emergencyCheck:"Y",fromArchive:"N",getLatest:"Y",
     toOtherEnv:"N",userId:user.name
   });
  
   
  console.log("values"+JSON.stringify(values));*/


  const contaierstyle = {
    maxWidth: "1500px"
  }
  const spanstylegreen = {
    color: "green",
    fontWeight: "bold"
  }
  const spanstylered = {
    color: "red",
    fontWeight: "bold"
  }

  const handleSubmit = event => {
    alert('clicked');
    event.preventDefault();
    console.log("Update button clicked ");
    //if(handleValidation){
    // dispatch(createNewSvcRequest(JSON.stringify(values)) )
    // }
    console.log(values);

  }


  //render() {
  return (
    <div className="container" style={contaierstyle}>
      <h2>SVC Access Request Update Form</h2>
      <div>
        <form onSubmit={handleSubmit}>
          <div className="form-group row">
            <label htmlFor="requestid" className="col-sm-2 col-form-label text-danger "><h6>Request ID</h6></label>
            <div className="col-sm-4">
              <input type="text" className="form-control" id="requestid" value={svcDetails.requestId} disabled />
            </div>
            <label htmlFor="tools" className="col-sm-2 col-form-label text-danger"><h6>Tool</h6></label>
            <div className="col-sm-4">
              <input type="text" className="form-control" id="requestid" value={svcDetails.tool} disabled />
            </div>
          </div>

          <div className="form-group row">
            <label htmlFor="requestorname" className="col-sm-2 col-form-label text-danger "><h6>Requestor Name</h6></label>
            <div className="col-sm-4">
              <input type="text" className="form-control" id="requestorname" value={svcDetails.requestorName} disabled />
            </div>
            <label htmlFor="requestdate" className="col-sm-2 col-form-label text-danger"><h6>Request Date</h6></label>
            <div className="col-sm-4">
              <input type="text" className="form-control" id="requestdate" value={svcDetails.requestDate} disabled />
            </div>
          </div>

          <div className="form-group row">
            <label htmlFor="applicationname" className="col-sm-2 col-form-label text-danger "><h6>Application Name</h6></label>
            <div className="col-sm-4">
              <input type="text" className="form-control" id="applicationname" value={svcDetails.applicationName} disabled />
            </div>
            <label htmlFor="version" className="col-sm-2 col-form-label text-danger"><h6>Version</h6></label>
            <div className="col-sm-4">
              <input type="text" className="form-control" id="version" value={svcDetails.version} disabled />
            </div>
          </div>

          <div className="form-group row">
            <label htmlFor="durationfrom" className="col-sm-2 col-form-label text-danger "><h6>Duration From</h6></label>
            <div className="col-sm-4">
              <input type="text" className="form-control" id="durationfrom" value={svcDetails.durationFrom} disabled />
            </div>
            <label htmlFor="durationto" className="col-sm-2 col-form-label text-danger"><h6>Duration To</h6></label>
            <div className="col-sm-4">
              <input type="text" className="form-control" id="durationto" value={svcDetails.durationTo} disabled />
            </div>
          </div>





          <div className="form-row">
            <div className="form-group col-md-12">
              <label htmlFor="description" className="text-danger"><h6>Description/Reason</h6></label>
              <textarea className="form-control" id="description" value={svcDetails.reasonforReq} disabled ></textarea>
            </div>

          </div>
          <div className="col-md-12">
            <div className="panel panel-primary">
              <div className="panel-heading">
                <label htmlFor="accessrights" className="text-danger">   <h3 className="panel-title">Access Rights</h3> </label>
              </div>
              <div className="panel-body form-group row ">

                <label htmlFor="checkout" className="col-sm-3 col-form-label text-danger"><h6>Check Out </h6></label>
                <div className="form-check col-sm-3">
                  <input className="form-check-input" type="checkbox" defaultChecked={svcDetails.checkIn ? 'Y' : 'N'} value={svcDetails.checkOut} id="checkout" disabled />
                </div>
                <label htmlFor="checkin" className="col-sm-3 col-form-label text-danger"><h6>Check In</h6></label>
                <div className="form-check col-sm-3">
                  <input className="form-check-input" type="checkbox" defaultChecked={svcDetails.checkIn ? 'Y' : 'N'} value={svcDetails.checkIn} id="checkin" disabled />
                </div>

              </div>
            </div>
          </div>


          <div className="col-md-12">
            <div className="panel panel-primary">
              <div className="panel-heading">
                <label htmlFor="accessrights" className="text-danger">   <h3 className="panel-title">Approvals</h3> </label>
              </div>
              <div className="panel-body form-group row ">
                <label htmlFor="unitManger" className="col-sm-3 col-form-label text-danger"><h6>Development Manager </h6></label>
                <div className="form-check col-sm-3">
                  <select id="unitManger" className="form-control" value={values.unitManger} onChange={set('unitManger')} >
                    <option >Select Dev Manager </option>
                    {DEVMANAGER.map(m => <option key={m} defaultValue={svcDetails.unitManger} >{m}</option>)}
                  </select>

                </div>
              </div>
            </div>
          </div>


          <div className="form-group row">
            <label htmlFor="requestStatus" className="col-sm-2 col-form-label text-danger "><h6>Request Status</h6></label>
            <div className="col-sm-4">
              <span style={svcDetails.requestStatus === 'REJ' ? spanstylered : spanstylegreen}>{svcDetails.requestStatus}</span>
            </div>
          </div>


          <div className="form-group">
            <button type="submit" className="btn btn-lg btn-danger"  >Update</button> &nbsp;&nbsp;
            <button type="button" className="btn btn-danger btn-lg" >Reset</button>

          </div>

        </form>



      </div>
    </div>
  )
}
//}

export default SvcUpdate