import React, { useState, useEffect, useRef } from 'react';
import './MainPage.css'
import { pageState, mainPageState } from './pageState';
import AdvertisementCreateForm from './AdvertisementCreateForm'
import GetAdvertisement from './GetAdvertisement';
import MyAdvertisements from './MyAdvertisements';
import FilterPage from './FilterPage';
import EditAdvertisement from './EditAdvertisement';
import AboutUs from './AboutUs'

function MainPage({ togglePage }) {
    const [showMenu, setShowMenu] = useState(false);
    const [showMainMenu, setShowMainMenu] = useState(false);
    const [currentMainPage, setCurrentMainPage] = useState(mainPageState.filter);
    const [avatarURL, setAvatarURL] = useState('https://t4.ftcdn.net/jpg/03/59/58/91/360_F_359589186_JDLl8dIWoBNf1iqEkHxhUeeOulx0wOC5.jpg');

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
        const user = localStorage.getItem('naxodka-user-data');
        if (user !== null)
        {
            const usr = JSON.parse(user);
            // alert(JSON.stringify(usr));
            if (usr.avatar != null)
            {
                setAvatarURL(usr.avatar);
            }
        }
        document.addEventListener('click', handleClickOutsideMenu);
        return () => {
            document.removeEventListener('click', handleClickOutsideMenu);
        };
    }, []);

    const handleToFilter = () =>
    {
        setCurrentMainPage(mainPageState.filter);
        setShowMainMenu(false);
    }

    const handleToMineAdvs = () =>
    {
        setCurrentMainPage(mainPageState.myAdvs);
        setShowMainMenu(false);
    }

    const handleNewAdv = () =>
    {
        setCurrentMainPage(mainPageState.createAdv);
        setShowMainMenu(false);
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

    const handleAboutUs = () =>
    {
        setCurrentMainPage(mainPageState.about);
        setShowMainMenu(false);
    }

    const handleShowMenu = () =>
    {
        setShowMainMenu(!showMainMenu);
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

    const toggleMainPage = (state) => {
        setCurrentMainPage(state);
    };

    return (
        <div id="MainPage">
            <header id="main-page-header">
                <div id="main-page-retrieve-menu" onClick={handleShowMenu}></div>
                { showMainMenu && <div id="main-page-header-phone-container">
                    <p id="main-page-button-phone-main" onClick={handleToFilter}>Главная</p>
                    <p id="main-page-button-phone-my-advs" onClick={handleToMineAdvs}>Мои объявления</p>
                    <p id="main-page-button-phone-my-advs" onClick={handleNewAdv}>Создать оъявление</p>
                    <p id="main-page-button-phone-main-about" onClick={handleAboutUs}>О нас</p>
                    <div style={{height: '10px'}}></div>
                </div>}
                <div id="main-page-header-container">
                    <p id="main-page-button-main" onClick={handleToFilter}>Главная</p>
                    <p id="main-page-button-my-advs" onClick={handleToMineAdvs}>Мои объявления</p>
                    <p id="main-page-button-my-advs" onClick={handleNewAdv}>Создать оъявление</p>
                    <p id="main-page-button-main-about" onClick={handleAboutUs}>О нас</p>
                </div>
                <div id="main-page-avatar-container">
                    <img onClick={handleAvatarClick} ref={avatar} id="main-page-avatar" Alt="Avatar" src={avatarURL}></img>
                </div>
                { showMenu ? profileMenu() : null} 
            </header>
            <div id="main-page-main">
                { currentMainPage === mainPageState.filter ?
                (< FilterPage togglePage={toggleMainPage} />)
                : currentMainPage === mainPageState.myAdvs ?
                (< MyAdvertisements togglePage={toggleMainPage}/>)
                : currentMainPage === mainPageState.createAdv ?
                (< AdvertisementCreateForm togglePage={toggleMainPage}/>)
                : currentMainPage === mainPageState.about ?
                (< AboutUs />)
                : currentMainPage === mainPageState.editAdv ?
                (< EditAdvertisement togglePage={toggleMainPage} />)
                : null
                }
            </div>
        </div>
    );
}

export default MainPage;