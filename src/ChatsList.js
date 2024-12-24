import React, { useRef, useState, useEffect } from 'react';
import './ChatsList.css';
import config from './config';
// import { useParams } from 'react-router-dom';
// import { createConsumer } from '@rails/actioncable';

const ChatsList = ({ togglePage, channel, userID, chatsList, actionFunction }) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    if (channel.current) {
      channel.current.getChats(userID);
    }
  }, []);

  function ChatButton({ usID, advID }) {
    const [fio, setFio] = useState('');
    const [avatarURL, setAvatarURL] = useState('');

    useEffect(() => {
      const fetchData = async () => {
        // alert(userID + ' ' + usID + ' ' + advID);
        let url = config.apiUrl;
        if (usID !== userID)
        {
          url += `/users/${usID}`;
        }
        else if (advID)
        {
          url += `/advertisements/${advID}`;
        }
        try {
            const response = await fetch(url);
            if (!response.ok) {
              throw new Error('Network response was not ok');
            }
            const result = await response.json();
            // alert(JSON.stringify(result));
            if (usID !== userID)
            {
              setFio(result.surname + ' ' + result.name);
              setAvatarURL(result.avatar);
            }
            else
            {
              setFio(result.owner.surname + ' ' + result.owner.name);
              setAvatarURL(result.owner.avatar);
            }
          } catch (error) {
            alert('ERROR url : ' + url + ' ' + error.message);
          }
      };
      fetchData();
    }, [])
    return (
        <div className="ChatButton" onClick={() => actionFunction(usID, advID)}>
            <div className="chat-button-avatar" style={{backgroundImage: `url(${avatarURL})`}}></div>
            <div className="chat-button-container">
              <p>{fio}</p>
            </div>
        </div>
    );
  }

  function AllChatButtons()
  {
    return(
      <div className="AllChatButtonsForm">
        {data.map((x, index) => (
            <ChatButton usID={x.user_id} advID={x.advertisement_id}/> 
        ))}
      </div>
    );
  }

  useEffect(() => {
    if (chatsList.length > 0)
      setData(chatsList);
    // alert(JSON.stringify(chatsList));
  }, [chatsList]);

  return (
    <div className="ChatsListBody">
      <h1 id='chats-list-title'>Чаты :</h1>
      <div id='chats-list-main-container'>
        <AllChatButtons />
      </div>
    </div>
  );
};

export default ChatsList;
