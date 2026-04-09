import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import User from "./models/User.js";
import Course from "./models/Course.js";

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log("✅ MongoDB Connected");
    console.log("👉 DB Name:", mongoose.connection.name);
  })
  .catch(err => console.log("❌ DB ERROR:", err));


// TEST ROUTE
app.get("/", (req, res) => {
  res.send("API running...");
});


// 🔥 REGISTER API
app.post("/api/users", async (req, res) => {
  try {
    console.log("\n📥 API HIT: /api/users");
    console.log("👉 Incoming Data:", req.body);

    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ error: "All fields required" });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: "User already exists" });
    }

    const user = await User.create({
      name,
      email,
      password
    });

    console.log("✅ USER SAVED:", user);

    res.status(201).json(user);

  } catch (error) {
    console.log("❌ ERROR:", error);
    res.status(500).json({ error: error.message });
  }
});


// 🔥 LOGIN API (CORRECT)
app.post("/api/login", async (req, res) => {
  try {
    console.log("\n📥 API HIT: /api/login");
    console.log("👉 Login Data:", req.body);

    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ error: "User not found" });
    }

    if (password !== user.password) {
      return res.status(400).json({ error: "Invalid password" });
    }

    console.log("✅ LOGIN SUCCESS");

    res.json({
      message: "Login successful",
      user: {
        id: user._id,
        name: user.name,
        email: user.email
      }
    });

  } catch (error) {
    console.log("❌ ERROR:", error);
    res.status(500).json({ error: error.message });
  }
});


// 🔥 UPDATE USER
app.put("/api/users/:id", async (req, res) => {
  try {
    const { name, email } = req.body;

    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      { name, email },
      { new: true }
    );

    res.json(updatedUser);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


// 🔐 UPDATE PASSWORD
app.put("/api/users/update-password/:id", async (req, res) => {
  try {
    const { oldPassword, newPassword } = req.body;

    const user = await User.findById(req.params.id);

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    if (user.password !== oldPassword) {
      return res.status(400).json({ error: "Old password incorrect" });
    }

    user.password = newPassword;
    await user.save();

    res.json({ message: "Password updated successfully" });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


// ❌ DELETE USER
app.delete("/api/users/:id", async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);

    res.json({ message: "User deleted successfully" });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


// 🔥 GET ALL COURSES
app.get("/api/courses", async (req, res) => {
  try {
    const courses = await Course.find();
    res.json(courses);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


// START SERVER
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});