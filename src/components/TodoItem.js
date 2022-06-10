import React from "react";

export default function TodoItem({ todo, onEditClick, onDeleteClick }) {
  return (
    <div
      className="ui raised segments"
      style={{
        paddingTop: "10px",
        maxWidth: "600px",
        marginLeft: "auto",
        marginRight: "auto",
      }}
    >
      <li key={todo.id}>
        {todo.number}
        {todo.text}
        <select
          className="ui compact menu"
          aria-label="Default select example"
          style={{ width: "80px", marginRight: "3.5px", listStyle: "none" }}
        >
          <option value="notStarted" defaultValue>
            未着手
          </option>
          <option value="inProgress">進行中</option>
          <option value="done">完了</option>
        </select>
        <button className="ui primary button" onClick={() => onEditClick(todo)}>
          編集
        </button>
        <button
          className="ui red button"
          style={{ marginRight: "0", marginLeft: "auto" }}
          onClick={() => onDeleteClick(todo.id)}
        >
          削除
        </button>
        登録日:{todo.time}
      </li>
    </div>
  );
}
