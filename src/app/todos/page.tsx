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

  return (
    <div>
      <h1>Next TodoList</h1>

      <TodoForm
      // title={title}
      // contents={contents}
      // setTitle={setTitle}
      // setContents={setContents}
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
