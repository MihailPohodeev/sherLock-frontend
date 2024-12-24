import React, { useState, useEffect, useRef } from 'react';
import { pageState } from './pageState';
import config from './config';
import './message.css'

function MessageBox({ content, time }) {
    return (
        <div className="MessageBody">
            <p className="message-body-content">{content}</p>
        </div>
    );
}

export default MessageBox;