import React, { Component } from 'react'
import DataTable  from "react-data-table-component";
import movies from './Movies';
import Button from "react-bootstrap/Button";

//import columns from './colums';

const ActionComponent = ({  row, onClick  }) => {
  const clickHandler = () => onClick(row);   

 return <Button onClick={clickHandler}>Action</Button>;
};
const handleAction = () => row => { 
  console.log(row); 
}

const columns =  [
    {
      name: "Title",
      selector: "title",
      sortable: true,
      style: {
        fontSize:'18px'
      }
    },
    {
      name: "Directior",
      selector: "director",
      sortable: true,
      style: {
        fontSize:'18px' 
      }
    },
    {
      name: "Runtime (m)",
      selector: "runtime",
      sortable: true,
      right: true
    },
    {
      cell: row => <ActionComponent row={row} onClick={handleAction(row)}>Action</ActionComponent> ,
      ignoreRowClick: true,
      allowOverflow: true,
      button: true,
    }
  ];

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
  

class AdvancedDatatable extends Component {
      

    render() {
        const handleOnclickRow =({ selectedRows }) => console.log(selectedRows);

        return (
           // <div className="container">
           <DataTable
          title="Svc Request Table " 
          columns={columns}
          data={movies}
          defaultSortField="title"
         // sortIcon={<SortIcon />}
          pagination
          selectableRows
          onSelectedRowsChange={handleOnclickRow}
          customStyles={customStyles}
          noContextMenu // comment this to show itemas selected as alert at the top of table
          fixedHeader
          fixedHeaderScrollHeight="500px"

        /> 
                
           // </div>
        )
    }
}
export default AdvancedDatatable;