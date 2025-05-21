import { Routes, Route, Navigate } from "react-router-dom";
import AccountNavigation from "./Navigation";
import Signin from "./Signin";
import Signup from "./Signup";
import Profile from "./Profile";

export default function Account() {
  return (
    <div className="d-flex">
      {/* 左侧导航栏 */}
      <div className="d-none d-md-block">
        <AccountNavigation />
      </div>

      {/* 主内容 */}
      <div className="flex-fill p-4">
        <Routes>
          <Route path="/" element={<Navigate to="Signin" />} />
          <Route path="Signin" element={<Signin />} />
          <Route path="Signup" element={<Signup />} />
          <Route path="Profile" element={<Profile />} />
        </Routes>
      </div>
    </div>
  );
}
