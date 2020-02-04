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

    this.messages = firebase.firestore().collection('messages');
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

    let pageId = '11';
    let randomNum = Math.floor((Math.random() * 10000000) + 1);
    let timeStamp = new Date().getTime();
    let uniqueUserId = pageId + randomNum + timeStamp;

    localStorage.setItem('CHAT_UNIQUE_USER_ID', uniqueUserId);

    this.users.add({
      name: String(name).toLowerCase(),
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
      uniqueUserId
    }).then((docRef) => {
      let messageData = {};

      localStorage.setItem('CHAT_USER_ID', docRef.id);
      localStorage.setItem('CHAT_USER_NAME', name);

      if(!docRef.id) {
        throw new Error('Required document ID');
      }

      messageData.userId = firebase.firestore().doc(`/users/${docRef.id}`);
      messageData.data = null;
      messageData.type = 'group_joined';
      messageData.page_id = 11;
      messageData.createdAt = firebase.firestore.FieldValue.serverTimestamp(); 

      return this.messages.add(messageData);

    })
    .then((res) => {
      this.setState({showUserForm: false});
    })
    .catch((error) => {
      console.log(error, "Error: something went wrong while saving user name");
    });
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
