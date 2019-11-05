import React, { Component } from 'react';
import { Form, Col, Button } from "react-bootstrap";

class Interaction extends Component {

    render() {
        return(
            <>
                <h4>Ask a question</h4>
                <Form noValidate >
                <Form.Row>
                    <Form.Group as={Col} md="6" controlId="validationCustom01">
                        <Form.Control
                            required
                            type="text"
                            placeholder="Your name"
                        />
                        <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group as={Col} md="6" controlId="validationCustom02">
                        <Form.Control
                            required
                            type="text"
                            placeholder="Your email"
                        />
                        <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                    </Form.Group>
                </Form.Row>
                <Form.Row>
                    <Form.Group as={Col} md="12" controlId="validationCustom02">
                        <Form.Control 
                            required 
                            as="textarea" 
                            rows="3"
                            placeholder="Enter your question here"
                        />
                        <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                    </Form.Group>
                </Form.Row>
                <Form.Row bsPrefix="float-right">
                    <Form.Group as={Col} md="12" controlId="validationCustom02">
                        <Button type="button">Submit</Button>
                    </Form.Group>
                </Form.Row>
            </Form>
            </>
        );
    }
}
 
export default Interaction;