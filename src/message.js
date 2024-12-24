import React, { useState, useEffect, useRef } from 'react';
import { pageState } from './pageState';
import config from './config';
import './message.css'

function MessageBox({ content, isMy, time }) {
    return (
        <div className="MessageBody" style={{backgroundColor: isMy ? 'black' : 'gray'}}>
            <p className="message-body-content">{content}</p>
        </div>
    );
}

export default MessageBox;