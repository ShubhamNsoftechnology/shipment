import React, { useState } from 'react';
import './RegistrationPage.css'
import axios from 'axios';

function App() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleRegister = async () => {
    try {
      const response = await axios.post('http://localhost:3001/register', {
        username,
        email,
        password,
      });
  
      if (response && response.data) {
        console.log(response.data.message);
        // Clear form inputs after successful registration
        setUsername('');
        setEmail('');
        setPassword('');
      } else {
        console.error('Invalid response format:', response);
      }
    } catch (error) {
      console.error('Failed to register:', error.response.data.error);
    }
  };
  

  return (
    <div className="registration-container">
      <h2 className='reg' >Registration Form</h2>
      <div className="form-group">
        <label>Username:</label>
        <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
      </div>
      <div className="form-group">
        <label>Email:</label>
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
      </div>
      <div className="form-group">
        <label>Password:</label>
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
      </div>
      <button className="register-button" onClick={handleRegister}>Register</button>
      <button className="register-button" >Already Registered</button>
    </div>
  );
}

export default App;
