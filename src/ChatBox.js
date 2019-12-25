import React,{Component} from 'react';
import Launcher from './components/Launcher';
import * as firebase from "firebase";

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
    this.user = (_userId) => firebase.firestore().collection('user').doc(_userId);
  }

  componentDidMount() {
    this.getConservation();
  }

  getConservation = () => {
    try {
      this.messages.where("page_id", "==", 11).orderBy('createdAt', "asc").onSnapshot((querySnapshot) => {
        let messageList = [];
        querySnapshot.forEach((doc) => {
          let messageData = doc.data();
          let localUserName = localStorage.getItem("CHAT_USER_NAME");
          let localUserId = localStorage.getItem("CHAT_USER_ID");

          // messageData.userId.get().then((userDoc) => {

          // });

          if(!localUserName) {
            return false;
          }

          let author = messageData.userId.id;

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

    this.user(userDocId).get().then((userDocRef) => {
      delete messageData.author;
      messageData.userId = firebase.firestore().doc(`/users/${userDocRef.id}`);
      messageData.page_id = 11;
      messageData.createdAt = firebase.firestore.FieldValue.serverTimestamp(); 
      return this.messages.add(messageData);
    }).then((msgDocRef) => {
      console.log(msgDocRef, "Message Added successfully");
    }).catch((error) => {
      console.log(error, "ERROR");
    });
  }

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

  _sendMessage(text) {
    if (text.length > 0) {
      const newMessagesCount = this.state.isOpen ? this.state.newMessagesCount : this.state.newMessagesCount + 1;
      this.setState({
        newMessagesCount: newMessagesCount,
        messageList: [...this.state.messageList, {
          author: 'them',
          type: 'text',
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
            teamName: 'Team A',
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
