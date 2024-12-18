import React, { useState, useEffect, useRef } from 'react';
import { pageState } from './pageState';
import './GetAdvertisement.css'
import config from './config';
import { Slide } from 'react-slideshow-image';


function GetAdvertisement({ togglePage, id }) {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [kind, setKind] = useState('');

    const photos = [
        {
          url: config.apiUrl + '/rails/active_storage/blobs/redirect/eyJfcmFpbHMiOnsiZGF0YSI6NSwicHVyIjoiYmxvYl9pZCJ9fQ==--3cf45e7646dbd7aa6e67aec33de7967d6441d751/image_2024-12-07_21-42-09.png',
          caption: 'Slide 1'
        },
        {
          url: config.apiUrl + "/rails/active_storage/blobs/redirect/eyJfcmFpbHMiOnsiZGF0YSI6NiwicHVyIjoiYmxvYl9pZCJ9fQ==--a217b394fd97cdd54b2feb6b61ee90096880c50d/photo_2024-11-30_23-06-35.jpg",
          caption: 'Slide 2'
        }
      ];


    useEffect(() => {
        const fetchData = async () => {
            const url = config.apiUrl + '/advertisements/' + id;
            try {
                const response = await fetch(url);
                if (!response.ok) {
                  throw new Error('Network response was not ok');
                }
                const result = await response.json();
                setTitle(result.advertisement.title);
                setDescription(result.advertisement.description);
                // alert(JSON.stringify(result));
              } catch (error) {
                alert('ERROR url : ' + url);
              }
        };

        fetchData();
    }, []);

    const spanStyle = {
        padding: '20px',
        background: '#efefef',
        color: '#000000'
      }
      
      const divStyle = {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundSize: 'cover',
        height: '400px',
        width: '400px',
      }

    return (
        <div className="GetAdvertisement">
            <div id="get-advertisement-container">
                <h1 id="get-advertisement-title">{title}</h1>
                <h3 id="get-advertisement-kind">Тип : {kind}</h3>
                <div id="get-advertisement-photos">
                <Slide>
                    {photos.map((slideImage, index)=> (
                        <div key={index}>
                            <div style={{ ...divStyle, 'backgroundColor': 'black' }}>
                                <span style={spanStyle}>{slideImage.caption}</span>
                            </div>
                        </div>
                ))} 
                </Slide>
                </div>
                <div id="get-advertisement-description">
                    <p>{description}</p>
                </div>
            </div>
        </div>
    );
}

export default GetAdvertisement;