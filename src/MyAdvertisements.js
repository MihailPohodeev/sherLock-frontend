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
            const obj_user = localStorage.getItem('naxodka-user-data')
            if (obj_user === null)
            {
                togglePage(pageState.login);
                return;
            }
            const user = JSON.parse(obj_user);
            const id = user.id;
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
                    if (advData.find(item => item.id == elem.id) == null)
                    {
                        setAdvData(advData.push(elem));
                    }
                }
                console.log(advData);

                setAdvForms(Array.from({ length: advData.length }, (_, index) => {
                    const element = advData[index]; // Get the current element
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