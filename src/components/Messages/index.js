import React, { Component } from 'react';
import TextMessage from './TextMessage';
import EmojiMessage from './EmojiMessage';
import FileMessage from './FileMessage';
import Avatar from 'react-avatar';

class Message extends Component {

  _renderMessageOfType = (type) => {
      const { author, userId } = this.props.message;

      let profileDiv = <div className="sc-message--avatar tooltipa">
        <Avatar name={author+'_'+userId.id} 
          title={userId.id}  maxInitials={2}
          value={userId.id} size="30" round={true} />
        {/* <span className="tooltiptext">{author}</span> */}
        {/* <span className="sc-message--author-name">{author}</span> */}
      </div>;

    switch(type) {
    case 'text':
      return <> {profileDiv} <TextMessage {...this.props.message} /> </>;
    case 'emoji':
      return <> {profileDiv} <EmojiMessage {...this.props.message} /> </>;
    case 'file':
      return <> {profileDiv} <FileMessage {...this.props.message} /> </>;
    case 'group_joined':
      return <div>Joined Group</div>;
    default:
      console.error(`Attempting to load message with unsupported file type '${type}'`);
    }
  }

  render () {
    let contentClassList = [
      'sc-message--content',
      (this.props.message.author === 'me' ? 'sent' : 'received')
    ];

    return (
      <div className="sc-message">
        <div className={contentClassList.join(' ')}>
          {this._renderMessageOfType(this.props.message.type)}
        </div>
      </div>);
  }
}

export default Message;
