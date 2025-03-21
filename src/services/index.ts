export const getTodos = async () => {
  const res = await fetch("http://localhost:4000/todos");
  const data = await res.json();
  return data;
};

export const addTodo = async (newTodo: {
  title: string;
  contents: string;
  isDone: boolean;
}) => {
  const res = await fetch("http://localhost:4000/todos", {
    method: "POST",
    body: JSON.stringify(newTodo),
  });
  return res.json();
};

export const switchTodo = async ({
  todoId,
  isDone,
}: {
  todoId: number;
  isDone: boolean;
}) => {
  const res = await fetch(`http://localhost:4000/todos/${todoId}`, {
    method: "PATCH",
    body: JSON.stringify({ isDone }),
  });
  return res.json();
};

export const deleteTodo = async (todoId: number) => {
  const res = await fetch(`http://localhost:4000/todos/${todoId}`, {
    method: "DELETE",
  });
  return res.json();
};
