const mongoose = require("mongoose");

// Define the schema for a todo item
const todoSchema = new mongoose.Schema({
    title: { type: String, required: true },           // The task title
    categories: { type: [String], default: [] },       // Array of categories
    completed: { type: Boolean, default: false },      // Completion status
    dueDate: { type: Date, required: true },           // Due date
}, { timestamps: true }); // Adds createdAt and updatedAt fields automatically

// Create the model
const Todo = mongoose.model("Todo", todoSchema);

module.exports = Todo;
