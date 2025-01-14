import React, { useState, useEffect, useRef } from 'react';
import { pageState } from './pageState';
import config from './config';
import './AdvForm.css'

function AdvForm({id, photoUrl, title, description, actionFunction}) {
    const handleClick = () =>
    {
        actionFunction();
    }

    return(
        <div className="AdvForm" onClick={handleClick}>
            <img className="adv-form-image" src={photoUrl}></img>
            <div className="adv-form-text-body">
                <h2>{title}</h2>
                <p>{description}</p>
            </div>
        </div>
    );
}

export default AdvForm;