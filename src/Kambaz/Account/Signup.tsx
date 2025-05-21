import { Form } from "react-bootstrap";
import { Link } from "react-router-dom";

export default function Signup() {
  return (
    <div id="wd-signup-screen" className="p-4" style={{ maxWidth: 400 }}>
      <h2 className="mb-4">Sign up</h2>

      <Form.Control placeholder="Username" className="mb-3" />
      <Form.Control type="email" placeholder="Email" className="mb-3" />
      <Form.Control type="password" placeholder="Password" className="mb-3" />
      <Form.Control
        type="password"
        placeholder="Confirm Password"
        className="mb-3"
      />

      <Link
        to="/Kambaz/Account/Profile"
        className="btn btn-success w-100 mb-3"
      >
        Create Account
      </Link>

      <div className="text-center">
        <Link to="/Kambaz/Account/Signin">Already have an account?</Link>
      </div>
    </div>
  );
}
