import React, { useState, useEffect, useRef } from 'react';
import { pageState } from './pageState';
import './MyAdvertisements.css'
import config from './config';
import AdvForm from './AdvForm';

function MyAdvertisements({ togglePage }) {

    const [advData, setAdvData] = useState([]);

    const [advForms, setAdvForms] = useState([]);


    useEffect(() => {
        const fetchData = async () => {
            const user = JSON.parse(localStorage.getItem('naxodka-user-data'));
            const url = config.apiUrl + '/users/' + user.id + '/advertisements';

            try {
                const response = await fetch(url);
                if (!response.ok) {
                  throw new Error('Network response was not ok');
                }
                const result = await response.json();
                
                for (const element of result) {
                    const elem = {
                        id: element.advertisement.id,
                        title: element.advertisement.title,
                        description: element.advertisement.description,
                        photo: element.photos[0],
                    }
                    setAdvData(advData.push(elem));
                }
                setAdvForms(Array.from({ length: advData.length }, (_, index) => {
                    const element = advData[index]; // Get the current element
                    console.log(element.id, element.photo, element.title, element.description);
                    return (
                        <AdvForm 
                            key={element.id}
                            id={element.id} 
                            photoUrl={element.photo} 
                            title={element.title} 
                            description={element.description} 
                        />
                    );
                }));
              } catch (error) {
                alert('ERROR url : ' + url);
              }
        };

        fetchData();
    }, []);

    // const advForms = Array.from({ length: advData.length }, (_, index) => <AdvForm key={index} id={advData} />);

    return(
        <div className="MyAdvertisements">
            <div style={{margin: '20px'}}>
                <h1>Мои объявления :</h1>
            </div>
            <div id="my-advertisements-container">
                {advForms}
            </div>
            <div className="my-advertisement-space"></div>
        </div>
    );
}

export default MyAdvertisements;