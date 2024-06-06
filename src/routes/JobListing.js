import React, { useEffect, useState } from 'react';
import axios from 'axios'; // Import Axios or use fetch
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';

const BASE_URL = 'http://localhost:3001'

function JobList() {
  const [jobs, setJobs] = useState([]);
  const [token, setToken] = useState(localStorage.getItem('token') || '');

 useEffect(() => {
    // Make an HTTP GET request to fetch profiles
    async function fetchData() {
      try {
        const headers = {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        };

        const response = await axios.get(`${BASE_URL}/api/joblist`, { headers });
          // Handle the response data here
          const { jobs } = response.data;
          setJobs(jobs);
         
      } catch (error) {
        console.error('Error:', error);
      }
    }

    // Call the fetchData function
    fetchData();
  }, [token]);

  const handleJobs = async () => {  
    try {
          const headers = {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          };
  
          const response = await axios.get(`${BASE_URL}/api/joblist`, { headers });
          // Handle the response data here
          const { jobs } = response.data;
          setJobs(jobs);
         
     } catch (error) {
          console.error('Error:', error);
    }      
  }

  return (
      <div>
      <h2>Jobs</h2>
      {/* <button onClick={handleJobs}>Get Job Listings</button> */}
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Job Title</TableCell>
              <TableCell>Job Description</TableCell>
              <TableCell>Skills Required</TableCell>             
            </TableRow>
          </TableHead>
          <TableBody>
            {jobs.map((job) => (
              <TableRow key={job._id}>
                <TableCell>{job.jobTitle}</TableCell>               
                <TableCell>{job.description}</TableCell>   
                <TableCell>{job.skills_required}</TableCell>            
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  
  );
}

export default JobList;
