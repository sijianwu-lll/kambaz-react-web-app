import { Table } from "react-bootstrap";
import { FaUserCircle } from "react-icons/fa";
import { useParams, Link } from "react-router-dom";
import * as db from "../../Database";

type PeopleTableProps = {
  users?: any[];
};

export default function PeopleTable({ users = [] }: PeopleTableProps) {
  const { cid } = useParams();
  const { enrollments } = db;
  console.log("🧪 用户数据：", users);

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
          {courseUsers.map((user: any) => {
            const rawId = user._id;
            const userId = rawId && typeof rawId === "object" && rawId.toString ? rawId.toString() : String(rawId);

            if (!userId || userId === "undefined") {
              console.warn("🚨 用户缺少合法 _id：", user);
            }

            return (
              <tr key={userId || Math.random()}>
                <td className="wd-full-name text-nowrap">
                  {userId ? (
                    <Link
                      to={`/Kambaz/Account/Users/${userId}`}
                      className="text-primary text-decoration-underline"
                      style={{ cursor: "pointer" }}
                    >
                      <FaUserCircle className="me-2 fs-1 text-secondary" />
                      <span className="wd-first-name">{user.firstName}</span>{" "}
                      <span className="wd-last-name">{user.lastName}</span>
                    </Link>
                  ) : (
                    <>
                      <FaUserCircle className="me-2 fs-1 text-secondary" />
                      <span className="wd-first-name">{user.firstName}</span>{" "}
                      <span className="wd-last-name">{user.lastName}</span>
                    </>
                  )}
                </td>
                <td className="wd-login-id">{user.loginId}</td>
                <td className="wd-section">{user.section}</td>
                <td className="wd-role">{user.role}</td>
                <td className="wd-last-activity">{user.lastActivity}</td>
                <td className="wd-total-activity">{user.totalActivity}</td>
              </tr>
            );
          })}
        </tbody>
      </Table>
    </div>
  );
}
