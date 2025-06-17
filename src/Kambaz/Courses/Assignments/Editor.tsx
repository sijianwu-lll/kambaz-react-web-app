import { useParams, useNavigate, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Button, Form, FloatingLabel } from "react-bootstrap";
import {
  addAssignment,
  updateAssignment as updateAssignmentRedux,
} from "./reducer";
import * as client from "./client";
import { v4 as uuidv4 } from "uuid";

export default function AssignmentEditor() {
  const { cid, aid } = useParams(); // ✅ 删除 mid
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { currentUser } = useSelector((state: any) => state.accountReducer);
  const assignments = useSelector((state: any) => state.assignmentsReducer.assignments);

  const isEditMode = aid !== "new";
  const original = assignments.find((a: any) => a._id === aid);

  const [assignment, setAssignment] = useState<any>({
    _id: uuidv4(),
    course: cid,
    title: "",
    description: "",
    points: 100,
    due: "",
    availableFrom: "",
    availableUntil: "",
  });

  useEffect(() => {
    if (!currentUser || currentUser.role !== "FACULTY") {
      navigate(`/Kambaz/Courses/${cid}/Assignments`);
    }
    if (isEditMode && original) {
      setAssignment(original);
    }
  }, [aid, currentUser, original]);

  const handleSave = async () => {
    if (isEditMode) {
      await client.updateAssignment(assignment);
      dispatch(updateAssignmentRedux(assignment));
    } else {
      const created = await client.createAssignment(assignment);
      dispatch(addAssignment(created));
    }
    navigate(`/Kambaz/Courses/${cid}/Assignments`);
  };

  return (
    <div id="wd-assignment-editor">
      <h3>{isEditMode ? `Editing: ${assignment.title}` : "New Assignment"}</h3>

      <Form>
        <FloatingLabel label="Assignment Title" className="mb-3">
          <Form.Control
            type="text"
            value={assignment.title}
            onChange={(e) => setAssignment({ ...assignment, title: e.target.value })}
          />
        </FloatingLabel>

        <FloatingLabel label="Description" className="mb-3">
          <Form.Control
            as="textarea"
            style={{ height: "150px" }}
            value={assignment.description}
            onChange={(e) => setAssignment({ ...assignment, description: e.target.value })}
          />
        </FloatingLabel>

        <FloatingLabel label="Points" className="mb-3">
          <Form.Control
            type="number"
            value={assignment.points}
            onChange={(e) =>
              setAssignment({ ...assignment, points: Number(e.target.value) })
            }
          />
        </FloatingLabel>

        <FloatingLabel label="Due Date" className="mb-3">
          <Form.Control
            type="date"
            value={assignment.due}
            onChange={(e) => setAssignment({ ...assignment, due: e.target.value })}
          />
        </FloatingLabel>

        <FloatingLabel label="Available From" className="mb-3">
          <Form.Control
            type="date"
            value={assignment.availableFrom}
            onChange={(e) =>
              setAssignment({ ...assignment, availableFrom: e.target.value })
            }
          />
        </FloatingLabel>

        <FloatingLabel label="Available Until" className="mb-3">
          <Form.Control
            type="date"
            value={assignment.availableUntil}
            onChange={(e) =>
              setAssignment({ ...assignment, availableUntil: e.target.value })
            }
          />
        </FloatingLabel>

        <div className="d-flex justify-content-end gap-2 mt-3">
          <Link to={`/Kambaz/Courses/${cid}/Assignments`}>
            <Button variant="secondary">Cancel</Button>
          </Link>
          <Button variant="danger" onClick={handleSave}>
            Save
          </Button>
        </div>
      </Form>
    </div>
  );
}
