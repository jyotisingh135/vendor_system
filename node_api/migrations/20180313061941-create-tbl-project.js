'use strict';
const faker = require('faker');

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('tblProjects', {
      projectId:{
          type:Sequelize.STRING(6),
          primaryKey:true
      },
      projectQuote:{
          type:Sequelize.STRING(6),
          allowNull:true
      },
      projectName:{
          type:Sequelize.STRING(40),
          allowNull:false
      },
      customerId:{
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
        for(let i=10;i<15;i++)
            sql+="('P00"+i+"0', '"+faker.commerce.productName()+"', "+faker.random.number({min:1, max:10})+"),";
        return queryInterface.sequelize.query("Insert into tblProjects(projectId, projectName, customerId) values"+sql.slice(0, -1)+";")
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('tblProjects');
  }
};