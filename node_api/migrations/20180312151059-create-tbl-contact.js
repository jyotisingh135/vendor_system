'use strict';
const faker = require('faker');

module.exports = {
    up: (queryInterface, Sequelize) => {
      return queryInterface.createTable('tblContacts', {
          contactId:{
            type:Sequelize.INTEGER,
            primaryKey:true,
            autoIncrement:true
          },
          firstName:{
            type:Sequelize.STRING(25),
            allowNull:false
          },
          lastName:{
            type:Sequelize.STRING(25),
            allowNull:false
          },
          work:{
            type:Sequelize.BIGINT,
            allowNull:true
          },
          cell:{
            type:Sequelize.BIGINT,
            allowNull:true
          },
          email:{
            type:Sequelize.STRING(50),
            allowNull:true
          },
          contactType:{
            type:Sequelize.STRING(15),
            allowNull:false
          },
          accessId: {
            type: Sequelize.STRING(6),
            allowNull: false
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
          for(let i=0;i<50;i++)
              sql+="(\""+faker.name.firstName()+"\", \""+faker.name.lastName()+"\", 9876543210, 9876543210, " +
                  "'"+faker.internet.email()+"', " +
                  "'"+faker.random.arrayElement(["Primary", "Work", "Main", "Home", "Pager", "Car"])+"', " +
                  "'"+faker.random.arrayElement(["A", "C"])+"00"+faker.random.number({min:10, max:19})+"0"+"'),";
          return queryInterface.sequelize.query("Insert into tblContacts(firstName, lastName, work, cell, email, contactType, accessId) values"+sql.slice(0, -1)+";");
      });
},
down: (queryInterface, Sequelize) => {
  return queryInterface.dropTable('tblContacts');
}
};