import React from 'react'
import {Nav,Navbar} from 'react-bootstrap';
import Logo from '../../assets/logo.svg';
import {/*useSelector,*/useDispatch} from 'react-redux';
import { /*selectUser,*/logout } from '../../redux-sclice/UserSclice';
//import { Link} from 'react-router-dom';

//import {createBrowserHistory} from 'history'


function  Banner () {
    //const user = useSelector(selectUser)
        const dispatch = useDispatch();
        const user=localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : null
       // console.log("inside route"+JSON.stringify(user));
    
   const  handleLogout=(e)=>{
        ///e.preventDefault();
        console.log("logout clicked")
        dispatch(logout());
        
    }
   

   /*  handleModalShowHide() {
    
        this.setState({ showHide: !this.state.showHide })
    }*/

    
   // render() {
        
        return (
         <div>
         <Navbar expand='lg' bg="danger" variant="dark" style={{ marginTop: "0px",minHeight:"100px" }} >
             <Navbar.Brand href="#">
             <img
        src={Logo}
        width="210px"
        height="75px"
        className="d-inline-block align-top"
        alt="React Bootstrap logo"
      />

             </Navbar.Brand>
             <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav">
                <Nav className="mr-auto">
                <Nav.Link href="#" className="h5 text-light">| AppName</Nav.Link>     
                </Nav>
                <Nav>
                {user ?
                (<>
                <Nav.Link  href="/" onClick={(e)=>handleLogout(e)} className="text-light">Logout  ({user.name})</Nav.Link> 
                <Nav.Link className="text-light" eventKey={2} href="/model" >
                    Login History
                </Nav.Link> 
                </>               
                ) :/*(<Nav.Link href="/login" className="text-light">Login</Nav.Link>)*/""}
                
                </Nav>
            </Navbar.Collapse>
                        
  
          </Navbar>

          {/*<Modal show={this.state.showHide}>
                    <Modal.Header closeButton onClick={() => this.handleModalShowHide()} className="bg-danger">
                    <Modal.Title>Modal heading</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>Woohoo, you're reading this text in a modal!</Modal.Body>
                    <Modal.Footer>
                    <Button variant="danger" onClick={()=>this.handleModalShowHide()    }>
                        Close
                    </Button>
                     </Modal.Footer>
                </Modal>*/}
                </div>
        )
   // }
}
export default Banner;