import { useEffect, useState } from "react";
import TodoItem from "./components/TodoItem";
import AddTodoForm from "./components/AddTodoForm";
import EditForm from "./components/EditForm";
import "./styles.css";

// ▼TODOリスト内の各TODOにほしい要素
// 　・ID(連番もしくはuuidを設定)
// 　・詳細
// ▼ほしい機能
// 　・フィルター(ID、期限、ステータスで絞り込み)
// ▼余裕があれば以下のようなカスタマイズをする
// 　・期限の追加などの要素追加（期限、内容、作成日、更新日など）
// 　・ソート(ID、期限)
// 　・ステータス変更でスタイル変更
// 　・Typescirpt化してみる
// 　・Recoilを使って状態管理
// 　・Firebaseまたは、Supabaseを導入してデータの永続化

export default function App() {
  //todoを管理するために必要
  const [todos, setTodos] = useState(() => {
    // 入力された値を管理するため
    const savedTodos = localStorage.getItem("todos");
    if (savedTodos) {
      return JSON.parse(savedTodos);
    } else {
      return [];
    }
  });

  const [todo, setTodo] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [currentTodo, setCurrentTodo] = useState({});

  // コンポーネントがマウントされた時点で実行されるuseEffect
  useEffect(() => {
    // localstorage はキーと値として文字列を格納することしかサポートしていない
    // したがって，配列やオブジェクトを格納する際には，まずオブジェクトを文字列に変換する必要がある
    // 最初にオブジェクトを文字列に変換しなければならない
    // JSON.stringify は、オブジェクトを JSON 文字列に変換する
    localStorage.setItem("todos", JSON.stringify(todos));
    // 上記でJSON文字列に変換した内容に更新したいので、todosを追加
  }, [todos]);

  // 入力の値を取得し、新しい状態を設定する関数
  const handleAddInputChange = (e) => {
    // 値を入力ボックスに設定
    setTodo(e.target.value);
  };

  const handleEditInputChange = (e) => {
    setCurrentTodo({ ...currentTodo, text: e.target.value });
  };

  // フォーム送信時に新しいオブジェクトを作成する関数
  const handleAddFormSubmit = (e) => {
    // ブラウザのデフォルト動作や送信時にページを更新しないようにする
    e.preventDefault();

    // 空文字の場合、送信しない
    if (todo !== "") {
      // 新しいTODOの状態を設定
      setTodos([
        // 現在の値をコピーする
        ...todos,
        {
          // オブジェクトを識別するためのidを設定
          id: new Date(),
          // textプロパティにtodoの値を設定し、入力から空白を切り取る
          text: todo.trim(),
          // タイムスタンプ設置
          time: new Date().toLocaleString({ timeZone: "Asia/Tokyo" }),
          number: todos.length + 1,
        },
      ]);
    }
    // 入力欄を削除
    setTodo("");
  };

  const handleEditFormSubmit = (e) => {
    e.preventDefault();

    handleUpdateTodo(currentTodo.id, currentTodo);
  };

  const handleDeleteClick = (id) => {
    const removeItem = todos.filter((todo) => {
      // 削除するアイテムと一致しない残りのTODOを帰す
      return todo.id !== id;
    });
    setTodos(removeItem);
  };

  // 編集機能の呼び出し
  const handleUpdateTodo = (id, updatedTodo) => {
    const updatedItem = todos.map((todo) => {
      return todo.id === id ? updatedTodo : todo;
    });
    setIsEditing(false);
    setTodos(updatedItem);
  };

  const handleEditClick = (todo) => {
    setIsEditing(true);
    // 編集ボタンクリック時に引数に渡しているtodoで新しいオブジェクトとして渡す
    setCurrentTodo({ ...todo });
  };

  return (
    <div className="App">
      {/* フォーム要素を作成する */}
      {isEditing ? (
        <EditForm
          // 入力要素を作成
          currentTodo={currentTodo}
          setIsEditing={setIsEditing}
          onEditInputChange={handleEditInputChange}
          onEditFormSubmit={handleEditFormSubmit}
        />
      ) : (
        <AddTodoForm
          todo={todo}
          onAddInputChange={handleAddInputChange}
          onAddFormSubmit={handleAddFormSubmit}
        />
      )}

      {/* リストを保持するためのulを作成 */}
      <ul className="todo-list" style={{ listStyle: "none" }}>
        {/* todoの配列にマッピングし、各Todoに対して新しいliを作成する */}
        {/* 必ず、todo.idの値を "key "プロパティとして、li要素に追加する事)
        オブジェクトの配列なので、"text "プロパティにアクセスする必要がある
        text "プロパティにアクセスして、表示したい値を取得する必要がある*/}
        {todos.map((todo) => (
          <TodoItem
            key={todo.id}
            todo={todo}
            onEditClick={handleEditClick}
            onDeleteClick={handleDeleteClick}
          />
        ))}
      </ul>
    </div>
  );
}
