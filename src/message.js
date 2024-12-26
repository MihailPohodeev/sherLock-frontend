import React, { useState, useEffect, useRef } from 'react';
import { pageState } from './pageState';
import config from './config';
import './message.css'

function MessageBox({ content, isMy, userName, time }) {
    return (
        <div className="MessageBody">
            {/* , left: isMy ? '50%' : '0px', right: isMy ? '0px' : '50%' */}
            <div className="message-body-form" style={{backgroundColor: isMy ? 'black' : 'gray'}}>
                <p className='message-body-username'>{userName}</p>
                <p className="message-body-content">{content}</p>
            </div>
        </div>
    );
}

export default MessageBox;