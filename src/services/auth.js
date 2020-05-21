import request from './config';
import { getUserInfo } from '../utils';

/**
 * 用户登录
 * @param {Object: username, password} data
 */
export const userLogin = (data) => {
  return request.post('/auth/login', data);
};

/**
 * 用户注册
 * @param {*} data
 */
export const userRegister = (data) => {
  return request.post('/auth/register', data);
};

/**
 * 获取当前登录用户的保险记录
 */
export const getLoginUserInsurances = () => {
  const username = getUserInfo().username;
  return request.get(`/insu/${username}/insurance`);
};

/**
 * 管理员获取所有注册的用户
 */
export const getAllRegisteredUser = () => {
  return request.get('/users');
};

export const adminDeleteUser = (data) => {
  const { username } = data;
  const { role } = getUserInfo();
  console.log('role = ', role);
  console.log('role = ', typeof role);
  return request.delete(`/users/${username}/${role}`);
};

/**
 * 管理员：修改某个用户的username
 * @param {*} data
 */
export const adminEditUserUsername = (data) => {
  const { id } = data;
  return request.put(`/users/${id}`, data);
};
