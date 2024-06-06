import React, { useState } from 'react';

const MyDropdown = ({ onValueChange }) => {
  const [selectedValue, setSelectedValue] = useState('');

  const handleDropdownChange = (event) => {
    const newValue = event.target.value;
    setSelectedValue(newValue);
    onValueChange(newValue); // Notify the parent component (ProfileForm)
  };

  return (
    <div>
      <select value={selectedValue} onChange={handleDropdownChange}>
        <option value="">Select One</option>
        <option value="freelancer">Freelancer</option>
        <option value="remoteWorker">Remote Worker</option>
        <option value="employee">Employee</option>
      </select>
    </div>
  );
};

export default MyDropdown;
