'use strict';

module.exports = {
  async up(queryInterface) {
    return queryInterface.bulkInsert('users', [
      {
        id: 'f79a94dd-21f3-4b70-b804-05b7afe3f78e',
        login: 'Viky',
        age: 36,
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
