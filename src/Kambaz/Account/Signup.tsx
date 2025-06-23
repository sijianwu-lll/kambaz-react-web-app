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
    firstName: "",
    lastName: "",
    dob: "2000-01-01", // 默认合法格式
    role: "USER",
    loginId: "N/A",
    section: "S101",
    totalActivity: "00:00:00",
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
      const payload = { ...user };
      delete payload.confirmPassword;
      const currentUser = await client.signup(payload);
      dispatch(setCurrentUser(currentUser));
      navigate("/Kambaz/Account/Profile");
    } catch (e: any) {
      setError(e?.response?.data?.message || "Signup failed");
    }
  };

  return (
    <div id="wd-signup-screen" className="p-4" style={{ maxWidth: 500 }}>
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
        onChange={(e) => setUser({ ...user, confirmPassword: e.target.value })}
      />

      <Form.Control
        placeholder="First Name"
        className="mb-3"
        value={user.firstName}
        onChange={(e) => setUser({ ...user, firstName: e.target.value })}
      />

      <Form.Control
        placeholder="Last Name"
        className="mb-3"
        value={user.lastName}
        onChange={(e) => setUser({ ...user, lastName: e.target.value })}
      />

      <Form.Control
        type="date"
        className="mb-3"
        value={user.dob}
        onChange={(e) => setUser({ ...user, dob: e.target.value })}
      />

      <Form.Select
        className="mb-3"
        value={user.role}
        onChange={(e) => setUser({ ...user, role: e.target.value })}
      >
        <option value="USER">User</option>
        <option value="ADMIN">Admin</option>
        <option value="FACULTY">Faculty</option>
        <option value="STUDENT">Student</option>
      </Form.Select>

      <button onClick={signup} className="btn btn-success w-100 mb-3">
        Create Account
      </button>

      <div className="text-center">
        <Link to="/Kambaz/Account/Signin">Already have an account?</Link>
      </div>
    </div>
  );
}
