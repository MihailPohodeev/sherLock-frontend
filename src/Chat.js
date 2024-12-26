import React, { useState, useEffect } from 'react';
import './Chat.css';
import MessageBox from './message';
import config from './config';
// import { useParams } from 'react-router-dom';

const Chat = ({ channel, chatID, myID, userID, advId, messages }) => {
  const [input, setInput] = useState('');
  const [myMessages, setMyMessages] = useState([]);
  const [messageQueue, setMessageQueue] = useState([]);
  const [myName, setMyName] = useState('');
  const [companionID, setCompanionID] = useState(0);
  const [companionName, setCompanionName] = useState('');

  const sendMessage = () => {
    if (input.trim()) {
      if (myMessages.length === 0 && chatID === 0) {
        channel.current.createChat(myID, advId);
      }
      if (chatID === 0)
        setMessageQueue([...messageQueue, input]);
      else
        channel.current.sendMessage(input, chatID, myID, advId);
      setInput('');
      setMyMessages([...myMessages, { content: input, whose: 'my', userName: myName }]);
    }
  };

  const Msgs = () => {
    // useEffect(() => {alert("TOTALNAYA DURKA - " + JSON.stringify(myMessages));}, []);
    return (
      <div className="messages-list">
        {myMessages.map((msg, index) => (
          <MessageBox key={index} isMy={msg.whose === 'my' ? true : false} content={msg.content} userName={msg.userName} time={"currentTime"} />
        ))}
      </div>
    );
  }

  useEffect(() => {
    // alert("DURKA - " + JSON.stringify(messages));
    setMyMessages([]);
    let arr = [];
    messages.map((msg, index) => {
      let str = "alien";
      if (msg.user_id === myID)
        str = "my";
      arr.push({ content: msg.content, whose: str, userName: str === 'my' ? myName : companionName });
    });
    setMyMessages(arr);
  }, [messages, myName, companionName]);

  useEffect(() => {
    alert(myID + ' ' + advId + ' ' + chatID);
    channel.current.getMessages(myID, chatID);

    // channel.current.getMessages(myID, chatID);
    const fetchData = async () => {

      let anotherID;
      alert("RATATA : " + advId);
      try {
        const response = await fetch(config.apiUrl + `/advertisements/${advId}`);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const result = await response.json();
        // alert(JSON.stringify(result));
        anotherID = result.owner.id;
        alert("anotherID : " + anotherID);
      } catch (error) {
        alert('ERROR message : ' + error.message);
      }

      try {
        const response = await fetch(config.apiUrl + '/chats/' + chatID);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const result = await response.json();
        // alert(JSON.stringify(result));
        const resUsId = result.user_id;
        if (result.user_id === myID) {
          
          try {
            const response = await fetch(config.apiUrl + '/users/' + myID);
            if (!response.ok) {
              throw new Error('Network response was not ok');
            }
            const result = await response.json();
            // alert(JSON.stringify(result));
            setMyName(result.surname + ' ' + result.name);
          } catch (error) {
            alert('ERROR users1 : ' + error.message);
          }
          try {
            const response = await fetch(config.apiUrl + '/users/' + anotherID);
            if (!response.ok) {
              throw new Error('Network response was not ok');
            }
            const result = await response.json();
            // alert(JSON.stringify(result));
            setCompanionName(result.surname + ' ' + result.name);
          } catch (error) {
            alert('ERROR users2 : ' + error.message);
          }
        }
        else {
          try {
            const response = await fetch(config.apiUrl + '/users/' + myID);
            if (!response.ok) {
              throw new Error('Network response was not ok');
            }
            const result = await response.json();
            // alert(JSON.stringify(result));
            setMyName(result.surname + ' ' + result.name);
          } catch (error) {
            alert('ERROR users3 : ' + error.message);
          }
          const url = config.apiUrl + '/users/' + resUsId;
          try {
            const response = await fetch(url);
            if (!response.ok) {
              throw new Error('Network response was not ok');
            }
            const result = await response.json();
            // alert(JSON.stringify(result));
            setCompanionName(result.surname + ' ' + result.name);
          } catch (error) {
            alert('ERROR users4 : ' + error.message + ' ; url : ' + url);
          }
        }
      } catch (error) {
        alert('ERROR chat : ' + error.message);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    // channel.current.getMessages(myID, chatID);
    if (messageQueue.length > 0) {
      // alert('queue works');
      messageQueue.forEach(function (msg) { channel.current.sendMessage(msg, chatID, myID, advId); });
    }
  }, [chatID]);

  return (
    <div className="ChatBody">
      <div id="chat-messages-field-container">
        <Msgs />
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
