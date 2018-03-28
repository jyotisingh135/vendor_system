'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('tblCustomEquipments', {
      customEid:{
          type:Sequelize.INTEGER,
          primaryKey:true,
          autoIncrement:true
      },
      equipmentId:{
          type:Sequelize.INTEGER,
          allowNull:false
      },
      carrierId:{
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
            'ALTER TABLE `tblCustomEquipments` ADD UNIQUE `unique_index`(`equipmentId`, `carrierId`)'
        );
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('tblCustomEquipments');
  }
};