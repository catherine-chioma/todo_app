import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css'; // Importing the CSS file for styling

// Define a TypeScript interface for the Todo structure to enforce type safety
interface Todo {
  _id: string;
  title: string;
  completed: boolean;
}

const TodoApp: React.FC = () => {
  // State to hold the list of todos, new todo input, loading state, and error message
  const [todos, setTodos] = useState<Todo[]>([]); // List of todos
  const [newTodo, setNewTodo] = useState<string>(''); // Input for new todo
  const [loading, setLoading] = useState<boolean>(false); // Loading state for data fetching
  const [error, setError] = useState<string | null>(null); // Error state to handle any API errors
  
  // Fetch all todos from the backend when the component mounts (on initial render)
  useEffect(() => {
    setLoading(true); // Set loading to true while the data is being fetched
    axios.get('http://localhost:5000/todos') // GET request to fetch todos from the server
      .then(response => {
        setTodos(response.data); // Update state with fetched todos
        setLoading(false); // Set loading to false after data is fetched
      })
      .catch(error => {
        console.error(error); // Log error for debugging
        setError('Failed to fetch todos'); // Set error message if the API request fails
        setLoading(false); // Set loading to false even in case of an error
      });
  }, []); // Empty dependency array means this effect runs only once (on mount)

  // Function to create a new todo
  const createTodo = () => {
    if (!newTodo.trim()) {
      alert('Please enter a todo!'); // Alert if input is empty
      return;
    }
    // POST request to create a new todo on the server
    axios.post('http://localhost:5000/todos', { title: newTodo })
      .then(response => {
        setTodos([...todos, response.data]); // Add the new todo to the state
        setNewTodo(''); // Clear the input field after the todo is added
      })
      .catch(error => {
        console.error(error); // Log error for debugging
        setError('Failed to create todo'); // Set error message if the request fails
      });
  };

  // Function to update an existing todo
  const updateTodo = (id: string, updatedTitle: string) => {
    if (!updatedTitle.trim()) {
      alert('Please enter a valid title!'); // Alert if the title is empty
      return;
    }
    // PUT request to update the title of a specific todo
    axios.put(`http://localhost:5000/todos/${id}`, { title: updatedTitle })
      .then(response => {
        // Update the state with the new title for the specific todo
        const updatedTodos = todos.map(todo =>
          todo._id === id ? { ...todo, title: updatedTitle } : todo
        );
        setTodos(updatedTodos); // Set the updated todos state
      })
      .catch(error => {
        console.error(error); // Log error for debugging
        setError('Failed to update todo'); // Set error message if the request fails
      });
  };

  // Function to delete a specific todo by its ID
  const deleteTodo = (id: string) => {
    // DELETE request to remove a specific todo
    axios.delete(`http://localhost:5000/todos/${id}`)
      .then(() => {
        // Filter out the deleted todo from the state
        const remainingTodos = todos.filter(todo => todo._id !== id);
        setTodos(remainingTodos); // Update the state with the remaining todos
      })
      .catch(error => {
        console.error(error); // Log error for debugging
        setError('Failed to delete todo'); // Set error message if the request fails
      });
  };

  return (
    <div>
      <h1>Todo App</h1>

      {/* Display any errors that occur */}
      {error && <div style={{ color: 'red' }}>{error}</div>}

      {/* Input field to add a new todo */}
      <input 
        type="text" 
        value={newTodo} 
        onChange={e => setNewTodo(e.target.value)} 
        placeholder="Enter todo" 
      />
      <button onClick={createTodo}>Add Todo</button>

      {/* Show loading message when fetching data */}
      {loading && <p>Loading...</p>}

      <ul>
        {/* Render each todo item from the todos array */}
        {todos.map(todo => (
          <li key={todo._id}>
            {/* Display the todo title */}
            <span>{todo.title}</span>
            {/* Button to edit the todo */}
            <button onClick={() => updateTodo(todo._id, prompt('Edit Todo', todo.title) || todo.title)}>
              Edit
            </button>
            {/* Button to delete the todo */}
            <button onClick={() => deleteTodo(todo._id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TodoApp;


