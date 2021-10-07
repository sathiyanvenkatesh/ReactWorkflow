import React, { Component } from 'react'
import DataTable from 'react-data-table-component';



const data = [{ id: 1, title: 'Conan the Barbarian', year: '1982' }
,{ id: 2, title: 'Conan the Barbarian', year: '1981' }
,{ id: 3, title: 'Conan the Barbarian', year: '1983' }];
const columns = [
  {
    name: 'Title',
    selector: 'title',
    sortable: true,
  },
  {
    name: 'Year',
    selector: 'year',
    sortable: true,
    right: true,
  },
];
//const data=[];

 class BasicDataTable extends Component {
   

    render() {

      const  handleChange = (state) => {            
           // You can use setState or dispatch with something like Redux so we can use the retrieved data
           console.log('Selected Rows: ', state.selectedRows);
   
         };   
      

        return (
            <div className="container">
            <DataTable
            title="Basic DataTable"
            columns={columns}
            data={data}
            //selectableRows // add for checkbox selection
           // Clicked
            onSelectedRowsChange={handleChange}//get selected value on click of check box .
            />
            </div>
        )
    }
}
export default BasicDataTable;