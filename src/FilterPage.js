import React, { useState, useEffect } from 'react';
import './FilterPage.css';
import { pageState } from './pageState';
import config from './config';
import AdvForm from './AdvForm';

function FilterPage({ togglePage, actionFunction }) {
    const [advData, setAdvData] = useState([]);
    const [advForms, setAdvForms] = useState([]);

    useEffect(() =>
    {
        async function fetchData()
        {
            const url = config.apiUrl + '/advertisements/all';
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
                    if (advData.find(item => item.id === elem.id) == null)
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
                            actionFunction={() => actionFunction(element.id)}
                        />
                    );
                }));
            } catch (error) {
                alert('ERROR url : ' + url + '\n' + error.message);
            }
        }
        fetchData();
    }, []);

    return(
        <div className='FilterPage'>
            <div id="filter-page-toolbar">
                <button id="filter-page-filter-button">фильтр</button>
                <input id="filter-page-search" placeholder='найти...'></input>
            </div>
            <div id="filter-page-advs">
                {advForms}
            </div>
            <div style={{height: '20px'}}></div>
        </div>
    );
}

export default FilterPage;