let sequelize=require('../../config/db');
let Sequelize=require('sequelize');
const equipment=sequelize.define('tblEquipments',{
    equipmentId:{
        type:Sequelize.INTEGER,
        primaryKey:true,
        autoIncrement:true
    },
    equipmentName:{
        type:Sequelize.STRING(30),
        allowNull:false
    }
});
module.exports={equipment};