import { Model, DataTypes } from "sequelize";
import { sequelizePublic } from "../config/sequelize";

class Customer extends Model {
  public id!: string;
  public customerFirstName!: string;
  public customerLastName!: string;
  public customerEmail!: string;
  public customerPhoneNumber!: string;
  public customerLocation!: string;
  public customerWebsite!: string;
  public profilePicture!: string;
  public tenantId!: string;
  public hostName!: string;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Customer.init(
  {
    id: {
      type: DataTypes.UUID,
      autoIncrement: true,
      primaryKey: true,
    },
    customerFirstName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    customerLastName: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    customerEmail: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    customerPhoneNumber: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    customerLocation: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    customerWebsite: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    profilePicture: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    tenantId: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    hostName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    timestamps: true,
    sequelize: sequelizePublic,
    modelName: "Customers",
  }
);

export default Customer;
