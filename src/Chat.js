import React, { useState, useEffect } from 'react';
import './Chat.css';
import { useParams } from 'react-router-dom';
import { createConsumer } from '@rails/actioncable';

const Chat = ({ userId }) => {
  const { chatId } = useParams();
  const [messages, setMessages] = useState([]);
  const [content, setContent] = useState('');

  useEffect(() => {
    // Connect to ActionCable
    const cable = createConsumer('ws://localhost:3000/cable');

    const chatChannel = cable.subscriptions.create(
      { channel: 'ChatChannel', chat_id: chatId },
      {
        received(data) {
          setMessages((prevMessages) => [
            ...prevMessages,
            { user: { name: data.user }, content: data.message },
          ]);
        },
      }
    );

    // Fetch initial messages
    const fetchMessages = async () => {
      const response = await fetch(`/api/chats/${chatId}`);
      const data = await response.json();
      setMessages(data.messages);
    };

    fetchMessages();

    return () => {
      chatChannel.unsubscribe();
    };
  }, [chatId]);

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!content) return;

    const response = await fetch(`/api/chats/${chatId}/messages`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ user_id: userId, content }),
    });

    if (response.ok) {
      setContent('');
    }
  };

  return (
    <div className="chat-container">
      <div className="messages">
        {messages.map((message, index) => (
          <div key={index} className="message">
            <strong>{message.user.name}:</strong> {message.content}
          </div>
        ))}
      </div>
      <form onSubmit={handleSendMessage} className="message-form">
        <input
          type="text"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Type your message..."
        />
        <button type="submit">Send</button>
      </form>
    </div>
  );
};

export default Chat;
