'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
    const { allPermissionsWithoutFilter } = require('../../userPermissions/userPermissions.const.ts');

    for (let i = 0; i < allPermissionsWithoutFilter.length; i++) {
      const permission = allPermissionsWithoutFilter[i];

      const existentPermission = await queryInterface.select(null, 'permissions', {
        where: {
          name: permission.name
        }
      });

      if (existentPermission.length == 0) {
        await queryInterface.bulkInsert('permissions', [
          {
            name: permission.name,
            description: permission.description,
            active: permission.active
          }
        ]);
        continue;
      }

      await queryInterface.bulkUpdate(
        'permissions', 
        {
          description: permission.description,
          active: permission.active
        },
        {
          name: permission.name,
        }
      );
    }
    
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */

    await queryInterface.bulkDelete(null, 'permissions', {});
  }
};
