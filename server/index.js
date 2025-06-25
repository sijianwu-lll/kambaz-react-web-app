// ✅ 加载环境变量（.env）
import dotenv from "dotenv";
dotenv.config();

// ✅ 应用相关模块
import express from "express";
import cors from "cors";
import session from "express-session";

// ✅ 路由模块
import Lab5 from "./Lab5/index.js";
import Kambaz from "./Kambaz/index.js";
import UserRoutes from "./Kambaz/Database/Users/routes.js";
import CourseRoutes from "./Kambaz/Database/Courses/routes.js";
import ModuleRoutes from "./Kambaz/Database/Courses/Modules/routes.js";
import EnrollmentRoutes from "./Kambaz/Database/Enrollments/routes.js";

const app = express();

console.log("🧪 NETLIFY_URL =", process.env.NETLIFY_URL);

// ✅ 1. 配置 CORS
app.use(
  cors({
    credentials: true,
    origin: process.env.NETLIFY_URL || "http://localhost:5173",
  })
);

// ✅ 2. 配置 Session（放在 CORS 后）
const sessionOptions = {
  secret: process.env.SESSION_SECRET || "kambaz",
  resave: false,
  saveUninitialized: false,
};

if (process.env.NODE_ENV !== "development") {
  sessionOptions.proxy = true;
  sessionOptions.cookie = {
    sameSite: "none",
    secure: true,
    domain: process.env.NODE_SERVER_DOMAIN,
  };
}

app.use(session(sessionOptions));

// ✅ 3. 支持 JSON 请求体
app.use(express.json());

// ✅ 4. 注册所有后端路由
Lab5(app);
Kambaz(app);
UserRoutes(app);
CourseRoutes(app);
ModuleRoutes(app);
EnrollmentRoutes(app);

// ✅ 5. 启动服务器
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
