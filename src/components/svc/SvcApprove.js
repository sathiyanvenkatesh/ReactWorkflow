import React, { useState, useEffect } from 'react'
import { getSVCbyId, svcsSelector } from "../../redux-sclice/SvcSclice";
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom'
import { getOpen,setAlertBox } from '../../redux-sclice/popupwindow'


function SvcApprove() {


  //const user=localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : null
  const { id } = useParams();
  console.log("id" + id);
  const dispatch = useDispatch(); // add dispatch function to dipatch action to reducers and update the store 
  const { svcDetails/*,hasErrors*/ } = useSelector(svcsSelector)
  useEffect(() => {
    //dispatch(getSVCbyId(id) )
    fetchSVCDetailsById()

  }, []);

  const fetchSVCDetailsById = () => {
    dispatch(getSVCbyId(id))
  }

  console.log("svcDetails in update page " + JSON.stringify(svcDetails));
  console.log(svcDetails.tool);
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
    event.preventDefault();
    const payload = {type:"success",headerText:"Message",bodyText:"Validation check",saveButton:false};
    dispatch(setAlertBox(payload))
    dispatch(getOpen());
    //event.preventDefault();
    //if(handleValidation){
    // dispatch(createNewSvcRequest(JSON.stringify(values)) )
    // }
  }


  //render() {
  return (
    <div className="container margin-left-right  pb-2" style={contaierstyle}>
      <h5 className="font-weight-bold">SVC Access Request Update Form</h5>
        <form onSubmit={handleSubmit}>
          <div className="form-group row p-0 mb-3">
            <label htmlFor="requestid" className="col-sm-2 col-form-label text-danger "><h6>Request ID</h6></label>
            <div className="col-sm-4">
              <input type="text" className="form-control" id="requestid" value={svcDetails.requestId} disabled />
            </div>
            <label htmlFor="tools" className="col-sm-2 col-form-label text-danger"><h6>Tool</h6></label>
            <div className="col-sm-4">
              <input type="text" className="form-control" id="requestid" value={svcDetails.tool} disabled />
            </div>
          </div>

          <div className="form-group row p-0 mb-3">
            <label htmlFor="requestorname" className="col-sm-2 col-form-label text-danger "><h6>Requestor Name</h6></label>
            <div className="col-sm-4">
              <input type="text" className="form-control" id="requestorname" value={svcDetails.requestorName} disabled />
            </div>
            <label htmlFor="requestdate" className="col-sm-2 col-form-label text-danger"><h6>Request Date</h6></label>
            <div className="col-sm-4">
              <input type="text" className="form-control" id="requestdate" value={svcDetails.requestDate} disabled />
            </div>
          </div>

          <div className="form-group row p-0 mb-3">
            <label htmlFor="applicationname" className="col-sm-2 col-form-label text-danger "><h6>Application Name</h6></label>
            <div className="col-sm-4">
              <input type="text" className="form-control" id="applicationname" value={svcDetails.applicationName} disabled />
            </div>
            <label htmlFor="version" className="col-sm-2 col-form-label text-danger"><h6>Version</h6></label>
            <div className="col-sm-4">
              <input type="text" className="form-control" id="version" value={svcDetails.version} disabled />
            </div>
          </div>

          <div className="form-group row p-0 mb-3">
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
          <div className="col-md-12 p-0 mb-2">
            <h5 className="font-weight-bold">Access Rights</h5>
            <div className="col-md-4 form-inline p-0">
              <div >
                <div class="form-check p-0">
                  <label class="form-check-label text-danger" for="checkOut">Check Out</label>
                  <input className="form-check-input ml-2 p-2" type="checkbox" defaultChecked={svcDetails.checkIn?'Y':'N'} value={svcDetails.checkOut} id="checkOut" disabled />  
                </div>
              </div>
              <div className="ml-4">
                <div class="form-check p-0">
                  <label class="form-check-label text-danger" for="checkIn">Check In</label>
                  <input className="form-check-input ml-2 p-2" type="checkbox" defaultChecked={svcDetails.checkIn?'Y':'N'}  value={svcDetails.checkIn} id="checkIn" disabled />
                </div>
              </div>
            </div>
          </div>

          <div className="col-md-12 p-0 mt-2">
             <h5 className="font-weight-bold">Approvals</h5>
             <div className="form-group row p-0 mb-3">
              <label htmlFor="devmgr" className="col-sm-2 col-form-label text-danger">Development Manager</label>
              <div className="form-check col-sm-4">
                <input type="text" className="form-control" id="devmgr" value={svcDetails.unitManger} disabled />
              </div>
            </div>

            <div className="form-group row p-0 mb-3">
              <label htmlFor="devmgr" className="col-sm-2 col-form-label text-danger">Approved</label>
              <div className="form-check col-sm-4">
              <input className="form-radio-input mr-1" type="radio" value="Y" checked={svcDetails.unitManagerApprival === 'ok'} id="approved" name="appstatus" />   <span>Yes</span>
                    <input className="form-radio-input ml-2 mr-1" type="radio" value="N" checked={svcDetails.unitManagerApprival !== 'ok'} id="rejected" name="appstatus" /> <span>No</span>
              </div>
            </div>

            <div className="form-group row p-0 mb-3">
              <label htmlFor="devmgr" className="col-sm-2 col-form-label text-danger">Risk Assurance Review</label>
              <div className="form-check col-sm-4">
                <input type="text" className="form-control" id="rarmgr" value={svcDetails.rarId} disabled />
              </div>
            </div>

            <div className="form-group row p-0 mb-3">
              <label htmlFor="devmgr" className="col-sm-2 col-form-label text-danger">Reviewed</label>
              <div className="form-check col-sm-4 d-flex align-items-center">
              <input className="form-radio-input mr-1" type="radio" value="Y" checked={svcDetails.rarApproval === 'ok'} id="approved" name="rarstatus" />  <span>Yes</span>
              <input className="form-radio-input ml-2 mr-1" type="radio" value="N" checked={svcDetails.rarApproval !== 'ok'} id="rejected" name="rarstatus" /> <span>No</span>
              </div>
            </div>

            <div className="form-group row p-0 mb-3">
              <label htmlFor="devmgr" className="col-sm-2 col-form-label text-danger">Access Provider</label>
              <div className="form-check col-sm-4">
                <input type="text" className="form-control" id="rarmgr" value={svcDetails.accessProvider} disabled />
              </div>
            </div>
          </div>

          <div className="form-group row p-0 mb-3">
              <label htmlFor="devmgr" className="col-sm-2 col-form-label text-danger">Approved</label>
              <div className="form-check col-sm-4 d-flex align-items-center">
              <input className="form-radio-input mr-1" type="radio" value="Y" checked={svcDetails.accessProviderApproval === 'ok'} id="approved" name="accstatus" /> <span>Yes</span>
              <input className="form-radio-input ml-2 mr-1" type="radio" value="N" checked={svcDetails.accessProviderApproval !== 'ok'} id="rejected" name="accstatus" /><span>No</span>

              </div>
            </div>
         
        
          <div className="form-row">
            <div className="form-group col-md-12 ">
              <label htmlFor="remarks" className="text-danger"><h6>All Remarks</h6></label>
              <textarea className="form-control" id="remaks" value={svcDetails.allRemarks}  ></textarea>
            </div>

          </div>






          <div className="form-group row p-0 mb-3">
            <label htmlFor="requestStatus" className="col-sm-2 col-form-label text-danger "><h6>Request Status</h6></label>
            <div className="col-sm-4">
              <span style={svcDetails.requestStatus === 'REJ' ? spanstylered : spanstylegreen}>{svcDetails.requestStatus}</span>
            </div>
          </div>


          <div className="form-group mb-4">
          <button type="button" className="btn btn-md btn-danger"  >Reset</button> &nbsp;&nbsp;
          <button type="submit" className="btn btn-primary btn-md" >Submit</button>
        </div>
        </form>
    </div>
  )
}
//}

export default SvcApprove