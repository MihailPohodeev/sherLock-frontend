import React, { useState, useEffect, useRef } from 'react';
import { pageState } from './pageState';
import config from './config';
import './Notification.css'

function Notification({ notifJSON, actionFunction }) {
    
    const [avatarURL, setAvatarURL] = useState('');
    const [userName, setUserName] = useState('');

    useEffect(() => {
        const fetching = async () =>
        {
            const url = config.apiUrl + '/users/' + notifJSON.user_id;
            
            try {
                const response = await fetch(url);
                if (!response.ok) {
                throw new Error('Network response was not ok');
                }
                const result = await response.json();
                setAvatarURL(result.avatar);
                setUserName(result.surname + ' ' + result.name);
            } catch (error) {
                alert('ERROR url : ' + url + ' ' + error.message);
            }
        };
        fetching();
    }, [notifJSON]);

    return (
        <div className='Notification'>
            <div id="notification-avatar" style={{backgroundImage: `url(${avatarURL})`}}></div>
            <div className='notification-container'>
                <div id='notification-username'>{userName}</div>
                <div id='notification-content'>{notifJSON.content}</div>
            </div>
        </div>
    );
}

export default Notification;