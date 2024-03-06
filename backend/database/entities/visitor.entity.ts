import { Model, DataTypes } from "sequelize";
import { sequelize } from "../config/sequelize";

class Visitor extends Model {
  public id!: number;
  public ipAddress!: string;
  public userAgent!: string;
  public timestamp!: Date;
  public date!: Date;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Visitor.init(
  {
    id: {
      type: DataTypes.UUID,
      autoIncrement: true,
      primaryKey: true,
    },
    ipAddress: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    userAgent: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    timestamp: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    date: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
  },
  {
    timestamps: true,
    sequelize,
    modelName: "Visitors",
  }
);

export default Visitor;
