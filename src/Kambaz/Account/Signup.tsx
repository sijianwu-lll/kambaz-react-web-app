import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { Form } from "react-bootstrap";
import * as client from "./client";
import { setCurrentUser } from "./reducer";

export default function Signup() {
  const [user, setUser] = useState<any>({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const signup = async () => {
    setError("");

    if (!user.username || !user.password) {
      setError("Username and password are required");
      return;
    }
    if (user.password !== user.confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    try {
      const currentUser = await client.signup(user);
      dispatch(setCurrentUser(currentUser));
      navigate("/Kambaz/Account/Profile");
    } catch (e: any) {
      setError(e?.response?.data?.message || "Signup failed");
    }
  };

  return (
    <div id="wd-signup-screen" className="p-4" style={{ maxWidth: 400 }}>
      <h2 className="mb-4">Sign up</h2>

      {error && <div className="alert alert-danger">{error}</div>}

      <Form.Control
        placeholder="Username"
        className="mb-3"
        value={user.username}
        onChange={(e) => setUser({ ...user, username: e.target.value })}
      />

      <Form.Control
        type="email"
        placeholder="Email"
        className="mb-3"
        value={user.email}
        onChange={(e) => setUser({ ...user, email: e.target.value })}
      />

      <Form.Control
        type="password"
        placeholder="Password"
        className="mb-3"
        value={user.password}
        onChange={(e) => setUser({ ...user, password: e.target.value })}
      />

      <Form.Control
        type="password"
        placeholder="Confirm Password"
        className="mb-3"
        value={user.confirmPassword}
        onChange={(e) =>
          setUser({ ...user, confirmPassword: e.target.value })
        }
      />

      <button onClick={signup} className="btn btn-success w-100 mb-3">
        Create Account
      </button>

      <div className="text-center">
        <Link to="/Kambaz/Account/Signin">Already have an account?</Link>
      </div>
    </div>
  );
}
