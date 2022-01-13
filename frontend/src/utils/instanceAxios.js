import axios from 'axios';

// инстанс для аксиоса, чтобы каждый раз не писать одно и то же
export const instanceAxios = axios.create({
  baseURL: 'http://localhost:5000/api/',
  headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
});

export const API_URL = `http://localhost:5000/`;
// отрефакторил отдельно маршрут для использования в паре функций
