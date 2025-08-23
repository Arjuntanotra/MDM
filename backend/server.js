import express from "express";
import bodyParser from "body-parser";
import sequelize from "./db.js";
import apiRoutes from "./routes/api.js";

const app = express();
const PORT = 5000;

app.use(bodyParser.json());

// 👇 Mount routes
app.use("/", apiRoutes);

sequelize.sync().then(() => {
  app.listen(PORT, () => {
    console.log(`✅ Server running at http://localhost:${PORT}`);
  });
});
