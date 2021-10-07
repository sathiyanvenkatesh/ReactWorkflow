import React,{useEffect} from 'react'
import DataTable from "react-data-table-component";
import { useDispatch, useSelector } from 'react-redux'
import { Container } from 'react-bootstrap';
import { fetchUsers, usersSelector } from '../../redux-sclice/UserCurdSclice';
import FormExample from '../formexample/FormExample';

const columns = [
    {
      name: "Name",
      selector: "name",
      sortable: true,
      style: {
        fontSize:'18px'
      }
    },
    {
      name: "UserName",
      selector: "username",
      sortable: true,
      style: {
        fontSize:'18px'
      }
    },
    {
      name: "Email",
      selector: "email",
      sortable: true
      //right: true
    },
    {
        name: "Phone",
        selector: "phone",
        sortable: true
      },
      {
        name: "Website",
        selector: "website",
        sortable: true
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

 function UserSearch() {
     const dispatch = useDispatch()
 const { users/*, loading, hasErrors */} = useSelector(usersSelector)
 console.log(JSON.stringify(users))
     
    useEffect(() => {
        dispatch(fetchUsers())
      }, [dispatch])
      const handleOnclickRow =({ selectedRows }) => console.log(selectedRows);


     

      
    return (
        <>
        <Container>
            <div><p><h3>User Seach Form</h3> </p></div>
          <FormExample/>
         </Container>
  

        <Container>
        <DataTable
        title="User Search Resuts " 
        columns={columns}
        data={users}
        defaultSortField="name"
       // sortIcon={<SortIcon />}
        pagination
        selectableRows
        onSelectedRowsChange={handleOnclickRow}
        customStyles={customStyles}
        noContextMenu // comment this to show itemas selected as alert at the top of table
        fixedHeader
        fixedHeaderScrollHeight="500px"

      />
      </Container>
      </>
    )
}
export default UserSearch;