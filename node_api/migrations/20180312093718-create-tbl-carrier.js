'use strict';
const faker = require('faker');

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('tblCarriers', {
      carrierId:{
          type:Sequelize.STRING(6),
          primaryKey:true
      },
      carrierName:{
          type:Sequelize.STRING(40),
          allowNull:false
      },
      companyName:{
          type:Sequelize.STRING(40),
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
      classification:{
          type:Sequelize.CHAR(1),
          allowNull:false
      },
      active:{
          type:Sequelize.BOOLEAN,
          allowNull:false,
          defaultValue: true
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
        for(let i=10;i<20;i++)
            sql+="('C00"+i+"0', \""+faker.name.findName()+"\", \""+faker.company.companyName()+"\", " +
                "\""+faker.address.streetAddress()+"\", "+faker.random.number({min:1, max:610})+", " +
                faker.address.zipCode() + ", '"+faker.random.arrayElement(["A","D"])+"', 1)," //+faker.random.boolean()+"),";
        return queryInterface.sequelize.query("Insert into tblCarriers(carrierId, carrierName, companyName, street, cityId, zipCode, classification, active) values"+sql.slice(0, -1)+";")
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('tblCarriers');
  }
};