import React, { useEffect, useState } from 'react'
import { createNewSvcRequest, svcsSelector } from "../../redux-sclice/SvcSclice";
import { paramSelector,fetchDevManagers,fetchTools,fetchApplicationsNames} from "../../redux-sclice/ParamsSlice";
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { getOpen,setAlertBox } from '../../redux-sclice/popupwindow';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import addDays from 'date-fns/addDays';


const TOOLS = ['Aldo', 'SVN', 'VSS', 'Git'];
// const APPLICATIONSNAME = ['EFORMS', 'GOAML', 'AECB','RRC','CBWS']
//const DEVMANAGER = ['Manager1', 'Manager2']
const DEVMANAGER = [{"userid":'mbshetty',"username":"Mallika Shetty"},{ "userid":"apillai","username":"Ajit Pillai"},{"userid":"vsathiya","username":"Sathiyan Venkatesh"}]


function SvcNewRequest() {
  const user = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : null
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(addDays(new Date(),30));
  const [reqDate,setReqDate]=useState(new Date());
  const [values, setValues] = useState({
    requestId: '', tool: '', requestorName: user.name, requestDate:reqDate, applicationName: '', version: '', durationFrom:startDate , durationTo:endDate ,
    reasonforReq: '', checkOut: "N", checkIn: "N", unitManger: '', checkInReq: "N", deployment: "N", emergencyCheck: "Y", fromArchive: "N", getLatest: "Y",
    toOtherEnv: "N", userId: user.name
  });

  const initialValue = [
    {
      active: true,
      branch: "705",
      createUser: "amobaid",
      createdate: "2010-04-10T08:56:01.653+0000",
      deptCode: "BANK",
      designation: "",
      email_alerts: "YES",
      emailid: "mbshetty@rakbanktst.ae",
      locked: 0,
      modifyDate: "2010-12-14T04:23:09.783+0000",
      modifyUser: "amobaid",
      userId: "apillai",
      username: "Ajit Kumar Pillai"
    }
  ];

  const appInitialValue = [
    {
      appCode: "AAS",
      appDesc: "Advance Against Salary",
      checkerDate: "2014-07-09T07:21:48.690+0000",
      checkerId: "SYSTEM",
      makerDate: "2014-07-09T07:21:48.690+0000",
      makerId: "SYSTEM",
      requestId: 0
    }
  ];


  const [application,setApplication] = useState(appInitialValue);
  const [devManager,setDevManager] = useState(initialValue);
  const dispatch = useDispatch(); // add dispatch function to dipatch action to reducers and update the store   
  const history = useHistory();
  const { svcaddSucessflag, hasErrors, svcaddresult } = useSelector(svcsSelector);
  
  useEffect(() => {
    (async function() {
      try {
        const response = await fetch('https://conv.rakbankonline.ae/eida/svc-local/api/v1/approvals/SVC_UDM')
        const result = await response.json();
        setDevManager(result);
      } catch (e) {
        console.error(e);
      }
    })();
  }, []);

  useEffect(() => {
    (async function() {
      try {
        const response = await fetch('https://conv.rakbankonline.ae/eida/svc-local/api/v1/applications')
        const result = await response.json();
        setApplication(result);
      } catch (e) {
        console.error(e);
      }
    })();
  }, [])

  

const fetchSVCPaamDetails = async() => {
  console.log('inside param methos' );
  //dispatch(fetchDevManagers());
  //dispatch(fetchTools());
  //dispatch(fetchApplicationsNames());  
    const response = await fetch('https://conv.rakbankonline.ae/eida/svc-local/api/v1/approvals/SVC_UDM')
    const data = await response.json()
       // console.log(data);
   // setDevManager(data);
   return data
}
   
  
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
       const payload = {type:"success",headerText:"Info",bodyText:"SVC Request Created Successfully" + JSON.stringify(svcaddresult),saveButton:false};
       dispatch(setAlertBox(payload))
       dispatch(getOpen());

    history.push('/updatesvc/' + JSON.stringify(svcaddresult));
    // alert("SVC Added Successfully");
    //<ToastContainer/>
    // navigate1.navigate('/updatesvc/'+row.requestid)
  }
  if (!svcaddSucessflag && hasErrors) {
   
    const payload = {type:"Error",headerText:"Info",bodyText:"Error in creating SVC Request ",saveButton:false};
    dispatch(setAlertBox(payload))
    dispatch(getOpen());
  }
  //render() {
  return (
    <div className="container">
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
           { /*<input type="date" className="form-control-md big-checkbox" id="requestDate" value={values.requestDate} onChange={set('requestDate')} />*/}
            <DatePicker className="form-control" selected={reqDate} dateFormat="dd/MM/yyyy"  value={values.requestDate} minDate={new Date()} maxDate={new Date()}  disabled />
          </div>
        </div>

        <div className="form-group row">
          <label htmlFor="applicationname" className="col-sm-2 col-form-label text-danger ">Application Name</label>
          <div className="col-sm-4">
          {/* TO DO LIST  */}
            <select id="applicationName" className="form-control" value={values.applicationName} onChange={set('applicationName')}>
              <option >  Select Application   </option>
              {application.map(item => <option key={item.appCode}>{item.appDesc}</option>)}
            </select>
          </div>
          <label htmlFor="version" className="col-sm-2 col-form-label text-danger">Version</label>
          <div className="col-sm-4">
            <input type="text" className="form-control" id="version" placeholder="Version" value={values.version} onChange={set('version')} required  autoComplete="off"/>
          </div>
        </div>

        <div className="form-group row">
          <label htmlFor="durationFrom" className="col-sm-2 col-form-label text-danger ">Duration From</label>
          <div className="col-sm-4">
            {/*<input type="date" className="form-control" id="durationFrom" value={values.durationFrom} onChange={set('durationFrom')} />*/}
            <DatePicker className="form-control" selected={startDate} dateFormat="dd/MM/yyyy"  value={values.durationFrom} minDate={new Date()} maxDate={new Date()}  onChange={(date) =>setStartDate(date)} />
          </div>
          <label htmlFor="durationTo" className="col-sm-2 col-form-label text-danger">Duration To</label>
          <div className="col-sm-4">
            {/*<input type="date" className="form-control" id="durationTo" value={values.durationTo} onChange={set('durationTo')} />*/}
            <DatePicker className="form-control" selected={endDate} dateFormat="dd/MM/yyyy"  value={values.durationTo} minDate={new Date()} maxDate={addDays(new Date(),30)} onChange={(date) =>setEndDate(date)} />
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
              <div className="form-check p-0">
                <label className="form-check-label text-danger" htmlFor="checkOut">Check Out</label>
                <input type="checkbox" className="form-check-input ml-2 p-2" id="checkOut" required value={values.checkOut} onChange={e => handlecheckoutChange(e)} />
              </div>
            </div>
            <div className="ml-4">
              <div className="form-check p-0">
                <label className="form-check-label text-danger" htmlFor="checkIn">Check In</label>
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
              {/* TO DO LIst */}
              <select id="unitManger" className="form-control" value={values.unitManger} onChange={set('unitManger')} >
                <option >Select Dev Manager </option>
                {devManager.map(m => <option key={m.userid} value={m.userid}>{m.username}</option>)}
              </select>
            </div>
          </div>
        </div>
        <div className="form-group ">
          <button type="reset" className="btn btn-md btn-danger"  >Reset</button> &nbsp;&nbsp;
          <button type="submit" className="btn btn-primary btn-md" >Submit</button>
        </div>
        <br/>
      </form>
    </div>
  )
  /// }
}

export default SvcNewRequest