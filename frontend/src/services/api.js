import axios from 'axios';

const api = axios.create({ baseURL: 'https://superheroo-api.herokuapp.com/api/' });

api.interceptors.request.use(async (config) => {
  return config;
});

export default api;
