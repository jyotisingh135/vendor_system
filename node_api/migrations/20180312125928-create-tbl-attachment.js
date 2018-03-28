'use strict';
const faker = require('faker');

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('tblAttachments', {
      attachmentId:{
          type:Sequelize.INTEGER,
          primaryKey:true,
          autoIncrement:true
      },
      fileName:{
          type:Sequelize.TEXT,
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
        let sql="";
        for(let i=0;i<15;i++)
            sql+="(\""+faker.image.avatar()+"\", '"+faker.random.arrayElement(["A", "C"])+"00"+faker.random.number({min:10, max:19})+"0"+"'),";
        return queryInterface.sequelize.query("Insert into tblAttachments(fileName, accessId) values"+sql.slice(0, -1)+";")
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('tblAttachments');
  }
};