import { useParams, Link } from "react-router-dom";
import * as db from "../../Database"; 

import { Button, Form, FloatingLabel } from "react-bootstrap";

export default function AssignmentEditor() {
  const { cid, aid } = useParams();
  const assignment = db.assignments.find((a) => a._id === aid);

  if (!assignment) {
    return <h3>Assignment not found</h3>;
  }

  return (
    <div id="wd-assignment-editor">
      <h3>Editing: {assignment.title}</h3>

      <Form>
        {/* Assignment Title */}
        <FloatingLabel label="Assignment Title" className="mb-3">
          <Form.Control type="text" defaultValue={assignment.title} />
        </FloatingLabel>

        {/* Assignment Description */}
        <FloatingLabel label="Description" className="mb-3">
          <Form.Control
            as="textarea"
            defaultValue={assignment.description}
            style={{ height: "150px" }}
          />
        </FloatingLabel>

        {/* Points */}
        <FloatingLabel label="Points" className="mb-3">
          <Form.Control type="number" defaultValue={assignment.points || 100} />
        </FloatingLabel>

        {/* Due Date */}
        <FloatingLabel label="Due Date" className="mb-3">
          <Form.Control type="date" defaultValue={assignment.due} />
        </FloatingLabel>

        {/* Buttons */}
        <div className="d-flex justify-content-end gap-2 mt-3">
          <Link to={`/Kambaz/Courses/${cid}/Assignments`}>
            <Button variant="secondary">Cancel</Button>
          </Link>
          <Link to={`/Kambaz/Courses/${cid}/Assignments`}>
            <Button variant="danger">Save</Button>
          </Link>
        </div>
      </Form>
    </div>
  );
}
