import React, { useState, CSSProperties } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Register.scss';
import { User } from '../../types';
import Cookies from 'js-cookie';
import api from '../../api';
import ErrorMsg from '../../Components/ErrorMsg/ErrorMsg';

const Register: React.FC = () => {
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [usernameStyle, setUsernameStyle] = useState<CSSProperties>({});
  const [passwordStyle, setPasswordStyle] = useState<CSSProperties>({});
  const [errorMsg, seterrorMsg] = useState<string>('');

  const navigate = useNavigate();

  const navigateLogin = () => {
    navigate('/login');
  };

  const handleRegister = async () => {
    try {
      const user: User = { username, password };
      const response = await api.post('/register', user);

      if (response.status === 201) {
        const response = await api.post('/login', user);
        if (response.status === 200) {
          const { token } = response.data;
          Cookies.set('jwt', token, { expires: 1 });
          window.dispatchEvent(new Event('logged-in'));
        }
      }
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        const { errorCode } = error.response.data;
        if (errorCode === 'EMPTY_FIELDS') {
          seterrorMsg('Username or password are empty');
        }
        else if (errorCode === 'USERNAME_TOO_LONG') {
          setUsernameStyle({ color: 'red' });
          seterrorMsg('Maximum length of username is 15 characters');
        }
        else if (errorCode === 'PASSWORD_TOO_LONG') {
          seterrorMsg('Maximum length of password is 60 characters');
          setPasswordStyle({ color: 'red' });

        }
        else if (errorCode === 'USERNAME_TAKEN') {
          setUsernameStyle({ color: 'red' });
          seterrorMsg('Username is taken');
        }
      } else {
        seterrorMsg('An error occurred during registration');
      }
    }
  };

  const handleUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(e.target.value);
    setUsernameStyle({ color: 'black' });
    seterrorMsg('');
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
    setPasswordStyle({ color: 'black' });
    seterrorMsg('');
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleRegister();
    }
  };

  return (
    <>
      <ErrorMsg errorMsg={errorMsg} side={'right'} />

      <div className='back-rect back-rect-register'></div>
      <div className='sign-container register-container'>
        <div className='sign-header'>
          <h2>Sign up</h2>
          <p>Enter user credentials below</p>
        </div>
        <div className='content'>
          <input
            className='user-credentials-textarea'
            placeholder='USERNAME'
            value={username}
            onChange={handleUsernameChange}
            onKeyDown={handleKeyDown}
            style={usernameStyle}
          />
          <input
            className='user-credentials-textarea'
            placeholder='PASSWORD'
            type='password'
            value={password}
            onChange={handlePasswordChange}
            onKeyDown={handleKeyDown}
            style={passwordStyle}
          />
          <div className='sign-buttons'>
            <button className='sign-button' onClick={handleRegister}><span>REGISTER</span></button>
            <div className='redirect redirect-register'>
              Already have an account? <span onClick={navigateLogin}>Sign in</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Register;
