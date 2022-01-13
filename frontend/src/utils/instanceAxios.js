import axios from 'axios';

export const instanceAxios = axios.create({
  baseURL: 'http://localhost:5000/api/',
  headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
});

export const API_URL = `http://localhost:5000/`;
