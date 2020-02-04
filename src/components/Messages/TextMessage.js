import React from 'react';
import Linkify from 'react-linkify';
const wordsArray = ['fuck', 'hell'];

const TextMessage = (props) => {
  return <div className="sc-message--text">
    <Linkify properties={{ target: '_blank' }}>
      {filterMessage(props.data.text)}
    </Linkify>
  </div>;
};

const filterMessage = (message) => {
  wordsArray.map((word) => {
    message = message.replace(RegExp(word, "gi"), '***');
  });

  return message;
}

export default TextMessage;
