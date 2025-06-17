// server/Kambaz/Database/Courses/routes.js

import * as dao from "./dao.js";
import * as modulesDao from "./Modules/dao.js"; // ✅ 正确导入模块 DAO（注意路径是 ../）

export default function CourseRoutes(app) {
  // ✅ 获取所有课程（可选调试用）
  app.get("/api/courses", (req, res) => {
    const courses = dao.findAllCourses();
    res.json(courses);
  });

  // ✅ 获取某门课程的所有模块
  app.get("/api/courses/:courseId/modules", (req, res) => {
    const { courseId } = req.params;
    const modules = modulesDao.findModulesForCourse(courseId);
    res.json(modules);
  });

  // ✅ 创建某门课程的模块（新增）
  app.post("/api/courses/:courseId/modules", (req, res) => {
    const { courseId } = req.params;
    const module = {
      ...req.body,
      course: courseId, // ✅ 标明模块所属课程
    };
    const newModule = modulesDao.createModule(module);
    res.send(newModule);
  });

  // ✅ 更新课程
  app.put("/api/courses/:courseId", (req, res) => {
    const { courseId } = req.params;
    const courseUpdates = req.body;
    const status = dao.updateCourse(courseId, courseUpdates);
    res.sendStatus(status);
  });

  // ✅ 删除课程
  app.delete("/api/courses/:courseId", (req, res) => {
    const { courseId } = req.params;
    const status = dao.deleteCourse(courseId);
    res.sendStatus(status);
  });
}
