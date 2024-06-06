import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useTable } from 'react-table';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';

const BASE_URL='http://127.0.0.1:3001';


const Matches = () => {
  const [matchesData, setMatchesData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [token, setToken] = useState(localStorage.getItem('token') || '');

//   useEffect(() => {
//     axios
//       .get(`${BASE_URL}api/get-matches`) // Replace with your Python backend URL
//       .then((response) => {        
//         setMatchesData(response.data);
//         setLoading(false);
//         console.log("response.data :", response.data.Matches);
//       })
//       .catch((error) => {
//         console.error('Error fetching data:', error);
//         setLoading(false);
//       });
//   }, [token]);

  const handleSkillMatches = async () => {  
    try {
          const headers = {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          };
  
          const response = await axios.get(`${BASE_URL}/api/get-matches`, { headers });
          // Handle the response data here
          const { matches } = response.data;
          setMatchesData(matches);
          console.log("Matches :", response.data);
     } catch (error) {
          console.error('Error:', error);
    }      
  }

  return (
    <div>
      <h2>Matches Data</h2>     
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Freelancer Id</TableCell>
              <TableCell>Job Id</TableCell>
              <TableCell>Skills Match Score</TableCell>             
            </TableRow>
          </TableHead>
          <TableBody>
            {matchesData.map((match) => (
              <TableRow>
                <TableCell>{match.freelancer_id}</TableCell>               
                <TableCell>{match.job_id}</TableCell>   
                <TableCell>{match.match_score}</TableCell>            
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
     <button onClick={handleSkillMatches}>Skill Matches</button>
    </div>
  );
};

export default Matches;
