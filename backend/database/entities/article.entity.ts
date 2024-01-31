import { Model, DataTypes } from "sequelize";
import sequelize from "../config/sequelize";

class Article extends Model {
  public id!: string;
  public name!: string;
  public description!: string;
  public coverPicture!: string;
  public publishedAt!: string;
  public status!: string;
  public content!: string;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Article.init(
  {
    id: {
      type: DataTypes.UUID,
      autoIncrement: true,
      primaryKey: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    coverPicture: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    status: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
  },
  {
    timestamps: true,
    sequelize,
    modelName: "Articles",
  }
);

export default Article;
