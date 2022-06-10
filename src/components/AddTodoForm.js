export default function AddTodoForm({
  todo,
  onAddFormSubmit,
  onAddInputChange,
}) {
  return (
    <form onSubmit={onAddFormSubmit} style={{ textAlign: "center" }}>
      <h2>ToDo List</h2>
      <label htmlFor="todo"></label>
      <div className="ui input">
        <input
          style={{ marginRight: "5px" }}
          name="todo"
          type="text"
          placeholder="ToDoを入力"
          value={todo}
          onChange={onAddInputChange}
          autoFocus
        />
        <button
          className="ui primary button"
          type="submit"
          onClick={onAddFormSubmit}
        >
          ＋ 追加
        </button>
      </div>
    </form>
  );
}
