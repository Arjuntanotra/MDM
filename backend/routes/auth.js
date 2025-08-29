import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/User.js";

const router = express.Router();
const JWT_SECRET = "supersecretkey"; // 👉 move to .env in production

// Signup
router.post("/signup", async (req, res) => {
  const { email, password } = req.body;
  console.log("📩 Signup request body:", req.body);  // 👈 check incoming

  try {
    const existing = await User.findOne({ where: { email } });
    if (existing) return res.status(400).json({ error: "User already exists" });

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await User.create({ email, password: hashedPassword });

    res.json({ success: true, message: "User registered", userId: newUser.id });
  } catch (err) {
    console.error("🔥 Signup error:", err);  // 👈 log actual error
    res.status(500).json({ error: err.message });
  }
});


// Login
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ where: { email } });
    if (!user) return res.status(400).json({ error: "User not found" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ error: "Invalid password" });

    const token = jwt.sign({ id: user.id, email: user.email }, JWT_SECRET, {
      expiresIn: "1h",
    });

    res.json({ success: true, token });
  } catch (err) {
    console.error("Login error:", err);
    res.status(500).json({ error: "Server error" });
  }
});

export default router;
