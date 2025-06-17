import axios from "axios";

// ✅ 远程后端地址
const REMOTE_SERVER = import.meta.env.VITE_REMOTE_SERVER;
const COURSES_API = `${REMOTE_SERVER}/api/courses`;

// ✅ 带 cookie 的 axios 实例（用于需要身份验证的请求）
const axiosWithCredentials = axios.create({ withCredentials: true });

// ✅ 获取所有课程（一般仅调试或 FACULTY 用）
export const fetchAllCourses = async () => {
  const { data } = await axios.get(COURSES_API);
  return data;
};

// ✅ 删除指定课程（需要 cookie 验证身份）
export const deleteCourse = async (courseId: string) => {
  const response = await axiosWithCredentials.delete(`${COURSES_API}/${courseId}`);
  return response.status; // 204 表示成功无内容
};

// ✅ 更新课程（需要身份验证）
export const updateCourse = async (course: any) => {
  const { data } = await axiosWithCredentials.put(`${COURSES_API}/${course._id}`, course);
  return data;
};

// ✅ 获取某课程的所有模块（公开数据，不需 cookie）
export const findModulesForCourse = async (courseId: string) => {
  const response = await axios.get(`${COURSES_API}/${courseId}/modules`);
  return response.data;
};

// ✅ 创建模块（需要权限，使用带 cookie 的请求）
export const createModuleForCourse = async (courseId: string, module: any) => {
  const response = await axiosWithCredentials.post(`${COURSES_API}/${courseId}/modules`, module);
  return response.data;
};
