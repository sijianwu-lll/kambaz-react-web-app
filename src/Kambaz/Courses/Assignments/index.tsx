import { useParams, Link, useNavigate } from "react-router-dom";
import { ListGroup, Button } from "react-bootstrap";
import { FaGripVertical } from "react-icons/fa6";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";

import {
  setAssignments,
  deleteAssignment as deleteAssignmentRedux,
} from "./reducer";
import * as client from "./client";

export default function Assignments() {
  const { cid } = useParams(); // ✅ 获取课程 ID
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { currentUser } = useSelector((state: any) => state.accountReducer);
  const isFaculty = currentUser?.role === "FACULTY";

  const assignments = useSelector(
    (state: any) => state.assignmentsReducer.assignments
  );

  // ✅ 仅显示当前课程的作业
  const courseAssignments = assignments.filter((a: any) => a.course === cid);

  // ✅ 从服务器获取该课程的作业数据
  const fetchAssignments = async () => {
    if (!cid) return;
    const serverAssignments = await client.findAssignmentsForCourse(cid);
    dispatch(setAssignments(serverAssignments));
  };

  const handleDelete = async (id: string) => {
    if (window.confirm("Are you sure you want to delete this assignment?")) {
      await client.deleteAssignment(id);
      dispatch(deleteAssignmentRedux(id));
    }
  };

  useEffect(() => {
    fetchAssignments();
  }, [cid]);

  return (
    <div id="wd-assignments">
      <div className="d-flex justify-content-between align-items-center">
        <h2>Assignments</h2>
        {isFaculty && (
          <Button variant="success" onClick={() => navigate("new")}>
            + Assignment
          </Button>
        )}
      </div>

      <ListGroup className="rounded-0 mt-3">
        <ListGroup.Item className="bg-secondary text-dark fs-5">
          <FaGripVertical className="me-2" />
          Assignments List ({courseAssignments.length})
        </ListGroup.Item>

        {courseAssignments.map((assignment: any) => (
          <ListGroup.Item
            key={assignment._id}
            as="div"
            className="ps-3 border-start border-4 border-success"
          >
            <div className="fw-bold d-flex justify-content-between align-items-center">
              <Link
                to={`${assignment._id}`}
                className="text-decoration-none text-dark"
              >
                {assignment.title}
              </Link>
              {isFaculty && (
                <div className="d-flex gap-2">
                  <Button
                    size="sm"
                    variant="warning"
                    onClick={() => navigate(`${assignment._id}`)}
                  >
                    Edit
                  </Button>
                  <Button
                    size="sm"
                    variant="danger"
                    onClick={() => handleDelete(assignment._id)}
                  >
                    Delete
                  </Button>
                </div>
              )}
            </div>
            <div className="text-muted">
              {assignment.due ? `Due ${assignment.due}` : "No due date"} |{" "}
              {assignment.points || 100} pts
            </div>
          </ListGroup.Item>
        ))}
      </ListGroup>
    </div>
  );
}
