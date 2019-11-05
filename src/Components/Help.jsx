import React, { Component } from 'react';
import { Accordion, Card, Button } from "react-bootstrap";

class Help extends Component {
    render() { 
        return (
            <Accordion defaultActiveKey="0">
                {this.props.helpBloc.map((val, index) => 
                    this.accordionContent(val, index)
                )}
            </Accordion>
      );
    }

    accordionContent({title, body}, index) {
        return (
            <Card key={index} >
                <Card.Header>
                    <Accordion.Toggle as={Button} variant="link" eventKey={index}>
                        {title}
                    </Accordion.Toggle>
                </Card.Header>
                <Accordion.Collapse eventKey={index}>
                    <Card.Body>{body}</Card.Body>
                </Accordion.Collapse>
            </Card>
        );
    }
}
 
export default Help;