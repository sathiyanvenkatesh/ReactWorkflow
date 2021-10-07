import React  from 'react'
//import {useSelector} from 'react-redux';
//import { selectUser } from '../../redux-sclice/UserSclice';
import Banner from './Banner'
import Header from './Header'
//import Login from '../auth/Login';
//import { Redirect } from 'react-router-dom';

 function Navebar(){
   
        //const user = useSelector(selectUser);
        const user=localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : null
       // console.log("inside Nave Bar"+JSON.stringify(user));
       // console.log("User"+JSON.stringify(user));
        
         //const  loggeduser=localStorage.getItem('user')?JSON.parse(localStorage.getItem('user')) : user
        
       
        return (
            <div>
                <Banner/>
               {user? <Header/>:""}
            </div>
        )
   
}
export default Navebar;