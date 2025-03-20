"use client";

import { useAddTodo } from "@/hooks/mutations";
import { useTodos } from "@/hooks/queries";
import {
  useMutation,
  useMutationState,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { isError } from "node:util";
import React, { useState } from "react";

const TodoListPage = () => {
  //  const queryClient = useQueryClient(); // 동기화시켜주는 코드랑 세트 new아니고 use!!

  const [title, setTitle] = useState("");
  const [contents, setContents] = useState("");

  const { data: todos, isPending, isError } = useTodos();

  // const addMutation = useMutation({

  // 구조분해할당 : addTodo는 명시적으로 쓰기위해 이름 붙이기 // obj 객체니까 mutate만 쓸거면 구조분해할당한것
  const { mutate: addTodo } = useAddTodo();

  if (isPending) {
    return <div>Loading...</div>;
  }

  // 아래 todos에 오류뜬 이유는 error일때 보장이 안되니까 isError까지 처리!! error일때는 todos가 undefine일수밖에없다
  if (isError) {
    return <div>Error...</div>;
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    addTodo({ title, contents, isDone: false });
  };

  return (
    <div>
      <h1>Next TodoList</h1>

      <div>
        <h3>완료목록</h3>

        <form className="flex gap=2" onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="제목"
            className="border boerder-gray-300 p-4 rounded-md mb-2"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <input
            type="text"
            placeholder="내용"
            className="border boerder-gray-300 p-4 rounded-md mb-2"
            value={contents}
            onChange={(e) => setContents(e.target.value)}
          />
          <button
            type="submit"
            className="border boerder-gray-300 p-4 rounded-md mb-2"
          >
            추가
          </button>
        </form>

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
