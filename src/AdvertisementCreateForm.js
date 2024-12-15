import React, { useState, useEffect, useRef } from 'react';
import './AdvertisementCreateForm.css'
import { pageState } from './pageState';
import config from './config';

function AdvertisementCreateForm({ togglePage }) {
    const [looseColor, setLooseColor] = useState('white');
    const [foundColor, setFoundColor] = useState('transparent');
    const fileInputRef = useRef(null);
    const [imagePreviews, setImagePreviews] = useState([]);
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [kind, setKind] = useState('advertisement-create-form-option1');

    const handleButtonClick = () => {
        fileInputRef.current.click();
    };

    const handleRemovePhotosClick = () =>
    {
        setImagePreviews([]);
    }

    const handleFileChange = (event) => {
        const files = event.target.files;
        const fileArray = Array.from(files);
        
        // Create image previews
        const previews = fileArray.map(file => {
            return URL.createObjectURL(file);
        });
    
        // Update state with the new previews
        setImagePreviews(prevPreviews => [...prevPreviews, ...previews]);
    };

    const handleLooseButtonClick = () =>
    {
        setLooseColor('red');
        setFoundColor('transparent');
    }

    const handleFoundButtonClick = () =>
    {
        setFoundColor('red');
        setLooseColor('transparent');
    }

    const handleSubmit = async (event) => {
        event.preventDefault();

        const formData = new FormData();
        formData.append('advertisement[title]', title);
        formData.append('advertisement[description]', description);
        //formData.append('advertisement[kind]', kind);
        //formData.append('advertisement[type]', looseColor === 'red' ? 'lost' : 'found');

        // Append each image file to the FormData
        imagePreviews.forEach((imageSrc, index) => {
            const file = fileInputRef.current.files[index]; // Get the corresponding file from the input
            if (file) {
                formData.append('advertisement[photos][]', file); // Append the file to the FormData
            }
        });

        const obj_user = localStorage.getItem('naxodka-user-data')
        if (obj_user === null)
        {
            togglePage(pageState.login);
            return;
        }
        const user = JSON.parse(obj_user);
        const id = user.id;
        formData.append('user_id', id);

        const url = config.apiUrl + '/advertisements'
        try {
            const response = await fetch(url, {
                method: 'POST',
                body: formData,
            });

            if (response.ok) {
                const result = await response.json();
                alert('Advertisement created successfully:', result);
                // Optionally, you can reset the form or navigate to another page
            } else {
                alert('Error creating advertisement:', response.statusText);
            }
        } catch (error) {
            alert('Error:', error);
        }
    };

    return(
        <div className="AdvertisementCreateForm">
            <h2 id="advertisement-create-form-header">Создать объявление</h2>
            <label>тип объявления :</label>
            <div id="advertisement-create-form-type">
                <div id="advertisement-create-form-switch">
                    <div id="advertisement-create-form-switch-loose" style={{backgroundColor: looseColor}} onClick={handleLooseButtonClick}>потеряно</div>
                    <div id="advertisement-create-form-switch-found" style={{backgroundColor: foundColor}} onClick={handleFoundButtonClick}>найдено</div>
                </div>
            </div>
            <label>тип пропажи :</label>
            <select id="advertisement-create-form-kind" value={kind} onChange={(e) => setKind(e.target.value)}>
                <option value="advertisement-create-form-option1">документы</option>
                <option value="advertisement-create-form-option2">ключи</option>
                <option value="advertisement-create-form-option3">финансы и банковские карты</option>
                <option value="advertisement-create-form-option4">другое</option>
            </select>
            <label>название : </label>
            <input id="advertisement-create-form-title" value={title} onChange={(e) => setTitle(e.target.value)}/>
            <label>описание : </label>
            <textarea id="advertisement-create-form-description" value={description} onChange={(e) => setDescription(e.target.value)}/>
            <label>фото : </label>
            <div id="advertisement-create-form-uploaded-photos">
                {imagePreviews.map((imageSrc, index) => (
                <img
                    key={index}
                    src={imageSrc}
                    alt={`preview ${index}`}
                    style={{ width: '100px', height: '100px', objectFit: 'cover', margin: '5px' }}
                />
                ))}
            
                <input 
                    type="file"
                    ref={fileInputRef}
                    onChange={handleFileChange}
                    accept="image/*"
                    style={{ display: 'none' }} // Hide the input
                    multiple // Allow multiple file selection
                />
                <div id="advertisement-create-form-photo-buttons">
                    <button id="advertisement-create-form-upload-photo" onClick={handleButtonClick}>загрузить фото</button>
                    <button id="advertisement-create-form-remove-all-photos-button" onClick={handleRemovePhotosClick}>удалить все фото</button>
                </div>
            </div>

            <div id="advertisement-create-form-adv-buttons">
                <button id="advertisement-create-form-save" onClick={handleSubmit}>создать объявление</button>
                <button id="advertisement-create-form-remove-adv">отмена</button>
            </div>
            <div id="advertisement-create-form-free-space"></div>
        </div>
    );
}

export default AdvertisementCreateForm;