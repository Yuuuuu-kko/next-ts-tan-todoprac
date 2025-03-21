import { useAddTodo } from "@/hooks/mutations";
import React, { useState } from "react";

const TodoForm = () =>
  //   title,
  //   contents,
  //   setTitle,
  //   setContents,
  // }: {
  //   title: string;
  //   contents: string;
  //   setTitle: (title: string) => void;
  //   setContents: (contents: string) => void;
  // handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;

  {
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
    );
  };

export default TodoForm;
