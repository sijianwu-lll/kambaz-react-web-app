import axios from "axios";

const REMOTE_SERVER = import.meta.env.VITE_REMOTE_SERVER;
const ASSIGNMENTS_API = `${REMOTE_SERVER}/api/assignments`;

// ✅ axios 实例：附带 cookie（用于需要身份验证）
const axiosWithCredentials = axios.create({ withCredentials: true });

// ✅ 查询某门课程下的所有作业
export const findAssignmentsForCourse = async (courseId: string) => {
  const response = await axios.get(`${ASSIGNMENTS_API}/course/${courseId}`);
  return response.data;
};

// ✅ 创建新作业
export const createAssignment = async (assignment: any) => {
  const response = await axiosWithCredentials.post(`${ASSIGNMENTS_API}`, assignment);
  return response.data;
};

// ✅ 删除作业
export const deleteAssignment = async (assignmentId: string) => {
  const response = await axiosWithCredentials.delete(`${ASSIGNMENTS_API}/${assignmentId}`);
  return response.status;
};

// ✅ 更新作业
export const updateAssignment = async (assignment: any) => {
  const response = await axiosWithCredentials.put(`${ASSIGNMENTS_API}/${assignment._id}`, assignment);
  return response.status;
};
