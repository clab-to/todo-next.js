'use client';
import { useEffect, useState } from 'react';

interface Todo {
  id: number;
  text: string;
  createdAt: string;
}

export default function Home() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [input, setInput] = useState('');

  // 初期データ取得
  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    const res = await fetch('/api/todos');
    const data = await res.json();
    setTodos(data);
  };

  const addTodo = async () => {
    if (input.trim() === '') return;
    await fetch('/api/todos', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ text: input }),
    });
    setInput('');
    fetchTodos();
  };

  const deleteTodo = async (id: number) => {
    await fetch(`/api/todos/${id}`, {
      method: 'DELETE',
    });
    fetchTodos();
  };

  return (
    <div className="flex flex-col items-center min-h-screen p-8 bg-gray-50">
      <h1 className="text-3xl font-bold mb-8">TODOアプリ</h1>
      <div className="flex gap-2 mb-6 w-full max-w-md">
        <input
          type="text"
          className="flex-1 border rounded px-3 py-2 text-lg"
          placeholder="新しいTODOを入力..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.nativeEvent.isComposing) return;
            if (e.key === 'Enter') addTodo();
          }}
        />
        <button
          type="button"
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          onClick={addTodo}
        >
          追加
        </button>
      </div>
      <ul className="w-full max-w-md space-y-2">
        {todos.length === 0 && <li className="text-gray-400 text-center">TODOはありません</li>}
        {todos.map((todo) => (
          <li
            key={todo.id}
            className="flex items-center justify-between bg-white rounded px-4 py-2 shadow"
          >
            <span>{todo.text}</span>
            <button
              type="button"
              className="text-red-500 hover:underline"
              onClick={() => deleteTodo(todo.id)}
            >
              削除
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
