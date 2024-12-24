import React, { useState, useEffect } from 'react';
import './Chat.css';
import MessageBox from './message';
// import { useParams } from 'react-router-dom';
import { createConsumer } from '@rails/actioncable';

const Chat = ({ advId }) => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const cable = createConsumer('ws://localhost:2999/cable');
  const [userID, setUserID] = useState(-1);

  useEffect(() => {
    const user = localStorage.getItem('naxodka-user-data');
    if (user !== null)
      {  
        const usr = JSON.parse(user);
        setUserID(usr.id);
    }
    else
    {
      ;
    }

    const chatChannel = cable.subscriptions.create({channel: 'ChatChannel', user_id: userID}, {
      received(data) {
        setMessages((prevMessages) => [...prevMessages, data.message]);
      },
      sendMessage(message) {
        this.perform('receive', {message} );
      }
    });

    return () => {
      chatChannel.unsubscribe();
    };
  }, [cable]);

  const sendMessage = () => {
    if (input.trim()) {
      const str = JSON.stringify({message: input, userID: userID, advertisementID: advId });
      cable.subscriptions.subscriptions[0].sendMessage(str);
      setInput('');
      setMessages(messages.push({content: input, whose: 'my'}));
    }
  };

  const Msgs = () =>
  {
    const currentTime = new Date();
    return(
      <div className="messages-list">
      {messages.map((msg, index) => (
        <MessageBox key={index} message={msg.content} time={currentTime}/>
      ))}
      </div>
    );
  }

  return (
    <div className="ChatBody">
      <div id="chat-messages-field-container">
        <Msgs/>
      </div>
      <div id='chat-container'>
        <input id="chat-input" placeholder='введите сообщение...'
        value={input}
        onChange={(e) => setInput(e.target.value)}
        ></input>
        <div id="chat-send" onClick={sendMessage}></div>
      </div>
    </div>
  );
};

export default Chat;
