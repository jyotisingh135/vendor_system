let sequelize=require('../../config/db');
let Sequelize=require('sequelize');
const customEquipment=sequelize.define('tblCustomEquipment',{
    customEid:{
        type:Sequelize.INTEGER,
        primaryKey:true,
        autoIncrement:true
    },
    equipmentId:{
        type:Sequelize.INTEGER,
        allowNull:false
    },
    carrierId:{
        type:Sequelize.STRING(6),
        allowNull:false
    }
});
module.exports={customEquipment};