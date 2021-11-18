const apiURL = 
  process.env.NODE_ENV === 'production' ? 
  'https://panteon-server.herokuapp.com' :
  'http://localhost:5000';

export default apiURL;