const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();

app.use(cors());
app.use(express.json());

// MongoDB connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Atlas connected!"))
  .catch((err) => console.log("MongoDB connection failed:", err));

// Student schema
const studentSchema = new mongoose.Schema({
  name: String,
  department: String,
  year: Number,
});

const Student = mongoose.model("Student", studentSchema);

// Test route
app.get("/", (req, res) => {
  res.send("Backend is working!");
});
app.get("/api/students", async (req, res) => {
    try {
        const students = await Student.find();
        res.json(students);
    } catch (error) {
        res.status(500).json({
            error: error.message
        });
    }
});


// Start server
app.listen(5000, () => {
  console.log("Server running at http://localhost:5000");
});
