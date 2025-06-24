// ✅ 0. 加载 .env 环境变量
import dotenv from "dotenv";
dotenv.config();
console.log("🧪 NETLIFY_URL =", process.env.NETLIFY_URL);

// ✅ 0.5: 导入并连接 MongoDB
import mongoose from "mongoose";
const CONNECTION_STRING = process.env.MONGO_CONNECTION_STRING || "mongodb://127.0.0.1:27017/kambaz";
mongoose.connect(CONNECTION_STRING)
  .then(() => {
    console.log(`✅ Connected to MongoDB at: ${CONNECTION_STRING}`);
  })
  .catch(err => {
    console.error("❌ MongoDB connection error:", err);
  });


// ✅ 1. 初始化 Express 应用
import express from "express";
import cors from "cors";
import session from "express-session";

// ✅ 2. 应用模块
import Lab5 from "./Lab5/index.js";
import Kambaz from "./Kambaz/index.js";
import UserRoutes from "./Kambaz/Database/Users/routes.js";
import CourseRoutes from "./Kambaz/Database/Courses/routes.js";
import ModuleRoutes from "./Kambaz/Database/Courses/Modules/routes.js";
import EnrollmentRoutes from "./Kambaz/Database/Enrollments/routes.js";

const app = express();
console.log("✅ CURRENT ALLOWED ORIGIN:", process.env.NETLIFY_URL);

// ✅ 3. CORS 配置
app.use(
  cors({
    credentials: true,
    origin: process.env.NETLIFY_URL || "http://localhost:5173",
  })
);

// ✅ 4. Session 配置（统一设置开发环境也适用）
const sessionOptions = {
  secret: process.env.SESSION_SECRET || "kambaz",
  resave: false,
  saveUninitialized: false,
  cookie: {
    sameSite: "lax",    // ✅ 开发模式使用 lax 可写 cookie
    secure: false       // ✅ 本地 http 不启用 secure
  }
};
app.use(session(sessionOptions));

// ✅ 5. JSON 支持
app.use(express.json());

// ✅ 6. 注册路由
Lab5(app);
Kambaz(app);
UserRoutes(app);
CourseRoutes(app);
ModuleRoutes(app);
EnrollmentRoutes(app);

// ✅ 7. 启动服务
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`✅ Server running at http://localhost:${PORT}`);
});
