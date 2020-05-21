import request from './config';
import { getUserInfo } from '../utils';

/**
 * 用户操作：更新Home保险单信息
 * @param {*} data
 */
export const updateHomeInsuById = (data) => {
  const { id } = data;
  return request.put(`/insu/home/${id}`, data);
};

/**
 * 用户操作：更新Auto保险单信息
 * @param {*} data
 */
export const updateAutoInsuById = (data) => {
  const { id } = data;
  return request.put(`/insu/auto/${id}`, data);
};

/**
 * 用户操作：购买新的保险(Home类型保险)
 * @param {*} data
 */
export const createInsu = (data) => {
  const username = getUserInfo().username;
  return request.post(`/insu/${username}/home`, data);
};

/**
 * 用户操作：购买新的保险(Auto类型保险)
 * @param {*} data
 */
export const createAutoInsu = (data) => {
  const username = getUserInfo().username;
  return request.post(`/insu/${username}/auto`, data);
};

/**
 * 管理员：获取所有的保险已购买信息
 */
export const adminUserGetAllInsu = () => {
  return request.get('/insu/insurances');
};

/**
 * 管理员：删除某个home类型保险
 */
export const adminDeleteHomeInsu = (data) => {
  const { id } = data;
  return request.delete(`/insu/home/${id}`);
};

/**
 * 管理员：删除某个auto类型保险
 */
export const adminDeleteAutoInsu = (data) => {
  const { id } = data;
  return request.delete(`/insu/auto/${id}`);
};
