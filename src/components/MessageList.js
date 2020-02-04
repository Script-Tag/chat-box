import React, { useEffect, useRef } from 'react';
import Message from './Messages';

export default function MessageList(props) {
  let messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
  });

  return (
    <div className="sc-message-list">
      {props.messages.map((message, i) => {
        return <Message message={message} key={i} />;
      })}
      <div ref={messagesEndRef} />
    </div>
  );
}