import Database from "../index.js";
import { v4 as uuidv4 } from "uuid";

// ✅ 学生报名课程
export function enrollUserInCourse(userId, courseId) {
  const enrollment = {
    _id: uuidv4(),
    user: userId,
    course: courseId,
  };
  Database.enrollments.push(enrollment);
  return enrollment;
}

// ✅ 学生取消报名
export function unenrollUserFromCourse(userId, courseId) {
  Database.enrollments = Database.enrollments.filter(
    (e) => !(e.user === userId && e.course === courseId)
  );
  return 204;
}

// ✅ 获取某个用户已报名的课程
export function findCoursesForUser(userId) {
  return Database.enrollments.filter((e) => e.user === userId);
}
