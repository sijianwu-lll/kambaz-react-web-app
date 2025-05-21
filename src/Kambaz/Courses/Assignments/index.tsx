import { Button, FormControl, InputGroup, ListGroup } from "react-bootstrap";
import { FaSearch, FaPlus, FaGripVertical } from "react-icons/fa";
import { Link } from "react-router-dom";

export default function Assignments() {
  return (
    <div id="wd-assignments">
      <h2>Assignments</h2>

      {/* Top Control Buttons */}
      <div className="d-flex justify-content-between mb-3">
        {/* Search Box */}
        <InputGroup style={{ width: "300px" }}>
          <InputGroup.Text>
            <FaSearch className="text-secondary" />
          </InputGroup.Text>
          <FormControl placeholder="Search for Assignment" />
        </InputGroup>

        {/* Buttons Right */}
        <div>
          <Button variant="secondary" className="me-2">
            <FaPlus className="me-2" /> Group
          </Button>
          <Button variant="danger">
            <FaPlus className="me-2" /> Assignment
          </Button>
        </div>
      </div>

      {/* Assignment Group */}
      <ListGroup className="rounded-0">
        <ListGroup.Item className="bg-secondary text-dark fs-5">
          <FaGripVertical className="me-2" />
          Assignments 20%
        </ListGroup.Item>

        {/* Assignment Item A1 */}
        <ListGroup.Item as="div" className="ps-3 border-start border-4 border-success">
          <div className="fw-bold">
            <Link to="A1" className="text-decoration-none text-dark">
              A1 - ENV + HTML
            </Link>
          </div>
          <div className="text-muted">
            Due Oct 3, 2025 at 11:59pm | 100 pts
          </div>
        </ListGroup.Item>

        {/* Assignment Item A2 */}
        <ListGroup.Item as="div" className="ps-3 border-start border-4 border-success">
          <div className="fw-bold">
            <Link to="A2" className="text-decoration-none text-dark">
              A2 - CSS + Bootstrap
            </Link>
          </div>
          <div className="text-muted">
            Due Oct 10, 2025 at 11:59pm | 100 pts
          </div>
        </ListGroup.Item>
      </ListGroup>
    </div>
  );
}
