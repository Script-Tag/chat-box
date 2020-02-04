import React,{Component} from 'react';
import Launcher from './components/Launcher';
import * as firebase from "firebase";
import axios from 'axios';

class ChatBox extends Component {
  constructor(props) {
    super(props);
    this.state = {
      newMessagesCount: 0,
      isOpen: false,
      messageList: []
    };

    this.messages = firebase.firestore().collection('messages');
    this.message = (_messageId) => firebase.firestore().collection('messages').doc(_messageId);
    this.user = firebase.firestore().collection('users');
  }

  componentDidMount() {
    this.getConservation();
  }

  getConservation = () => {
    try {
      this.messages.where("pageId", "==", 11).orderBy('createdAt', "asc").onSnapshot((querySnapshot) => {
        let messageList = [];
        querySnapshot.forEach((doc) => {
          let messageData = doc.data();
          console.log(messageData, "messageDatamessageData")
          let localUserName = localStorage.getItem("CHAT_USER_NAME");
          let localUserId = localStorage.getItem("CHAT_USER_ID");
          let author = messageData.username;

          if(!localUserName) {
            return false;
          }


          if(messageData.userId.id === localUserId) {
            author = "me";
          }

          messageList.push({
            author: author,
            ...messageData
          });
        });

        this.setState({ messageList : messageList });

      });
    }catch(exception) {
      console.log(exception, "exception");
    }
  }

  sendMessage = (messageData) => {
    let localUserName = localStorage.getItem("CHAT_USER_NAME");
    let userDocId = localStorage.getItem("CHAT_USER_ID");
    let uniqueUserId = localStorage.getItem("CHAT_UNIQUE_USER_ID");

    let baseUrl = "https://us-central1-chat-app-c8e3b.cloudfunctions.net/widgets";
    axios.post(`${baseUrl}/send-message`, {
      pageId: 11,
      type: messageData.type,
      data: messageData.data,
      userDocId: userDocId,
      uniqueUserId: uniqueUserId
    })
    .then((response) => {
      console.log(response, "response")
    })
    .catch((error) => {
      console.error(error, "Message was not sent");
    })
  }

  // sendMessage = ({data, type}) => {
  //   let userDocId = localStorage.getItem("CHAT_USER_ID");
  //   let uniqueUserId = localStorage.getItem("CHAT_UNIQUE_USER_ID");

  //   this.user
  //   .where(firebase.firestore.FieldPath.documentId(), "==", userDocId)
  //   .where("uniqueUserId", "==", uniqueUserId)
  //   .get()
  //   .then((userDocRef) => {
  //     let message = {};
  //     userDocRef.forEach(function(doc) {
  //       if(!doc.id) {
  //         throw new Error('Required document ID');
  //       }
  //       message.userId = firebase.firestore().doc(`/users/${doc.id}`);
  //       message.pageId = 11;
  //       message.createdAt = firebase.firestore.FieldValue.serverTimestamp(); 
  //       message.username = localStorage.getItem("CHAT_USER_NAME"); 
  //       message.data = data; 
  //       message.type = type; 
  //     });
  //     return this.messages.add(message);
  //   })
  //   .then((msgDocRef) => {
  //     console.error(msgDocRef, "Message Added successfully");
  //   })
  //   .catch((error) => {
  //     console.error(error, "ERROR");
  //   });
  // }

  _onMessageWasSent(message) {
    this.sendMessage(message);
  }

  _onFilesSelected(fileList) {
    const objectURL = window.URL.createObjectURL(fileList[0]);
    this.setState({
      messageList: [...this.state.messageList, {
        type: 'file', author: 'me',
        data: {
          url: objectURL,
          fileName: fileList[0].name
        }
      }]
    });
  }

  _sendMessage(text, type = 'text') {
    if (text.length > 0) {
      const newMessagesCount = this.state.isOpen ? this.state.newMessagesCount : this.state.newMessagesCount + 1;
      this.setState({
        newMessagesCount: newMessagesCount,
        messageList: [...this.state.messageList, {
          author: 'them',
          type,
          data: { text }
        }]
      });
    }
  }

  _handleClick() {
    this.setState({
      isOpen: !this.state.isOpen,
      newMessagesCount: 0
    });
  }

  render() {
    const { messageList } = this.state;
    console.log(messageList, "messageList");

      return (
        <div>
        <Launcher
          agentProfile={{
            teamName: 'Chat Group',
            imageUrl: 'https://a.slack-edge.com/66f9/img/avatars-teams/ava_0001-34.png'
          }}
          onMessageWasSent={this._onMessageWasSent.bind(this)}
          onFilesSelected={this._onFilesSelected.bind(this)}
          messageList={messageList}
          newMessagesCount={this.state.newMessagesCount}
          handleClick={this._handleClick.bind(this)}
          isOpen={this.state.isOpen}
          showEmoji
        />
      </div>
      );
  }
}

export default ChatBox;
