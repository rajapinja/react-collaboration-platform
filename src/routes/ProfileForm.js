// ProfileForm.js
import React, { useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import MyDropdown from '../component/MyDropdown';

const BASE_RUL = 'http://localhost:3001'

// Retrieving the token from localStorage
//const token = localStorage.getItem('token');

// Retrieving the token from sessionStorage
//const token = sessionStorage.getItem('token');


function ProfileForm() {
  const [token, setToken] = useState(localStorage.getItem('token') || ''); // Retrieve token from localStorage
  const [selectedValue, setSelectedValue] = useState('');
  const [profileData, setProfileData] = useState({  
    profileName: '',  
    skills: [],
    experience: 0,
    portfolioLink: '',
    jobTitle:'',
  });
 

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfileData({ ...profileData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("profileData :", profileData);
    console.log("token :", token);
    try {
          const response = await fetch(`${BASE_RUL}/api/profiles`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
          body: JSON.stringify({profileData}),
      });

      if (response.ok) {
        const data = await response.json();      
        console.log('Profile creation successful');
      } else {
        console.error('Profile creation failed');
      }
    } catch (error) {
      console.error('Error during Profile creation:', error);
    }
  };

  return (
    
    <form onSubmit={handleSubmit}>
      <div><h2>Profile Form</h2></div>
      <input
        type="text"
        name="profileName"
        value={profileData.profileName}
        onChange={handleChange}
        placeholder="Profile Name"
      /> 
       <select name="jobTitle" value={profileData.selectedValue} onChange={handleChange}>
        <option value="">Select Employment type</option>
        <option value="freelancer">Freelancer</option>
        <option value="remoteWorker">Remote Worker</option>
        <option value="employee">Employee</option>
      </select>    
      <input
        type="text"
        name="skills"
        value={profileData.skills}
        onChange={handleChange}
        placeholder="Skills"
      />
             <textarea
        name="experience"
        value={profileData.experience}
        onChange={handleChange}
        placeholder="Experience"
      />         
      <input
        type="text"
        name="portfolioLink"
        value={profileData.portfolioLink}
        onChange={handleChange}
        placeholder="Portfolio Link"
      />
      {/* <MyDropdown 
        name="jobTitle"
        onChange={handleChange}
        onValueChange={setSelectedValue} 
      /> */}
      <button type="submit">Create Profile</button>
    </form>
  );
}

export default ProfileForm;
