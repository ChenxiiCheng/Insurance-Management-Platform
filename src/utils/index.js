const USER_TOKEN = 'USER_TOKEN';
const USER_INFO = 'USER_INFO';

/**
 * 用户登录/注册成功，存储返回的token值到localStorage
 * @param {*} token
 */
export const setUserToken = (token) => {
  localStorage.setItem(USER_TOKEN, JSON.stringify(token));
};

/**
 * 获取localStorage中的USER_TOKEN放入请求头里
 */
export const getUserToken = () => {
  return localStorage.getItem(USER_TOKEN);
};

/**
 * 用户登录/注册成功，存储返回的用户信息到localStorage
 * @param {*} data
 */
export const setUserInfo = (data) => {
  localStorage.setItem(USER_INFO, JSON.stringify(data));
};

/**
 * 获取localStorage中用户的信息USER_INFO
 */
export const getUserInfo = () => {
  const userInfo = localStorage.getItem(USER_INFO);
  if (userInfo) {
    return JSON.parse(userInfo);
  } else {
    return null;
  }
};

/**
 * 用户退出系统，清空localStorage中的所有item，路由会判断出没登录跳转到登录页面
 */
export const userLogout = () => {
  localStorage.clear();
};

/**
 * 根据localStorage里USER_INFO项是否有值来判断用户是否登陆
 * 用于进入系统首页路由判断，若用户没登录，不能访问这个路由
 * 重定向到登陆页面
 */
export const authLogin = () => {
  const loginUser = localStorage.getItem(USER_INFO);
  if (loginUser) {
    return true;
  } else {
    return false;
  }
};

/**
 * 判断该登录用户的role是否是admin，若不是无法访问控制面板
 */
export const isAdminRole = () => {
  const { role } = getUserInfo();
  if (role === 'admin') {
    return true;
  }
  return false;
};
