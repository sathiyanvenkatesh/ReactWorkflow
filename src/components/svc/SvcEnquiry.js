import React, { useState } from 'react'
import { fetchSvcs, svcsSelector } from "../../redux-sclice/SvcSclice";
import { useDispatch, useSelector } from 'react-redux';
import SvcsearchResultsDataTable from './SvcsearchResultsDataTable';

const RAISEDBY = ['Venkatesh', 'Sinu', 'malika', 'sathiyan']
const REQUESTSTATUS = ['closed', 'open', 'inprogress']


function SvcEnquiry() {

  const user = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : null
  const [ tableview, showTable ] = useState(0);
  const [values, setValues] = useState({
    userid: user.name, reqid: '', reqStatus: '', fromdate: '', todate: '', raisedby: '', showall: false
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

  const { loading, hasErrors/*,svclist*/ } = useSelector(svcsSelector)


  const handleSubmit = event => {
    //alert('enquiry buttonclicked');
    showTable(true);
    event.preventDefault();
    console.log("Enquiry  Requet clicked ");
    dispatch(fetchSvcs(JSON.stringify(values)))

  }

  const resetForm = () => {
    showTable(false);
  }
  //if(loading && hasErrors){

  //console.log("svclist"+JSON.stringify(svclist))
  const renderSvcList = () => {
    if (loading) return <p>Loading SvcList...</p>
    if (hasErrors) return <p>Cannot display SvcList...</p>

    /// if(svclist.length>0)
    return <SvcsearchResultsDataTable></SvcsearchResultsDataTable>
  }

  const contaierstyle = {
    maxWidth: "1500px"
  }
  //}


  //render() {
  return (
    <div className="container margin-left-right" style={contaierstyle}>

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
            <input type="text" className="form-control" id="reqid" placeholder="Request ID" value={values.requestid} onChange={set('reqid')} />
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
            <input type="date" className="form-control" id="fromdate" placeholder="FromDate" value={values.fromdate} onChange={set('fromdate')} />
          </div>
          <label htmlFor="todate" className="col-sm-2 col-form-label text-danger">To Date:</label>
          <div className="col-sm-3">
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
          <div className="form-check">
            <input className="form-check-input" type="checkbox" id="gridCheck" name="showall" value={values.showall} onChange={e => handleChange(e)}/*onChange={set('showall')}*/ />
            <label className="form-check-label" htmlFor="gridCheck">
              *If not selected , only SVCs that require your approval are displayed.
            </label>
          </div>
        </div>


        <div className="form-group">
          <button type="button" className="btn btn-md btn-danger" onClick={resetForm} >Reset</button> &nbsp;&nbsp;
          <button type="submit" className="btn btn-primary btn-md" >Search</button>
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