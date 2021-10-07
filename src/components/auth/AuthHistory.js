import React, { Component } from 'react'
import { Button,Modal } from 'react-bootstrap'
import {withRouter} from 'react-router-dom';


 class AuthHistory extends Component {

    constructor(props){
        super(props);
        this.state = {
            showHide : false
        }
    }

    handleModalShowHide() {
        this.setState({ showHide: !this.state.showHide })
        //this.props.history.push('/');

    }
    componentDidMount(){
        this.handleModalShowHide();// on load click
    }


    render() {
        return (
            <div>
                

                <Modal show={this.state.showHide}>
                    <Modal.Header closeButton onClick={() => this.handleModalShowHide()} className="bg-danger">
                    <Modal.Title>Login History</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>Woohoo, you're reading this text in a modal!</Modal.Body>
                    <Modal.Footer>
                    <Button variant="danger" onClick={() => this.handleModalShowHide()}>
                        Close
                    </Button>
                    {/*<Button variant="danger" onClick={() => this.handleModalShowHide()}>
                        Save Changes
                      </Button>*/}
                    </Modal.Footer>
                </Modal>

            </div>
        )
    }
}
export default withRouter(AuthHistory);
