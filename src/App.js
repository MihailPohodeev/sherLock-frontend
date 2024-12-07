import React, { useState, useEffect } from 'react';
import { pageState } from './pageState';
import Registration from './Registration';
import Authorization from './Authorization';
import EmailConfirm from './EmailConfirm';
import EditProfile from './EditProfile';
import MainPage from './MainPage';

function App() {
  const [currentState, setCurrentState] = useState(pageState.mainpage);

  const togglePage = (state) => {
    setCurrentState(state);
  };

  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // useEffect(() =>
  // {
  //   const fetchData = async() => {
  //     try {
  //       const response = await fetch('http://87.117.38.106:2999/get_advertisement?advertisement[id]=1'); // Replace with your API URL
  //       if (!response.ok) {
  //         throw new Error(`HTTP error! status: ${response.status}`);
  //       }
  //       const result = await response.text();
  //       setData(result);
  //     } catch (error) {
  //       setError(error);
  //     } finally {
  //       setLoading(false);
  //     }
  //   } 

  //   fetchData();
  // }, []);

  // if (loading) return <div>Loading...</div>;
  // if (error) return <div>Error: {error.message}</div>;

  return (
    // <div>
    //   {isRegistration ? (
    //     <Registration togglePage={togglePage} />
    //   ) : (
    //     <Authorization togglePage={togglePage} />
    //   )}
    // </div>
    <div>
      { currentState === pageState.registration ?
        (< Registration togglePage={togglePage} />)
        : currentState === pageState.login ?
        (< Authorization togglePage={togglePage} />)
        : currentState === pageState.emailconfirm ?
        (< EmailConfirm togglePage={togglePage} />)
        : currentState === pageState.editprofile ?
        (< EditProfile togglePage={togglePage} />)
        : currentState === pageState.mainpage ?
        (< MainPage togglePage={togglePage}/>)
        : null
      }
    </div>
  );
}

export default App;