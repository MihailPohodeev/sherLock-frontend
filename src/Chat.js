import React, { useState, useEffect } from 'react';
import './Chat.css';
import MessageBox from './message';
import config from './config';
// import { useParams } from 'react-router-dom';

const Chat = ({ channel, chatID, myID, userID, advId, messages }) => {
  const [input, setInput] = useState('');
  const [myMessages, setMyMessages] = useState([]);
  const [messageQueue, setMessageQueue] = useState([]);

  const sendMessage = () => {
    if (input.trim()) {
      if (myMessages.length === 0 && chatID === 0)
      {
        channel.current.createChat(myID, advId);
      }
      if (chatID === 0)
        setMessageQueue([...messageQueue, input]);
      else
        channel.current.sendMessage(input, chatID, myID, advId);
      setInput('');
      setMyMessages([...myMessages, {content: input, whose: 'my'}]);
    }
  };

  const Msgs = () =>
  {
    // useEffect(() => {alert("TOTALNAYA DURKA - " + JSON.stringify(myMessages));}, []);
    return(
      <div className="messages-list">
        {myMessages.map((msg, index) => (
          <MessageBox key={index} isMy={msg.whose === 'my' ? true : false} content={msg.content} time={"currentTime"}/>
        ))}
      </div>
    );
  }

  useEffect(() => {
    // alert("DURKA - " + JSON.stringify(messages));
    setMyMessages([]);
    let arr = [];
    messages.map((msg, index) =>
      {
        let str = "alien";
        if (msg.user_id === userID)
          str = "my";
        arr.push({content: msg.content, whose: str});
      });
      setMyMessages(arr);
   }, [messages]);

  useEffect(() => {
    alert(myID + ' ' + advId + ' ' + chatID);
    channel.current.getMessages(myID, chatID);
    // channel.current.getMessages(myID, chatID);
    // const fetchData = async () => {
      // let url = config.apiUrl + `/advertisements/${advId}`;
      // try {
      //     const response = await fetch(url);
      //     if (!response.ok) {
      //       throw new Error('Network response was not ok');
      //     }
      //     const result = await response.json();
      //     // alert(JSON.stringify(result));
      //     setToID(result.owner.id);
      //   } catch (error) {
      //     alert('ERROR url : ' + url);
      //   }
    // };
    // fetchData();
  }, []);

  useEffect(() => {
      // channel.current.getMessages(myID, chatID);
      if (messageQueue.length > 0)
      {
        // alert('queue works');
        messageQueue.forEach(function(msg) {channel.current.sendMessage(msg, chatID, myID, advId);});
      }
  }, [chatID]);

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
