let sequelize=require('../../config/db');
let Sequelize=require('sequelize');
const customer=sequelize.define('tblCustomer',{
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
    }
});
module.exports={customer};