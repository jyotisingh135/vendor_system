'use strict';
const faker = require('faker');

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('tblWarehouses', {
      warehouseId:{
          type:Sequelize.INTEGER,
          primaryKey:true,
          autoIncrement:true
      },
      warehouseName:{
          type:Sequelize.STRING(50),
          allowNull:false
      },
      street:{
          type:Sequelize.STRING(50),
          allowNull:false
      },
      cityId:{
          type:Sequelize.INTEGER,
          allowNull:false
      },
      zipCode:{
          type:Sequelize.INTEGER,
          allowNull:false
      },
      agentId:{
          type:Sequelize.STRING(6),
          allowNull:false,
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
        for(let i=0;i<10;i++)
            sql+="(\""+faker.company.companyName()+"\", \""+faker.address.streetName()+"\", " +
                faker.random.number({min:1, max:610})+", "+faker.address.zipCode()+", " +
                "'"+"A00"+faker.random.number({min:10, max:19})+"0"+"'),";
        return queryInterface.sequelize.query("Insert into tblWarehouses(warehouseName, street, cityId, zipCode, agentId) values"+sql.slice(0, -1)+";")
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('tblWarehouses');
  }
};