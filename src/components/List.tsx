import React from "react";
import { useTodos } from "@/hooks/queries";
import { useDeleteTodo, useSwitchTodo } from "@/hooks/mutations";

// import { Todo } from "@/types"; // 바로 아래의 이유로 필요없어짐

//   todos, 아래 useTodos를 page.tsx에서 분리하여 가져옴 여기서는 불필요해서 삭제 // 아래에 있으니까

//   handleSwitch,
//   handleDelete,
//   listFor,
//   todos: Todo[]; // props로 불필요하게 전달 받을 필요가 없어서 즉, 위와 같은 이유

//   handleSwitch: ({
//     todoId,
//     isDone,
//   }: {
//     todoId: number;
//     isDone: boolean;
//   }) => void;
// handleDelete: (todoId: number) => void;

const List = ({ listFor }: { listFor: "done" | "todo" }) => {
  const { data: todos, isPending, isError } = useTodos();
  const { mutate: switchTodo } = useSwitchTodo();
  const { mutate: deleteTodo } = useDeleteTodo();

  const handleSwitch = ({
    todoId,
    isDone,
  }: {
    todoId: number;
    isDone: boolean;
  }) => {
    switchTodo({
      todoId,
      isDone,
    });
  };

  const handleDelete = (todoId: number) => {
    deleteTodo(todoId);
  };

  if (isPending) {
    return <div>isPending...</div>;
  }

  // 아래 todos에 오류뜬 이유는 error일때 보장이 안되니까 isError까지 처리!! error일때는 todos가 undefine일수밖에없다
  if (isError) {
    return <div>Error...</div>;
  }

  console.log(todos);

  return (
    <div>
      <h3>{listFor === "done" ? "완료목록" : "할일목록"}</h3>

      {/* listFor props가 done으로 왔을때는 완료목록(todo.isDone)이 완료목록이니까 true인것만 filtering
            그게 아니면 false만 filtering */}
      {todos
        .filter((todo) => {
          if (listFor === "done") {
            return todo.isDone === true;
          } else {
            return todo.isDone === false;
          }
        })
        .map((todo) => {
          return (
            <div
              key={todo.id}
              className="border boerder-gray-300 p-4 rounded-md mb-2"
            >
              <h2>{todo.title}</h2>
              <p>{todo.contents}</p>
              <div className="flex gap-2">
                <button
                  className="bg-blue-500 text-white px-2 py-1 rounded-md "
                  onClick={() => {
                    handleSwitch({
                      todoId: todo.id,
                      isDone: !todo.isDone,
                    });
                  }}
                >
                  {/* {todo.isDone ? "취소" : "완료"} */}
                  {/* 취소 */}
                  {/* listFor가 done이면 완료된거니까 완료를 취소할수있게 취소버튼으로 그게 아니면 완료버튼으로 */}
                  {listFor === "done" ? "취소" : "완료"}
                </button>
                <button
                  className="bg-red-500 text-white px-2 py-1 rounded-md "
                  onClick={() => {
                    handleDelete(todo.id);
                  }}
                >
                  삭제
                </button>
              </div>
            </div>
          );
        })}
    </div>
  );
};

export default List;
