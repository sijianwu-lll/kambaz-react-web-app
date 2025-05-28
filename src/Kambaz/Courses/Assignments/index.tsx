import { useParams, Link } from "react-router-dom";
import { ListGroup } from "react-bootstrap";
import { assignments } from "../../Database";
import { FaGripVertical } from "react-icons/fa6";

export default function Assignments() {
  const { cid } = useParams();
  const courseAssignments = assignments.filter((a) => a.course === cid);

  return (
    <div id="wd-assignments">
      <h2>Assignments</h2>
      <ListGroup className="rounded-0">
        <ListGroup.Item className="bg-secondary text-dark fs-5">
          <FaGripVertical className="me-2" />
          Assignments List ({courseAssignments.length})
        </ListGroup.Item>

        {courseAssignments.map((assignment) => (
          <ListGroup.Item
            key={assignment._id}
            as="div"
            className="ps-3 border-start border-4 border-success"
          >
            <div className="fw-bold">
              <Link
                to={`${assignment._id}`}
                className="text-decoration-none text-dark"
              >
                {assignment.title}
              </Link>
            </div>
            <div className="text-muted">
              No due date set | 100 pts
            </div>
          </ListGroup.Item>
        ))}
      </ListGroup>
    </div>
  );
}
