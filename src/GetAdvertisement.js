import React, { useState, useEffect, useRef } from 'react';
import { mainPageState, pageState } from './pageState';
import './GetAdvertisement.css'
import config from './config';
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import Slider from 'react-slick';


function GetAdvertisement({ togglePage, id }) {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [kind, setKind] = useState('');
    const [status, setStatus] = useState('');
    const [location, setLocation] = useState('');

    const [photos, setPhotos] = useState([]);


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
                setKind(result.advertisement.kind);
                setStatus(result.advertisement.status);
                setLocation(result.advertisement.location);
                setPhotos(result.photos);
              } catch (error) {
                alert('ERROR url : ' + url);
              }
        };

        fetchData();
    }, []);

    const settings = {
      dots: true,
      infinite: false,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1,
    };

    return (
        <div className="GetAdvertisement">
            <div id="get-advertisement-container">
                <h4>статус : {status} <br/> тип : {kind}</h4>
                <h1 id="get-advertisement-title">{title}</h1>
                <h2>местоположение : {location}</h2>
                <div id="get-advertisement-photos">
                  <Slider {...settings}>
                    {photos.map((image, index) => (
                      <div key={index}>
                        <img src={image} alt={`Slide ${index}`} style={{ margin: '0px auto 0px auto', maxHeight: '300px', height: 'auto', maxWidth: '80%', width: 'auto', objectFit: "cover"}} />
                      </div>
                    ))}
                  </Slider>
                </div>
                <div id="get-advertisement-description">
                    <p>{description}</p>
                </div>
            </div>
            <div id='get-advertisement-back-button' onClick={() => togglePage(mainPageState.filter)}></div>
            <button id="get-advertisement-connect-button">связаться с продавцом</button>
            <div style={{height: '50px'}}></div>
        </div>
    );
}

export default GetAdvertisement;