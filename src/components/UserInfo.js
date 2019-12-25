import React, { Component } from 'react';

class UserInfo extends Component {

    constructor(props) {
        super(props);
        this.state = {
            userName: ""
        }
    }

    handleUsenameChange(e) {
        this.setState({userName: e.target.value});
    }

    render() { 
        const { userName } = this.state;
        return (
            <div className="chatBoxUserInfoWrap">
                <input className="chatBoxUserNameInput" placeholder="Enter you name" onChange={this.handleUsenameChange.bind(this)} />
                <button className="chatBoxUserInfoSubmit" onClick={() => this.props.onUserNameSubmit(userName)} >Submit</button>
            </div>
        );
    }
}
 
export default UserInfo;