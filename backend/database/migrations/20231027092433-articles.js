"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.sequelize
      .query('CREATE EXTENSION IF NOT EXISTS "uuid-ossp";')
      .then(() => {
        return queryInterface.createTable("Articles", {
          id: {
            type: Sequelize.UUID,
            defaultValue: Sequelize.literal("uuid_generate_v4()"),
            unique: true,
            primaryKey: true,
            allowNull: false,
          },
          title: {
            type: Sequelize.STRING,
            allowNull: false,
          },
          description: {
            type: Sequelize.STRING,
            allowNull: true,
          },
          coverPicture: {
            type: Sequelize.STRING,
            allowNull: true,
          },
          status: {
            type: Sequelize.BOOLEAN,
            allowNull: false,
            defaultValue: false
          },
          content: {
            type: Sequelize.TEXT,
            allowNull: false,
          },
          createdAt: {
            type: "TIMESTAMP",
            defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
            allowNull: true,
          },
          updatedAt: {
            type: "TIMESTAMP",
            defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
            allowNull: true,
          },
        });
      });
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.dropTable("Articles");
  },
};