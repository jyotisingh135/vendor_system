'use strict';
const faker = require('faker');

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('tblUsers', {
      userId:{
          type:Sequelize.INTEGER,
          primaryKey:true,
          autoIncrement:true
      },
      userName:{
          type:Sequelize.STRING(25),
          allowNull:false
      },
      email:{
          type:Sequelize.STRING(50),
          allowNull:false
      },
      password:{
          type:Sequelize.STRING(50),
          allowNull:false
      },
      userType:{
          type:Sequelize.CHAR(1),
          allowNull:false,
          defaultValue: 'A'
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
        let arr=["jyoti", "vishnu", "ishwar"];
        for(let i=0;i<3;i++)
            sql+="('"+arr[i]+"', 'lanetteam."+arr[i]+"@gmail.com', 'lanetteam1', 'A'),";

        for(let i=0;i<5;i++)
            sql+="('"+faker.name.firstName()+"', '"+faker.internet.email()+"', '"+faker.internet.password()+"', '"+faker.random.arrayElement(["C","A","U"])+"'),";
          return queryInterface.sequelize.query("Insert into tblUsers(userName, email, password, userType) values"+sql.slice(0, -1)+";")
      });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('tblUsers');
  }
};