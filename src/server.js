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

// MongoDB connection (with better logs)
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


// 🔥 REGISTER API (WITH DEBUG LOGS)
app.post("/api/users", async (req, res) => {
  try {
    console.log("\n📥 API HIT: /api/users");
    console.log("👉 Incoming Data:", req.body);

    const { name, email, password } = req.body;

    // validation
    if (!name || !email || !password) {
      console.log("❌ Missing fields");
      return res.status(400).json({ error: "All fields required" });
    }

    // check duplicate
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      console.log("❌ User already exists:", email);
      return res.status(400).json({ error: "User already exists" });
    }

    // save to DB
    const user = await User.create({
      name,
      email,
      password
    });

    console.log("✅ USER SAVED IN DB:", user);

    res.status(201).json(user);

  } catch (error) {
    console.log("❌ ERROR:", error);
    res.status(500).json({ error: error.message });
  }
});


// 🔥 LOGIN API
app.post("/api/login", async (req, res) => {
  try {
    console.log("\n📥 API HIT: /api/login");
    console.log("👉 Login Data:", req.body);

    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      console.log("❌ User not found");
      return res.status(400).json({ error: "User not found" });
    }

    // simple password match
    if (password !== user.password) {
      console.log("❌ Wrong password");
      return res.status(400).json({ error: "Invalid password" });
    }

    console.log("✅ LOGIN SUCCESS");

    res.json({
      message: "Login successful",
      user: {
        name: user.name,
        email: user.email
      }
    });

  } catch (error) {
    console.log("❌ ERROR:", error);
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