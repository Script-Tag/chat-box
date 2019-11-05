import React, {Component} from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import Switch from "react-switch";
import "./Timer.css";

export default class AddTimer extends Component {
    constructor(props) {
        super(props);
        this.state = { pageModeActive: false, statusActive: false };
    }
     
    onToggle = (field) => {
        this.setState({ [field]: !this.state[field] });
    }

    render() {
        const { pageModeActive,  statusActive } = this.state;
        return (
            <Container>
                <Row>
                    <Col>Current Page State: <br></br>
                        DURING
                    </Col>
                    <Col>Visibility: <br></br> 
                        LIVE
                    </Col>
                    <Col>Event start in: <br></br>
                        4 6 33 02
                    </Col>
                    <Col><Button variant="primary" block >Launch Page</Button></Col>
                </Row>
                <Row>
                    <Col sm={3}>
                        <label>Event Name</label>
                    </Col>
                    <Col sm={9}>
                        <input className="w-100" />
                    </Col>
                </Row>
                <Row>
                    <Col sm={4}>
                        <label>URL slug:engagestreaming.com/[USERNAME]/</label>
                    </Col>
                    <Col sm={6}>
                        <input className="w-100" />
                    </Col>
                    <Col sm={2}>
                        <Button variant="outline-secondary" block >Copy Link</Button>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <label>
                            <span><b>Page Mode: </b></span>

                            <span className="ml-2">Auto</span>
                            <Switch
                                onChange={() => this.onToggle("pageModeActive")} 
                                checked={pageModeActive} 
                                className="react-switch"
                                uncheckedIcon={false}
                                checkedIcon={false}
                            />
                            <span className="ml-1">Manual</span>
                        </label>
                    </Col>
                    <Col md={{ span: 3, offset: 6 }}>
                        <label>
                            <span><b>Page Mode: </b></span>
                            <span className="ml-2">Auto</span>
                            <Switch 
                                onChange={() => this.onToggle("statusActive")} 
                                checked={statusActive} 
                                className="react-switch"
                                uncheckedIcon={false}
                                checkedIcon={false}
                            />
                            <span className="ml-1">Manual</span>
                        </label>
                    </Col>
                </Row>
            </Container>
        )
    }
}
