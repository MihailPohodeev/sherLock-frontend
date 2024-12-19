import React, { useState, useEffect, useRef } from 'react';
import './FilterPage.css';
import { pageState } from './pageState';
import config from './config';
import AdvForm from './AdvForm';

function FilterPage({ togglePage, actionFunction }) {
    const [advData, setAdvData] = useState([]);
    const [advForms, setAdvForms] = useState([]);
    const [showMenu, setShowMenu] = useState(false);
    const [kind, setKind] = useState('none');
    const [sort, setSort] = useState('');

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

        document.addEventListener('click', handleClickOutsideMenu);
        return () => {
            document.removeEventListener('click', handleClickOutsideMenu);
        };
    }, []);

    const [lostColor, setLostColor] = useState('white');
    const [foundColor, setFoundColor] = useState('white');

    const handleLost = () =>
    {
        if (lostColor === 'wheat')
        {
            setLostColor('white');
            setSort('');
        }
        else
        {
            setLostColor('wheat')
            setSort('утеряно');
        }
        setFoundColor('white');

    }

    const handleFound = () =>
    {
        if (foundColor === 'wheat')
            {
                setFoundColor('white');
                setSort('');
            }
            else
            {
                setFoundColor('wheat')
                setSort('найдено');
            }
        setLostColor('white');
    }

    const menu = useRef(null);
    const buttonFilter = useRef(null);

    const handleClickOutsideMenu = (event) => {
        if (menu.current && !menu.current.contains(event.target) && buttonFilter.current && !buttonFilter.current.contains(event.target)) {
            setShowMenu(false); // Скрываем элемент
        }
    };

    const handleFilterAdvertisements = async () =>
    {
        const params = new URLSearchParams();
        if (sort !== '') params.append('sort', sort);
        if (kind !== 'none') params.append('kind', kind);
        // if (text) params.append('text', text);
        const url = config.apiUrl + '/advertisements/filter?' + params.toString();
        alert(url);

        try {
            const response = await fetch(url, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });
    
            // Check if the response is OK (status code 200-299)
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
    
            // Parse the JSON response
            const result = await response.json();
            alert(JSON.stringify(result));
            setAdvData([]);
            for (const element of result) 
            {
                alert(JSON.stringify(element));
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
            alert('Error fetching advertisements : ', error.message);
        }
        setShowMenu(false);
    }

    function filterMenu()
    {
        return(
            <div id='filter-page-filter-menu' ref={menu}>
                <label>тип объявления : </label>
                <div id='filter-page-filter-menu-type-container'>
                    <div id='filter-page-filter-menu-type-lost' onClick={handleLost} style={{backgroundColor: lostColor}}>утеряно</div>
                    <div id='filter-page-filter-menu-type-found' onClick={handleFound} style={{backgroundColor: foundColor}}>найдено</div>
                </div>
                <label>тип пропажи : </label>
                <div id='filter-page-filter-menu-kind-container'>
                    <select id="filter-page-filter-menu-kind" value={kind} onChange={(e) => setKind(e.target.value)}>
                        <option value="none">-</option>
                        <option value="документы">документы</option>
                        <option value="ключи">ключи</option>
                        <option value="финансы">финансы и банковские карты</option>
                        <option value="гаджеты">электронные гаджеты</option>
                        <option value="другое">другое...</option>
                    </select>
                </div>
                <button id='filter-page-filter-menu-filter-button' onClick={handleFilterAdvertisements}>фильтрация</button>
                <div style={{height: '20px'}}></div>
            </div>
        );
    }

    return(
        <div className='FilterPage'>
            <div id="filter-page-toolbar">
                <button id="filter-page-filter-button" ref={buttonFilter} onClick={() => setShowMenu(!showMenu)}>фильтр</button>
                <div id="filter-page-search-container">
                    <input id="filter-page-search" placeholder='найти...'></input>
                    <div id="filter-page-search-button" onClick={handleFilterAdvertisements}>
                        <div></div>
                    </div>
                </div>
            </div>
            <div id="filter-page-advs">
                {advForms}
            </div>
            {showMenu && filterMenu()}
            <div style={{height: '20px'}}></div>
        </div>
    );
}

export default FilterPage;