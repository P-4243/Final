import React, { useState } from 'react';
import "./Form.css";
import {Link} from 'react-router-dom';
const Forms = () => {
  const [registerUsername, setRegisterUsername] = useState('');
  const [registerPassword, setRegisterPassword] = useState('');
  const [registerRole, setRegisterRole] = useState('');

  const handleRegisterSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch('http://localhost:5000/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ 
          username: registerUsername, 
          password: registerPassword, 
          role: registerRole 
        })
      });

      const data = await response.json();
      if (response.ok) {
        alert('Registration successful!');
      } else {
        alert(`Error: ${data.message}`);
      }
    } catch (error) {
      console.error('Error during registration:', error);
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
        <input 
          type="text" 
          id="registerRole" 
          placeholder="Role" 
          value={registerRole} 
          onChange={(e) => setRegisterRole(e.target.value)} 
        />
        <button type="submit">Register</button>
       <Link to="Login"><p>Alraedy Registered</p></Link> 
      </form>
      </div>
    </div>
    </div>
  );
};

export default Forms;