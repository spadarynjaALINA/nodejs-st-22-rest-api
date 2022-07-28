'use strict';

module.exports = {
  async up(queryInterface) {
    return queryInterface.bulkInsert('users', [
      {
        id: 'f79a94dd-21f3-4b70-b904-05b7afe3f71e',
        login: 'Jacky',
        age: 45,
        password: 'abc1234',
        isDeleted: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface) {
    return queryInterface.bulkDelete('users', null, {});
  },
};
