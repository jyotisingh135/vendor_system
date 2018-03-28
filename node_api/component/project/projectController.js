let {project}=require('./projectModel');
let sequelize=require('../../config/db');
let patten=require('../../config/patten');


// Insert
exports.addProject=(req,res)=>{
    if(!patten.fullNamePtn(req.body.projectName))
        res.send({result: false, error: "Invalid Project Name `" + req.body.projectName + "`"});
    else if(!patten.numberPtn(req.body.customerId))
        res.send({result: false, error: "Invalid Customer Id `" + req.body.customerId + "`"});
    else if(!patten.projectQuoteIdPtn(req.body.projectQuote) && req.body.projectQuote!==undefined)
        res.send({result: false, error: "Invalid ProjectQuote Id `" + req.body.projectQuote + "`"});
    else {
        project.sync().then(() => {
            project.create(req.body)
                .then((result) => {
                    res.send(result);
                }).catch((err) =>
                    res.send({result: false, error: err})
                )
        })
    }
};


// Select
exports.getProjects=(req,res)=>{
    sequelize.query("SELECT CASE WHEN `projectQuote` IS NULL THEN `projectId` ELSE `projectQuote` END," +
        " `projectName`, `customerId` FROM `tblProjects`")
        .then((rows)=>{
            res.send(rows[0]);
    })
};