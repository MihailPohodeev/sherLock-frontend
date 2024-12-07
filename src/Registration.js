import React, { useState, useEffect } from 'react';
import { pageState } from './pageState';
import './Registration.css';

function Registration({ togglePage }) {
  const pageState = {
    login: 'login',
    registration: 'registration',
    emailconfirm: 'emailconfirm',
  }

  const [surname, setSurname] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordRepeat, setPasswordRepeat] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => 
  {
    const storedJsonString = sessionStorage.getItem('user-data');
    if (storedJsonString !== null && storedJsonString !== '')
    {
      const storedJsonObject = JSON.parse(storedJsonString);
      setSurname(storedJsonObject.surname);
      setName(storedJsonObject.name);
      setEmail(storedJsonObject.email);
    }
  }, []);


  const handleSubmit = async (event) => {
    event.preventDefault();
    setErrorMessage('');
    const registrationData = {
      surname: surname,
      name: name,
      email: email
    };

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email))
    {
      setErrorMessage('Некорректный адрес электронной почты!');
      return;
    }
    if (password.length < 8)
    {
      setErrorMessage('Пароль должен содержать хотя бы 8 символов!');
      return;
    }
    if (password !== passwordRepeat)
    {
      setErrorMessage('Пароли не совпадают!');
      return;
    }

    const url = 'http://87.117.38.106:2999/sign_up';
    const data = {
      user: 	{
          surname: surname,
          name: name,
          email: email,
          password: password,
        },
    };

    sessionStorage.setItem('user-data', JSON.stringify(registrationData));

    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message);
      }
      const result = await response.json();
      togglePage(pageState.emailconfirm)
    } catch (error) {
      setErrorMessage(error.message);
    }
  };

  const hadleAlreadyHasAccount = () => 
  {
    togglePage(pageState.login);
  }

  return (
    <div className="Registration">
      <header className="registration-window">
        <div id="registration-container">
          <div id="registration-shape">
            <div id="registration-shape-container">
              <input 
                id="registration-surname"
                placeholder='фамилия...'
                value={surname}
                onChange={(e) => setSurname(e.target.value)}
              />
              <input
                id="registration-name"
                placeholder='имя...'
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <input
                id="registration-email"
                placeholder='email...'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <input
                id="registration-password"
                placeholder='пароль...'
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <input
                id="registration-password-repeate"
                placeholder='повторите пароль...'
                type="password"
                value={passwordRepeat}
                onChange={(e) => setPasswordRepeat(e.target.value)}
              />
              {errorMessage !== '' && <div id="registration-error-block-container">
                <p id="registration-error-message">{errorMessage}</p>
              </div>}
              <div class="registration-space"></div>
              <button
                id="registration-create-account"
                onClick={handleSubmit}
              >создать профиль</button>

              <button
                id="registration-login"
                onClick={hadleAlreadyHasAccount}
              >уже есть профиль?</button>
              <div id="registration-line"></div>
              <div class="registration-space"></div>
              <div id="registration-services-buttons">
                <button id="registration-through-google">google</button>
                <button id="registration-through-yandex">yandex</button>
              </div>
            </div>
          </div>
        </div>
      </header>
    </div>
  );
}

export default Registration;
