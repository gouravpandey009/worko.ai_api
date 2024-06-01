// server.js

require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const { requestLogger } = require("./middleware");
const { errorHandler } = require("./errorMiddleware");
const jwt = require("jsonwebtoken");

const app = express();

// Body parser middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// MongoDB connection
const MONGODB_URI = process.env.MONGODB_URI;
mongoose
  .connect(MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.error("Error connecting to MongoDB:", err);
  });

// Routes
app.use("/worko/user", require("./src/controllers/userController"));

// Middleware for request logging
app.use(requestLogger);

// Login route
app.post("/login", (req, res) => {
  const { email, password } = req.body;

  // Perform authentication (replace with your authentication logic)
  if (email === "test@example.com" && password === "password") {
    // Generate JWT token
    const token = jwt.sign({ email }, process.env.JWT_SECRET);
    res.json({ token });
  } else {
    res.status(401).json({ message: "Invalid credentials" });
  }
});

// Welcome page route handler
app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html" );
});

// Error handling middleware
app.use(errorHandler);

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
