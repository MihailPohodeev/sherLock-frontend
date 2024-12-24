import React, { useState, useEffect } from 'react';
import './ChatsList.css';
// import { useParams } from 'react-router-dom';
// import { createConsumer } from '@rails/actioncable';

const ChatsList = ({ togglePage }) => {
  
  return (
    <div className="ChatsListBody">
      <h1 id='chats-list-title'>Чаты :</h1>
      <div id='chats-list-main-container'>
        
      </div>
    </div>
  );
};

export default ChatsList;
