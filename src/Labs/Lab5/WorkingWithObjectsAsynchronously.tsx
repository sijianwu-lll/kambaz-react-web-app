import React, { useEffect, useState } from "react";
import { FormControl } from "react-bootstrap";
import * as client from "./client";

export default function WorkingWithObjectsAsynchronously() {
  const [assignment, setAssignment] = useState<any>({});

  const fetchAssignment = async () => {
    const assignment = await client.fetchAssignment();
    setAssignment(assignment);
  };

  const updateTitle = async (title: string) => {
    const updated = await client.updateTitle(title);
    setAssignment(updated);
  };

  useEffect(() => {
    fetchAssignment();
  }, []);

  return (
    <div id="wd-asynchronous-objects">
      <h3>Working with Objects Asynchronously</h3>
      <h4>Assignment</h4>
      <FormControl
        className="mb-2"
        value={assignment.title || ""}
        onChange={(e) => setAssignment({ ...assignment, title: e.target.value })}
      />
      <FormControl
        className="mb-2"
        value={assignment.description || ""}
        onChange={(e) => setAssignment({ ...assignment, description: e.target.value })}
      />
      <FormControl
        className="mb-2"
        type="date"
        value={assignment.due || ""}
        onChange={(e) => setAssignment({ ...assignment, due: e.target.value })}
      />
      <div className="form-check form-switch mb-2">
        <input
          className="form-check-input"
          type="checkbox"
          id="wd-completed"
          checked={assignment.completed || false}
          onChange={(e) => setAssignment({ ...assignment, completed: e.target.checked })}
        />
        <label className="form-check-label" htmlFor="wd-completed">
          Completed
        </label>
      </div>
      <button className="btn btn-primary" onClick={() => updateTitle(assignment.title)}>
        Update Title
      </button>
      <pre>{JSON.stringify(assignment, null, 2)}</pre>
      <hr />
    </div>
  );
}
