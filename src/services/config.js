import axios from 'axios';
import { getUserToken } from '../utils/index';

const instance = axios.create({
  baseURL: 'http://172.81.242.65:4000',
  timeout: 5000,
});

// 全局请求拦截
instance.interceptors.request.use(
  function (config) {
    config.headers['authorization'] = 'Bearer ' + getUserToken();
    return config;
  },
  function (err) {
    return Promise.reject(err);
  }
);

instance.interceptors.response.use(
  function (response) {
    return response.data;
  },
  function (err) {
    return Promise.reject(err);
  }
);

export default instance;
