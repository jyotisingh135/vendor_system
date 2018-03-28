let sequelize=require('../../config/db');
let patten=require('../../config/patten');


// Select
exports.getServices=(req,res)=>{
    if(!patten.accessIdPtn(req.params.id))
        res.send({result: false, error: "Invalid URL Access Id `" + req.params.id + "`"});
    else {
        sequelize.query("Select cs.serviceId, s.serviceName from tblCustomServices cs left join " +
            "tblServices s on cs.serviceId=s.serviceId where accessId='" + req.params.id + "'")
            .then((rows) => {
                res.send(rows[0]);
            }).catch(err => {
                res.send({result: false, error: err});
        })
    }
};


// modify
exports.modifyServices=(req,res)=>{
    if(!patten.accessIdPtn(req.params.id))
        res.send({result: false, error: "Invalid URL Access Id `" + req.params.id + "`"});
    else {
        sequelize.query("Delete from tblCustomServices where accessId='" + req.params.id + "'")
            .then((rows1) => {
                for (let i = 0; i < req.body.serviceId.length; i++)
                {
                    if(!patten.numberPtn(req.body.serviceId[i]))
                    {
                        res.send({result: false, error: "Invalid Service Id `" + req.body.serviceId[i] + "`"});
                        return
                    }
                }
                for (let i = 0; i < req.body.serviceId.length; i++)
                {
                    sequelize.query("Insert into tblCustomServices(serviceId, accessId) " +
                        "values(" + req.body.serviceId[i] + ", '" + req.params.id + "');")
                }
                res.send({result: true});
            }).catch(err => {
                res.send({result: false, error: err});
        });
    }
};