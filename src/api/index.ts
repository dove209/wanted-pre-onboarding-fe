import Axios from 'axios';

const axios = Axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  headers: {
    'Content-type': 'application/json',
  },
});

axios.interceptors.request.use(
  (config) => {
      const accessToken = localStorage.getItem('user');
      if(accessToken) {
        config.headers = { Authorization: `Bearer ${accessToken}` }
      }
      return config;
  }, 
  (error) => {
      return Promise.reject(error);
  }
);

export default axios;

