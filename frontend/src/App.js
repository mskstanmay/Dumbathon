import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import axios from "axios";
import './App.css';
import Navbar from './components/Navbar/Navbar';
import Calendar from './components/Calendar/Calendar';

const App = () => {
    const [todos, setTodos] = useState([]);
    const [newTodo, setNewTodo] = useState({
        title: "",
        categories: "",
        dueDate: "",
    });
    const [selectedCategory, setSelectedCategory] = useState('all'); // Add this

    useEffect(() => {
        fetchTodos();
    }, []);

    // Fetch all todos from the server
    const fetchTodos = async () => {
        try {
            const res = await axios.get("http://localhost:5000/api/todos");
            setTodos(res.data);
        } catch (error) {
            console.error("Error fetching todos:", error);
        }
    };

    // Add a new todo
    const addTodo = async () => {
        try {
            const { title, categories, dueDate } = newTodo;

            if (!title || !dueDate) {
              // TODO: WE CANT DO ANYTHING CUZ OF THE POPOUP RESTRICTION 
              // alert("Title and due date are required!");
                return;
            }

            const res = await axios.post("http://localhost:5000/api/todos", {
                title,
                categories: categories.split(",").map((cat) => cat.trim()), // Convert string to array
                dueDate,
            });

            setTodos([...todos, res.data]);
            setNewTodo({ title: "", categories: "", dueDate: "" });
        } catch (error) {
            console.error("Error adding todo:", error);
        }
    };

    // Delete a todo
    const deleteTodo = async (id) => {
        try {
            await axios.delete(`http://localhost:5000/api/todos/${id}`);
            setTodos(todos.filter((todo) => todo._id !== id));
        } catch (error) {
            console.error("Error deleting todo:", error);
        }
    };

    // Toggle the completion status of a todo
    const toggleCompletion = async (id) => {
        try {
            const todo = todos.find((todo) => todo._id === id);
            const updatedTodo = { ...todo, completed: !todo.completed };

            const res = await axios.put(`http://localhost:5000/api/todos/${id}`, updatedTodo);
            setTodos(
                todos.map((todo) => (todo._id === id ? res.data : todo))
            );
        } catch (error) {
            console.error("Error toggling completion status:", error);
        }
    };

    // Add this function to get unique categories
    const getUniqueCategories = () => {
        const categories = new Set();
        todos.forEach(todo => {
            todo.categories.forEach(cat => categories.add(cat));
        });
        return ['all', ...Array.from(categories)];
    };

    // Add this function to count todos for each category
    const getCategoryCount = (category) => {
        if (category === 'all') {
            return todos.length;
        }
        return todos.filter(todo => todo.categories.includes(category)).length;
    };

    // Modify TodoList to include filter
    const TodoList = () => {
        const filteredTodos = selectedCategory === 'all' 
            ? todos 
            : todos.filter(todo => todo.categories.includes(selectedCategory));

        return (
            <div className="container">
                <h1>✨ Todo List</h1>
                <div className="input-group">
                    <input
                        type="text"
                        value={newTodo.title}
                        onChange={(e) =>
                            setNewTodo({ ...newTodo, title: e.target.value })
                        }
                       // placeholder="What needs to be done?"
                    />
                    <input
                        type="text"
                        value={newTodo.categories}
                        onChange={(e) =>
                            setNewTodo({ ...newTodo, categories: e.target.value })
                        }
                       // placeholder="Categories"
                    />
                    <input
                        type="date"
                        value={newTodo.dueDate}
                        onChange={(e) =>
                            setNewTodo({ ...newTodo, dueDate: e.target.value })
                        }
                        style={{ colorScheme: 'dark' }}
                    />
                    <button onClick={addTodo} style={{ color: 'transparent' }}>Add Task</button>
                </div>
                <div className="filter-group">
                    <select 
                        value={selectedCategory}
                        onChange={(e) => setSelectedCategory(e.target.value)}
                        style={{ 
                            background: '#ffffff',
                            color: '#000000', // Changed to black to make text visible
                            padding: '8px',
                            marginBottom: '20px',  // Add this line
                            border: '1px solid #333333',
                            borderRadius: '4px',
                            width: '200px'
                        }}
                    >
                        {getUniqueCategories().map(category => (
                            <option 
                                key={category} 
                                value={category}
                                style={{ color: '#000000' }} // Ensure option text is visible
                            >
                                {category.charAt(0).toUpperCase() + category.slice(1)} ({getCategoryCount(category)})
                            </option>
                        ))}
                    </select>
                    <select 
                        value={"ALL"}
                        onChange={(e) => setSelectedCategory(e.target.value)}
                        style={{ 
                            background: '#ffffff',
                            color: '#000000', // Changed to black to make text visible
                            padding: '8px',
                            marginBottom: '20px',  // Add this line
                            border: '1px solid #333333',
                            borderRadius: '4px',
                            width: '200px'
                        }}
                    >  
                    
                        {/* {getUniqueCategories().map(category => (
                            <option 
                                key={category} 
                                value={category}
                                style={{ color: '#000000' }} // Ensure option text is visible
                            >
                                {category.charAt(0).toUpperCase() + category.slice(1)} ({getCategoryCount(category)})
                            </option>
                        ))} */}
                    </select>
                </div>
                <ul>
                    {filteredTodos.map((todo) => (
                        <li key={todo._id} className={todo.completed ? 'completed' : ''}>
                            <div className="todo-content">
                                <span
                                    style={{
                                        textDecoration: todo.completed
                                            ? "line-through"
                                            : "none",
                                    }}
                                >
                                    <strong>{todo.title}</strong>
                                    <span className="due-date">
                                        📅 {new Date(todo.dueDate).toLocaleDateString()}
                                    </span>
                                </span>
                                <div className="categories">
                                    {todo.categories.map((cat, index) => (
                                        <span key={index}>#{cat}</span>
                                    ))}
                                </div>
                            </div>
                            <div className="todo-actions">
                                <button onClick={() => toggleCompletion(todo._id)} style={{ color: 'transparent' }}>
                                    {todo.completed ? "Undo" : "Complete"}
                                </button>
                                <button className="delete" onClick={() => deleteTodo(todo._id)} style={{ color: 'transparent' }}>
                                    Delete
                                </button>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        );
    };

    return (
        <Router>
            <div className="app">
                <Navbar />
                <Routes>
                    <Route path="/" element={<TodoList />} />
                    <Route 
                        path="/calendar" 
                        element={<Calendar todos={todos} />} 
                    />
                </Routes>
            </div>
        </Router>
    );
};

export default App;
