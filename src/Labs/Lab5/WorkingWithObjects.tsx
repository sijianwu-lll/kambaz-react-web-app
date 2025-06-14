import { useState } from "react";
import { FormControl } from "react-bootstrap";

const REMOTE_SERVER = import.meta.env.VITE_REMOTE_SERVER;

export default function WorkingWithObjects() {
  const [assignment, setAssignment] = useState({
    id: 1,
    title: "NodeJS Assignment",
    description: "Create a NodeJS server with ExpressJS",
    due: "2021-10-10",
    completed: false,
    score: 0,
  });

  const [module, setModule] = useState({
    id: "M101",
    name: "React Introduction",
    description: "Learn the basics of React",
    course: "Web Dev",
  });

  const ASSIGNMENT_API_URL = `${REMOTE_SERVER}/lab5/assignment`;
  const MODULE_API_URL = `${REMOTE_SERVER}/lab5/module`;

  return (
    <div id="wd-working-with-objects">
      <h3>Working With Objects</h3>

      {/* 获取 Assignment 对象 */}
      <h4>Retrieving Objects</h4>
      <a
        id="wd-retrieve-assignments"
        className="btn btn-primary me-2"
        href={`${ASSIGNMENT_API_URL}`}
        target="_blank"
        rel="noreferrer"
      >
        Get Assignment
      </a>
      <hr />

      {/* 获取 Assignment title */}
      <h4>Retrieving Properties</h4>
      <a
        id="wd-retrieve-assignment-title"
        className="btn btn-secondary me-2"
        href={`${ASSIGNMENT_API_URL}/title`}
        target="_blank"
        rel="noreferrer"
      >
        Get Title
      </a>
      <hr />

      {/* 获取 Module 对象和属性 */}
      <h4>Module - Retrieving Object</h4>
      <a
        className="btn btn-success me-2"
        href={`${MODULE_API_URL}`}
        target="_blank"
        rel="noreferrer"
      >
        Get Module
      </a>

      <a
        className="btn btn-warning"
        href={`${MODULE_API_URL}/name`}
        target="_blank"
        rel="noreferrer"
      >
        Get Module Name
      </a>
      <hr />

      {/* 修改 Assignment title */}
      <h4>Modify Assignment Title</h4>
      <FormControl
        className="w-75 mb-2"
        id="wd-assignment-title"
        value={assignment.title}
        onChange={(e) =>
          setAssignment({ ...assignment, title: e.target.value })
        }
      />
      <a
        id="wd-update-assignment-title"
        className="btn btn-primary"
        href={`${ASSIGNMENT_API_URL}/title/${encodeURIComponent(
          assignment.title
        )}`}
        target="_blank"
        rel="noreferrer"
      >
        Update Title
      </a>
      <hr />

      {/* 修改 Assignment score */}
      <h4>Modify Assignment Score</h4>
      <FormControl
        className="w-75 mb-2"
        type="number"
        value={assignment.score}
        onChange={(e) =>
          setAssignment({ ...assignment, score: parseInt(e.target.value) })
        }
      />
      <a
        className="btn btn-dark"
        href={`${ASSIGNMENT_API_URL}/score/${assignment.score}`}
        target="_blank"
        rel="noreferrer"
      >
        Update Score
      </a>
      <hr />

      {/* 修改 Assignment completed */}
      <h4>Modify Assignment Completed</h4>
      <input
        type="checkbox"
        className="form-check-input me-2"
        checked={assignment.completed}
        onChange={(e) =>
          setAssignment({ ...assignment, completed: e.target.checked })
        }
      />
      <a
        className="btn btn-info"
        href={`${ASSIGNMENT_API_URL}/completed/${assignment.completed}`}
        target="_blank"
        rel="noreferrer"
      >
        Update Completed
      </a>
      <hr />

      {/* 修改 Module name */}
      <h4>Modify Module Name</h4>
      <FormControl
        className="w-75 mb-2"
        value={module.name}
        onChange={(e) => setModule({ ...module, name: e.target.value })}
      />
      <a
        className="btn btn-success"
        href={`${MODULE_API_URL}/name/${encodeURIComponent(module.name)}`}
        target="_blank"
        rel="noreferrer"
      >
        Update Module Name
      </a>
      <hr />

      {/* 修改 Module description */}
      <h4>Modify Module Description</h4>
      <FormControl
        className="w-75 mb-2"
        value={module.description}
        onChange={(e) =>
          setModule({ ...module, description: e.target.value })
        }
      />
      <a
        className="btn btn-secondary"
        href={`${MODULE_API_URL}/description/${encodeURIComponent(
          module.description
        )}`}
        target="_blank"
        rel="noreferrer"
      >
        Update Module Description
      </a>
      <hr />
    </div>
  );
}
