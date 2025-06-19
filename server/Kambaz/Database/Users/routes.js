// server/Kambaz/Database/Users/routes.js

import * as dao from "./dao.js";
import * as courseDao from "../Courses/dao.js";
import * as enrollmentsDao from "../Enrollments/dao.js";

export default function UserRoutes(app) {
  // ✅ 获取所有用户
  const findAllUsers = async (req, res) => {
    const users = await dao.findAllUsers();
    res.json(users);
  };

  // ✅ 登录（异步）
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

  // ✅ 注册（异步）
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

  // ✅ 更新用户（异步）
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

  // ✅ 获取当前用户所选课程（异步）
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

  // ✅ 当前用户创建课程并自动报名（异步）
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

  // ✅ 注册所有 REST API 路由
  app.get("/api/users", findAllUsers);  // ✅ 新增
  app.post("/api/users/signin", signin);
  app.post("/api/users/signup", signup);
  app.put("/api/users/:userId", updateUser);
  app.post("/api/users/profile", profile);
  app.post("/api/users/signout", signout);
  app.get("/api/users/:userId/courses", findCoursesForEnrolledUser);
  app.post("/api/users/current/courses", createCourse);
}
