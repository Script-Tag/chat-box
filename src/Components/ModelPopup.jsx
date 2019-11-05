import React, { Component } from 'react';
import {Button, Modal, Form} from "react-bootstrap";

class ModelPopUp extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: "",
            password: ""
        }
    }

    showTitle =() => {
        const {isPasswordRequired, isEmailRequired} = this.props;

        if(isPasswordRequired && isEmailRequired) {
            return "Password & email required";
        } else if (isPasswordRequired) {
            return "Password required";
        } else if (isEmailRequired) {
            return "Email required";
        }
    }

    handleChange(event) {
        let fieldName = event.target.name;
        let fieldVal = event.target.value;
        this.setState({ [fieldName] : fieldVal });
    }

    render() { 
        const {showPopup , handleClose, isPasswordRequired, isEmailRequired, handleSubmit} = this.props;
        const { email, password } = this.state;

        return (
            <>
                <Modal show={showPopup} onHide={handleClose} animation={false}>
                    <Modal.Header closeButton>
                        <Modal.Title>{this.showTitle()}</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form>
                            {isEmailRequired && <Form.Group controlId="formGroupEmail">
                                <Form.Control 
                                    name="email"
                                    type="email" 
                                    placeholder="Enter email here" 
                                    onChange={(e) => this.handleChange(e)} 
                                />
                            </Form.Group>}
                            {isPasswordRequired && <Form.Group controlId="formGroupPassword">
                                <Form.Control 
                                    name="password"
                                    type="password" 
                                    placeholder="Enter password here" 
                                    onChange={(e) => this.handleChange(e)} 
                                />
                            </Form.Group>}
                        </Form>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={() => handleSubmit(email, password)}>Submit</Button>
                    </Modal.Footer>
                </Modal>
            </>
        );
    }
}

export default ModelPopUp;