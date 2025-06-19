import axios from "axios";

// ✅ 后端地址：从 .env 中读取
export const REMOTE_SERVER = import.meta.env.VITE_REMOTE_SERVER ?? "http://localhost:4000";
export const USERS_API = `${REMOTE_SERVER}/api/users`;

// ✅ 统一带 cookie 的 axios 实例（支持跨域身份验证）
const axiosWithCredentials = axios.create({
  withCredentials: true,
});

// ✅ 登录
export const signin = async (credentials: any) => {
  const response = await axiosWithCredentials.post(`${USERS_API}/signin`, credentials);
  return response.data;
};

// ✅ 注册
export const signup = async (user: any) => {
  const response = await axiosWithCredentials.post(`${USERS_API}/signup`, user);
  return response.data;
};

// ✅ 获取当前登录用户（用于刷新页面恢复登录）
export const profile = async () => {
  const response = await axiosWithCredentials.post(`${USERS_API}/profile`);
  return response.data;
};

// ✅ 更新用户信息
export const updateUser = async (user: any) => {
  const response = await axiosWithCredentials.put(`${USERS_API}/${user._id}`, user);
  return response.data;
};

// ✅ 退出登录
export const signout = async () => {
  const response = await axiosWithCredentials.post(`${USERS_API}/signout`);
  return response.data;
};

// ✅ 获取当前用户已选课程
export const findMyCourses = async () => {
  const response = await axiosWithCredentials.get(`${USERS_API}/current/courses`);
  return response.data;
};

// ✅ 创建课程并自动报名
export const createCourse = async (course: any) => {
  const response = await axiosWithCredentials.post(`${USERS_API}/current/courses`, course);
  return response.data;
};

// ✅ 获取所有用户（新增功能）
export const findAllUsers = async () => {
  const response = await axiosWithCredentials.get(USERS_API);
  return response.data;
};
