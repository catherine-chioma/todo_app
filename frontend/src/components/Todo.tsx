import React, { useState, useEffect } from 'react';
import axios from 'axios';

// Define the Todo interface with the necessary fields
interface Todo {
  _id: string;
  title: string;
  completed: boolean;
}

const TodoList: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]); // List of todos
  const [newTodo, setNewTodo] = useState<string>(''); // For new todo input
  const [editTitle, setEditTitle] = useState<string>(''); // For editing todo title
  const [editId, setEditId] = useState<string | null>(null); // For the todo being edited

  // Fetch todos from the API when the component mounts
  useEffect(() => {
    axios
      .get('http://localhost:5000/todos') // Replace with your API endpoint
      .then(res => setTodos(res.data))
      .catch(err => console.log(err));
  }, []);

  // Handle adding a new todo
  const handleAddTodo = () => {
    if (newTodo.trim()) {
      axios
        .post('http://localhost:5000/todos', { title: newTodo, completed: false })
        .then(res => {
          setTodos([...todos, res.data]); // Add the new todo to the list
          setNewTodo(''); // Clear input field
        })
        .catch(err => console.log(err));
    }
  };

  // Handle deleting a todo
  const handleDeleteTodo = (id: string) => {
    axios
      .delete(`http://localhost:5000/todos/${id}`)
      .then(() => {
        setTodos(todos.filter(todo => todo._id !== id)); // Remove deleted todo from list
      })
      .catch(err => console.log(err));
  };

  // Handle toggling completion of a todo
  const handleToggleComplete = (id: string) => {
    const todoToUpdate = todos.find(todo => todo._id === id);
    if (todoToUpdate) {
      axios
        .put(`http://localhost:5000/todos/${id}`, {
          ...todoToUpdate,
          completed: !todoToUpdate.completed,
        })
        .then(res => {
          setTodos(
            todos.map(todo => (todo._id === id ? { ...todo, completed: res.data.completed } : todo))
          );
        })
        .catch(err => console.log(err));
    }
  };

  // Handle editing a todo
  const handleEditTodo = (id: string) => {
    const todoToEdit = todos.find(todo => todo._id === id);
    if (todoToEdit) {
      setEditId(todoToEdit._id);
      setEditTitle(todoToEdit.title);
    }
  };

  // Handle updating the edited todo
  const handleUpdateTodo = () => {
    if (editTitle.trim() && editId) {
      axios
        .put(`http://localhost:5000/todos/${editId}`, { title: editTitle })
        .then(res => {
          setTodos(todos.map(todo => (todo._id === editId ? { ...todo, title: res.data.title } : todo)));
          setEditId(null);
          setEditTitle('');
        })
        .catch(err => console.log(err));
    }
  };

  return (
    <div>
      <h1>Todo List</h1>
      
      {/* Input for adding a new todo */}
      <div>
        <input
          type="text"
          value={newTodo}
          onChange={e => setNewTodo(e.target.value)}
          placeholder="Add a new todo"
        />
        <button onClick={handleAddTodo}>Add Todo</button>
      </div>

      {/* List of todos */}
      <ul>
        {todos.map(todo => (
          <li key={todo._id} style={{ textDecoration: todo.completed ? 'line-through' : '' }}>
            {/* Edit */}
            {editId === todo._id ? (
              <>
                <input
                  type="text"
                  value={editTitle}
                  onChange={e => setEditTitle(e.target.value)}
                />
                <button onClick={handleUpdateTodo}>Save</button>
                <button onClick={() => setEditId(null)}>Cancel</button>
              </>
            ) : (
              <>
                <span>{todo.title}</span>
                <button onClick={() => handleToggleComplete(todo._id)}>
                  {todo.completed ? 'Undo' : 'Complete'}
                </button>
                <button onClick={() => handleEditTodo(todo._id)}>Edit</button>
                <button onClick={() => handleDeleteTodo(todo._id)}>Delete</button>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TodoList;

