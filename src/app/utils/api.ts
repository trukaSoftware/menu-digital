import axios from 'axios';

const instance = axios.create({
  baseURL: `${process.env.API_URL}`,
  headers: {
    'Content-Type': `application/json`,
  },
});

export default instance;
