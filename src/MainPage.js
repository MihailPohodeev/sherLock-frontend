import React, { useState, useEffect, useRef } from 'react';
import './MainPage.css'
import { pageState, mainPageState } from './pageState';
import AdvertisementCreateForm from './AdvertisementCreateForm'
import GetAdvertisement from './GetAdvertisement';
import MyAdvertisements from './MyAdvertisements';
import FilterPage from './FilterPage';
import EditAdvertisement from './EditAdvertisement';
import AboutUs from './AboutUs'
import Chat from './Chat'
import ChatsList from './ChatsList';
import Notification from './Notification';
import { createConsumer } from '@rails/actioncable';

function MainPage({ togglePage }) {
    const [showMenu, setShowMenu] = useState(false);
    const [showMainMenu, setShowMainMenu] = useState(false);
    const [currentMainPage, setCurrentMainPage] = useState(mainPageState.filter);
    const [avatarURL, setAvatarURL] = useState('https://t4.ftcdn.net/jpg/03/59/58/91/360_F_359589186_JDLl8dIWoBNf1iqEkHxhUeeOulx0wOC5.jpg');
    const [advID, setAdvID] = useState(0);    
    const [userID, setUserID] = useState(0);
    const [myID, setMyID] = useState(0);
    const [typeOfChat, setTypeOfChat] = useState('founds');
    const [showNotification, setShowNotification] = useState(false);
    const [notificationJSON, setNotificationJSON] = useState(null);
    const cable = createConsumer('ws://87.117.38.106:2999/cable');
    const chatChannelRef = useRef(null);
    const [chatList, setChatList] = useState([]);
    const [messages, setMessages] = useState([]);
    const [chatID, setChatID] = useState(0);
    const messagesRef = useRef(null);
    const currMainPageRef = useRef(null);
    const currTypeOfChatRef = useRef(null);
    const myIDRef = useRef(null);

    messagesRef.current = messages;
    currMainPageRef.current = currentMainPage;
    currTypeOfChatRef.current = typeOfChat;
    myIDRef.current = myID;

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

    useEffect(() => {
        // Устанавливаем таймер на 5 секунд (5000 миллисекунд)
        const timer = setTimeout(() => {
            // Действие, которое нужно выполнить по истечении времени
            setShowNotification(false);
        }, 5000);

        // Очистка таймера при размонтировании компонента
        return () => clearTimeout(timer);
    }, [showNotification]);

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
            setUserID(usr.id);
            setMyID(usr.id);
            chatChannelRef.current = cable.subscriptions.create({channel: 'ChatChannel', user_id: usr.id}, {
            received(data)
            {
                // alert(JSON.stringify(data.body) + ' ' + currentMainPage);
                // setMessages((prevMessages) => [...prevMessages, data.message]);
                if (data.title === 'chats')
                {
                    // alert('chats' + ' ' + JSON.stringify(data.body));
                    setChatList(data.body);
                    // alert(JSON.stringify(chatsList));
                }
                else if (data.title === 'message')
                {
                    if (currMainPageRef.current != mainPageState.chat)
                    {
                        setNotificationJSON(data.body);
                        setShowNotification(true);
                    }
                    if (currMainPageRef.current == mainPageState.chatsList)
                    {
                        if (currTypeOfChatRef.current === 'founds')
                        {
                            this.perform('get_my_founds_chats', {userID});
                        }
                        else if (currTypeOfChatRef.current === 'my-advs')
                        {
                            this.perform('get_my_advs_chats', {userID: myIDRef.current});
                        }
                    }
                    setMessages([...messagesRef.current, data.body]);
                    // this.perform('get_my_chats', {userID: usr.id});
                }
                else if (data.title === 'list_of_messages')
                {
                    // alert(JSON.stringify(messages));
                    // alert(JSON.stringify(data.body));
                    // alert('list');
                    setMessages(data.body);
                }
                else if (data.title === 'current_chat')
                {
                    setChatID(data.body.id);
                    // alert(data.body.id);
                }
            },
            sendMessage(message, chat_ID, my_ID, adv_ID)
            {
                // alert(chat_ID);
                setMessages([...messagesRef.current, {content: message, chat_id: chat_ID, user_id: my_ID}]);
                this.perform('send_message', {content: message, chat_id: chat_ID, my_id: my_ID, adv_id: adv_ID} );
            },
            createChat(myID, advID)
            {
                this.perform('get_chat_id', {my_id: myID, adv_id: advID});
            },
            getFOUNDSChats(userID)
            {
                this.perform('get_my_founds_chats', {userID});
            },
            getMYADVSChats(userID)
            {
                this.perform('get_my_advs_chats', {userID});
            },
            getMessages(my_ID, chat_ID)
            {
                if (chat_ID !== 0)
                {
                    // alert('GET_MESSAGES_ ' + chatID)
                    this.perform('get_messages', {my_id: my_ID, chat_id: chat_ID});
                }
            }
            });
        }
    
        return () => {chatChannelRef.current.unsubscribe()};
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

    const handleGoToChats = () =>
    {
        setCurrentMainPage(mainPageState.chatsList);
        setShowMainMenu(false);
    }

    const handlePickChat = (chat_id, adId) =>
    {
        // alert(userID + ' ' + usId + ' ' + adId);
        alert(adId + ' ' + chat_id);
        // setMessages([]);
        setAdvID(adId);
        setChatID(chat_id);
        setCurrentMainPage(mainPageState.chat);
        setShowNotification(false);
    }

    const profileMenu = () => {
        return (
            <div id="main-page-profile-menu" ref={menu}>
                <div id='main-page-profile-container'>
                    <button id='main-page-profile-edit-button' onClick={handleEditProfile}>редактировать профиль...</button>
                    <button id='main-page-profile-chats' onClick={handleGoToChats}>чаты</button>
                    <button id='main-page-profile-sign-out-button' onClick={handleSignOut} >Выход...</button>
                </div>
                <div style={{height: '20px'}}></div>
            </div>
        );
    };

    const toggleMainPage = (state) => {
        setCurrentMainPage(state);
    };

    const chooseAdv = (id) =>
    {
        setAdvID(id);
        setCurrentMainPage(mainPageState.getAdv);
    }

    const openChat = (adv_id) =>
    {
        // alert("OPEN CHAT");
        setAdvID(adv_id);
        setChatID(0);
        setCurrentMainPage(mainPageState.chat);
    }

    return (
        <div id="MainPage">
             <div id="main-page-main">
                { currentMainPage === mainPageState.filter ?
                (< FilterPage togglePage={toggleMainPage} actionFunction={chooseAdv}/>)
                : currentMainPage === mainPageState.myAdvs ?
                (< MyAdvertisements togglePage={toggleMainPage}/>)
                : currentMainPage === mainPageState.createAdv ?
                (< AdvertisementCreateForm togglePage={toggleMainPage}/>)
                : currentMainPage === mainPageState.about ?
                (< AboutUs />)
                : currentMainPage === mainPageState.editAdv ?
                (< EditAdvertisement togglePage={toggleMainPage} />)
                : currentMainPage === mainPageState.chatsList ?
                (< ChatsList togglePage={toggleMainPage} channel={chatChannelRef} userID={userID} chatsList={chatList} actionFunction={handlePickChat} typeOfChat={typeOfChat} setTypeOfChat={setTypeOfChat}/>)
                : currentMainPage === mainPageState.getAdv ?
                (< GetAdvertisement togglePage={toggleMainPage} actionFunction={openChat} id={advID}/>)
                : currentMainPage === mainPageState.chat ?
                (< Chat togglePage={toggleMainPage} channel={chatChannelRef} chatID={chatID} myID={myID} userID={userID} advId={advID} messages={messages}/>)
                : null
                }
                { showNotification ? <Notification notifJSON={notificationJSON} actionFunction={handlePickChat}/> : null}
            </div>
            <header id="main-page-header">
                <div id="main-page-retrieve-menu" onClick={handleShowMenu}></div>
                <div id="main-page-header-container">
                    <p id="main-page-button-main" onClick={handleToFilter}>Главная</p>
                    <p id="main-page-button-my-advs" onClick={handleToMineAdvs}>Мои объявления</p>
                    <p id="main-page-button-my-advs" onClick={handleNewAdv}>Создать оъявление</p>
                    <p id="main-page-button-main-about" onClick={handleAboutUs}>О нас</p>
                </div>
                <div id="main-page-avatar-container">
                    <img onClick={handleAvatarClick} ref={avatar} id="main-page-avatar" Alt="Avatar" src={avatarURL}></img>
                </div>
            </header>
            {/* <div id="main-page-bikini-bottom">
                <p>2024. Все права незащищены</p>
            </div> */}
            { showMainMenu && <div id="main-page-header-phone-container">
                    <p id="main-page-button-phone-main" onClick={handleToFilter}>Главная</p>
                    <p id="main-page-button-phone-my-advs" onClick={handleToMineAdvs}>Мои объявления</p>
                    <p id="main-page-button-phone-my-advs" onClick={handleNewAdv}>Создать оъявление</p>
                    <p id="main-page-button-phone-main-about" onClick={handleAboutUs}>О нас</p>
                    <div style={{height: '10px'}}></div>
                </div>}
            { showMenu ? profileMenu() : null} 
        </div>
    );
}

export default MainPage;