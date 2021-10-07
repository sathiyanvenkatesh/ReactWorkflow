import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import "./../../components/login.css";
import { login ,selectUser} from "../../redux-sclice/UserSclice";
import {useDispatch, useSelector} from 'react-redux';
//import {browserHistory} from 'react-router';
//import {useHistory} from 'react-router-dom';
//import {routeTo} from 'redux-router-kit';


 function Login()  {
    
        const [name, setName] = useState("");
        const [password, setPassword] = useState("");
        const user=localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : null
        console.log("inside Login"+JSON.stringify(user));
         const dispatch = useDispatch(); // add dispatch function to dipatch action to reducers and update the store 
        // const history=useHistory()
        const {/*loading, */hasErrors} = useSelector(selectUser);
      
        function validateForm() {
          return name.length > 0 && password.length > 0;
        }
        
        function handleSubmit(event) {
          event.preventDefault();
          console.log("Login clicked ");
          console.log("user Name "+name);
          console.log("password"+password);
          if(validateForm){
           dispatch(login({ name:name, password:password, loggedIn:true  }) ) 
           //if(!loading && !hasErrors){
          // window.location.href = "/";
          // }

          }  
         
        }
        function displayError(){         
          if(!hasErrors&& user!==null) {
            console.log("login sucess for user :"+user.name);
            window.location.href = "/";
          }else{
            console.log("login failed try again");
           return "";//<p>Login Error please try again</p>
          }
        }
     
        return (
          
            <div className="Login">
             
            <div>
             {displayError()}
           </div> 
           
      <Form onSubmit={handleSubmit}>
        <Form.Group size="lg" controlId="name">
          <Form.Label>User Name</Form.Label>
          <Form.Control
            autoFocus
            type="text"
            autoComplete="off"
            value={name}
            placeholder="User Name"
            onChange={(e) => setName(e.target.value)
            }
          />
        </Form.Group>
        <Form.Group size="lg" controlId="password">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            autoComplete="off"
            value={password}
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Group>
        <Button block size="lg" type="submit" className="btn-danger"  disabled={!validateForm()}>
          Login
        </Button>
      </Form>
    </div>
        )
    
}

export default Login;