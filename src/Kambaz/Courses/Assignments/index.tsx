import { useParams, Link, useNavigate } from "react-router-dom";
import { ListGroup, Button } from "react-bootstrap";
import { FaGripVertical } from "react-icons/fa6";
import { useSelector, useDispatch } from "react-redux";
import { deleteAssignment } from "./reducer";

export default function Assignments() {
  const { cid } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { currentUser } = useSelector((state: any) => state.accountReducer);
  const isFaculty = currentUser?.role === "FACULTY";

  const assignments = useSelector(
    (state: any) => state.assignmentsReducer.assignments
  );
  const courseAssignments = assignments.filter((a: any) => a.course === cid);

  const handleDelete = (id: string) => {
    if (window.confirm("Are you sure you want to delete this assignment?")) {
      dispatch(deleteAssignment(id));
    }
  };

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
