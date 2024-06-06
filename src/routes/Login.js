import React, { useState } from 'react';

const RegistrationLogin = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [token, setToken] = useState('');

  const BASE_RUL = 'http://localhost:3001'

   // Function to handle login
  const handleLogin = async () => {
    try {
      const response = await fetch(`${BASE_RUL}/api/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      if (response.ok) {
        const data = await response.json();
        const jwtToken = data.token;

        localStorage.clear();
        // Store the JWT token in localStorage
        localStorage.setItem('token', jwtToken);

        // Clearing the token from sessionStorage (e.g., when logging out)
        //sessionStorage.removeItem('token');
        // Storing the token in sessionStorage
        //sessionStorage.setItem('token', jwtToken);
        
        setToken(jwtToken);
        console.log('Login successful');
      } else {
        console.error('Login failed');
      }
    } catch (error) {
      console.error('Error during login:', error);
    }
  };

  // Function to access a protected resource
  const accessProtectedResource = async () => {
    try {
      const tokenFromStorage = localStorage.getItem('token');
      
      if (!tokenFromStorage) {
        console.error('Token not found in localStorage');
        return;
      }

      const response = await fetch('/api/protected', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${tokenFromStorage}`,
        },
      });

      if (response.ok) {
        // Handle the response here
        console.log('Access granted');
      } else {
        console.error('Access denied');
      }
    } catch (error) {
      console.error('Error accessing protected resource:', error);
    }
  };

  return (
    <div>
      {/* <h1>Freelancer and Remoteworker Collaboration Platform</h1> */}

      <div>
        <h2>Login</h2>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        
        <button onClick={handleLogin}>Login</button>
      </div>

      {token && (
        <div>
          <h2>JWT Token</h2>
          <p>{token}</p>
          <button onClick={accessProtectedResource}>Access Protected Resource</button>
        </div>
      )}
    </div>
  );
};

export default RegistrationLogin;
