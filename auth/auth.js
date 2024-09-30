
// import all modules for setting up jwt authentication 
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs"); //for Hashing password
const User = require("../model/user.js");
const express = require("express");

const Router = express.Router();

// Route: Signup
Router.post("/signup", async (req, res) => {
  const { username, password } = req.body;
  try {
    // Check if user exists
    const existingUser = await User.findOne({ username });
    if (existingUser)
      return res.status(400).json({ message: "User already exists" });

    // Hash password
    // console.log(username, password);
    const hashedPassword = await bcrypt.hash(password, 10);

    const result = await User.findOneAndUpdate(
      {}, // empty filter to update the first document or create a new one if none exists
      { username, password: hashedPassword },
      { upsert: true, new: true, setDefaultsOnInsert: true }
    );

    res.status(201).json({ message: "User created successfully", ...req.body });
  } catch (error) {
    res.status(500).json({ message: "Error creating user" });
    console.log(error);
  }
});

// Route: Login
Router.post("/login", async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await User.findOne({ username });
    if (!user) return res.status(404).json({ message: "User not found" });

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid)
      return res.status(401).json({ message: "Invalid credentials" });

    // Generate JWT
    const token = jwt.sign(
      { id: user._id, username: user.username },
      process.env.JWT_SECRET,
      {
        expiresIn: "1h",
      }
    );

    res.json({ token });
    // console.log("login successful ");
  } catch (error) {
    res.status(500).json({ message: "Error logging in" });
  }
});
module.exports = Router;