import React, { Component } from 'react';
import * as firebase from 'firebase';
import { Container, Row, Col, Button } from 'react-bootstrap';
import Logo from "./Components/Logo";
import Title from "./Components/Title";
import Description from "./Components/Description";
import Video from "./Components/Video";
import Interaction from "./Components/Interaction";
import Social from "./Components/Social";
import Help from "./Components/Help";
import ModelPopUp from "./Components/ModelPopup";

const compOrdering = ['heading', 'video', 'description', 'interaction', 'social', 'help'];

class HomeScreen extends Component {
    constructor(props) {
        super(props);

        this.state = {
            showPopup: true,
            isEmailRequired: true,
            isPasswordRequired: true,

            logoUrl: "abcd",
            title: "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
            description:"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
            videoUrl: "https://www.youtube.com/watch?v=JyFvzCmlZfE",
            socialIcons: [],
            helpBloc:[
                {
                    title:"Title 1",
                    body: "Body 1"
                },
                {
                    title:"Title 2",
                    body: "Body 2"
                },
                {
                    title:"Title 3",
                    body: "Body 3"
                },
            ]
        }
    }

    componentDidMount() {
        firebase.firestore().collection('users').onSnapshot((response) => {
            // console.log(response, "response");
            response.docs.map((_doc) => {
                console.log("_doc",_doc.data())
            })
        })
    }

    handleCloselPopup = () => this.setState({showPopup: false});
    
    handlePopupSubmit = (email, password) => {
        debugger;
    };

    render() { 
        const { showPopup, isPasswordRequired, isEmailRequired } = this.state;
        return (
            <Container>
                <ModelPopUp 
                    showPopup={showPopup}
                    handleClose={() => this.handleCloselPopup()}
                    handleSubmit = {this.handlePopupSubmit}
                    isPasswordRequired={isPasswordRequired}
                    isEmailRequired={isEmailRequired}
                />
                {compOrdering.map((val, index) => 
                    <Row className="mb-2" key = {index}>
                        {this.getOrderedComponent(val)}
                    </Row>
                )}
            </Container>
        );
    }

    getOrderedComponent(order) {
        const { logoUrl, title, description,  videoUrl, socialIcons, helpBloc } = this.state;

        switch(order) {
            case "heading" :
                return (
                    <>
                        <Col sm="2">
                            <Logo logoUrl={logoUrl} />
                        </Col>
                        <Col sm="10">
                            <Title title={title} />
                        </Col>
                    </> 
                );
            case "video" :
                return <Col sm="12"><Video videoUrl={videoUrl} /></Col>;
            case "description" :
                return <Col sm="12"><Description description={description} /></Col>;
            case "interaction" :
                return <Col sm="12"><Interaction /></Col>;
            case "social" :
                return <Col sm="12"><Social /></Col>;
            case "help" :
                return <Col sm="12"><Help helpBloc={helpBloc} /></Col>;
            default:
                return null;
        }       
    }
}
 
export default HomeScreen;