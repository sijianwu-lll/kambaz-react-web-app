import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FormControl, Button } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { setCurrentUser } from "./reducer";
import { users } from "../Database";  // ✅ 正确解构导入 users

export default function Signin() {
  const [credentials, setCredentials] = useState<any>({});
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const signin = () => {
    const user = users.find(
      (u: any) =>
        u.username === credentials.username &&
        u.password === credentials.password
    );
    if (!user) return; // 登录失败不处理

    dispatch(setCurrentUser(user)); // 写入 Redux
    navigate("/Kambaz/Dashboard"); // 成功后跳转
  };

  return (
    <div id="wd-signin-screen" className="p-4" style={{ maxWidth: 400 }}>
      <h2 className="mb-4">Sign in</h2>

      <FormControl
        id="wd-username"
        placeholder="Username"
        className="mb-3"
        value={credentials.username || ""}
        onChange={(e) =>
          setCredentials({ ...credentials, username: e.target.value })
        }
      />
      <FormControl
        id="wd-password"
        placeholder="Password"
        type="password"
        className="mb-3"
        value={credentials.password || ""}
        onChange={(e) =>
          setCredentials({ ...credentials, password: e.target.value })
        }
      />

      <Button
        id="wd-signin-btn"
        className="btn btn-primary w-100 mb-3"
        onClick={signin}
      >
        Sign in
      </Button>

      <div className="text-center">
        <Link id="wd-signup-link" to="/Kambaz/Account/Signup">
          Don't have an account? Sign up
        </Link>
      </div>
    </div>
  );
}
