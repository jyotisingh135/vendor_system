let sequelize=require('../../config/db');
let Sequelize=require('sequelize');
const customService=sequelize.define('tblCustomService',{
    customSid:{
        type:Sequelize.INTEGER,
        primaryKey:true,
        autoIncrement:true
    },
    serviceId:{
        type:Sequelize.INTEGER,
        allowNull:false
    },
    accessId:{
        type:Sequelize.STRING(6),
        allowNull:false
    }
});
module.exports={customService};