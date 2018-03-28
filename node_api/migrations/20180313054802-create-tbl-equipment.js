'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('tblEquipments', {
      equipmentId:{
          type:Sequelize.INTEGER,
          primaryKey:true,
          autoIncrement:true
      },
      equipmentName:{
          type:Sequelize.STRING(30),
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
        let sql="";
        let arr=["Tradeshow", "Padwrap", "Climate", "High Cube", "Liftgate", "Flatbed", "Heavy Haul/RGN", "Load Bars", "Plywood", "Straps", "e-Tract 2ft", "e-Tract 4ft"];
        for(let i=0;i<arr.length;i++)
            sql+="('" + arr[i] + "'),";
        return queryInterface.sequelize.query("Insert into tblEquipments(equipmentName) values"+sql.slice(0, -1)+";")
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('tblEquipments');
  }
};