import React, { useState, useEffect } from 'react'
import {  svcsSelector, udateSvcRequest} from "../../redux-sclice/SvcSclice";
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom'

import { getOpen,setAlertBox } from '../../redux-sclice/popupwindow'
import moment from 'moment';

function SvcUpdate() {
  const [localSvcDetails, setsvcDetails] = useState(null);
  const user = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : null  
  const { id } = useParams();
  console.log("id" + id);
  const dispatch = useDispatch(); // add dispatch function to dipatch action to reducers and update the store 
  const { svcupdateresult } = useSelector(svcsSelector)
  const [devmger,setDevmger]=useState(null);
  const [values] = useState({
    requestId: id, unitManger: devmger, userId: user.name
  });
  const handleChange = (e) => {
    alert(e.target.value);
    let selectedValue = e.target.value;
    console.log("selectedValue" + selectedValue);
    setDevmger(selectedValue);
    values.unitManger=selectedValue;
    
  }
  const [devManager,setDevManager] = useState(null);
  useEffect(() => {
    (async () => {
      try {
        const SVC_UDMResponse = await fetch('https://conv.rakbankonline.ae/eida/svc-local/api/v1/approvals/SVC_UDM')
        const result = await SVC_UDMResponse.json();
        console.log(result);
        result.forEach( item => {
          item.userId = String(item.userId).trimEnd()
        })
        setDevManager(result);
        const svcsresponse = await fetch('https://conv.rakbankonline.ae/eida/svc-local/api/v1/svcs/'+id)
        let data = await svcsresponse.json();
        console.log("daaa");
        console.log(String(data.unitManger).trimEnd())
        setDevmger(String(data.unitManger).trimEnd());
        setsvcDetails(data);
      } catch (e) {
        console.error(e);
      }
    })();
  }, [id]);

  
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
    console.log("Update button clicked ");
    dispatch(udateSvcRequest(values));    
    console.log(values);
   if(svcupdateresult!==''){
      console.log('SVC Update'+svcupdateresult);      
      const payload = {type:"success",headerText:"Info",bodyText:svcupdateresult,saveButton:false};
       dispatch(setAlertBox(payload))
       dispatch(getOpen());
    }

  }
  return (
    <div className="container">
      <h5 className="font-weight-bold">SVC Access Request Update Form</h5>
      <div className="mt-4">
        <form onSubmit={handleSubmit}>
          {localSvcDetails ? (
            <>
          <div className="form-group row">
            <label htmlFor="requestid" className="col-sm-2 col-form-label text-danger "><h6>Request ID</h6></label>
            <div className="col-sm-4">
              <input type="text" className="form-control" id="requestid" value={localSvcDetails?.requestId} disabled />
            </div>
            <label htmlFor="tools" className="col-sm-2 col-form-label text-danger"><h6>Tool</h6></label>
            <div className="col-sm-4">
              <input type="text" className="form-control" id="requestid" value={localSvcDetails?.tool} disabled />
            </div>
          </div>
          <div className="form-group row">
            <label htmlFor="requestorname" className="col-sm-2 col-form-label text-danger "><h6>Requestor Name</h6></label>
            <div className="col-sm-4">
              <input type="text" className="form-control" id="requestorname" value={localSvcDetails?.requestorName} disabled />
            </div>
            <label htmlFor="requestdate" className="col-sm-2 col-form-label text-danger"><h6>Request Date</h6></label>
            <div className="col-sm-4">
              <input type="text" className="form-control" id="requestdate" value={ moment(localSvcDetails?.requestDate).format("DD-MM-YYYY")} disabled />
            </div>
          </div>
          <div className="form-group row">
            <label htmlFor="applicationname" className="col-sm-2 col-form-label text-danger "><h6>Application Name</h6></label>
            <div className="col-sm-4">
              <input type="text" className="form-control" id="applicationname" value={localSvcDetails?.applicationName} disabled />
            </div>
            <label htmlFor="version" className="col-sm-2 col-form-label text-danger"><h6>Version</h6></label>
            <div className="col-sm-4">
              <input type="text" className="form-control" id="version" value={localSvcDetails?.version} disabled />
            </div>
          </div>
          <div className="form-group row">
            <label htmlFor="durationfrom" className="col-sm-2 col-form-label text-danger "><h6>Duration From</h6></label>
            <div className="col-sm-4">
              <input type="text" className="form-control" id="durationfrom" value={moment(localSvcDetails?.durationFrom).format("DD/MM/YYYY")} disabled />
            </div>
            <label htmlFor="durationto" className="col-sm-2 col-form-label text-danger"><h6>Duration To</h6></label>
            <div className="col-sm-4">
              <input type="text" className="form-control" id="durationto" value={moment(localSvcDetails?.durationTo).format("DD/MM/YYYY")} disabled />
            </div>
          </div>
          <div className="form-row">
            <div className="form-group col-md-12">
              <label htmlFor="description" className="text-danger"><h6>Description/Reason</h6></label>
              <textarea className="form-control" id="description" value={localSvcDetails?.reasonforReq} disabled ></textarea>
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
                  <input className="form-check-input" type="checkbox" defaultChecked={localSvcDetails?.checkIn ? 'Y' : 'N'} value={localSvcDetails?.checkOut} id="checkout" disabled />
                </div>
                <label htmlFor="checkin" className="col-sm-3 col-form-label text-danger"><h6>Check In</h6></label>
                <div className="form-check col-sm-3">
                  <input className="form-check-input" type="checkbox" defaultChecked={localSvcDetails?.checkIn ? 'Y' : 'N'} value={localSvcDetails?.checkIn} id="checkin" disabled />
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
                <label htmlFor="devmger" className="col-sm-3 col-form-label text-danger"><h6>Development Manager </h6></label>
                <div className="form-check col-sm-3" >
                  <select id="devmger" className="form-control" value={devmger} onChange={e => handleChange(e)}>                  
                    {devManager.map((m,index) => <option key={m.userId} value={m.userId}>{m.username}</option>)}
                  </select>
                  
                </div>
              </div>
            </div>
          </div>
          <div className="form-group row">
            <label htmlFor="requestStatus" className="col-sm-2 col-form-label text-danger "><h6>Request Status</h6></label>
            <div className="col-sm-4">
              <span style={localSvcDetails?.requestStatus === 'REJ' ? spanstylered : spanstylegreen}>{localSvcDetails?.requestStatus}</span>
            </div>
          </div>
          <div className="form-group">
            <button type="button" className="btn btn-lg btn-danger"  >Back</button> &nbsp;&nbsp;
            <button type="submit" className="btn btn-dark btn-lg" >Update</button>
          </div>
          </>):(<div>Loading</div>)
          }

        </form>



      </div>
    </div>
  )
}
//}

export default SvcUpdate