import * as dao from "./dao.js";

export default function AssignmentRoutes(app) {
  // ✅ 查找某个课程下的所有作业
  app.get("/api/assignments/course/:courseId", (req, res) => {
    const { courseId } = req.params;
    const assignments = dao.findAssignmentsForCourse(courseId);
    res.json(assignments);
  });

  // ✅ 查找某个模块下的所有作业（可选）
  app.get("/api/assignments/module/:moduleId", (req, res) => {
    const { moduleId } = req.params;
    const assignments = dao.findAssignmentsForModule(moduleId);
    res.json(assignments);
  });

  // ✅ 创建新的作业
  app.post("/api/assignments", (req, res) => {
    const assignment = req.body;
    const newAssignment = dao.createAssignment(assignment);
    res.json(newAssignment);
  });

  // ✅ 删除作业
  app.delete("/api/assignments/:assignmentId", (req, res) => {
    const { assignmentId } = req.params;
    const status = dao.deleteAssignment(assignmentId);
    res.sendStatus(status);
  });

  // ✅ 更新作业
  app.put("/api/assignments/:assignmentId", (req, res) => {
    const { assignmentId } = req.params;
    const assignmentUpdates = req.body;
    const status = dao.updateAssignment(assignmentId, assignmentUpdates);
    res.sendStatus(status);
  });
}
