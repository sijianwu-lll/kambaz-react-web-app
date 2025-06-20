let todos = [
  { id: 1, title: "Task 1", completed: false, description: "desc 1" },
  { id: 2, title: "Task 2", completed: true, description: "desc 2" },
  { id: 3, title: "Task 3", completed: false, description: "desc 3" },
  { id: 4, title: "Task 4", completed: true, description: "desc 4" },
];

export default function WorkingWithArrays(app) {
  app.get("/lab5/todos", (req, res) => {
    const { completed } = req.query;
    if (completed !== undefined) {
      const completedBool = completed === "true";
      const filtered = todos.filter((t) => t.completed === completedBool);
      res.json(filtered);
    } else {
      res.json(todos);
    }
  });

  app.get("/lab5/todos/create", (req, res) => {
    const newTodo = {
      id: new Date().getTime(),
      title: "New Task",
      completed: false,
      description: "",
    };
    todos.push(newTodo);
    res.json(todos);
  });

  app.get("/lab5/todos/create/:title", (req, res) => {
    const newTodo = {
      id: new Date().getTime(),
      title: req.params.title,
      completed: false,
      description: "",
    };
    todos.push(newTodo);
    res.json(todos);
  });

  app.get("/lab5/todos/:id/title/:title", (req, res) => {
    const { id, title } = req.params;
    const todo = todos.find((t) => t.id === parseInt(id));
    if (todo) {
      todo.title = title;
      res.json(todos);
    } else {
      res.status(404).send("Todo not found");
    }
  });

  app.get("/lab5/todos/:id/completed/:completed", (req, res) => {
    const { id, completed } = req.params;
    const todo = todos.find((t) => t.id === parseInt(id));
    if (todo) {
      todo.completed = completed === "true";
      res.json(todos);
    } else {
      res.status(404).send("Todo not found");
    }
  });

  app.get("/lab5/todos/:id/description/:description", (req, res) => {
    const { id, description } = req.params;
    const todo = todos.find((t) => t.id === parseInt(id));
    if (todo) {
      todo.description = description;
      res.json(todos);
    } else {
      res.status(404).send("Todo not found");
    }
  });

  app.get("/lab5/todos/:id/delete", (req, res) => {
    const { id } = req.params;
    const todoIndex = todos.findIndex((t) => t.id === parseInt(id));
    if (todoIndex !== -1) {
      todos.splice(todoIndex, 1);
      res.json(todos);
    } else {
      res.status(404).send("Todo not found");
    }
  });

  // ✅ 更新：更安全的 DELETE，返回错误消息
  app.delete("/lab5/todos/:id", (req, res) => {
    const { id } = req.params;
    const todoIndex = todos.findIndex((t) => t.id === parseInt(id));
    if (todoIndex === -1) {
      res.status(404).json({ message: `Unable to delete Todo with ID ${id}` });
      return;
    }
    todos.splice(todoIndex, 1);
    res.sendStatus(200);
  });

  app.get("/lab5/todos/:id", (req, res) => {
    const id = parseInt(req.params.id);
    const todo = todos.find((t) => t.id === id);
    if (todo) {
      res.json(todo);
    } else {
      res.status(404).send("Todo not found");
    }
  });

  app.post("/lab5/todos", (req, res) => {
    const newTodo = { ...req.body, id: new Date().getTime() };
    todos.push(newTodo);
    res.json(newTodo);
  });

  // ✅ 更新：更安全的 PUT，返回错误消息
  app.put("/lab5/todos/:id", (req, res) => {
    const { id } = req.params;
    const todoIndex = todos.findIndex((t) => t.id === parseInt(id));
    if (todoIndex === -1) {
      res.status(404).json({ message: `Unable to update Todo with ID ${id}` });
      return;
    }
    todos = todos.map((t) =>
      t.id === parseInt(id) ? { ...t, ...req.body } : t
    );
    res.sendStatus(200);
  });
}
