'use strict';
const faker = require('faker');

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('tblAgents', {
        agentId:{
            type:Sequelize.STRING(6),
            primaryKey:true
        },
        agentName:{
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
        warehouseId:{
            type:Sequelize.INTEGER,
            allowNull:true
        },
        paymentTerms:{
            type:Sequelize.DATEONLY,
            allowNull:true
        },
        creditLimit:{
            type:Sequelize.INTEGER,
            allowNull:true
        },
        active:{
            type:Sequelize.BOOLEAN,
            allowNull:false,
            defaultValue: false
        },
        createdAt:{
            type:Sequelize.DATE,
            allowNull:true
        },
        updatedAt:{
            type:Sequelize.DATE,
            allowNull:true
        }
    }).then(function() {
        let sql="";
        for(let i=10;i<20;i++) {
            let d = new Date(faker.date.future());
            sql += "('A00" + i + "0', \"" + faker.name.findName() + "\", \"" + faker.company.companyName() + "\", " +
                "\"" + faker.address.streetAddress() + "\", " + faker.random.number({min: 1, max: 610}) + ", " +
                faker.address.zipCode() + ", '" + faker.random.arrayElement(["P", "Y", "N"]) + "', " +
                "'" + d.getFullYear() + "/" + (d.getMonth()+1) + "/" + d.getDate() + "', " + faker.random.number() + ", 1),"; //+faker.random.boolean()+"),";
        }
        return queryInterface.sequelize.query("Insert into tblAgents(agentId, agentName, companyName, street, cityId, zipCode, classification, paymentTerms, creditLimit, active) values"+sql.slice(0, -1)+";")
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('tblAgents');
  }
};
