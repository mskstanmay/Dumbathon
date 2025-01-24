const mongoose = require('mongoose');
const Todo = require('../models/Todo');

// Helper function to get random date between 2024-2025
const getRandomDate = () => {
    const start = new Date('2024-01-01');
    const end = new Date('2025-12-31');
    return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
};

// Sample data arrays
const sampleTitles = [
    "Review Project Docs", "Team Meeting", "Client Call", "Write Report",
    "Update Database", "Fix Bug", "Deploy Updates", "Code Review",
    "Update Website", "Backup Data", "Clean Office", "Order Supplies",
    "Schedule Interview", "Training Session", "Update Documentation",
    "Pay Bills", "Doctor Appointment", "Grocery Shopping", "Gym Session",
    "Call Parents", "House Cleaning", "Car Maintenance", "Read Book",
    "Watch Tutorial", "Plan Vacation", "Birthday Party", "Dental Checkup",
    "Team Building", "Conference Call", "Prepare Presentation"
];

const sampleCategories = [
    "Work", "Personal", "Health", "Family", "Education", 
    "Finance", "Home", "Fitness", "Social", "Projects",
    "Maintenance", "Shopping", "Travel", "Meetings"
];

// Generate a random todo
const generateRandomTodo = () => ({
    title: sampleTitles[Math.floor(Math.random() * sampleTitles.length)] + 
          " " + Math.floor(Math.random() * 1000), // Add number to make titles unique
    categories: [
        sampleCategories[Math.floor(Math.random() * sampleCategories.length)],
        sampleCategories[Math.floor(Math.random() * sampleCategories.length)]
    ],
    completed: Math.random() > 0.7, // 30% chance of being completed
    dueDate: getRandomDate(),
});

// Generate 905 random todos (5 existing + 900 new)
const mockTodos = [
    // Keep original 5 todos
    {
        title: "Pack carry-on",
        categories: ["Vacation", "Family"],
        completed: false,
        dueDate: new Date('2025-06-10'),
    },
    {
        title: "Book flights",
        categories: ["Vacation", "Work"],
        completed: false,
        dueDate: new Date('2025-05-15'),
    },
    {
        title: "Prepare Presentation",
        categories: ["Work"],
        completed: true,
        dueDate: new Date('2025-02-01'),
    },
    {
        title: "Throw Party for Eve",
        categories: ["Family"],
        completed: false,
        dueDate: new Date('2025-06-05'),
    },
    {
        title: "Order Team T-Shirts",
        categories: ["Work"],
        completed: true,
        dueDate: new Date('2025-03-01'),
    },
];

// Add 900 random todos
for (let i = 0; i < 900; i++) {
    mockTodos.push(generateRandomTodo());
}

const insertMockData = async () => {
    try {
        await Todo.insertMany(mockTodos);
        console.log(`${mockTodos.length} mock todos inserted successfully`);
    } catch (error) {
        console.error(`Error: ${error.message}`);
        process.exit(1);
    }
};

module.exports = insertMockData;
