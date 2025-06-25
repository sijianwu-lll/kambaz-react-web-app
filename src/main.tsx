import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "bootstrap/dist/css/bootstrap.min.css";             // ✅ 样式
import "bootstrap/dist/js/bootstrap.bundle.min.js";        // ✅ 新增 JS 功能支持
import App from "./App.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>
);
