import express from "express";
import cors from "cors";
import Lab5 from "./Lab5/index.js";   // ✅ 这是正确的路径

const app = express();
app.use(cors());
app.use(express.json());              // ✅ 允许 JSON body
Lab5(app);                            // ✅ 注册 Lab5 路由模块

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
