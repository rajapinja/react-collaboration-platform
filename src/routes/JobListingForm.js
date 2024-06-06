import React, { useState } from 'react';

const BASE_RUL = 'http://localhost:3001'

const JobListingForm = () => {

  const [token, setToken] = useState(localStorage.getItem('token') || ''); // Retrieve token from localStorage
  const [jobData, setJobData] = useState({
    jobTitle: '',
    description: '',
    skills_required: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setJobData({
      ...jobData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("jobData :", jobData);
    // In a real application, you would make a POST request to your backend
    try {
            const response = await fetch(`${BASE_RUL}/api/joblisting`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
            body: JSON.stringify({jobData}),
            });

            if (response.ok) {
            const data = await response.json();      
            console.log('Job creation successful');
            } else {
            console.error('Job creation failed');
            }
        } catch (error) {
            console.error('Error during Profile creation:', error);
        }

        console.log('Job Listing Data to be sent:', jobData);

    // Reset the form fields
    setJobData({
      jobTitle: '',
      description: '',
      skills_required: '',
    });
  };

  return (
    <div>
      <h2>Create Job Listing</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="jobTitle">Job Title:</label>
          <input
            type="text"
            id="jobTitle"
            name="jobTitle"
            value={jobData.jobTitle}
            onChange={handleInputChange}
            placeholder="Job Title"
            required
          />
        </div>
        <div>
          <label htmlFor="description">Description:</label>
          <textarea
            id="description"
            name="description"
            value={jobData.description}
            onChange={handleInputChange}
            placeholder="Job Description"
            required
          />
        </div>
        <div>
          <label htmlFor="skills_required">Skills Required:</label>
          <input
            type="text"
            id="skills_required"
            name="skills_required"
            value={jobData.skills_required}
            onChange={handleInputChange}
            placeholder="Skills Required"
            required
          />
        </div>
        <button type="submit">Create Job Listing</button>
      </form>
    </div>
  );
};

export default JobListingForm;
