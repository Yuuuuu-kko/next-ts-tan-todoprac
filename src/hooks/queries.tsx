import { getTodos } from "@/services";
import { Todo } from "@/types";
import { useQuery } from "@tanstack/react-query";

export const useTodos = () => {
  return useQuery<Todo[]>({
    queryKey: ["todos"],
    queryFn: getTodos,
  });
};
