import React,{useState,useEffect}  from 'react'
import DataTable  from "react-data-table-component";
import {approveORrejectFailure} from "../../redux-sclice/SvcSclice";
import { svcSearchSelector,fetchSvcs } from "../../redux-sclice/SvcSearchSlice";
import axios from 'axios';

import Button from "react-bootstrap/Button";
import { useDispatch,useSelector} from 'react-redux';
import { getOpen,setAlertBox } from '../../redux-sclice/popupwindow';
import moment from 'moment';




const ActionComponent = ({  row, onClick  }) => {
  const clickHandler = () => onClick(row);
  return row.requestStatus==='SUB'?<Button type="button" className="btn-sm btn-success" onClick={clickHandler}>Approve</Button>:"";
};


const ActionLinkComponent =({row,onClick}) => {
const clickLinkHandler = () => onClick(row);
 // console.log(row);
  return <a  href={'/approvesvc/'+row.requestid }  onClick={clickLinkHandler}>{row.requestid}</a>
};

const  handleLinkAction =(row)=>{
  console.log(row);
}
const customStyles = {
  heading:{
    style: { 
      minHeight:"35px",
      fontSize:"14px"
    }
  },
  title:{
    style:{
      fontSize:"14px"
    }
  },
  text: {
    primary: '#268bd2',
    secondary: '#2aa198',
  },
  rows: {
    style: {
        minHeight: '35px', // override the row height
    },
},
  headRow: {
    style: {
      backgroundColor: '#343a40',// override the row height
      minHeight:"35px",
      height:"10px"
    }
  } ,
  headCells: {
      style:{
          color:'#f8f9fa',
          fontSize:'16px'
      }
  }
};


 function  SvcsearchResultsDataTable () {

 // let rowValue = '';
  const [rowValue,setRowValue]=useState(null);
  const [update,setUpdate] = useState(0);
  //const {svclist,svcapproveDetails}=useSelector(svcsSelector)
  const {svclist} = useSelector(svcSearchSelector)
  const dispatch = useDispatch(); // add dispatch function to dipatch action to reducers and update the store
  const user = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : null
  const userid="apillai";
  const [values, setValues] = useState({
    userid: user.name, reqid: '', reqStatus: '', fromdate: '', todate: '', raisedby: '', showall: false
  });

  const set = name => {
    return ({ target: { value } }) => {
      setValues(oldValues => ({ ...oldValues, [name]: value }));
    }
  };
  function getDescription(text){
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

  useEffect(() => {
    console.log("update")
    // dispatch(approveOrRejectSVCRequest(rowValue,"apillai"));
    if(update!==0&& rowValue!==null){
    apicallForUserRequest().then( result => {
      console.log(result)
      const payload = {type:"success",headerText:"Message",bodyText:result.data,saveButton:false};
      dispatch(setAlertBox(payload))
      dispatch(getOpen());
      dispatch(fetchSvcs(JSON.stringify(values)));     
    },error => {
      dispatch(approveORrejectFailure())
    })
  }

  },[update]);

  const apicallForUserRequest = () => {
    const headers = {
      'Content-Type': 'application/json;charset=UTF-8',
      'Access-Control-Allow-Origin': "*"
    }
    const valuesoption = {
      'approver_Unit_Dev_Mngr': 'Y',
      'remarks': 'ok'
    }

    return axios.post('https://conv.rakbankonline.ae/eida/svc-local/api/v1/svc/approveorrejct/' +rowValue+ '/' +userid, valuesoption, {
      headers: headers
    })
    } 
  

  const handleButtonAction = (row) => {
    console.log(row);
    //rowValue = row;
    setRowValue(row.requestid)
    setUpdate(update+1)
}


     const columns =  [
      {
        cell: row =><ActionLinkComponent row={row} onClick={()=>handleLinkAction(row)}></ActionLinkComponent>,
        name: "Request Id",
        selector: "requestid",
        sortable: true,
        style: {
          fontSize:'18px'
        },
        width:"120px"
      },
      {
        name: "Creator Id",
        selector: "creatorid",
        sortable: true,
        style: {
          fontSize:'18px' 
        },
        width:"120px"
      },
      {
        name: "ReqDate",
        selector: "requestDate",
        cell:row =>moment(row.requestDate).format("DD-MM-YYYY"),
        sortable: true,
        right: true,
        width:"120px"
        
      },
      {
        name: "Status", 
        selector: "requestStatus",
        cell:row=>getDescription(row.requestStatus),
        sortable: true,
        right: false,
        width:"150px"
      },
      {
        name: "Application",
        selector: "applicationName",
        sortable: true,
        right: true,
        width:"150px"
      },
      {
        name:"Action",
       cell: row => <ActionComponent row={row} onClick={() => {handleButtonAction(row)}}>Approve</ActionComponent> ,
        ignoreRowClick: true,
        allowOverflow: true,
        button: true,
        width:"200px"
      }
    ];
  
    return (
      <DataTable
            title="SVC Result Table"
            columns={columns}
            data={svclist}
            pagination
            fixedHeader
            striped
            fixedHeaderScrollHeight="500px"
            customStyles={customStyles}
        />
//     <DataTable
//         columns={columns}
//         data={svclist}
//         defaultSortField="title"
//         pagination
//         customStyles={customStyles}
//         noContextMenu // comment this to show itemas selected as alert at the top of table
//         fixedHeader
//         fixedHeaderScrollHeight="500px"
//  /> 
    
    )
  //}
}

export default SvcsearchResultsDataTable