import React, { useState, useEffect, useRef } from 'react';
import './AdvertisementCreateForm.css'
import { pageState } from './pageState';

function AdvertisementCreateForm({ togglePage }) {

    const [looseColor, setLooseColor] = useState('white');
    const [foundColor, setFoundColor] = useState('transparent');

    const fileInputRef = useRef(null);
    const [imagePreviews, setImagePreviews] = useState([]);

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
            <select id="advertisement-create-form-kind">
                <option value="advertisement-create-form-option1">документы</option>
                <option value="advertisement-create-form-option2">ключи</option>
                <option value="advertisement-create-form-option3">финансы и банковские карты</option>
                <option value="advertisement-create-form-option4">другое</option>
            </select>
            <label>название : </label>
            <input id="advertisement-create-form-title"/>
            <label>описание : </label>
            <textarea id="advertisement-create-form-description"/>
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
                <button id="advertisement-create-form-save">создать объявление</button>
                <button id="advertisement-create-form-remove-adv">отмена</button>
            </div>
            <div id="advertisement-create-form-free-space"></div>
        </div>
    );
}

export default AdvertisementCreateForm;