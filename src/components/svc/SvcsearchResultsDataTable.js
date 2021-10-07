import React  from 'react'
import DataTable  from "react-data-table-component";
import {svcsSelector,approveOrRejectSVCRequest} from "../../redux-sclice/SvcSclice";
import Button from "react-bootstrap/Button";
import { useDispatch,useSelector} from 'react-redux';


const ActionComponent = ({  row, onClick  }) => {
  const clickHandler = () => onClick(row);

 return row.requestStatus==='SUB'?<Button className="btn-danger" onClick={clickHandler}>Approve</Button>:"";
};


const ActionLinkComponent =({row,onClick}) => {
  const clickLinkHandler = () => onClick(row);
 // console.log(row);
  return <a  href={'/approvesvc/'+row.requestid }  onClick={clickLinkHandler}>{row.requestid}</a>
};

const  handleLinkAction =(row)=>{
  console.log(row);
}


/*const columns =  [
    {
      cell: row =><ActionLinkComponent row={row} onClick={()=>handleLinkAction(row)}></ActionLinkComponent>,
      name: "Request Id",
      selector: "requestid",
      sortable: true,
      style: {
        fontSize:'18px'
      },
      width:"200px"
    },
    {
      name: "Creator Id",
      selector: "creatorid",
      sortable: true,
      style: {
        fontSize:'18px' 
      },
      width:"300px"
    },
    {
      name: "Request Date",
      selector: "requestDate",
      sortable: true,
      right: true,
      width:"300px"
    },
    {
      name: "Request Status", 
      selector: "requestStatus",
      sortable: true,
      right: true,
      width:"200px"
    },
    {
      name: "Application Name",
      selector: "applicationName",
      sortable: true,
      right: true,
      width:"250px"
    },
    {
      name:"Action",
      cell: row => <ActionComponent row={row} onClick={()=>HandleButtonAction(row)}>Approve</ActionComponent> ,
      ignoreRowClick: true,
      allowOverflow: true,
      button: true,
      width:"200px"
    }
  ];*/



const customStyles = {
  headRow: {
    style: {
      backgroundColor: '#dc3545'// override the row height
    }
  } ,
  headCells: {
      style:{
          color:'#f8f9fa',
          fontSize:'20px'
      }
  }
};


 function  SvcsearchResultsDataTable () {
  const {svclist,svcapproveDetails}=useSelector(svcsSelector)
  const dispatch = useDispatch(); // add dispatch function to dipatch action to reducers and update the store
  const handleButtonAction =()=> row=> { 
    //alert('Hi');
    console.log(row);  
     dispatch(approveOrRejectSVCRequest(row,"apillai"));
     console.log("svcapproveDetails---"+svcapproveDetails);
    //if(svcapproveDetails!==''){
     alert(svcapproveDetails)
    //}
  }
  if(svcapproveDetails!==''){
    alert(svcapproveDetails)
    }

    
  //render() {
   // const handleOnclickRow =({ selectedRows }) => console.log(selectedRows);
   // const [name, setName] = useState("");
    //const [reqid, setReqid] = useState("");

    //const dispatch = useDispatch();
     //dispatch(approveOrRejectSVCRequest({name:name,reqid:reqid}));
     const columns =  [
      {
        cell: row =><ActionLinkComponent row={row} onClick={()=>handleLinkAction(row)}></ActionLinkComponent>/* {
         
          return (
            <a
              href={row.requestid}
             // target="_blank"
              rel="noopener noreferrer" onClick={handleLinkAction(row)}>
              {row.requestid}
            </a>
          );
        }*/,
        name: "Request Id",
        selector: "requestid",
        sortable: true,
        style: {
          fontSize:'18px'
        },
        width:"200px"
      },
      {
        name: "Creator Id",
        selector: "creatorid",
        sortable: true,
        style: {
          fontSize:'18px' 
        },
        width:"300px"
      },
      {
        name: "Request Date",
        selector: "requestDate",
        sortable: true,
        right: true,
        width:"300px"
      },
      {
        name: "Request Status", 
        selector: "requestStatus",
        sortable: true,
        right: true,
        width:"200px"
      },
      {
        name: "Application Name",
        selector: "applicationName",
        sortable: true,
        right: true,
        width:"250px"
      },
      {
        name:"Action",
        cell: row => <ActionComponent row={row} onClick={handleButtonAction(row)}>Approve</ActionComponent> ,
        ignoreRowClick: true,
        allowOverflow: true,
        button: true,
        width:"200px"
      }
    ];
  

    return (
      
   
    <DataTable
   title="Svc Request Table " 
   columns={columns}
   data={svclist}
   defaultSortField="title"
  // sortIcon={<SortIcon />}
   pagination
   //selectableRows
   //onSelectedRowsChange={handleOnclickRow}
   customStyles={customStyles}
   noContextMenu // comment this to show itemas selected as alert at the top of table
   fixedHeader
   fixedHeaderScrollHeight="500px"
 /> 
         
    
    )
  //}
}

export default SvcsearchResultsDataTable