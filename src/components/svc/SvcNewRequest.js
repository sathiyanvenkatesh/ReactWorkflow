import React, { useState } from 'react'
import { createNewSvcRequest,svcsSelector} from "../../redux-sclice/SvcSclice";
import {useDispatch, useSelector} from 'react-redux';
//import { Redirect } from 'react-router';

import { useHistory } from 'react-router-dom';

import { Container } from 'react-bootstrap';
import { toast} from 'react-toastify';
//import 'react-toastify/dist/ReactToastify.css';

const TOOLS = ['Aldo', 'SVN', 'VSS', 'Git'];
const APPLICATIONSNAME=['EFORMS','GOAML','AECB']
const DEVMANAGER=['Manager1','Manager2']


 function SvcNewRequest () {


const user=localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : null

  const [values, setValues] = useState({ 
    requestId: '', tool: '', requestorName: user.name, requestDate: '' ,applicationName:'',version:'',durationFrom:'',durationTo:'',
    reasonforReq:'',checkOut:"N",checkIn:"N",unitManger:'',checkInReq:"N",deployment:"N",emergencyCheck:"Y",fromArchive:"N",getLatest:"Y",
    toOtherEnv:"N",userId:user.name
  });

     const dispatch = useDispatch(); // add dispatch function to dipatch action to reducers and update the store 
     //const navigate1 = useNavigate()
    // toast.configure();
    const history = useHistory();
const {svcaddSucessflag, hasErrors,svcaddresult}=useSelector(svcsSelector)

console.log('svcaddSucessflag'+svcaddSucessflag);

  const set = name => {
    return ({ target: { value } }) => {
      setValues(oldValues => ({...oldValues, [name]: value }));
    }
  };
  const handlecheckinChange =(e)=> {
    let isChecked = e.target.checked?"Y":"N";
    console.log("isChecked"+isChecked);
    values.checkIn=isChecked;
   }
   const handlecheckoutChange =(e)=> {
    let isChecked = e.target.checked?"Y":"N";
    console.log("isChecked"+isChecked);
    values.checkOut=isChecked;
   }

    const handleValidation = (event,values)=>{
      event.preventDefault()
     // alert(values.tools.length);
      let valid=true;
      if(values.tools.length<0){
        valid=false;
        alert('tools can not be empty , please select tools');
      }else if (values.version.length<0){
        valid=false;
        alert('version can not be empty , please fill the version');
      }
      return valid;
    }


    const handleSubmit =event=>{
      //alert('clicked');
      event.preventDefault();
      console.log("Create New Requet clicked ");      
       if(handleValidation){
      dispatch(createNewSvcRequest(JSON.stringify(values)) )
       }

    }
    if(svcaddSucessflag && !hasErrors && svcaddresult!==''){
     console.log('svcaddresult response'+JSON.stringify(svcaddresult));
    // <Redirect to='/updatesvc/1000'/>
  /*  toast.success("SVC Request Created Successfully"+JSON.stringify(svcaddresult),{
      position: "top-center",
      autoClose: 5000,
      hideProgressBar: true,
      closeOnClick: true,
      draggablePercent:80
      
     });*/
      history.push('/updatesvc/'+JSON.stringify(svcaddresult));
    // alert("SVC Added Successfully");
    
     //<ToastContainer/>
     

    // navigate1.navigate('/updatesvc/'+row.requestid)
    }
    if(!svcaddSucessflag && hasErrors){
      toast.error("Error in Saving Request !",{
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        
      });
    }
    //render() {
        return (
          <Container>
            
    
            <h2>SVC Access Request Form</h2>
       <div>
        <form  onSubmit={handleSubmit}>
        <div className="form-group row">
            <label htmlFor="requestId" className="col-sm-2 col-form-label text-danger "><h6>Request ID</h6></label>
            <div className="col-sm-4">
                 <input type="text"  className="form-control" id="requestId"  disabled/>
            </div>
             <label htmlFor="tool" className="col-sm-2 col-form-label text-danger"><h6>Tool</h6></label>
            <div className="col-sm-4">
            <select id="tool" className="form-control" value={values.tool} onChange={set('tool')}  required>
                <option >Select Tool</option>
                {TOOLS.map(t=><option key={t}>{t}</option>)}
             </select>
             </div>
       </div>

       <div className="form-group row">
            <label htmlFor="requestorName" className="col-sm-2 col-form-label text-danger "><h6>Requestor Name</h6></label>
            <div className="col-sm-4">
                 <input type="text"  className="form-control" id="requestorName" placeholder="Requestor Name" value={values.requestorName} onChange={set('requestorName')} required/>
            </div>
             <label htmlFor="requestDate" className="col-sm-2 col-form-label text-danger"><h6>Request Date</h6></label>
            <div className="col-sm-4">
            <input type="date" className="form-control" id="requestDate"  value={values.requestDate} onChange={set('requestDate')} />
             </div>
       </div>

       <div className="form-group row">
            <label htmlFor="applicationname" className="col-sm-2 col-form-label text-danger "><h6>Application Name</h6></label>
            <div className="col-sm-4">
            <select id="applicationName" className="form-control"  value={values.applicationName} onChange={set('applicationName')}>
                              <option >  Select Application   </option>
                              {APPLICATIONSNAME.map(a=> <option key={a}>{a}</option>)}
                              </select>
            </div>
             <label htmlFor="version" className="col-sm-2 col-form-label text-danger"><h6>Version</h6></label>
            <div className="col-sm-4">
            <input type="text" className="form-control" id="version" placeholder="Version"  value={values.version} onChange={set('version')}  required/>
             </div>
       </div>
                 
       <div className="form-group row">
            <label htmlFor="durationFrom" className="col-sm-2 col-form-label text-danger "><h6>Duration From</h6></label>
            <div className="col-sm-4">
            <input type="date" className="form-control" id="durationFrom"  value={values.durationFrom} onChange={set('durationFrom')}  />
            </div>
             <label htmlFor="durationTo" className="col-sm-2 col-form-label text-danger"><h6>Duration To</h6></label>
            <div className="col-sm-4">
            <input type="date" className="form-control" id="durationTo" value={values.durationTo} onChange={set('durationTo')} />
             </div>
       </div>
                
               <div className="form-row">
                        <div className="form-group col-md-12">
                          <label htmlFor="reasonforReq" className="text-danger"><h6>Description/Reason</h6></label>
                          <textarea  className="form-control" id="reasonforReq" placeholder="Description/Reason"  required  value={values.reasonforReq} onChange={set('reasonforReq')}></textarea>
                        </div>
                        
                </div>
                <div className="col-md-12">
                        <div className="panel panel-primary">
                            <div className="panel-heading">
                                    <label htmlFor="accessrights" className="text-danger">   <h3 className="panel-title">Access Rights</h3> </label>                          
                            </div>
                            <div className="panel-body form-group row ">                               
                                             
                                            <label htmlFor="checkOut" className="col-sm-3 col-form-label text-danger"><h6>Check Out </h6></label>
                                            <div className="form-check col-sm-3">
                                              <input className="form-check-input" type="checkbox" id="checkOut" required  value={values.checkOut} onChange={e=>handlecheckoutChange(e)} />  
                                           </div>
                                            <label htmlFor="checkIn" className="col-sm-3 col-form-label text-danger"><h6>Check In</h6></label>
                                            <div className="form-check col-sm-3">
                                              <input className="form-check-input" type="checkbox" id="checkIn" required value={values.checkIn} onChange={e=>handlecheckinChange(e)}/>
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
                                                            {DEVMANAGER.map(m=><option key={m}>{m}</option>)}
                                                      </select>
                                                     
                                               </div> 
                                </div>
                            </div>
                        </div>  
                        <div className="form-group">
                                <button type="submit" className="btn btn-lg btn-danger"   >Submit</button> &nbsp;&nbsp;
                                <button type="button" className="btn btn-danger btn-lg" >Reset</button>  
                                                
                            </div> 
    
        </form>
    
        
    
       </div>     
     
     </Container>    
        )
   /// }
}

export default SvcNewRequest