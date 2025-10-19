import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://codepulse-2-cdpc.onrender.com',
  withCredentials: true,            
});

export default instance;