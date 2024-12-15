import React, { useState, useEffect } from 'react';
import './EditProfile.css'
import { pageState } from './pageState';
import config from './config'

function EditProfile({ togglePage }) {
    
    const [avatar, setAvatar] = useState(null);
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');

    const handleCancel = () =>
    {
        togglePage(pageState.mainpage);
    }

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            alert(URL.createObjectURL(file));
            setAvatar(URL.createObjectURL(file));
          }
      };
    
    const handleSubmit = async (event) => {
        event.preventDefault();

        const formData = new FormData();
        formData.append('user[avatar]', avatar);

        try {
            const user = JSON.parse(localStorage.getItem('naxodka-user-data'));
            const id = user.id;
            const response = await fetch(config.apiUrl + '/users/' + id, {
                method: 'POST',
                body: formData,
            });

            if (response.ok) {
                const data = await response.json();
                setMessage('Profile updated successfully!');
                // Handle success (e.g., update state, redirect, etc.)
            } else {
                setError('Failed to update profile. Please try again.');
            }
        } catch (error) {
            setError('An error occurred. Please try again.');
        }
    };

    

    return (
        <div className="EditProfile">
            <div id="edit-profile-container">
                <div id="edit-profile-avatar">
                    <div id="edit-profile-current-avatar" style={{backgroundImage: 'url(' + avatar + ')'}}></div>
                    <input id="edit-profile-change-avatar-button" type="file" onChange={handleFileChange} accept="image/*" placeholder='сменить аватар...'/>
                </div>
                <label>фамилия :</label>
                <input id="edit-profile-name"/>
                <label>имя :</label>
                <input id="edit-profile-name"/>
                <div id="edit-profile-buttons">
                    <button id="edit-profile-cancel" onClick={handleCancel}>отменить</button>
                    <button id="edit-profile-edit" onClick={handleSubmit}>редактировать</button>
                </div>
                {message && <p>{message}</p>}
                {error && <p style={{ color: 'red' }}>{error}</p>}
            </div>
        </div>
    );
}

export default EditProfile;