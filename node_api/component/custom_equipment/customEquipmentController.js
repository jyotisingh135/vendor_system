let sequelize=require('../../config/db');
let patten=require('../../config/patten');


// Select
exports.getEquipments=(req,res)=>{
    if(!patten.carrierIdPtn(req.params.id))
        res.send({result: false, error: "Invalid URL Carrier Id `" + req.params.id + "`"});
    else
    {
        sequelize.query("Select ce.equipmentId, e.equipmentName from tblCustomEquipments ce left join " +
            "tblEquipments e on ce.equipmentId=e.equipmentId where carrierId='" + req.params.id + "'")
            .then((rows) => {
                res.send(rows[0]);
            }).catch(err => {
            res.send({result:false, error:err});
        })
    }
};


// modify
exports.modifyEquipments=(req,res)=>{
    if(!patten.carrierIdPtn(req.params.id))
        res.send({result: false, error: "Invalid URL Carrier Id `" + req.params.id + "`"});
    else {
        sequelize.query("Delete from tblCustomEquipments where carrierId='" + req.params.id + "'")
            .then((rows1) => {
                for (let i = 0; i < req.body.equipmentId.length; i++) {
                    if(!patten.numberPtn(req.body.equipmentId[i]))
                    {
                        res.send({result: false, error: "Invalid Equipment Id `" + req.body.equipmentId[i] + "`"});
                        return
                    }
                }
                for (let i = 0; i < req.body.equipmentId.length; i++) {
                    sequelize.query("Insert into tblCustomEquipments(equipmentId, carrierId) " +
                        "values(" + req.body.equipmentId[i] + ", '" + req.params.id + "');")
                }
                res.send({result: true});
            }).catch(err => {
                res.send({result: false, error: err});
        });
    }
};