import React, { useState } from 'react'
import { createNewSvcRequest, svcsSelector } from "../../redux-sclice/SvcSclice";
import { useDispatch, useSelector } from 'react-redux';
//import { Redirect } from 'react-router';

import { useHistory } from 'react-router-dom';

import { Container } from 'react-bootstrap';
import { toast } from 'react-toastify';
//import 'react-toastify/dist/ReactToastify.css';

const TOOLS = ['Aldo', 'SVN', 'VSS', 'Git'];
const APPLICATIONSNAME = ['EFORMS', 'GOAML', 'AECB']
const DEVMANAGER = ['Manager1', 'Manager2']


function SvcNewRequest() {


  const user = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : null

  const [values, setValues] = useState({
    requestId: '', tool: '', requestorName: user.name, requestDate: '', applicationName: '', version: '', durationFrom: '', durationTo: '',
    reasonforReq: '', checkOut: "N", checkIn: "N", unitManger: '', checkInReq: "N", deployment: "N", emergencyCheck: "Y", fromArchive: "N", getLatest: "Y",
    toOtherEnv: "N", userId: user.name
  });

  const dispatch = useDispatch(); // add dispatch function to dipatch action to reducers and update the store 
  //const navigate1 = useNavigate()
  // toast.configure();
  const history = useHistory();
  const { svcaddSucessflag, hasErrors, svcaddresult } = useSelector(svcsSelector)

  console.log('svcaddSucessflag' + svcaddSucessflag);

  const set = name => {
    return ({ target: { value } }) => {
      setValues(oldValues => ({ ...oldValues, [name]: value }));
    }
  };
  const handlecheckinChange = (e) => {
    let isChecked = e.target.checked ? "Y" : "N";
    console.log("isChecked" + isChecked);
    values.checkIn = isChecked;
  }
  const handlecheckoutChange = (e) => {
    let isChecked = e.target.checked ? "Y" : "N";
    console.log("isChecked" + isChecked);
    values.checkOut = isChecked;
  }

  const handleValidation = (event, values) => {
    event.preventDefault()
    // alert(values.tools.length);
    let valid = true;
    if (values.tools.length < 0) {
      valid = false;
      alert('tools can not be empty , please select tools');
    } else if (values.version.length < 0) {
      valid = false;
      alert('version can not be empty , please fill the version');
    }
    return valid;
  }


  const handleSubmit = event => {
    //alert('clicked');
    event.preventDefault();
    console.log("Create New Requet clicked ");
    if (handleValidation) {
      dispatch(createNewSvcRequest(JSON.stringify(values)))
    }

  }
  if (svcaddSucessflag && !hasErrors && svcaddresult !== '') {
    console.log('svcaddresult response' + JSON.stringify(svcaddresult));
    // <Redirect to='/updatesvc/1000'/>
    /*  toast.success("SVC Request Created Successfully"+JSON.stringify(svcaddresult),{
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: true,
        closeOnClick: true,
        draggablePercent:80
        
       });*/
    history.push('/updatesvc/' + JSON.stringify(svcaddresult));
    // alert("SVC Added Successfully");

    //<ToastContainer/>


    // navigate1.navigate('/updatesvc/'+row.requestid)
  }
  if (!svcaddSucessflag && hasErrors) {
    toast.error("Error in Saving Request !", {
      position: "top-center",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,

    });
  }
  //render() {
  return (
    <div className="container margin-left-right">
      <h5 className="font-weight-bold">SVC Access Request Form</h5>
      <form onSubmit={handleSubmit}>
        <div className="form-group row">
          <label htmlFor="requestId" className="col-sm-2 col-form-label text-danger ">Request ID</label>
          <div className="col-sm-4">
            <input type="text" className="form-control" id="requestId" disabled />
          </div>
          <label htmlFor="tool" className="col-sm-2 col-form-label text-danger">Tool</label>
          <div className="col-sm-4">
            <select id="tool" className="form-control" value={values.tool} onChange={set('tool')} required>
              <option >Select Tool</option>
              {TOOLS.map(t => <option key={t}>{t}</option>)}
            </select>
          </div>
        </div>

        <div className="form-group row">
          <label htmlFor="requestorName" className="col-sm-2 col-form-label text-danger ">Requestor Name</label>
          <div className="col-sm-4">
            <input type="text" className="form-control big-checkbox" id="requestorName" placeholder="Requestor Name" value={values.requestorName} onChange={set('requestorName')} required />
          </div>
          <label htmlFor="requestDate" className="col-sm-2 col-form-label text-danger">Request Date</label>
          <div className="col-sm-4">
            <input type="date" className="form-control-md big-checkbox" id="requestDate" value={values.requestDate} onChange={set('requestDate')} />
          </div>
        </div>

        <div className="form-group row">
          <label htmlFor="applicationname" className="col-sm-2 col-form-label text-danger ">Application Name</label>
          <div className="col-sm-4">
            <select id="applicationName" className="form-control" value={values.applicationName} onChange={set('applicationName')}>
              <option >  Select Application   </option>
              {APPLICATIONSNAME.map(a => <option key={a}>{a}</option>)}
            </select>
          </div>
          <label htmlFor="version" className="col-sm-2 col-form-label text-danger">Version</label>
          <div className="col-sm-4">
            <input type="text" className="form-control" id="version" placeholder="Version" value={values.version} onChange={set('version')} required />
          </div>
        </div>

        <div className="form-group row">
          <label htmlFor="durationFrom" className="col-sm-2 col-form-label text-danger ">Duration From</label>
          <div className="col-sm-4">
            <input type="date" className="form-control" id="durationFrom" value={values.durationFrom} onChange={set('durationFrom')} />
          </div>
          <label htmlFor="durationTo" className="col-sm-2 col-form-label text-danger">Duration To</label>
          <div className="col-sm-4">
            <input type="date" className="form-control" id="durationTo" value={values.durationTo} onChange={set('durationTo')} />
          </div>
        </div>

        <div className="form-row">
          <div className="form-group col-md-12">
            <label htmlFor="reasonforReq" className="text-danger">Description/Reason</label>
            <textarea className="form-control" id="reasonforReq" placeholder="Description/Reason" required value={values.reasonforReq} onChange={set('reasonforReq')}></textarea>
          </div>

        </div>
        <div className="col-md-12 p-0">
          <h5 className="font-weight-bold">Access Rights</h5>
          <div className="col-md-4 form-inline p-0">
            <div >
              <div class="form-check p-0">
                <label class="form-check-label text-danger" for="checkOut">Check Out</label>
                <input type="checkbox" className="form-check-input ml-2 p-2" id="checkOut" required value={values.checkOut} onChange={e => handlecheckoutChange(e)} />
              </div>
            </div>
            <div className="ml-4">
              <div class="form-check p-0">
                <label class="form-check-label text-danger" for="checkIn">Check In</label>
                <input type="checkbox" className="form-check-input ml-2 p-2" id="checkIn" required value={values.checkIn} onChange={e => handlecheckinChange(e)} />
              </div>
            </div>
          </div>
        </div>

        <div className="col-md-12 p-0 mt-2">
          <h5 className="font-weight-bold">Approvals</h5>
          <div className="form-group row">
            <label htmlFor="unitManger" className="col-sm-4 col-form-label text-danger">Development Manager</label>
            <div className="form-check col-sm-4">
              <select id="unitManger" className="form-control" value={values.unitManger} onChange={set('unitManger')} >
                <option >Select Dev Manager </option>
                {DEVMANAGER.map(m => <option key={m}>{m}</option>)}
              </select>
            </div>
          </div>
        </div>
        <div className="form-group ">
          <button type="button" className="btn btn-md btn-danger"  >Reset</button> &nbsp;&nbsp;
          <button type="submit" className="btn btn-primary btn-md" >Submit</button>
        </div>
        <br/>
      </form>
    </div>
  )
  /// }
}

export default SvcNewRequest