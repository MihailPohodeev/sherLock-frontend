import React, { useState, useEffect } from 'react';
import './Authorization.css';
import { pageState } from './pageState';

function Authorization({ togglePage }) {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleToReg = () =>
  {
    togglePage(pageState.registration);
  }

  const handleAuthorization = async (event) =>
  {
    event.preventDefault();
    const url = 'http://87.117.38.106:2999/sign_in';
    const data = {
      user: 	{
        email: email,
        password: password
      },
    };

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
      localStorage.setItem('naxodka-token', result.token)
      togglePage(pageState.mainpage)
    } catch (error) {
      setErrorMessage(error.message);
      setPassword('');
    }
  }

  return (
    <div className="Authorization">
      <header className="authorization-window">
        <div id="authorization-container">
          <div id="authorization-shape">
            <div id="authorization-shape-container">
              <input
                id="authorization-email"
                placeholder='email...'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <input
                id="authorization-password"
                placeholder='пароль...'
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              {errorMessage !== '' && <div id="registration-error-block-container">
                <p id="registration-error-message">{errorMessage}</p>
              </div>}
              <button
                id="authorization-login"
                onClick={handleAuthorization}
              >войти</button>
              <button
                id="authorization-create-account"
                onClick={handleToReg}
              >еще нет профиля?</button>
            </div>
          </div>
        </div>
      </header>
    </div>
  );
}

export default Authorization;
