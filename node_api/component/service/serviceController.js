let sequelize=require('../../config/db');
let patten=require('../../config/patten');


// Select
exports.getTotServices=(req,res)=>{
    if(!patten.classificationPtn(req.params.type, /^[AC]$/))
        res.send({result: false, error: "Invalid URL Service type `" + req.params.type + "`"});
    else {
        sequelize.query("Select `serviceId`, `serviceName` from tblServices " +
            "where type='" + req.params.type + "'")
            .then((rows) => {
                res.send(rows[0]);
            }).catch(err => {
               res.send({result: false, error: err});
        })
    }
};
