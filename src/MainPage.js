import React, { useState, useEffect, useRef } from 'react';
import './MainPage.css'
import { pageState, mainPageState } from './pageState';
import AdvertisementCreateForm from './AdvertisementCreateForm'
import GetAdvertisement from './GetAdvertisement';
import MyAdvertisements from './MyAdvertisements';
import FilterPage from './FilterPage';

function MainPage({ togglePage }) {
    const [showMenu, setShowMenu] = useState(false);
    const [currentMainPage, setCurrentMainPage] = useState(mainPageState.filter);

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

    const handleToFilter = () =>
    {
        setCurrentMainPage(mainPageState.filter);
    }

    const handleToMineAdvs = () =>
    {
        setCurrentMainPage(mainPageState.myAdvs);
    }

    const handleNewAdv = () =>
    {
        setCurrentMainPage(mainPageState.createAdv);
    }

    const handleSignOut = () =>
    {
        localStorage.removeItem('naxodka-token');
        localStorage.removeItem('naxodka-user-data');
        togglePage(pageState.login);
    }

    const handleEditProfile = () =>
    {
        togglePage(pageState.editprofile);
    }

    const profileMenu = () => {
        return (
            <div id="main-page-profile-menu" ref={menu}>
                <div id='main-page-profile-container'>
                    <button id='main-page-profile-edit-button' onClick={handleEditProfile}>редактировать профиль...</button>
                    <button id='main-page-profile-sign-out-button' onClick={handleSignOut} >Выход...</button>
                </div>
                <div style={{height: '20px'}}></div>
            </div>
        );
    };

    return (
        <div id="MainPage">
            <header id="main-page-header">
                <div id="main-page-header-container">
                    <p id="main-page-button-main" onClick={handleToFilter}>Главная</p>
                    <p id="main-page-button-my-advs" onClick={handleToMineAdvs}>Мои объявления</p>
                    <p id="main-page-button-my-advs" onClick={handleNewAdv}>Создать оъявление</p>
                    <p id="main-page-button-main-about">О нас</p>
                </div>
                <div id="main-page-avatar-container">
                    <img onClick={handleAvatarClick} ref={avatar} id="main-page-avatar" Alt="Avatar" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQbxcbt8ejR6RhFF5ysw97gpXm6yf0woiXAig&s"></img>
                </div>
                { showMenu ? profileMenu() : null} 
            </header>
            <div id="main-page-main">
                { currentMainPage === mainPageState.filter ?
                (< FilterPage togglePage={togglePage} />)
                : currentMainPage === mainPageState.myAdvs ?
                (< MyAdvertisements togglePage={null}/>)
                : currentMainPage === mainPageState.createAdv ?
                (< AdvertisementCreateForm togglePage={null}/>)
                : null
                }
            </div>
        </div>
    );
}

export default MainPage;