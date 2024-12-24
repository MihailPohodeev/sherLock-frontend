import React, { useState, useEffect } from 'react';
import './Chat.css';
import MessageBox from './message';
import config from './config';
// import { useParams } from 'react-router-dom';

const Chat = ({ channel, userID, advId, messages }) => {
  const [input, setInput] = useState('');
  const [toID, setToID] = useState(0);
  const [myMessages, setMyMessages] = useState([]);

  const sendMessage = () => {
    if (input.trim()) {
      const str = JSON.stringify({message: input, myID: userID, toID: toID, advertisementID: advId });
      channel.current.sendMessage(str);
      setInput('');
      setMyMessages([...myMessages, {content: input, whose: 'my'}]);
    }
  };

  const Msgs = () =>
  {
    // const currentTime = new Date();
    return(
      <div className="messages-list">
        {myMessages.map((msg, index) => (
          <MessageBox key={index} isMy={msg.whose === 'my' ? true : false} content={msg.content} time={"currentTime"}/>
        ))}
      </div>
    );
  }

  useEffect(() => {messages.map((msg, index) =>
      {
        let str = "alien";
        setMyMessages([]);
        if (msg.user_id === userID)
          str = "my";
        setMyMessages([...myMessages, {content: msg.content, whose: str}]);
      });
      // alert(userID + ' ' + advId);
   }, [messages]);

  useEffect(() => {
    const fetchData = async () => {
      let url = config.apiUrl + `/advertisements/${advId}`;
      try {
          const response = await fetch(url);
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          const result = await response.json();
          // alert(JSON.stringify(result));
          setToID(result.owner.id);
        } catch (error) {
          alert('ERROR url : ' + url);
        }
        channel.current.getMessages(userID, advId);
    };
    fetchData();    
  }, []);

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
