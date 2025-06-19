import { Routes, Route, Navigate } from "react-router-dom";
import AccountNavigation from "./Navigation";
import Signin from "./Signin";
import Signup from "./Signup";
import Profile from "./Profile";
import { useSelector } from "react-redux";
import Users from "./Users"; // ✅ 新增导入

export default function Account() {
  const { currentUser } = useSelector((state: any) => state.accountReducer);

  return (
    <div className="d-flex">
      {/* 左侧导航栏 */}
      <div className="d-none d-md-block">
        <AccountNavigation />
      </div>

      {/* 主内容 */}
      <div className="flex-fill p-4" style={{ marginLeft: "120px" }}>
        <Routes>
          {/* ✅ 根据登录状态跳转默认页面 */}
          <Route
            path="/"
            element={
              <Navigate
                to={currentUser ? "/Kambaz/Account/Profile" : "/Kambaz/Account/Signin"}
              />
            }
          />
          <Route path="/Signin" element={<Signin />} />
          <Route path="/Signup" element={<Signup />} />
          <Route path="/Profile" element={<Profile />} />
          <Route path="/Users" element={<Users />} /> {/* ✅ 新增路由 */}
        </Routes>
      </div>
    </div>
  );
}
