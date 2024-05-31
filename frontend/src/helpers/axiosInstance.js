import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5000/api',
  headers: {
    'Content-Type': 'application/json',
  },
});


api.interceptors.request.use(
  config => {
    // config.headers['Authorization'] = 'Bearer ' + token;
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  response => response,
  error => {
    console.error('Error en la respuesta:', error);
    return Promise.reject(error);
  }
);

export default api;
