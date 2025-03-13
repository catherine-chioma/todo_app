import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css'; // Adjust the path if you're using a different file name or location


// Todo interface for TypeScript
interface Todo {
  _id: string;
  title: string;
  completed: boolean;
}

const TodoApp: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [newTodo, setNewTodo] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false); // To track loading state
  const [error, setError] = useState<string | null>(null); // To track error state
  
  // Fetch all todos on initial render
  useEffect(() => {
    setLoading(true);
    axios.get('http://localhost:5000/todos')
      .then(response => {
        setTodos(response.data);
        setLoading(false);
      })
      .catch(error => {
        console.error(error);
        setError('Failed to fetch todos');
        setLoading(false);
      });
  }, []);

  // Create a new todo
  const createTodo = () => {
    if (!newTodo.trim()) {
      alert('Please enter a todo!');
      return;
    }
    axios.post('http://localhost:5000/todos', { title: newTodo })
      .then(response => {
        setTodos([...todos, response.data]);
        setNewTodo('');
      })
      .catch(error => {
        console.error(error);
        setError('Failed to create todo');
      });
  };

  // Update a todo
  const updateTodo = (id: string, updatedTitle: string) => {
    if (!updatedTitle.trim()) {
      alert('Please enter a valid title!');
      return;
    }
    axios.put(`http://localhost:5000/todos/${id}`, { title: updatedTitle })
      .then(response => {
        const updatedTodos = todos.map(todo =>
          todo._id === id ? { ...todo, title: updatedTitle } : todo
        );
        setTodos(updatedTodos);
      })
      .catch(error => {
        console.error(error);
        setError('Failed to update todo');
      });
  };

  // Delete a todo
  const deleteTodo = (id: string) => {
    axios.delete(`http://localhost:5000/todos/${id}`)
      .then(() => {
        const remainingTodos = todos.filter(todo => todo._id !== id);
        setTodos(remainingTodos);
      })
      .catch(error => {
        console.error(error);
        setError('Failed to delete todo');
      });
  };

  return (
    <div>
      <h1>Todo App</h1>

      {/* Display any errors */}
      {error && <div style={{ color: 'red' }}>{error}</div>}

      {/* Add a new todo */}
      <input 
        type="text" 
        value={newTodo} 
        onChange={e => setNewTodo(e.target.value)} 
        placeholder="Enter todo" 
      />
      <button onClick={createTodo}>Add Todo</button>

      {/* Display loading state */}
      {loading && <p>Loading...</p>}

      <ul>
        {/* Displaying all todos */}
        {todos.map(todo => (
          <li key={todo._id}>
            {/* Display todo title and edit option */}
            <span>{todo.title}</span>
            <button onClick={() => updateTodo(todo._id, prompt('Edit Todo', todo.title) || todo.title)}>Edit</button>
            <button onClick={() => deleteTodo(todo._id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TodoApp;

