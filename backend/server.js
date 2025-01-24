const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const insertMockData = require("./config/mock");
dotenv.config(); // Load environment variables

const app = express();

// Connect to MongoDB
connectDB();
//insertMockData(); //-> Has been run once to insert mock data

// Middleware
app.use(cors({
    origin: "http://localhost:3000", 
})); // Enable Cross-Origin Resource Sharing
app.use(bodyParser.json()); // Parse JSON request bodies

// Routes
const todoRoutes = require("./routes/todoRoutes");
app.use("/api/todos", todoRoutes); // Base route for todos

// Server Listener
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
