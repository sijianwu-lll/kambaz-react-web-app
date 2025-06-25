import express from "express";
import session from "express-session";

// ✅ 引入 RESTful API 路由模块
import CourseRoutes from "./Database/Courses/routes.js";
import ModuleRoutes from "./Database/Courses/Modules/routes.js";
import AssignmentRoutes from "./Database/Assignments/routes.js";
import UsersRoutes from "./Database/Users/users.routes.js";

export default function Kambaz(app) {
  // ✅ 处理 JSON 请求体
  app.use(express.json());

  // ✅ 启用 Session（保持登录状态）
  app.use(session({
    secret: "super secret session phrase", // 可替换为 .env 中的值
    resave: false,
    saveUninitialized: false,
  }));

  // ✅ 设置 CORS 以允许跨域请求（如前后端端口不同）
  app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "http://127.0.0.1:5173"); // ⬅ 替换为你的前端地址
    res.setHeader("Access-Control-Allow-Credentials", "true");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type");
    res.setHeader("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE");
    next();
  });

  // ✅ 注册 API 路由
  CourseRoutes(app);
  ModuleRoutes(app);
  AssignmentRoutes(app);
  app.use("/api/users", UsersRoutes); // ✅ 注册用户路由
}
