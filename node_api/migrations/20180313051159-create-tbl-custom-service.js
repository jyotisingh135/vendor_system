'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('tblCustomServices', {
      customSid:{
          type:Sequelize.INTEGER,
          primaryKey:true,
          autoIncrement:true
      },
      serviceId:{
          type:Sequelize.INTEGER,
          allowNull:false
      },
      accessId:{
          type:Sequelize.STRING(6),
          allowNull:false
      },
      createdAt: {
        allowNull: true,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: true,
        type: Sequelize.DATE
      }
    }).then(function() {
        return queryInterface.sequelize.query(
            'ALTER TABLE `tblCustomServices` ADD UNIQUE `unique_index`(`serviceId`, `accessId`)'
        );
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('tblCustomServices');
  }
};