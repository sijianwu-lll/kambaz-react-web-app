import { Table } from "react-bootstrap";
import { FaUserCircle } from "react-icons/fa";
import { useParams } from "react-router-dom";
import * as db from "../../Database"; // ✅ 保留用于课程 enrollments

type PeopleTableProps = {
  users?: any[];
};

export default function PeopleTable({ users = [] }: PeopleTableProps) {
  const { cid } = useParams();
  const { enrollments } = db;

  // ✅ 如果有 cid，则为“课程内”；否则显示所有用户
  const courseUsers = cid
    ? users.filter((user: any) =>
        enrollments.some(
          (enroll: any) => enroll.course === cid && enroll.user === user._id
        )
      )
    : users;

  return (
    <div id="wd-people-table" className="p-3">
      <h2>People</h2>
      <Table striped>
        <thead>
          <tr>
            <th>Name</th>
            <th>Login ID</th>
            <th>Section</th>
            <th>Role</th>
            <th>Last Activity</th>
            <th>Total Activity</th>
          </tr>
        </thead>
        <tbody>
          {courseUsers.map((user: any) => (
            <tr key={user._id}>
              <td className="wd-full-name text-nowrap">
                <FaUserCircle className="me-2 fs-1 text-secondary" />
                <span className="wd-first-name">{user.firstName}</span>{" "}
                <span className="wd-last-name">{user.lastName}</span>
              </td>
              <td className="wd-login-id">{user.loginId}</td>
              <td className="wd-section">{user.section}</td>
              <td className="wd-role">{user.role}</td>
              <td className="wd-last-activity">{user.lastActivity}</td>
              <td className="wd-total-activity">{user.totalActivity}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
}
