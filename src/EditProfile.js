import React, { useState, useEffect } from 'react';
import './EditProfile.css'
import { pageState } from './pageState';

function EditProfile({ togglePage }) {
    
    const handleCancel = () =>
    {
        togglePage(pageState.mainpage);
    }

    return (
        <div className="EditProfile">
            <div id="edit-profile-container">
                <div id="edit-profile-avatar">
                    <div id="edit-profile-current-avatar"></div>
                    <button id="edit-profile-change-avatar-button">сменить аватар...</button>
                </div>
                <label>фамилия :</label>
                <input id="edit-profile-name"/>
                <label>имя :</label>
                <input id="edit-profile-name"/>
                <div id="edit-profile-buttons">
                    <button id="edit-profile-cancel" onClick={handleCancel}>отменить</button>
                    <button id="edit-profile-edit">редактировать</button>
                </div>
            </div>
        </div>
    );
}

export default EditProfile;