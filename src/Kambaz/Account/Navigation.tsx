import { ListGroup } from "react-bootstrap";
import { Link, useLocation } from "react-router-dom";
import { FaSignInAlt, FaUserPlus, FaUserCircle, FaUsers } from "react-icons/fa";
import { useSelector } from "react-redux";

export default function AccountNavigation() {
  const { currentUser } = useSelector((state: any) => state.accountReducer);
  const { pathname } = useLocation();

  return (
    <ListGroup
      style={{ width: 120 }}
      className="rounded-0 position-fixed bottom-0 top-0 bg-black z-2 text-center"
    >
      {!currentUser && (
        <>
          <ListGroup.Item
            as={Link}
            to="/Kambaz/Account/Signin"
            className={`text-white bg-black border-0 ${pathname.includes("Signin") ? "active" : ""}`}
          >
            <FaSignInAlt className="fs-1 text-white" />
            <br />
            Sign In
          </ListGroup.Item>
          <ListGroup.Item
            as={Link}
            to="/Kambaz/Account/Signup"
            className={`text-white bg-black border-0 ${pathname.includes("Signup") ? "active" : ""}`}
          >
            <FaUserPlus className="fs-1 text-white" />
            <br />
            Sign Up
          </ListGroup.Item>
        </>
      )}

      {currentUser && (
        <>
          <ListGroup.Item
            as={Link}
            to="/Kambaz/Account/Profile"
            className={`text-white bg-black border-0 ${pathname.includes("Profile") ? "active" : ""}`}
          >
            <FaUserCircle className="fs-1 text-white" />
            <br />
            Profile
          </ListGroup.Item>

          {/* ✅ 如果是 ADMIN 或 FACULTY，显示 Users 链接 */}
          {["ADMIN", "FACULTY"].includes(currentUser.role) && (
            <ListGroup.Item
              as={Link}
              to="/Kambaz/Account/Users"
              className={`text-white bg-black border-0 ${pathname.includes("Users") ? "active" : ""}`}
            >
              <FaUsers className="fs-1 text-white" />
              <br />
              Users
            </ListGroup.Item>
          )}
        </>
      )}
    </ListGroup>
  );
}
