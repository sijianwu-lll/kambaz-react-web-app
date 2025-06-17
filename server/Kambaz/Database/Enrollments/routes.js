import * as dao from "./dao.js";

export default function EnrollmentRoutes(app) {
  // 获取某用户的报名课程
  app.get("/api/users/:userId/enrollments", (req, res) => {
    const { userId } = req.params;
    const courses = dao.findCoursesForUser(userId);
    res.json(courses);
  });

  // 学生报名课程
  app.post("/api/enrollments", (req, res) => {
    const { user, course } = req.body;
    const enrollment = dao.enrollUserInCourse(user, course);
    res.json(enrollment);
  });

  // 取消报名
  app.delete("/api/enrollments", (req, res) => {
    const { user, course } = req.body;
    const status = dao.unenrollUserFromCourse(user, course);
    res.sendStatus(status);
  });
}
