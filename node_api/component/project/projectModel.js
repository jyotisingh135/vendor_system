let sequelize=require('../../config/db');
let Sequelize=require('sequelize');
const project=sequelize.define('tblProjects',{
    projectId:{
        type:Sequelize.STRING(6),
        primaryKey:true
    },
    projectQuote:{
        type:Sequelize.STRING(6),
        allowNull:true
    },
    projectName:{
        type:Sequelize.STRING(40),
        allowNull:false
    },
    customerId:{
        type:Sequelize.INTEGER,
        allowNull:false
    }
});
module.exports={project};