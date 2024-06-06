// Retrieving the token from localStorage
const token = localStorage.getItem('token');

// Include the token in the request headers
fetch('/api/protected-resource', {
  method: 'GET',
  headers: {
    'Authorization': `Bearer ${token}`,
  },
})
  .then(response => {
    // Handle the response here
  })
  .catch(error => {
    // Handle any errors
  });
