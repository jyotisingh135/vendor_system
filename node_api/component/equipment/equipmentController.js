let sequelize=require('../../config/db');


// Select
exports.getTotEquipments=(req,res)=>{
    sequelize.query("Select `equipmentId`, `equipmentName` from tblEquipments")
        .then((rows) => {
            res.send(rows[0]);
        }).catch(err => {
            res.send({result:false, error:err});
    })
};