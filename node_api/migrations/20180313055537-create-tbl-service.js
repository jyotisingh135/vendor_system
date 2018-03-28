'use strict';
const faker = require('faker');

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('tblServices', {
      serviceId:{
          type:Sequelize.INTEGER,
          primaryKey:true,
          autoIncrement:true
      },
      serviceName:{
          type:Sequelize.STRING(30),
          allowNull:false
      },
      type:{
          type:Sequelize.CHAR(1),
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
        var arr=[
            {
                "type":"C",
                "name":"TL"
            },
            {
                "type":"C",
                "name":"LTL"
            },
            {
                "type":"C",
                "name":"Air"
            },
            {
                "type":"C",
                "name":"Hostshot"
            },
            {
                "type":"C",
                "name":"Ocean"
            },
            {
                "type":"C",
                "name":"Rail"
            },
            {
                "type":"C",
                "name":"Asset Based"
            },
            {
                "type":"C",
                "name":"Canadian"
            },
            {
                "type":"A",
                "name":"Trade Show"
            },
            {
                "type":"A",
                "name":"Office Relocation"
            },
            {
                "type":"A",
                "name":"HHG Agent"
            },
            {
                "type":"A",
                "name":"HazMat"
            },
            {
                "type":"A",
                "name":"Express Agent"
            },
            {
                "type":"A",
                "name":"WMS"
            }
        ];
        for(let i=0;i<arr.length;i++)
            sql+="('" + arr[i].name + "', '" + arr[i].type + "'),";
        return queryInterface.sequelize.query("Insert into tblServices(serviceName, type) values"+sql.slice(0, -1)+";")
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('tblServices');
  }
};