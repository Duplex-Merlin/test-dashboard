'use strict';
const bcrypt = require("bcrypt");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.sequelize.transaction(async (transaction) => {
      await queryInterface.bulkInsert(
        "Users",
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

  async down (queryInterface, Sequelize) {
    return queryInterface.bulkDelete("Users", null, {});
  }
};