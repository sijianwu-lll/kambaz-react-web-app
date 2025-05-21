import { ListGroup } from "react-bootstrap";
import { Link } from "react-router-dom";
import { FaSignInAlt, FaUserPlus, FaUserCircle } from "react-icons/fa";

export default function AccountNavigation() {
  return (
    <ListGroup
      style={{ width: 120 }}
      className="rounded-0 position-fixed bottom-0 top-0 bg-black z-2 text-center"
    >
      <ListGroup.Item as={Link} to="/Account/Signin" className="text-white bg-black border-0">
        <FaSignInAlt className="fs-1 text-white" /><br />
        Sign In
      </ListGroup.Item>
      <ListGroup.Item as={Link} to="/Account/Signup" className="text-white bg-black border-0">
        <FaUserPlus className="fs-1 text-white" /><br />
        Sign Up
      </ListGroup.Item>
      <ListGroup.Item as={Link} to="/Account/Profile" className="text-white bg-black border-0">
        <FaUserCircle className="fs-1 text-white" /><br />
        Profile
      </ListGroup.Item>
    </ListGroup>
  );
}
