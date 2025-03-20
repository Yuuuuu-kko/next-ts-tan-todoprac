"use client";

import { useMutation, useMutationState, useQuery } from "@tanstack/react-query";
import { isError } from "node:util";
import React from "react";

// type명시
type Todo = {
  id: number;
  title: string;
  contents: string;
  isDone: boolean;
};

const TodoListPage = () => {
  const {
    data: todos,
    isPending,
    isError,
  } = useQuery<Todo[]>({
    queryKey: ["todos"],
    queryFn: async () => {
      const res = await fetch("http://localhost:4000/todos");
      const data = await res.json();
      return data;
    },
  });

  const addMutation = useMutationState({
    mutationFn: async (todo: Todo) => {
      const res = await fetch("http://localhost:4000/todos", {
        method: "POST",
        body: JSON.stringify(todo),
      });
      return res.json();
    },
  });

  if (isPending) {
    return <div>Loading...</div>;
  }

  // 아래 todos에 오류뜬 이유는 error일때 보장이 안되니까 isError까지 처리!! error일때는 todos가 undefine일수밖에없다
  if (isError) {
    return <div>Error...</div>;
  }

  return (
    <div>
      <h1>Next TodoList</h1>

      <div>
        <h3>완료목록</h3>

        <div>
          <input type="text" placeholder="제목" />
          <input type="text" placeholder="내용" />
        </div>

        {todos
          .filter((todo) => todo.isDone === true)
          .map((todo) => {
            return (
              <div
                key={todo.id}
                className="border boerder-gray-300 p-4 rounded-md mb-2"
              >
                <h2>{todo.title}</h2>
                <p>{todo.contents}</p>
                <div className="flex gap-2">
                  <button className="bg-blue-500 text-white px-2 py-1 rounded-md ">
                    {todo.isDone ? "취소" : "완료"}
                  </button>
                  <button className="bg-blue-500 text-white px-2 py-1 rounded-md ">
                    삭제
                  </button>
                </div>
              </div>
            );
          })}
      </div>
      <div>
        <h3>할일목록</h3>
        {todos
          .filter((todo) => !todo.isDone)
          .map((todo) => {
            return (
              <div
                key={todo.id}
                className="border boerder-gray-300 p-4 rounded-md mb-2"
              >
                <h2>{todo.title}</h2>
                <p>{todo.contents}</p>
                <div className="flex gap-2">
                  <button className="bg-blue-500 text-white px-2 py-1 rounded-md ">
                    {todo.isDone ? "취소" : "완료"}
                  </button>
                  <button className="bg-blue-500 text-white px-2 py-1 rounded-md ">
                    삭제
                  </button>
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default TodoListPage;
