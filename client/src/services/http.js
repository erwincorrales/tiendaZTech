import axios from "axios";

const token = JSON.parse(sessionStorage.getItem('e1TiendaToken'))?.token ?? ''

export const http = axios.create({
    baseURL: 'http://localhost:3001'
});

http.interceptors.request.use(
  function (config) {
    config.headers['Authorization'] = `Bearer ${token}`
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

// Add a response interceptor
http.interceptors.response.use(
  function (response) {
    return response;
  },
  function (error) {
    return Promise.reject(error);
  }
);
