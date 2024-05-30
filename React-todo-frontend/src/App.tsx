//Libraries
import React, { useEffect, useState } from 'react';
import { createBrowserRouter, RouterProvider, Navigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import './App.scss';

//Components
import Login from './pages/Login/Login.tsx';
import Register from './pages/Register/Register.tsx';
import ComponentsManager from './Components/ComponentsManager/ComponentsManager.tsx';

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const verifyLogin = () => {
      const token = Cookies.get('jwt');
      if (token) {
        setIsLoggedIn(true);
      } else {
        setIsLoggedIn(false);
      }
    };

    const logout = () => {
      setIsLoggedIn(false);
    };

    verifyLogin()

    window.addEventListener('logged-in', verifyLogin);
    window.addEventListener('logged-out', logout);

    return () => {
      window.removeEventListener('logged-in', verifyLogin);
      window.removeEventListener('logged-out', logout);
    };
    
  }, []);


  const router = createBrowserRouter([
    {
      path: '/',
      element: isLoggedIn ? <Navigate to="/tasks" /> : <Navigate to="/login" />
    },
    {
      path: '/login',
      element: isLoggedIn ? <Navigate to="/tasks" /> : <Login />
    },
    {
      path: '/register',
      element: isLoggedIn ? <Navigate to="/tasks" /> : <Register />
    },
    {
      path: '/tasks',
      element: isLoggedIn ? <ComponentsManager /> : <Navigate to="/login" />
    }
  ]);

  return (
    <React.StrictMode>
      <RouterProvider router={router} />
    </React.StrictMode>
  );
};

export default App;
