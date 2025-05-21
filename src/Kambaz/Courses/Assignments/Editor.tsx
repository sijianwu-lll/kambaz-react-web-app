import { Form, Button, Row, Col } from "react-bootstrap";
import { useParams } from "react-router-dom";

export default function AssignmentEditor() {
  const { aid } = useParams(); // 从 URL 中获取 A1 / A2 等作业 ID

  return (
    <div id="wd-assignment-editor" className="p-3">
      <h2 className="mb-4">Edit Assignment</h2>
      <h4 className="text-muted">Editing: {aid}</h4>

      <Form>
        {/* Assignment Name */}
        <Form.Group className="mb-3" controlId="assignmentName">
          <Form.Label>Assignment Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter assignment name"
            defaultValue={`${aid} - Assignment Title`}
            size="lg"
          />
        </Form.Group>

        {/* Description */}
        <Form.Group className="mb-3" controlId="assignmentDescription">
          <Form.Label>Description</Form.Label>
          <Form.Control
            as="textarea"
            rows={5}
            placeholder="Enter description here"
            defaultValue="This is the assignment description."
          />
        </Form.Group>

        {/* Points */}
        <Form.Group as={Row} className="mb-3" controlId="assignmentPoints">
          <Form.Label column sm={2}>Points</Form.Label>
          <Col sm={10}>
            <Form.Control type="number" defaultValue={100} />
          </Col>
        </Form.Group>

        {/* Due Date */}
        <Form.Group as={Row} className="mb-3" controlId="assignmentDueDate">
          <Form.Label column sm={2}>Due Date</Form.Label>
          <Col sm={10}>
            <Form.Control type="date" defaultValue="2025-10-03" />
          </Col>
        </Form.Group>

        {/* Save Button */}
        <div className="d-flex justify-content-end">
          <Button variant="primary" size="lg">Save</Button>
        </div>
      </Form>
    </div>
  );
}
