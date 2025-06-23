import { Routes, Route, Navigate } from "react-router-dom";
import AccountNavigation from "./Navigation";
import Signin from "./Signin";
import Signup from "./Signup";
import Profile from "./Profile";
import { useSelector } from "react-redux";
import Users from "./Users";

export default function Account() {
  const { currentUser } = useSelector((state: any) => state.accountReducer);

  return (
    <div className="d-flex">
      {/* 左侧导航栏 */}
      <div className="d-none d-md-block">
        <AccountNavigation />
      </div>

      {/* 主内容区域 */}
      <div className="flex-fill p-4" style={{ marginLeft: "120px" }}>
        <Routes>
          {/* ✅ 注意：这里使用相对路径，避免路径解析失败 */}
          <Route
            path=""
            element={
              <Navigate
                to={currentUser ? "Profile" : "Signin"}
              />
            }
          />
          <Route path="Signin" element={<Signin />} />
          <Route path="Signup" element={<Signup />} />
          <Route path="Profile" element={<Profile />} />
          <Route path="Users" element={<Users />} />
          <Route path="Users/:uid" element={<Users />} /> {/* ✅ 支持用户详情 */}
        </Routes>
      </div>
    </div>
  );
}
