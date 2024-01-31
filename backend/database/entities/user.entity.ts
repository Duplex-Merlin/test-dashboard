import { Model, DataTypes } from "sequelize";
import sequelize from "../config/sequelize";

class User extends Model {
  public id!: string;
  public username!: string;
  public email!: string;
  public password!: string;
  public lastLogin!: string;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

User.init(
  {
    id: {
      type: DataTypes.UUID,
      autoIncrement: true,
      primaryKey: true,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    lastLogin: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  {
    timestamps: true,
    sequelize,
    modelName: "Users",
  }
);

export default User;
