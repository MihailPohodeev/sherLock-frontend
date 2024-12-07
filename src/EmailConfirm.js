import React, { useState } from 'react';
import { pageState } from './pageState';
import './EmailConfirm.css';

function EmailConfirm({ togglePage }) {

  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');
  const [code, setCode] = useState('');

  const handleCancel = () =>
  {
    togglePage(pageState.registration);
  }


  const handleConfirm = async (event) => {
    event.preventDefault();

    const storedJsonString = sessionStorage.getItem('user-data');
    let storedJsonObject = null;
    if (storedJsonString !== null && storedJsonString !== '')
    {
      storedJsonObject = JSON.parse(storedJsonString);
    }
    else
    {
        throw new Error('Empty email in session store!')
    }

    const url = 'http://87.117.38.106:2999/confirm_account';
    const data = {
      email: storedJsonObject.email,
      confirmation_code:  parseInt(code, 10), 
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
      setData(result);
      togglePage(pageState.login);
    } catch (error) {
      setErrorMessage(error.message)
    }
  };

  return (
    <div className="EmailConfirm">
      <header className="email-confirm-window">
        <form id="email-confirm-form">
            <div id="email-confirm-text-block">
                <h1 id="email-confirm-text">Мы отправили код подтверждения на вашу почту! <br></br> проверьте раздел "Спам"!</h1>
            </div>
            <input
              id="email-confirm-input-field"
              placeholder='Введите код из email...' 
              value={code}
              onChange={(e) => setCode(e.target.value)}
            />
            {errorMessage !== '' && <div id="registration-error-block-container">
                <p id="registration-error-message">{errorMessage}</p>
              </div>}
            <div id="email-confirm-buttons">
                <button id="email-confirm-back" onClick={handleCancel}>назад</button>
                <button id="email-confirm-confirm" onClick={handleConfirm}>подтвердить</button>
            </div>
        </form>
      </header>
    </div>
  );
}

export default EmailConfirm;
