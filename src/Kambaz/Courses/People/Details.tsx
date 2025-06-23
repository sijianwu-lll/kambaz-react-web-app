import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { FormControl } from "react-bootstrap";
import { FaUserCircle } from "react-icons/fa";
import { IoCloseSharp } from "react-icons/io5";
import { FaPencil, FaCheck } from "react-icons/fa6";
import * as client from "../../Account/client";

type PeopleDetailsProps = {
  fetchUsers: () => void;
};

export default function PeopleDetails({ fetchUsers }: PeopleDetailsProps) {
  const { uid } = useParams();
  const navigate = useNavigate();
  const [user, setUser] = useState<any>(null);
  const [editing, setEditing] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");

  const fetchUser = async () => {
    if (!uid || uid === "undefined") return;

    try {
      const result = await client.findUserById(uid);
      if (!result) {
        console.warn("⚠️ User not found:", uid);
        return;
      }
      setUser(result);
      setName(`${result.firstName ?? ""} ${result.lastName ?? ""}`);
      setEmail(result.email ?? "");
      setRole(result.role ?? "USER");
    } catch (e) {
      console.error("❌ Failed to fetch user:", e);
    }
  };

  const handleDelete = async () => {
    if (!uid) return;
    await client.deleteUser(uid);
    fetchUsers();
    navigate(-1);
  };

  const saveUser = async () => {
    const [firstName = "", lastName = ""] = name.trim().split(" ");
    const updatedUser = {
      ...user,
      firstName,
      lastName,
      email,
      role,
    };
    const result = await client.updateUser(updatedUser);
    setUser(result);
    setEditing(false);
    fetchUsers();
    navigate(-1);
  };

  useEffect(() => {
    fetchUser();
  }, [uid]);

  if (!uid || uid === "undefined" || !user) return null;

  return (
    <div className="wd-people-details position-fixed top-0 end-0 bottom-0 bg-white p-4 shadow w-25">
      <button
        onClick={() => navigate(-1)}
        className="btn position-absolute end-0 top-0 wd-close-details"
      >
        <IoCloseSharp className="fs-1" />
      </button>

      <div className="text-center mt-4">
        <FaUserCircle className="text-secondary me-2 fs-1" />
      </div>
      <hr />

      {/* Editable Name */}
      <div className="text-danger fs-4">
        {!editing && (
          <FaPencil
            onClick={() => setEditing(true)}
            className="float-end fs-5 mt-2 wd-edit"
            style={{ cursor: "pointer" }}
          />
        )}
        {editing && (
          <FaCheck
            onClick={() => saveUser()}
            className="float-end fs-5 mt-2 me-2 wd-save"
            style={{ cursor: "pointer" }}
          />
        )}
        {!editing && (
          <div className="wd-name" onClick={() => setEditing(true)} style={{ cursor: "pointer" }}>
            {user.firstName} {user.lastName}
          </div>
        )}
        {editing && (
          <FormControl
            className="mb-2"
            value={name}
            onChange={(e) => setName(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && saveUser()}
          />
        )}
      </div>

      <b>Login ID:</b> <span className="wd-login-id">{user.loginId}</span> <br />
      <b>Section:</b> <span className="wd-section">{user.section}</span> <br />
      <b>Total Activity:</b>{" "}
      <span className="wd-total-activity">{user.totalActivity}</span> <br />

      {/* Editable Email */}
      <b>Email:</b>
      {editing ? (
        <FormControl
          className="mb-2"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      ) : (
        <span className="wd-email">{user.email}</span>
      )}
      <br />

      {/* Editable Role */}
      <b>Role:</b>
      {editing ? (
        <select
          className="form-control mb-3"
          value={role}
          onChange={(e) => setRole(e.target.value)}
        >
          <option value="USER">User</option>
          <option value="ADMIN">Admin</option>
          <option value="FACULTY">Faculty</option>
          <option value="STUDENT">Student</option>
        </select>
      ) : (
        <span className="wd-role">{user.role}</span>
      )}

      {/* Delete & Cancel */}
      <hr />
      <div className="d-flex justify-content-between mt-3">
        <button
          onClick={handleDelete}
          className="btn btn-danger wd-delete"
        >
          Delete
        </button>
        <button
          onClick={() => navigate(-1)}
          className="btn btn-secondary wd-cancel"
        >
          Cancel
        </button>
      </div>
    </div>
  );
}
