'use strict';

module.exports = {
  async up(queryInterface) {
    return queryInterface.bulkInsert('users', [
      {
        id: 'f78a93dd-21f3-4b70-b904-05b7afe2f73e',
        login: 'Alina',
        age: 22,
        password: 'abc123',
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
