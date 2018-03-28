'use strict';
const faker = require('faker');

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('tblAgentProjects', {
      AProjectid:{
          type:Sequelize.INTEGER,
          primaryKey:true,
          autoIncrement:true
      },
      projectId:{
          type:Sequelize.STRING(6),
          allowNull:false
      },
      agentId:{
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
        let sql="";
        for(let i=0;i<15;i++)
            sql+="('P00"+faker.random.number({min:10, max:14})+"0', 'A00"+faker.random.number({min:10, max:19})+"0'),";
        return queryInterface.sequelize.query("Insert into tblAgentProjects(projectId, agentId) values"+sql.slice(0, -1)+";")
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('tblAgentProjects');
  }
};