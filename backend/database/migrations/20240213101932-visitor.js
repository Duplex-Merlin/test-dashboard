"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.sequelize
      .query('CREATE EXTENSION IF NOT EXISTS "uuid-ossp";')
      .then(() => {
        return queryInterface.createTable("Visitors", {
          id: {
            type: Sequelize.UUID,
            defaultValue: Sequelize.literal("uuid_generate_v4()"),
            unique: true,
            primaryKey: true,
            allowNull: false,
          },
          ipAddress: {
            type: Sequelize.STRING,
            allowNull: false,
          },
          userAgent: {
            type: Sequelize.STRING,
            allowNull: false,
          },
          timestamp: {
            type: Sequelize.DATE,
            allowNull: false,
          },
          date: {
            type: Sequelize.DATEONLY,
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
        }, { schema: process.env.DB_SCHEMA },);
      });
  },

  async down(queryInterface) {
    return queryInterface.bulkDelete(
      { tableName: 'Visitors', schema: process.env.DB_SCHEMA },
      null,
      {},
    );
  },
};