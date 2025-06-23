import { useState, useEffect } from "react";
import { useParams } from "react-router";
import PeopleTable from "../Courses/People/Table";
import PeopleDetails from "../Courses/People/Details";
import { FormControl, Button } from "react-bootstrap";
import * as client from "./client";
import { FaPlus } from "react-icons/fa";

export default function Users() {
  const [users, setUsers] = useState<any[]>([]);
  const [role, setRole] = useState("");
  const [name, setName] = useState("");
  const { uid } = useParams();

  const fetchUsers = async () => {
    const allUsers = await client.findAllUsers();
    setUsers(allUsers);
  };

  const filterUsersByRole = async (role: string) => {
    setRole(role);
    setName(""); // 清空名字搜索框
    if (role) {
      const filtered = await client.findUsersByRole(role);
      setUsers(filtered);
    } else {
      fetchUsers();
    }
  };

  const filterUsersByName = async (name: string) => {
    setName(name);
    setRole(""); // 清空角色筛选
    if (name) {
      const filtered = await client.findUsersByPartialName(name);
      setUsers(filtered);
    } else {
      fetchUsers();
    }
  };

  const createUser = async () => {
    const newUser = await client.createUser({
      firstName: "New",
      lastName: `User${users.length + 1}`,
      username: `newuser${Date.now()}`,
      password: "password123",
      email: `newuser${users.length + 1}@neu.edu`,
      section: "S101",
      role: "STUDENT",
    });
    setUsers([...users, newUser]);
  };

  useEffect(() => {
    fetchUsers();
  }, [uid]);

  return (
    <div>
      <h3>Users</h3>

      {uid && <PeopleDetails fetchUsers={fetchUsers} />}

      <div className="d-flex mb-3 gap-3">
        <FormControl
          value={name}
          onChange={(e) => filterUsersByName(e.target.value)}
          placeholder="Search people by name"
          className="w-25"
        />

        <select
          value={role}
          onChange={(e) => filterUsersByRole(e.target.value)}
          className="form-select w-25"
        >
          <option value="">All Roles</option>
          <option value="STUDENT">Students</option>
          <option value="TA">Assistants</option>
          <option value="FACULTY">Faculty</option>
          <option value="ADMIN">Administrators</option>
        </select>

        {/* ✅ 新增添加用户按钮 */}
        <Button onClick={createUser} className="btn btn-danger ms-auto wd-add-people">
          <FaPlus className="me-2" />
          User
        </Button>
      </div>

      <PeopleTable users={users} />
    </div>
  );
}
