import React, { useState, useEffect, useRef } from 'react';
import './MainPage.css'
import { pageState } from './pageState';

function MainPage({ togglePage }) {
    const [showMenu, setShowMenu] = useState(false);

    const handleAvatarClick = (event) =>
    {
        event.preventDefault();
        setShowMenu(!showMenu);
    }

    const menu = useRef(null);
    const avatar = useRef(null);

    const handleClickOutsideMenu = (event) => {
        if (menu.current && !menu.current.contains(event.target) && avatar.current && !avatar.current.contains(event.target)) {
            setShowMenu(false); // Скрываем элемент
        }
    };

    useEffect(() => {
        document.addEventListener('click', handleClickOutsideMenu);
        return () => {
            document.removeEventListener('click', handleClickOutsideMenu);
        };
    }, []);


    return (
        <div id="MainPage">
            <header id="main-page-header">
                <div id="main-page-header-container">
                    <button id="main-page-filter-button">фильтр</button>
                    <input id="main-page-searching" placeholder='поиск...'/>
                </div>
                <div id="main-page-avatar-container">
                    <img onClick={handleAvatarClick} ref={avatar} id="main-page-avatar" Alt="Avatar" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQbxcbt8ejR6RhFF5ysw97gpXm6yf0woiXAig&s"></img>
                </div>
                { showMenu && <div id="main-page-profile-menu" ref={menu}></div> }
            </header>
            <main id="main-page-main">

            </main>
        </div>
    );
}

export default MainPage;