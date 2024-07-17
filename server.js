// server.js
const express = require("express");
const dotenv = require("dotenv");
const colors = require("colors");
const morgan = require("morgan");
const cors = require("cors");
const connectDB = require("./config/db");
const path = require("path");

// Load environment variables from .env file
dotenv.config();

// Log environment variables to ensure they are loaded
console.log('NODE_ENV:', process.env.NODE_ENV); // Log NODE_ENV
console.log('PORT:', process.env.PORT); // Log PORT
console.log('MONGO_URL:', process.env.MONGO_URL); // Log MONGO_URL

// Connect to MongoDB
connectDB();

// Initialize Express app
const app = express();

// Middlewares
app.use(express.json());
app.use(cors());
app.use(morgan("dev"));

// Routes
app.use("/api/v1/test", require("./routes/testRoutes"));
app.use("/api/v1/auth", require("./routes/authRoutes"));
app.use("/api/v1/inventory", require("./routes/inventoryRoutes"));
app.use("/api/v1/analytics", require("./routes/analyticsRoutes"));
app.use("/api/v1/admin", require("./routes/adminRoutes"));

// Serve static files from the React app
app.use(express.static(path.join(__dirname, "./client/build")));

// The "catchall" handler: for any request that doesn't match one above, send back React's index.html file
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "./client/build/index.html"));
});

// Get port from environment and store in Express
const PORT = process.env.PORT || 8080;

// Listen on provided port, on all network interfaces
app.listen(PORT, () => {
  console.log(`Node Server Running In ${process.env.NODE_ENV} mode on port ${PORT}`.bgBlue.white);
});
