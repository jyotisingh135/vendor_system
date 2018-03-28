let sequelize=require('../../config/db');
let Sequelize=require('sequelize');
const carrier=sequelize.define('tblCarrier',{
    carrierId:{
        type:Sequelize.STRING(6),
        primaryKey:true
    },
    carrierName:{
        type:Sequelize.STRING(40),
        allowNull:false
    },
    companyName:{
        type:Sequelize.STRING(40),
        allowNull:false
    },
    street:{
        type:Sequelize.STRING(50),
        allowNull:false
    },
    cityId:{
        type:Sequelize.INTEGER,
        allowNull:false
    },
    zipCode:{
        type:Sequelize.INTEGER,
        allowNull:false
    },
    classification:{
        type:Sequelize.CHAR(1),
        allowNull:false
    },
    active:{
        type:Sequelize.BOOLEAN,
        allowNull:false,
        defaultValue: false
    }
});
module.exports={carrier};