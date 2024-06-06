import React, { useEffect, useState } from 'react';
import axios from 'axios'; // Import Axios or use fetch
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';


const BASE_URL = 'http://localhost:3001'


function ProfileList() {
  const [profiles, setProfiles] = useState([]);
  const [token, setToken] = useState(localStorage.getItem('token') || '');

 useEffect(() => {
    // Make an HTTP GET request to fetch profiles
    async function fetchData() {
      try {
        const headers = {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        };

        const response = await axios.get(`${BASE_URL}/api/profileslist`, { headers });
        setProfiles(response.data.profiles);
      } catch (error) {
        console.error('Error:', error);
      }
    }

    // Call the fetchData function
    fetchData();
  }, [token]);

  const handleProfiles = async () => {  
    try {
          const headers = {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          };
  
          const response = await axios.get(`${BASE_URL}/api/profileslist`, { headers });
          // Handle the response data here
          const { profiles } = response.data;
          setProfiles(profiles);
         
     } catch (error) {
          console.error('Error:', error);
    }      
  }

  return (
    // <div>
    //   <h1>Profiles</h1>
    //   <button onClick={handleProfiles}>Get Profiles</button>
    //   <ul>
    //     {profiles !== null &&
    //       profiles.map((profile) => (
    //         <li key={profile._id}>
    //           <p>Name: {profile.profileName}</p>
    //           <p>Skills: {profile.skills}</p>
    //         </li>
    //       ))}
    //   </ul>
    // </div>

    <div>
      <h2>Profiles</h2>
      {/* <button onClick={handleProfiles}>Get Profiles</button> */}
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Role</TableCell>
              <TableCell>Skills</TableCell>
              <TableCell>Experience</TableCell>
              <TableCell>Freelancer_Id</TableCell>
              <TableCell>RemoteWorker_Id</TableCell>
              <TableCell>Employee_id</TableCell>
              <TableCell>PortfolioLink</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {profiles.map((profile) => (
              <TableRow key={profile._id}>
                <TableCell>{profile.profileName}</TableCell>
                <TableCell>{profile.role}</TableCell>
                <TableCell>{profile.skills}</TableCell>
                <TableCell>{profile.experience}</TableCell>
                <TableCell>{profile.freelancer_id}</TableCell>
                <TableCell>{profile.remoteworker_id}</TableCell>
                <TableCell>{profile.employee_id}</TableCell>
                <TableCell>{profile.portfolioLink}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  
  );
}

export default ProfileList;
