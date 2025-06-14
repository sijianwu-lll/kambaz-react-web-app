import { useState } from "react";
import { FormControl } from "react-bootstrap";

const REMOTE_SERVER = import.meta.env.VITE_REMOTE_SERVER;

export default function WorkingWithArrays() {
  const [todo, setTodo] = useState({
    id: "1",
    title: "New Title"
  });

  const [completedId, setCompletedId] = useState("1");
  const [completedValue, setCompletedValue] = useState(false);

  const [descriptionId, setDescriptionId] = useState("1");
  const [descriptionText, setDescriptionText] = useState("");

  return (
    <div id="wd-working-with-arrays">
      <h3>Working With Arrays</h3>

      {/* ✅ 1. 获取所有 Todos */}
      <h4>Retrieving Arrays</h4>
      <a
        id="wd-retrieve-todos"
        className="btn btn-primary mb-3"
        href={`${REMOTE_SERVER}/lab5/todos`}
        target="_blank"
        rel="noreferrer"
      >
        Get Todos
      </a>
      <hr />

      {/* ✅ 2. 根据 ID 获取 Todo */}
      <h4>Get Todo By ID</h4>
      <FormControl
        className="mb-2 w-50"
        placeholder="Todo ID"
        value={todo.id}
        onChange={(e) => setTodo({ ...todo, id: e.target.value })}
      />
      <a
        id="wd-get-todo-by-id"
        className="btn btn-secondary"
        href={`${REMOTE_SERVER}/lab5/todos/${todo.id}`}
        target="_blank"
        rel="noreferrer"
      >
        Get Todo By ID
      </a>
      <hr />

      {/* ✅ 3. 获取已完成 Todos */}
      <h4>Filter Todos with Query</h4>
      <a
        id="wd-retrieve-completed-todos"
        className="btn btn-primary"
        href={`${REMOTE_SERVER}/lab5/todos?completed=true`}
        target="_blank"
        rel="noreferrer"
      >
        Get Completed Todos
      </a>
      <hr />

      {/* ✅ 4. 创建默认 Todo */}
      <h4>Creating New Items in an Array</h4>
      <a
        id="wd-create-default-todo"
        className="btn btn-primary mb-3"
        href={`${REMOTE_SERVER}/lab5/todos/create`}
        target="_blank"
        rel="noreferrer"
      >
        Create Default Todo
      </a>
      <hr />

      {/* ✅ 5. 更新 Todo Title */}
      <h4>Update Title</h4>
      <FormControl
        className="mb-2 w-25 float-start me-2"
        placeholder="Todo ID"
        value={todo.id}
        onChange={(e) => setTodo({ ...todo, id: e.target.value })}
      />
      <FormControl
        className="mb-2 w-50 float-start"
        placeholder="New Title"
        value={todo.title}
        onChange={(e) => setTodo({ ...todo, title: e.target.value })}
      />
      <a
        id="wd-update-todo-title"
        className="btn btn-info float-end"
        href={`${REMOTE_SERVER}/lab5/todos/${todo.id}/title/${encodeURIComponent(
          todo.title
        )}`}
        target="_blank"
        rel="noreferrer"
      >
        Update Todo
      </a>
      <br />
      <br />
      <hr />

      {/* ✅ 6. 删除 Todo */}
      <h4>Delete Todo</h4>
      <FormControl
        className="mb-2 w-50"
        placeholder="Todo ID to Delete"
        value={todo.id}
        onChange={(e) => setTodo({ ...todo, id: e.target.value })}
      />
      <a
        id="wd-delete-todo"
        className="btn btn-danger"
        href={`${REMOTE_SERVER}/lab5/todos/${todo.id}/delete`}
        target="_blank"
        rel="noreferrer"
      >
        Delete Todo with ID = {todo.id}
      </a>
      <hr />

      {/* ✅ 7. Update Completed */}
      <h4>Update Completed</h4>
      <FormControl
        className="mb-2 w-25"
        placeholder="Todo ID"
        value={completedId}
        onChange={(e) => setCompletedId(e.target.value)}
      />
      <div className="d-flex align-items-center mb-2">
        <label className="form-check-label me-2">Completed:</label>
        <input
          type="checkbox"
          className="form-check-input me-2"
          checked={completedValue}
          onChange={(e) => setCompletedValue(e.target.checked)}
        />
        <a
          id="wd-update-completed"
          className="btn btn-dark"
          href={`${REMOTE_SERVER}/lab5/todos/${completedId}/completed/${completedValue}`}
          target="_blank"
          rel="noreferrer"
        >
          Update Completed for Todo ID = {completedId}
        </a>
      </div>
      <hr />

      {/* ✅ 8. Update Description */}
      <h4>Update Description</h4>
      <FormControl
        className="mb-2 w-25"
        placeholder="Todo ID"
        value={descriptionId}
        onChange={(e) => setDescriptionId(e.target.value)}
      />
      <FormControl
        className="mb-2 w-50"
        placeholder="New Description"
        value={descriptionText}
        onChange={(e) => setDescriptionText(e.target.value)}
      />
      <a
        id="wd-update-description"
        className="btn btn-secondary"
        href={`${REMOTE_SERVER}/lab5/todos/${descriptionId}/description/${encodeURIComponent(
          descriptionText
        )}`}
        target="_blank"
        rel="noreferrer"
      >
        Update Description for Todo ID = {descriptionId}
      </a>
      <hr />
    </div>
  );
}
