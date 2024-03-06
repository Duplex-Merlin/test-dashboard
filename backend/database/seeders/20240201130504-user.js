'use strict';
const bcrypt = require("bcrypt");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.sequelize.transaction(async (transaction) => {
      await queryInterface.bulkInsert(
        { tableName: 'Users', schema: process.env.DB_SCHEMA },
        [
          {
            username: "Alpha",
            email: "account@alpha.com",
            role: "super_admin",
            password: bcrypt.hashSync("Alpha@1234", 10),
          },
        ],
      );
    });
  },

  async down(queryInterface) {
    return queryInterface.bulkDelete(
      { tableName: 'Users', schema: process.env.DB_SCHEMA },
      null,
      {},
    );
  },
};