import request from './config';

/**
 * 用户为home保险付款
 * @param {*}} data
 */
export const createHomePayment = (data) => {
  const { id } = data;
  return request.post(`/invoice/${id}`, data);
};
