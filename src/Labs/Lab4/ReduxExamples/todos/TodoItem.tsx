import { useDispatch } from "react-redux";
import { deleteTodo, setTodo } from "./todosReducer";
import { Button, ListGroup } from "react-bootstrap";

export default function TodoItem({ todo }: { todo: { id: string; title: string } }) {
  const dispatch = useDispatch();

  return (
    <ListGroup.Item className="d-flex justify-content-between align-items-center">
      <span>{todo.title}</span>
      <div className="d-flex gap-2">
        <Button onClick={() => dispatch(setTodo(todo))} id="wd-set-todo-click" size="sm" variant="primary">
          Edit
        </Button>
        <Button onClick={() => dispatch(deleteTodo(todo.id))} id="wd-delete-todo-click" size="sm" variant="danger">
          Delete
        </Button>
      </div>
    </ListGroup.Item>
  );
}
