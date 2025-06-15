import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FormControl, Button } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { setCurrentUser } from "./reducer";
import * as client from "./client";  // ✅ 使用 REST API 调用后端

export default function Signin() {
  const [credentials, setCredentials] = useState<any>({});
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const signin = async () => {
    try {
      const user = await client.signin(credentials);  // ✅ 调用真实接口
      if (!user || !user._id) {
        alert("Invalid credentials");
        return;
      }
      dispatch(setCurrentUser(user));
      navigate("/Kambaz/Dashboard");
    } catch (e) {
      console.error("Sign in error", e);
      alert("Server error or invalid credentials");
    }
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
