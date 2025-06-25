import express from "express";
import UserModel from "./users.model.js";

const router = express.Router();

// 注册：创建新用户并自动登录（写入 session）
router.post("/register", async (req, res) => {
  try {
    const { username, password, role, firstName, lastName, email, dob } = req.body;

    const existing = await UserModel.findOne({ username });
    if (existing) return res.status(400).send("Username already exists");

    const newUser = await UserModel.create({
      username,
      password,
      role,
      firstName,
      lastName,
      email,
      dob,
    });

    req.session["currentUser"] = newUser;
    res.status(201).json(newUser);
  } catch (e) {
    console.error("Register error", e);
    res.status(500).send("Error creating user");
  }
});

// 登录：验证账号密码 + 存入 session
router.post("/login", async (req, res) => {
  const { username, password } = req.body;

  const user = await UserModel.findOne({ username, password });
  if (!user) return res.status(401).send("Invalid credentials");

  req.session["currentUser"] = user;
  res.json(user);
});

// 登出：清除 session
router.post("/logout", (req, res) => {
  req.session.destroy();
  res.sendStatus(200);
});

// 获取当前用户
router.get("/profile", (req, res) => {
  const currentUser = req.session["currentUser"];
  if (!currentUser) return res.status(401).send("Not logged in");
  res.json(currentUser);
});

export default router;
