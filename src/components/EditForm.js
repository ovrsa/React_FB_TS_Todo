export default function EditForm({
  currentTodo,
  setIsEditing,
  onEditInputChange,
  onEditFormSubmit,
}) {
  return (
    <form onSubmit={onEditFormSubmit} style={{ textAlign: "center" }}>
      <h2 style={{ color: "#0E6EB8" }}>ToDoを編集</h2>
      <label htmlFor="updateTodo"></label>
      <div className="ui input">
        <input
          style={{ marginRight: "5px" }}
          name="updateTodo"
          type="text"
          placeholder="Update todo"
          value={currentTodo.text}
          onChange={onEditInputChange}
        />
      </div>
      <button
        className="ui primary button"
        type="submit"
        onClick={onEditFormSubmit}
      >
        修正
      </button>
      <button className="ui button" onClick={() => setIsEditing(false)}>
        キャンセル
      </button>
    </form>
  );
}
