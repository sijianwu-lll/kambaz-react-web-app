import { HashRouter, Route, Routes, Navigate } from "react-router-dom";
import Labs from "./Labs";
import Kambaz from "./Kambaz";
import Account from "./Kambaz/Account"; // ✅ 引入 Account 屏幕

export default function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<Navigate to="Kambaz" />} />
        <Route path="/Labs/*" element={<Labs />} />
        <Route path="/Kambaz/*" element={<Kambaz />} />
        <Route path="/Account/*" element={<Account />} /> {/* ✅ 移除 Kambaz 前缀 */}
      </Routes>
    </HashRouter>
  );
}
