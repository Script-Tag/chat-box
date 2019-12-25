import PropTypes from 'prop-types';
import React, { Component, Fragment } from 'react';
import MessageList from './MessageList';
import UserInput from './UserInput';
import Header from './Header';
import UserInfo from './UserInfo';
import * as firebase from "firebase";

class ChatWindow extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showUserForm: true
    }

    this.users = firebase.firestore().collection('users');
    this.user = (_userId) => firebase.firestore().collection('user').doc(_userId);
  }

  componentDidMount() {
    let userName = localStorage.getItem("CHAT_USER_NAME");
    if(userName) {
      this.setState({showUserForm: false});
    }
  }

  componentDidUpdate(prevProps, prevState) {
    return true;
  }

  onUserInputSubmit(message) {
    this.props.onUserInputSubmit(message);
  }

  onFilesSelected(filesList) {
    this.props.onFilesSelected(filesList);
  }

  onUserNameSubmit(name) {
    if(!name) {
      return false;
    }

    this.users.add({
      name: String(name).toLowerCase(),
      createdAt: firebase.firestore.FieldValue.serverTimestamp()
    }).then((docRef) => {
      console.log(docRef.id, "User name has been saved");
      localStorage.setItem('CHAT_USER_ID', docRef.id);
      localStorage.setItem('CHAT_USER_KEY', localStorage.getItem("CHAT_USER_NAME") + "-" +new Date().getTime());
    }).catch((error) => {
      console.log(error, "User name error");
    });

    localStorage.setItem('CHAT_USER_NAME', name);
    this.setState({showUserForm: false});
  }

  render() {
    let messageList = this.props.messageList || [];
    let classList = [
      'sc-chat-window',
      (this.props.isOpen ? 'opened' : 'closed')
    ];

    const { showUserForm } = this.state;
 
    return (
      <div className={classList.join(' ')}>
        <Header
          teamName={this.props.agentProfile.teamName}
          imageUrl={this.props.agentProfile.imageUrl}
          onClose={this.props.onClose}
        />
        {showUserForm ? 
          <UserInfo onUserNameSubmit={this.onUserNameSubmit.bind(this)} />
          :
          <Fragment>  
            <MessageList
              messages={messageList}
              imageUrl={this.props.agentProfile.imageUrl}
            />
            <UserInput
              onSubmit={this.onUserInputSubmit.bind(this)}
              onFilesSelected={this.onFilesSelected.bind(this)}
              showEmoji={this.props.showEmoji}
            />
          </Fragment>   
        } 
      </div>
    );
  }
}

ChatWindow.propTypes = {
  agentProfile: PropTypes.object.isRequired,
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onFilesSelected: PropTypes.func,
  onUserInputSubmit: PropTypes.func.isRequired,
  showEmoji: PropTypes.bool
};

export default ChatWindow;
