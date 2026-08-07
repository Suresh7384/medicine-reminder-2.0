const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db');
const startCron = require('./config/cron');
const historyRoutes = require("./routes/historyRoutes");
dotenv.config();

// DB connection
connectDB();
const mongoose = require("mongoose");

mongoose.connection.on("connected", () => {
  console.log("✅ MongoDB Connected");
});

mongoose.connection.on("disconnected", () => {
  console.log("❌ MongoDB Disconnected");
});

mongoose.connection.on("reconnected", () => {
  console.log("🔄 MongoDB Reconnected");
});

mongoose.connection.on("error", (err) => {
  console.error("MongoDB Error:", err);
});

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use("/api/history", historyRoutes);

// Routes
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/reminders', require('./routes/reminderRoutes'));
app.use('/api/logs', require('./routes/logRoutes'));
app.use('/api/push', require('./routes/pushRoutes')); // <-- NEW

// Test route
app.get('/', (req, res) => {
    res.send('Medicine Reminder API Running...');
});

// Start cron job
startCron();

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});