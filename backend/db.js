import { Sequelize } from "sequelize";

const sequelize = new Sequelize("my_database", "root", "Arjun07@#$%", {
  host: "localhost",
  dialect: "mysql",
  port: 3306, // 👈 add this if MySQL is not running on default port
  logging: false, // 👈 optional, removes SQL logs from console
});

// ✅ Test the connection
(async () => {
  try {
    await sequelize.authenticate();
    console.log("✅ Database connected successfully!");
  } catch (error) {
    console.error("❌ Unable to connect to the database:", error.message);
  }
})();

export default sequelize;
