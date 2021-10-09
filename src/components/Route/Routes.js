import React from 'react'
//import {useSelector} from 'react-redux'
import { BrowserRouter, BrowserRouter as Router, Route, Switch } from 'react-router-dom';
//import { selectUser } from '../../redux-sclice/UserSclice';
//import ApiCallExample from '../ApiCallExample/ApiCallExample';
//import AuthHistory from '../auth/AuthHistory';
//import Home from '../auth/Home';
import Login from '../auth/Login';
import NotFound from '../auth/NotFound';
import Layout from '../layout/Layout';
import SvcEnquiry from '../svc/SvcEnquiry';
import SvcNewRequest from '../svc/SvcNewRequest';
import SvcUpdate from '../svc/SvcUpdate';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import SvcApprove from '../svc/SvcApprove';

import ModalPage from '../pages/modalpage'

//import DropDownnestedMenu from '../menu/DropDownnestedMenu';

const tostcontaierstyle = {
  width: "1000px"
}
function Routes() {
  //render() {
  //const user = useSelector(selectUser)
  const user = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : null
  //console.log("inside route"+JSON.stringify(user));
  return (
    <React.Fragment>
      <ModalPage></ModalPage>
      <ToastContainer autoClose={2000} style={tostcontaierstyle} />
      <Layout />
      <BrowserRouter>
        <Router>
          <Switch>
            <Route exact path="/" component={user ? "" : Login} />
            <Route path="/svcsearch" component={SvcEnquiry} />
            <Route path="/createsvc" component={SvcNewRequest} />
            <Route path="/updatesvc/:id" component={SvcUpdate} />
            <Route path="/approvesvc/:id" component={SvcApprove} />
            <Route component={NotFound} />
          </Switch>
        </Router>
      </BrowserRouter>
    </React.Fragment>
  )
  // }
}
export default Routes;