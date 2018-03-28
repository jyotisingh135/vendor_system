let sequelize=require('../../config/db');
let Sequelize=require('sequelize');
const city=sequelize.define('tblCity',{
    cityId:{
        type:Sequelize.INTEGER,
        primaryKey:true,
    },
    cityName:{
        type:Sequelize.STRING(30),
        allowNull:false
    },
    state:{
        type:Sequelize.STRING(30),
        allowNull:false,
    }
});
module.exports={city};