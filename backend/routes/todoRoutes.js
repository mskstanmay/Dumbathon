const express = require("express");
const router = express.Router();
const Todo = require("../models/Todo");

// Get all todos
router.get("/", async (req, res) => {
    try {
        const todos = await Todo.find(); // Fetch all todos
         res.json(todos);
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
});

// Add a new todo
router.post("/", async (req, res) => {
    try {
        const { title, categories, dueDate } = req.body;

        // Validation
        if (!title) {
            return res.status(400).json({ message: "Title is required." });
        }
        if (categories && !Array.isArray(categories)) {
            return res.status(400).json({ message: "Categories must be an array." });
        }
        if (!dueDate || new Date(dueDate) <= new Date()) {
            return res
                .status(400)
                .json({ message: "Due date is required and must be in the future." });
        }

        // Create a new todo
        const newTodo = new Todo({
            title,
            categories: categories || [],
            dueDate,
        });

        const savedTodo = await newTodo.save();
        res.json(savedTodo);
    } catch (error) {
        res.status(400).json({ message: "Failed to create todo", error: error.message });
    }
});

// Update a todo
router.put("/:id", async (req, res) => {
    try {
        const { title, categories, dueDate, completed } = req.body;

        // Validation
        if (categories && !Array.isArray(categories)) {
            return res.status(400).json({ message: "Categories must be an array." });
        }
        if (dueDate && new Date(dueDate) <= new Date()) {
            return res
                .status(400)
                .json({ message: "Due date must be in the future." });
        }

        // Update the todo
        const updatedTodo = await Todo.findByIdAndUpdate(
            req.params.id,
            { title, categories, dueDate, completed },
            { new: true } // Return the updated document
        );

        if (!updatedTodo) {
            return res.status(404).json({ message: "Todo not found." });
        }

        res.json(updatedTodo);
    } catch (error) {
        res.status(400).json({ message: "Failed to update todo", error: error.message });
    }
});

// Delete a todo
router.delete("/:id", async (req, res) => {
    try {
        const deletedTodo = await Todo.findByIdAndDelete(req.params.id);

        if (!deletedTodo) {
            return res.status(404).json({ message: "Todo not found." });
        }

        res.json({ message: "Todo deleted successfully." });
    } catch (error) {
        res.status(500).json({ message: "Failed to delete todo", error: error.message });
    }
});

// Get a single todo by ID
router.get("/:id", async (req, res) => {
    try {
        const todo = await Todo.findById(req.params.id);

        if (!todo) {
            return res.status(404).json({ message: "Todo not found." });
        }

        res.json(todo);
    } catch (error) {
        res.status(500).json({ message: "Failed to fetch todo", error: error.message });
    }
});

module.exports = router;
