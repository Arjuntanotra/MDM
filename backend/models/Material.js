import { DataTypes } from "sequelize";
import sequelize from "../db.js";

const Material = sequelize.define("Material", {
  material_code: {
    type: DataTypes.STRING,
    primaryKey: true,
  },
  type: DataTypes.STRING,
  group: DataTypes.STRING,
  subgroup: DataTypes.STRING,
  size: DataTypes.STRING,
  grade: DataTypes.STRING,
  finishSpec: DataTypes.STRING,   // ✅ matches payload
  specification: DataTypes.STRING,
  description: DataTypes.STRING,
  uom: DataTypes.STRING,
  altUom: DataTypes.STRING,       // ✅ matches payload
  rate: DataTypes.FLOAT,
  category: DataTypes.STRING,
  plantCode: DataTypes.STRING,    // ✅ matches payload
  storageLocation: DataTypes.STRING, // ✅ matches payload
  salesOrg: DataTypes.STRING,
  distChannel: DataTypes.STRING,
  profitCenter: DataTypes.STRING,
  hsnCode: DataTypes.STRING,
  poUnit: DataTypes.STRING,
}, {
  tableName: "materials_master",
  freezeTableName: true,
  timestamps: true,        // adds createdAt, updatedAt
  createdAt: "createdAt",
  updatedAt: "updatedAt",
});

export default Material;  // ✅ make sure this line exists
