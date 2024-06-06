// src/App.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

function TokenStorage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [token, setToken] = useState(localStorage.getItem('token') || ''); // Retrieve token from localStorage

  useEffect(() => {
    // Function to validate and refresh the token if needed
    const validateToken = async () => {
      try {
        if (!token) return;

        // Decode the token to get user information
        const decodedToken = jwt_decode(token);

        // Check if the token is expired
        if (decodedToken.exp * 1000 < Date.now()) {
          // Token is expired
          // Implement token refresh logic here
          // You can make a request to your server to get a new token

          // For now, let's log a message
          console.log('Token expired');
        }
      } catch (error) {
        console.error('Token validation failed:', error);
      }
    };

    // Call the validateToken function when the component mounts
    validateToken();
  }, [token]);

  const handleLogin = async () => {
    try {
      const response = await axios.post('http://localhost:3000/login', {
        username,
        password,
      });

      const newToken = response.data.token;
      setToken(newToken);
      localStorage.setItem('token', newToken); // Store the token in localStorage
    } catch (error) {
      console.error('Login failed:', error);
    }
  };

  return (
    <div>
      {/* ... Login form and token display as before */}
    </div>
  );
}

export default TokenStorage;
