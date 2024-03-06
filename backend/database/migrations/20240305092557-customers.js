"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.sequelize
      .query('CREATE EXTENSION IF NOT EXISTS "uuid-ossp";')
      .then(() => {
        return queryInterface.createTable("Customers", {
          id: {
            type: Sequelize.UUID,
            defaultValue: Sequelize.literal("uuid_generate_v4()"),
            unique: true,
            primaryKey: true,
            allowNull: false,
          },
          customerFirstName: {
            type: Sequelize.STRING,
            allowNull: false,
          },
          customerLastName: {
            type: Sequelize.STRING,
            allowNull: true,
          },
          customerEmail: {
            type: Sequelize.STRING,
            allowNull: false,
          },
          customerPhoneNumber: {
            type: Sequelize.STRING,
            allowNull: false,
          },
          customerLocation: {
            type: Sequelize.STRING,
            allowNull: false,
          },
          customerWebsite: {
            type: Sequelize.STRING,
            allowNull: true,
          },
          profilePicture: {
            type: Sequelize.STRING,
            allowNull: true,
          },
          hostName: {
            type: Sequelize.STRING,
            allowNull: false,
          },
          tenantId: {
            type: Sequelize.STRING,
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
        }, { schema: 'public' },);
      });
  },

  async down(queryInterface) {
    return queryInterface.bulkDelete(
      { tableName: 'Customers', schema: 'public' },
      null,
      {},
    );
  },
};