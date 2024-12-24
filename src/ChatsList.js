import React, { useRef, useState, useEffect } from 'react';
import './ChatsList.css';
import config from './config';
// import { useParams } from 'react-router-dom';
// import { createConsumer } from '@rails/actioncable';

const ChatsList = ({ togglePage, channel, userID, chatsList }) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    if (channel.current) {
      channel.current.getChats(userID);
    }
  }, []);

  function ChatButton({ userID, advID }) {
    const [fio, setFio] = useState('');
    const [avatarURL, setAvatarURL] = useState('');

    useEffect(() => {
      const fetchData = async () => {
        let url = config.apiUrl;
        if (userID)
        {
          url += `/users/${userID}`;
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
            if (userID)
            {
              setFio(result.surname + ' ' + result.name);
              setAvatarURL(result.avatar);
            }
            if (advID)
            {
              setFio(result.owner.surname + ' ' + result.owner.name);
              setAvatarURL(result.owner.avatar);
            }
          } catch (error) {
            alert('ERROR url : ' + url);
          }
      };
      fetchData();
    }, [])
    return (
        <div className="ChatButton">
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
            x.user_id === userID ? <ChatButton advID={x.advertisement_id}/> : <ChatButton userID={x.user_id}/>
        ))}
      </div>
    );
  }

  useEffect(() => {
    if (chatsList.length > 0)
      setData(chatsList);
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
