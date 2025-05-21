import { ListGroup } from "react-bootstrap";
import { Link } from "react-router-dom";
import { AiOutlineDashboard } from "react-icons/ai";
import { IoCalendarOutline } from "react-icons/io5";
import { LiaBookSolid, LiaCogSolid } from "react-icons/lia";
import { FaInbox, FaRegCircleUser, FaFlask } from "react-icons/fa6"; // ✅ 添加实验室图标

export default function KambazNavigation() {
  return (
    <ListGroup
      id="wd-kambaz-navigation"
      style={{ width: 120 }}
      className="rounded-0 position-fixed bottom-0 top-0 d-none d-md-block bg-black z-2"
    >
      {/* Logo */}
      <ListGroup.Item
        id="wd-neu-link"
        target="_blank"
        action
        href="https://www.northeastern.edu/"
        className="bg-black border-0 text-center"
      >
        <img src="/images/NEU.png" width="75px" />
      </ListGroup.Item>
      <br />

      {/* Account */}
      <ListGroup.Item
        to="/Kambaz/Account"
        as={Link}
        className="text-center border-0 bg-black text-white"
      >
        <FaRegCircleUser className="fs-1" />
        <br />
        Account
      </ListGroup.Item>
      <br />

      {/* Dashboard (Active 示范) */}
      <ListGroup.Item
        to="/Kambaz/Dashboard"
        as={Link}
        className="text-center border-0 bg-white text-danger"
      >
        <AiOutlineDashboard className="fs-1 text-danger" />
        <br />
        Dashboard
      </ListGroup.Item>
      <br />

      {/* Courses */}
      <ListGroup.Item
        to="/Kambaz/Dashboard"
        as={Link}
        className="text-white bg-black text-center border-0"
      >
        <LiaBookSolid className="fs-1 text-danger" />
        <br />
        Courses
      </ListGroup.Item>
      <br />

      {/* Calendar */}
      <ListGroup.Item
        to="/Kambaz/Calendar"
        as={Link}
        className="text-white bg-black text-center border-0"
      >
        <IoCalendarOutline className="fs-1 text-danger" />
        <br />
        Calendar
      </ListGroup.Item>
      <br />

      {/* Inbox */}
      <ListGroup.Item
        to="/Kambaz/Inbox"
        as={Link}
        className="text-white bg-black text-center border-0"
      >
        <FaInbox className="fs-1 text-danger" />
        <br />
        Inbox
      </ListGroup.Item>
      <br />

      {/* Settings */}
      <ListGroup.Item
        to="/Kambaz/Settings"
        as={Link}
        className="text-white bg-black text-center border-0"
      >
        <LiaCogSolid className="fs-1 text-danger" />
        <br />
        Settings
      </ListGroup.Item>
      <br />

      {/* ✅ Labs - 最后新增导航项 */}
      <ListGroup.Item
        to="/Labs/Lab1"
        as={Link}
        className="text-white bg-black text-center border-0"
      >
        <FaFlask className="fs-1 text-white" />
        <br />
        Labs
      </ListGroup.Item>
    </ListGroup>
  );
}
