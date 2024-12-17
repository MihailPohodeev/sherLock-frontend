import React, { useState, useEffect } from 'react';
import './EditProfile.css'
import { pageState } from './pageState';
import config from './config'

function EditProfile({ togglePage }) {
    
    const [avatar, setAvatar] = useState(null);
    const [avatarURL, setAvatarURL] = useState('https://t4.ftcdn.net/jpg/03/59/58/91/360_F_359589186_JDLl8dIWoBNf1iqEkHxhUeeOulx0wOC5.jpg');
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');
    const [name, setName] = useState('');
    const [surname, setSurname] = useState('');

    useEffect(() => {
        const user = localStorage.getItem('naxodka-user-data');
        if (user === null)
        {
          togglePage(pageState.login);
          return;
        }
        const usr = JSON.parse(user);
        setName(usr.name)
        setSurname(usr.surname);
        if (!avatar && usr.avatar && usr.avatar !== avatarURL) {
            setAvatarURL(usr.avatar);
        }
    }, [togglePage, avatarURL]);
    
    const handleCancel = () =>
    {
        togglePage(pageState.mainpage);
    }

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            setAvatar(file);
            setAvatarURL(URL.createObjectURL(file));
          }
      };
    
    const handleSubmit = async (event) => {
        event.preventDefault();

        const formData = new FormData();
        if (avatar !== null)
        {
            formData.append('user[avatar]', avatar);
        }
        formData.append('user[name]', name);
        formData.append('user[surname]', surname);

        try {
            const user = JSON.parse(localStorage.getItem('naxodka-user-data'));
            const id = user.id;
            const response = await fetch(config.apiUrl + '/users/' + id, {
                method: 'PUT',
                body: formData,
            });

            if (response.ok) {
                const data = await response.json();
                localStorage.setItem('naxodka-user-data', JSON.stringify(data.user));
                setMessage('Profile updated successfully!');
                togglePage(pageState.mainpage);
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
                    <div id="edit-profile-current-avatar" style={{backgroundImage: `url(${avatarURL})`}}></div>
                    <input id="edit-profile-change-avatar-button" type="file" onChange={handleFileChange} accept="image/*" placeholder='сменить аватар...'/>
                </div>
                <label>фамилия :</label>
                <input id="edit-profile-surname" value={surname} onChange={(e) => setSurname(e.target.value)} />
                <label>имя :</label>
                <input id="edit-profile-name" value={name} onChange={(e) => setName(e.target.value)} />
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