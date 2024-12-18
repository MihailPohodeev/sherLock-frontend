import React, { useState, useEffect, useRef } from 'react';
import { pageState } from './pageState';
import config from './config';
import './EditAdvertisement.css'

function EditAdvertisement({ togglePage }) {

    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [location, setLocation] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
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

    useEffect(() => {
        
        const data = sessionStorage.getItem('naxodka-current-adv');
        if (data === null)
        {
            setErrorMessage('Ошибка при загрузке данных !');
        }
        const JSONdata = JSON.parse(data);
        if (JSONdata === null)
        {
            setErrorMessage('Ошибка при загрузке данных !');
        }

        setTitle(JSONdata.advertisement.title);
        setDescription(JSONdata.advertisement.description);
        setLocation(JSONdata.advertisement.location);

    }, []);

    return (
        <div className='EditAdvertisement'>
            <h1>Редактировать объявление :</h1>
            <label>название : </label>
            <input id="advertisement-create-form-title" value={title} onChange={(e) => setTitle(e.target.value)}/>
            <label>описание : </label>
            <textarea id="advertisement-create-form-description" value={description} onChange={(e) => setDescription(e.target.value)}/>
            <label>местоположение : </label>
            <input id="advertisement-create-form-location" value={location} onChange={(e) => setLocation(e.target.value)}/>
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
            {errorMessage !== '' && <div id="advertisement-create-form-error-message">
                <p style={{color: 'red'}}>{errorMessage}</p>
            </div>}
            <div id="advertisement-create-form-adv-buttons">
                <button id="advertisement-create-form-save">редактировать объявление</button>
                <button id="advertisement-create-form-remove-adv">отмена</button>
            </div>
            <div style={{height: '50px'}}></div>
        </div>
    );
}

export default EditAdvertisement;