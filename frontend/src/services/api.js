import axios from 'axios';

const api = axios.create({ baseURL: 'https://superherou-api.herokuapp.com/api' });

api.interceptors.request.use(async (config) => {
  return config;
});

export default api;
