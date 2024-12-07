import React, { useState, useEffect } from 'react';
import './EditProfile.css'
import { pageState } from './pageState';

function EditProfile({ togglePage }) {
    return (
        <div className="EditProfile">
            <div id="edit-profile-container">
                <div id="edit-profile-avatar">

                </div>
                <label>фамилия :</label>
                <input id="edit-profile-name"/>
                <label>имя :</label>
                <input id="edit-profile-name"/>
                <div id="edit-profile-buttons">
                    <button id="edit-profile-cancel">отменить</button>
                    <button id="edit-profile-edit">редактировать</button>
                </div>
            </div>
        </div>
    );
}

export default EditProfile;