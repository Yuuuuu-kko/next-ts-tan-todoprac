import React from "react";

const TodoForm = ({
  title,
  contents,
  setTitle,
  setContents,
  handleSubmit,
}: {
  title: string;
  contents: string;
  setTitle: (title: string) => void;
  setContents: (contents: string) => void;
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
}) => {
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
