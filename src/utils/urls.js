const apiURL = 
  process.env.NODE_ENV === 'production' ? 
  'https://panteon-server.herokuapp.com:55021' :
  'http://localhost:5000';

export default apiURL;