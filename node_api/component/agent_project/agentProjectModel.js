let sequelize=require('../../config/db');
let Sequelize=require('sequelize');
const agentProject=sequelize.define('tblAgentProject',{
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
    }
});
module.exports={agentProject};