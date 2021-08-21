'use strict';


module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Users', [{
      email: 'trinhpro2304@gmail.com',
      password: '123456',
      firstName: 'trinh',
      lastName: 'huynh',
      address: 'quang nam',
      phoneNumber: 'R1',
      gender: 1,
      image: 'ROLE',
      roleId: 'R1',
      positionId: 'R1',




      createdAt: new Date(),
      updatedAt: new Date()
    }]);
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
