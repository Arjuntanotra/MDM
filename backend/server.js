import express from "express";
import cors from "cors";
import sequelize from "./db.js";
import apiRoutes from "./routes/api.js";
import authRoutes from "./routes/auth.js";

const app = express();
app.use(cors());
app.use(express.json());

// ✅ Auth endpoints -> /api/auth/...
app.use("/api/auth", authRoutes);

// ✅ Material endpoints -> /api/materials
app.use("/api", apiRoutes);

// DB connect
sequelize.sync().then(() => {
  console.log("✅ Database synced");
});

// Start server
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
