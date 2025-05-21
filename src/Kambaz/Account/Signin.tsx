import { Form } from "react-bootstrap";
import { Link } from "react-router-dom";

export default function Signin() {
  return (
    <div id="wd-signin-screen" className="p-4" style={{ maxWidth: 400 }}>
      <h2 className="mb-4">Sign in</h2>

      <Form.Control
        id="wd-username"
        placeholder="Username"
        className="mb-3"
      />
      <Form.Control
        id="wd-password"
        placeholder="Password"
        type="password"
        className="mb-3"
      />

      <Link
        id="wd-signin-btn"
        to="/Kambaz/Account/Profile"
        className="btn btn-primary w-100 mb-3"
      >
        Sign in
      </Link>

      <div className="text-center">
        <Link id="wd-signup-link" to="/Kambaz/Account/Signup">
          Don't have an account? Sign up
        </Link>
      </div>
    </div>
  );
}
