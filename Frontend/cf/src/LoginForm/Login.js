import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import "../RegistrationForm/Form.css";

const Login = () => {
  const [registerUsername, setRegisterUsername] = useState('');
  const [registerPassword, setRegisterPassword] = useState('');
  const [loginMessage, setLoginMessage] = useState('');
  const [loginSuccess, setLoginSuccess] = useState(false);

  const handleRegisterSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch('http://localhost:5000/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ 
          username: registerUsername, 
          password: registerPassword 
        })
      });

      const data = await response.json();
      if (response.ok) {
        setLoginMessage('Login Successful');
        setLoginSuccess(true);
      } else {
        setLoginMessage(`Error: ${data.message}`);
      }
    } catch (error) {
      console.error('Error during login:', error);
      setLoginMessage('Error during login: Please try again later.');
    }
  };

  return (
    <div className='whole'>
    <div >
       <h1 className="logo">
        <span>C</span>rowd<span>F</span>und
      </h1>
      
      <div>
      <form id="registerForm" onSubmit={handleRegisterSubmit}>
        <input 
          type="text" 
          id="registerUsername" 
          placeholder="Username" 
          value={registerUsername} 
          onChange={(e) => setRegisterUsername(e.target.value)} 
        />
        <input 
          type="password" 
          id="registerPassword" 
          placeholder="Password" 
          value={registerPassword} 
          onChange={(e) => setRegisterPassword(e.target.value)} 
        />
        <button type="submit">Login</button>
      </form>
      </div>
     
      {loginMessage && <p>{loginMessage}</p>}
      {loginSuccess && <Link to="/ExploreCampaigns">Go to Explore Campaign</Link>}
    </div>
    </div>
  );
};

export default Login;
