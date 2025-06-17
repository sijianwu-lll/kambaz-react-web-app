import Database from "../index.js";
import { v4 as uuidv4 } from "uuid";

// ✅ 查找某门课程下的所有作业
export function findAssignmentsForCourse(courseId) {
  return Database.assignments.filter(
    (assignment) => assignment.course === courseId
  );
}

// ✅ 查找某个模块下的所有作业（可选）
export function findAssignmentsForModule(moduleId) {
  return Database.assignments.filter(
    (assignment) => assignment.module === moduleId
  );
}

// ✅ 创建新作业
export function createAssignment(assignment) {
  const newAssignment = { ...assignment, _id: uuidv4() };
  Database.assignments.push(newAssignment);
  return newAssignment;
}

// ✅ 删除作业
export function deleteAssignment(assignmentId) {
  Database.assignments = Database.assignments.filter(
    (assignment) => assignment._id !== assignmentId
  );
  return 204;
}

// ✅ 更新作业
export function updateAssignment(assignmentId, updates) {
  const assignment = Database.assignments.find(
    (a) => a._id === assignmentId
  );
  if (assignment) {
    Object.assign(assignment, updates);
    return 204;
  } else {
    return 404;
  }
}
