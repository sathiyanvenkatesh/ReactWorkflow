import React, { useState } from 'react'
//import { fetchSvcs, svcsSelector } from "../../redux-sclice/SvcSclice";
import {fetchSvcs,svcSearchSelector  } from "../../redux-sclice/SvcSearchSlice";
import { useDispatch, useSelector } from 'react-redux';
import SvcsearchResultsDataTable from './SvcsearchResultsDataTable';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import addDays from 'date-fns/addDays';



const RAISEDBY = ['Venkatesh', 'Sinu', 'mbshetty', 'sathiyan']
const REQUESTSTATUS = ['CLS', 'SUB', 'inprogress']

function SvcEnquiry() {

  const user = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : null

  const [ tableview, showTable ] = useState(false);
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(addDays(new Date(),30));
  const [values, setValues] = useState({
    userid: user.name, reqid: '', reqStatus: '', fromdate: ''/*startDate*/, todate: ''/*endDate*/, raisedby: '', showall: false
  });



  const set = name => {
    return ({ target: { value } }) => {
      setValues(oldValues => ({ ...oldValues, [name]: value }));
    }
  };

  const handleChange = (e) => {
    let isChecked = e.target.checked;
    console.log("isChecked" + isChecked);
    values.showall = isChecked;
  }

  const dispatch = useDispatch(); // add dispatch function to dipatch action to reducers and update the store 

  const { loading, hasErrors/*,svclist*/ } = useSelector(svcSearchSelector)


  const handleSubmit = event => {
    //alert('enquiry buttonclicked');
    showTable(true);
    event.preventDefault();
    console.log("Enquiry  Requet clicked ");
    dispatch(fetchSvcs(JSON.stringify(values)))

  }

  const resetForm = () => {
    showTable(false);
    values.reqid='';
  }
  //if(loading && hasErrors){

  //console.log("svclist"+JSON.stringify(svclist))
  const renderSvcList = () => {
    if (loading) return <p>Loading SvcList...</p>
    if (hasErrors) return <p>No record found!</p>

    /// if(svclist.length>0)
    return <SvcsearchResultsDataTable></SvcsearchResultsDataTable>
  }

  //}


  //render() {
  return (
    <div className="container">

      <h5 className="font-weight-bold">SVC Enquiry</h5>
      <form onSubmit={handleSubmit}>
        <div className="form-group row">
          <label htmlFor="userid" className="col-sm-2 col-form-label text-danger">User Id:</label>
          <div className="col-sm-10">
            <input name="name" type="text" className="form-control-plaintext" disabled value={values.userid} onChange={set('userid')} />
          </div>
        </div>

        <div className="form-group row">
          <label htmlFor="reqid" className="col-sm-2 col-form-label text-danger ">
            Request ID:
          </label>
          <div className="col-sm-3">
            <input type="text" className="form-control" id="reqid" placeholder="Request ID" value={values.requestid} onChange={set('reqid')} autoComplete="off" />
          </div>
          <label htmlFor="reqStatus" className="col-sm-2 col-form-label text-danger"><h6>Request Status:</h6></label>
          <div className="col-sm-3">
            <select id="reqStatus" className="form-control" name="reqStatus" value={values.requeststatus} onChange={set('reqStatus')}>
              <option >Select Status</option>
              {REQUESTSTATUS.map(s => <option key={s} value={s}>{s}</option>)}
            </select>
          </div>
        </div>

        <div className="form-group row">
          <label htmlFor="fromdate" className="col-sm-2 col-form-label text-danger ">From Date:</label>
          <div className="col-sm-3">
         {/* <DatePicker className="form-control" selected={startDate} dateFormat="dd/MM/yyyy"  value={values.fromdate} onChange={(date) =>setStartDate(date)} />*/}
           <input type="date" className="form-control" id="fromdate" placeholder="FromDate" value={values.fromdate} onChange={set('fromdate')} />
          </div>
          <label htmlFor="todate" className="col-sm-2 col-form-label text-danger">To Date:</label>
          <div className="col-sm-3">
         {/*  <DatePicker className="form-control" selected={endDate} dateFormat="dd/MM/yyyy"  value={values.todate} minDate={new Date()} maxDate={addDays(new Date(),30)} onChange={(date) =>setEndDate(date)} />*/}
           <input type="date" className="form-control" id="todate" placeholder="Todate" value={values.todate} onChange={set('todate')} />
          </div>
        </div>

        <div className="form-group row">
          <label htmlFor="raisedby" className="col-sm-2 col-form-label text-danger">SVC Raised By:</label>
          <div className="col-sm-3">
            {/*<input name="raisedby" type="text" className="form-control" placeholder="Raised By"  />*/}
            <select id="raisedby" className="form-control" name="raisedby" value={values.raisedby} onChange={set('raisedby')} >
              <option > Select RaisedBy  </option>
              {RAISEDBY.map(r => <option key={r} value={r}>{r}</option>)}

            </select>
          </div>
        </div>

        <div className="form-group row">
          <label htmlFor="showall" className="col-sm-2 col-form-label text-danger"><h6>Show All </h6></label>
          <div className="col-sm-10 d-flex align-items-center">
            <input className="mr-2" type="checkbox" id="gridCheck" name="showall" value={values.showall} onChange={e => handleChange(e)}/*onChange={set('showall')}*/ />
            <label className="m-0" htmlFor="gridCheck">
              *If not selected , only SVCs that require your approval are displayed.
            </label>
          </div>
        </div>


        <div className="form-group">
          <button type="button" className="btn btn-md btn-danger" onClick={resetForm} >Reset</button> &nbsp;&nbsp;
          <button type="submit" className="btn btn-dark btn-md" >Search</button>
        </div>
      </form>
      <div >
        {tableview && renderSvcList()}
      </div>

    </div>
  )
  // }
}

export default SvcEnquiry