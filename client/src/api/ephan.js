import axios from 'axios';

export const ephanApi = axios.create({
  baseURL: process.env.REACT_APP_EPHAN_API_URL,
  headers: {
    'Content-Type': 'application/json; charset=utf-8',
  },
});

ephanApi.interceptors.response.use(
  (response) => [null, response.data],
  (error) => [error, null]
);
