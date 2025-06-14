import { useState, useEffect } from "react";
import { ListGroup, FormControl } from "react-bootstrap";
import { FaTrash, FaPlusCircle } from "react-icons/fa";
import { FaPencil } from "react-icons/fa6";
import { TiDelete } from "react-icons/ti";
import * as client from "./client";

export default function WorkingWithArraysAsynchronously() {
  const [todos, setTodos] = useState<any[]>([]);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const fetchTodos = async () => {
    try {
      const todos = await client.fetchTodos();
      setTodos(todos);
      setErrorMessage(null); // 清空旧错误
    } catch (e) {
      setErrorMessage("Failed to load todos.");
    }
  };

  const removeTodo = async (todo: any) => {
    try {
      const updatedTodos = await client.removeTodo(todo); // GET 删除方式
      setTodos(updatedTodos);
      setErrorMessage(null);
    } catch (error: any) {
      setErrorMessage(error.response?.data?.message || "Delete failed");
    }
  };

  const deleteTodo = async (todo: any) => {
    try {
      await client.deleteTodo(todo); // DELETE 方法
      setTodos(todos.filter((t) => t.id !== todo.id));
      setErrorMessage(null);
    } catch (error: any) {
      setErrorMessage(error.response?.data?.message || "Delete failed");
    }
  };

  const createTodo = async () => {
    try {
      const updatedTodos = await client.createTodo(); // GET 创建
      setTodos(updatedTodos);
      setErrorMessage(null);
    } catch {
      setErrorMessage("Create failed");
    }
  };

  const postTodo = async () => {
    try {
      const newTodo = await client.postTodo({
        title: "New Posted Todo",
        completed: false,
      });
      setTodos([...todos, newTodo]);
      setErrorMessage(null);
    } catch {
      setErrorMessage("Post failed");
    }
  };

  const updateTodo = async (todo: any) => {
    try {
      await client.updateTodo(todo); // PUT 更新
      setTodos(todos.map((t) => (t.id === todo.id ? todo : t)));
      setErrorMessage(null);
    } catch (error: any) {
      setErrorMessage(error.response?.data?.message || "Update failed");
    }
  };

  const editTodo = (todo: any) => {
    const updated = todos.map((t) =>
      t.id === todo.id ? { ...t, editing: true } : t
    );
    setTodos(updated);
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  return (
    <div id="wd-asynchronous-arrays">
      <h3>Working with Arrays Asynchronously</h3>

      {/* 错误提示 */}
      {errorMessage && (
        <div
          id="wd-todo-error-message"
          className="alert alert-danger my-2"
        >
          {errorMessage}
        </div>
      )}

      <h4>
        Todos
        <FaPlusCircle
          onClick={postTodo}
          className="text-primary float-end fs-3 ms-2"
          id="wd-post-todo"
          style={{ cursor: "pointer" }}
          title="Post New Todo"
        />
        <FaPlusCircle
          onClick={createTodo}
          className="text-success float-end fs-3"
          id="wd-create-todo"
          style={{ cursor: "pointer" }}
          title="Create Todo (GET)"
        />
      </h4>

      <ListGroup>
        {todos.map((todo) => (
          <ListGroup.Item key={todo.id}>
            <FaTrash
              onClick={() => removeTodo(todo)}
              className="text-danger float-end mt-1"
              id="wd-remove-todo"
              style={{ cursor: "pointer" }}
              title="Delete (GET)"
            />
            <TiDelete
              onClick={() => deleteTodo(todo)}
              className="text-danger float-end mt-1 me-3 fs-4"
              id="wd-delete-todo"
              style={{ cursor: "pointer" }}
              title="Delete (DELETE)"
            />
            <FaPencil
              onClick={() => editTodo(todo)}
              className="text-primary float-end mt-1 me-2"
              style={{ cursor: "pointer" }}
              title="Edit"
            />
            <input
              type="checkbox"
              className="form-check-input me-2 float-start"
              defaultChecked={todo.completed}
              onChange={(e) =>
                updateTodo({ ...todo, completed: e.target.checked })
              }
            />
            {!todo.editing ? (
              <span
                style={{
                  textDecoration: todo.completed ? "line-through" : "none",
                }}
              >
                {todo.title}
              </span>
            ) : (
              <FormControl
                className="w-50 float-start"
                defaultValue={todo.title}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    updateTodo({ ...todo, editing: false });
                  }
                }}
                onChange={(e) =>
                  updateTodo({ ...todo, title: e.target.value })
                }
              />
            )}
          </ListGroup.Item>
        ))}
      </ListGroup>
      <hr />
    </div>
  );
}
