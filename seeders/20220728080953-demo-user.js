'use strict';

module.exports = {
  async up(queryInterface) {
    return queryInterface.bulkInsert('users', [
      {
        id: 'f79a94dd-21f3-4b70-b904-05b7afe3f72e',
        login: 'Miky',
        age: 74,
        password: 'abcd123',
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
