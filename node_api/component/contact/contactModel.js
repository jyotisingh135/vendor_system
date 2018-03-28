let sequelize=require('../../config/db');
let Sequelize=require('sequelize');
const contact=sequelize.define('tblContact',{
    contactId:{
        type:Sequelize.INTEGER,
        primaryKey:true,
        autoIncrement:true
    },
    firstName:{
        type:Sequelize.STRING(25),
        allowNull:false
    },
    lastName:{
        type:Sequelize.STRING(25),
        allowNull:false
    },
    work:{
        type:Sequelize.BIGINT,
        allowNull:true
    },
    cell:{
        type:Sequelize.BIGINT,
        allowNull:true
    },
    email:{
        type:Sequelize.STRING(50),
        allowNull:true
    },
    contactType:{
        type:Sequelize.STRING(15),
        allowNull:false
    },
    accessId: {
        type: Sequelize.STRING(6),
        allowNull: false
    }
});
module.exports={contact};