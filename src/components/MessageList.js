import React, { useState, useEffect, useRef } from 'react';
import Message from './Messages';

function MessageList(props) {
  let scrollList = useRef(null);

  useEffect(() => {
    // scrollList.scrollTop = scrollList.scrollHeight
  });

  return (
    <div className="sc-message-list" ref={scrollList}>
      {props.messages.map((message, i) => {
        return <Message message={message} key={i} />;
      })}
    </div>
  );
}

export default MessageList;
