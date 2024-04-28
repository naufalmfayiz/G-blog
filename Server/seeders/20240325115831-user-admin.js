'use strict';

const { hashedPassword } = require('../helper/bcrypt');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {

    let user = require('../data/users.json').map(perData => {
      perData.password = hashedPassword(perData.password)
      perData.createdAt = perData.updatedAt = new Date();
      return perData
    });
    // console.log(user)
    await queryInterface.bulkInsert('Users', user)
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Users', null, {});
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
