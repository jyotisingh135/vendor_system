'use strict';
const faker = require('faker');

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('tblCustomers', {
      customerId:{
          type:Sequelize.INTEGER,
          primaryKey:true,
          autoIncrement:true
      },
      customerName:{
          type:Sequelize.STRING(40),
          allowNull:false
      },
      phone:{
          type:Sequelize.BIGINT,
          allowNull:false
      },
      cityId:{
          type:Sequelize.INTEGER,
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
        for(let i=0;i<10;i++)
            sql+="('"+faker.name.findName()+"', 9876543210, "+faker.random.number({min:1, max:610})+"),";
        return queryInterface.sequelize.query("Insert into tblCustomers(customerName, phone, cityId) values"+sql.slice(0, -1)+";")
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('tblCustomers');
  }
};