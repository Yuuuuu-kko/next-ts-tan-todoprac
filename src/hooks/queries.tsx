import { Todo } from "@/types";
import { useQuery } from "@tanstack/react-query";

export const useTodos = () => {
  return useQuery<Todo[]>({
    queryKey: ["todos"],
    queryFn: async () => {
      const res = await fetch("http://localhost:4000/todos");
      const data = await res.json();
      return data;
    },
  });
};
