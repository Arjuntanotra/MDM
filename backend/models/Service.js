import { DataTypes } from "sequelize";
import sequelize from "../db.js";

const Service = sequelize.define("Service", {
  service_code: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    primaryKey: true,
  },
  name: DataTypes.STRING,
  description: DataTypes.STRING,
  rate: DataTypes.FLOAT,
}, {
  tableName: "services_master",
  timestamps: true,
});

export default Service;
