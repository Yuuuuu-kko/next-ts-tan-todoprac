import { useMutation, useQueryClient } from "@tanstack/react-query";

// update
export const useAddTodo = () => {
  // 새롭게 queryClient만드는게 아니고 프로젝트내 떠돌고 있는 쿼클 사용하겠다는것
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (newTodo: {
      title: string;
      contents: string;
      isDone: boolean;
    }) => {
      const res = await fetch("http://localhost:4000/todos", {
        method: "POST",
        body: JSON.stringify(newTodo),
      });
      console.log(res);

      return res.json();
    },
    // input값에 제목, 타이틀 입력하면 바로 화면에 안뜬다 // 서버가 동기화가 안되어서 // 동기화시켜주는 코드
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["todos"] });
    },
  });
};

// R c 수정
export const useSwichTodo = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
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
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["todos"] });
    },
  });
};

// 삭제
export const useDeleteTodo = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (todoId: number) => {
      const res = await fetch(`http://localhost:4000/todos/${todoId}`, {
        method: "DELETE",
      });
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["todos"] });
    },
  });
};
