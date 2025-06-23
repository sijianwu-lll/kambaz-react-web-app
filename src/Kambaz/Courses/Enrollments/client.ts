import axios from "axios";

const REMOTE_SERVER = import.meta.env.VITE_REMOTE_SERVER;
const ENROLLMENTS_API = `${REMOTE_SERVER}/api/enrollments`;

// ✅ 获取当前用户已报名的课程 ID 列表
export const findCoursesForUser = async (userId: string) => {
  const response = await axios.get(`${REMOTE_SERVER}/api/users/${userId}/enrollments`);
  return response.data;
};

// ✅ 报名课程
export const enroll = async (userId: string, courseId: string) => {
  const response = await axios.post(`${ENROLLMENTS_API}`, { user: userId, course: courseId });
  return response.data;
};

// ✅ 取消报名
export const unenroll = async (userId: string, courseId: string) => {
  const response = await axios.delete(`${ENROLLMENTS_API}`, {
    data: { user: userId, course: courseId },
  });
  return response.status;
};
