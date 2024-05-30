import React, { useState, CSSProperties } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';

import './Login.scss';
import { MdError } from 'react-icons/md';
import api from '../../api';

type User = {
  username: string;
  password: string;
};

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [usernameStyle, setUsernameStyle] = useState<CSSProperties>({});
  const [passwordStyle, setPasswordStyle] = useState<CSSProperties>({});
  const [errorMessage, setErrorMessage] = useState<string>('');

  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const user: User = { username, password };
      const response = await api.post('/login', user);

      if (response.status === 200) {
        const { token } = response.data; 
        Cookies.set('jwt', token, { expires: 1 }); 
        window.dispatchEvent(new Event('logged-in'));
      }
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        const { errorCode } = error.response.data;
        if (errorCode === 'EMPTY_FIELDS') {
          setErrorMessage('Username or password are empty!');
        } else if (errorCode === 'USER_NOT_FOUND') {
          setErrorMessage('User doesn`t exist!');
        } else if (errorCode === 'INCORRECT_PASSWORD') {
          setErrorMessage('Incorrect password!');
        }
      } else {
        setErrorMessage('An error occurred during login');
      }
    }
  };

  const navigateRegister = () => {
    navigate('/register');
  };

  const handleUsernameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(event.target.value);
    setUsernameStyle({ color: 'black' });
    setErrorMessage('');
  };

  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
    setPasswordStyle({ color: 'black' });
    setErrorMessage('');
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      handleLogin();
    }
  };

  return (
    <>
      {errorMessage && (
            <div className='error-message sign'>
              <MdError />
              <p>{errorMessage}</p>
            </div>
          )}
      <div className='back-rect'></div>

      <div className='sign-container'>
        <div className='sign-header'>
          <h2>Sign in</h2>
          <p>Enter login credentials below</p>
        </div>

        <div className='content'>
          <input
            className='user-credentials-textarea'
            placeholder="USERNAME"
            value={username}
            onChange={handleUsernameChange}
            onKeyDown={handleKeyDown}
            style={usernameStyle}
          />

          <input
            className='user-credentials-textarea'
            placeholder="PASSWORD"
            value={password}
            onChange={handlePasswordChange}
            onKeyDown={handleKeyDown}
            style={passwordStyle}
            type="password"
          />
          <div className='sign-buttons'>
            <button className='sign-button' onClick={handleLogin}><span>LOGIN</span></button>
            <div className='redirect'>
              Don't have an account? <span onClick={navigateRegister}>Sign up</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;