import { DataTypes } from "sequelize";
import sequelize from "../db.js";

const CodeSequence = sequelize.define("CodeSequence", {
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  prefix: { type: DataTypes.STRING },
  lastNumber: { type: DataTypes.INTEGER },
}, {
  tableName: "code_sequence",
  timestamps: false,
});

export default CodeSequence;
