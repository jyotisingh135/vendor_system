let {agentProject}=require('./agentProjectModel');
let patten=require('../../config/patten');
let sequelize=require('../../config/db');


// Insert
exports.addProjectAgent=(req,res)=>{
    if(!patten.projectIdPtn(req.body.projectId))
        res.send({result: false, error: "Invalid Project Id `" + req.body.projectId +"`"});
    else if(!patten.agentIdPtn(req.body.agentId))
        res.send({result: false, error: "Invalid Agent Id `" + req.body.agentId + "`"});
    else {
        agentProject.sync().then(()=>{
            agentProject.create(req.body).then((result)=>{
                res.send(result);
            })
        })
    }
};


// Select
exports.getProjectAgent=(req,res)=>{
    sequelize.query("SELECT a.projectId,a.agentId,p.projectName from tblProjects as p, tblAgentProjects as a where a.projectId=p.projectId").then((rows)=>{
        res.send(rows[0]);
    })
};