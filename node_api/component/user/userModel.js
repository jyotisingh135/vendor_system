let sequelize=require('../../config/db');
let Sequelize=require('sequelize');
const user=sequelize.define('tblUser',{
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
    }
});
module.exports={user};