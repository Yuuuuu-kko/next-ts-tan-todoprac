"use client";

import List from "@/components/List";
import TodoForm from "@/components/TodoForm";
import { useAddTodo, useDeleteTodo, useSwichTodo } from "@/hooks/mutations";
// import { useTodos } from "@/hooks/queries";
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

  // const addMutation = useMutation({
  // 구조분해할당 : addTodo는 명시적으로 쓰기위해 이름 붙이기 // obj 객체니까 mutate만 쓸거면 구조분해할당한것
  const { mutate: addTodo } = useAddTodo();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    addTodo({ title, contents, isDone: false });
  };

  return (
    <div>
      <h1>Next TodoList</h1>

      <TodoForm
        title={title}
        contents={contents}
        setTitle={setTitle}
        setContents={setContents}
        handleSubmit={handleSubmit}
      />

      {/* 하나의 component를 두번 재활용하였다 */}
      {/* 완료목록 */}
      <List listFor="done" />

      {/* Todo를 위한 목록 */}
      <List listFor="todo" />
    </div>
  );
};

export default TodoListPage;
