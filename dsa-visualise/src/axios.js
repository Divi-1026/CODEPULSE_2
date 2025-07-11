import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://codepulse-2-1.onrender.com',
});

export default instance;
