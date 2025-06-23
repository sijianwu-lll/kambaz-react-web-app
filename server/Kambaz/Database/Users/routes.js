import * as dao from "./dao.js";
import * as courseDao from "../Courses/dao.js";
import * as enrollmentsDao from "../Enrollments/dao.js";

export default function UserRoutes(app) {
  // ✅ 获取所有用户（支持角色和姓名模糊过滤）
  const findAllUsers = async (req, res) => {
    const { role, name } = req.query;

    if (role) {
      const users = await dao.findUsersByRole(role);
      res.json(users);
      return;
    }

    if (name) {
      const users = await dao.findUsersByPartialName(name);
      res.json(users);
      return;
    }

    const users = await dao.findAllUsers();
    res.json(users);
  };

  // ✅ 根据 ID 查找用户
  const findUserById = async (req, res) => {
    const user = await dao.findUserById(req.params.userId);
    res.json(user);
  };

  // ✅ 创建新用户（用于普通新增，不登录）
  const createUser = async (req, res) => {
    const user = await dao.createUser(req.body);
    res.json(user);
  };

  // ✅ 登录
  const signin = async (req, res) => {
    const { username, password } = req.body;
    console.log("🛂 Signin attempt:", { username, password });

    const user = await dao.findUserByCredentials(username, password);
    console.log("🧬 Lookup result from DB:", user);
    if (!user) {
      res.status(401).send("Invalid credentials");
      return;
    }

    req.session.regenerate((err) => {
      if (err) {
        console.error("❌ Session regenerate failed:", err);
        res.sendStatus(500);
        return;
      }
      req.session.currentUser = user;
      console.log("✅ New session created for:", user.username);
      res.json(user);
    });
  };

  // ✅ 注册用户（并登录）
  const signup = async (req, res) => {
    const existing = await dao.findUserByUsername(req.body.username);
    if (existing) {
      res.status(400).json({ message: "Username already in use" });
      return;
    }
    const newUser = await dao.createUser(req.body);
    req.session.currentUser = newUser;
    res.json(newUser);
  };

  // ✅ 更新用户
  const updateUser = async (req, res) => {
    const userId = req.params.userId;
    const userUpdates = req.body;
    await dao.updateUser(userId, userUpdates);
    const updatedUser = await dao.findUserById(userId);
    req.session.currentUser = updatedUser;
    res.json(updatedUser);
  };

  // ✅ 获取当前用户
  const profile = (req, res) => {
    const currentUser = req.session.currentUser;
    if (currentUser) {
      res.json(currentUser);
    } else {
      res.status(401).send("Not logged in");
    }
  };

  // ✅ 退出登录
  const signout = (req, res) => {
    req.session.destroy();
    res.sendStatus(200);
  };

  // ✅ 获取当前用户所选课程
  const findCoursesForEnrolledUser = async (req, res) => {
    let { userId } = req.params;
    if (userId === "current") {
      const currentUser = req.session.currentUser;
      if (!currentUser) {
        res.sendStatus(401);
        return;
      }
      userId = currentUser._id;
    }
    const courses = await courseDao.findCoursesForEnrolledUser(userId);
    res.json(courses);
  };

  // ✅ 当前用户创建课程并自动报名
  const createCourse = async (req, res) => {
    const currentUser = req.session.currentUser;
    if (!currentUser) {
      res.sendStatus(401);
      return;
    }
    const newCourse = await courseDao.createCourse(req.body);
    await enrollmentsDao.enrollUserInCourse(currentUser._id, newCourse._id);
    res.json(newCourse);
  };

  // ✅ 删除用户
  const deleteUser = async (req, res) => {
    const status = await dao.deleteUser(req.params.userId);
    res.json(status);
  };

  // ✅ 注册所有 REST API 路由
  app.get("/api/users", findAllUsers);
  app.get("/api/users/:userId", findUserById);
  app.post("/api/users", createUser);           // ✅ 新增：通用用户创建接口
  app.post("/api/users/signin", signin);
  app.post("/api/users/signup", signup);
  app.put("/api/users/:userId", updateUser);
  app.post("/api/users/profile", profile);
  app.post("/api/users/signout", signout);
  app.get("/api/users/:userId/courses", findCoursesForEnrolledUser);
  app.post("/api/users/current/courses", createCourse);
  app.delete("/api/users/:userId", deleteUser);
}
