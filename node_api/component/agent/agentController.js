let {agent}=require('./agentModel');
let sequelize=require('../../config/db');
let patten=require('../../config/patten');


// Insert
exports.addAgent=(req,res)=>{
    if(!patten.fullNamePtn(req.body.agentName))
        res.send({result: false, error: "Invalid Agent Name `" + req.body.agentName + "`"});
    else if(!patten.cityIdPtn(req.body.cityId))
        res.send({result: false, error: "Invalid CityId `" + req.body.cityId + "`"});
    else if(!patten.zipCodePtn(req.body.zipCode))
        res.send({result: false, error: "Invalid Zipcode `" + req.body.zipCode + "`"});
    else if(!patten.classificationPtn(req.body.classification, /^[PYN]$/))
        res.send({result: false, error: "Invalid Classification `" + req.body.classification + "`"});
    else if(!patten.activePtn(req.body.active) && req.body.active!==undefined)
        res.send({result: false, error: "Invalid Activation `" + req.body.active + "`"});
    else {
        agent.create({
            agentName: req.body.agentName,
            companyName: req.body.companyName,
            street: req.body.street,
            cityId: req.body.cityId,
            zipCode: req.body.zipCode,
            classification: req.body.classification,
            active: req.body.active === "" ? false : req.body.active
        }).then((ress) => {
            res.send({result: true});
        }).catch((err) => {
            res.send({result: false, error: err});
        })
    }
};


// Select
exports.getAgent=(req,res)=>{
    sequelize.query("Select a.`agentId`,`agentName`,`companyName`,a.`street`, a.`cityId`, `cityName`, `state`, a.`zipCode`,`classification`,`active`, `warehouseName`, `paymentTerms`, `creditLimit`\n" +
        "from (Select `agentId`,`agentName`,`companyName`,`street`, a.`cityId`, `cityName`, `state` ,`zipCode`,`classification`,`active`, `warehouseId`, `paymentTerms`, `creditLimit`\n" +
        "from tblAgents a inner Join tblCities c\n" +
        "on a.cityId=c.cityId) a left join tblWarehouses w\n" +
        "on w.warehouseId=a.warehouseId")
        .then((rows) => {
            res.send(rows[0]);
        }).catch(err => {
        res.send({result:false, error:err});
    })
};


// Update
exports.updateAgent=(req,res)=>{
    var sql="";
    sql+=(req.body.agentId===undefined)?"":("agentId='" + req.body.agentId + "', ");
    sql+=(req.body.agentName===undefined)?"":("agentName='" + req.body.agentName + "', ");
    sql+=(req.body.companyName===undefined)?"":("companyName='" + req.body.companyName + "', ");
    sql+=(req.body.street===undefined)?"":("street= '" + req.body.street + "', ");
    sql+=(req.body.cityId===undefined)?"":("cityId= " + req.body.cityId + ", ");
    sql+=(req.body.zipCode===undefined)?"":("zipCode= " + req.body.zipCode + ", ");
    sql+=(req.body.classification===undefined)?"":("classification= '" + req.body.classification + "', ");
    sql+=(req.body.active===undefined)?"":("active= " + req.body.active + ", ");

    if(!patten.agentIdPtn(req.params.agentId))
        res.send({result: false, error: "Invalid URL Agent Id `" + req.params.agentId + "`"});
    else if(!patten.agentIdPtn(req.body.agentId) && req.body.agentId!==undefined)
        res.send({result: false, error: "Invalid Agent Id `" + req.body.agentId + "`"});
    else if(!patten.fullNamePtn(req.body.agentName) && req.body.agentName!==undefined)
        res.send({result: false, error: "Invalid Agent Name `" + req.body.agentName + "`"});
    else if(!patten.cityIdPtn(req.body.cityId) && req.body.cityId!==undefined)
        res.send({result: false, error: "Invalid CityId `" + req.body.cityId + "`"});
    else if(!patten.zipCodePtn(req.body.zipCode) && req.body.zipCode!==undefined)
        res.send({result: false, error: "Invalid ZipCode `" + req.body.zipCode + "`"});
    else if(!patten.classificationPtn(req.body.classification, /^[PYN]$/) && req.body.classification!==undefined)
        res.send({result: false, error: "Invalid Classification `" + req.body.classification + "`"});
    else if(!patten.activePtn(req.body.active) && req.body.active!==undefined)
        res.send({result: false, error: "Invalid Activation `" + req.body.active + "`"});
    else if(sql!="") {
        sequelize.query("update tblAgents set " + sql.slice(0, -2) + " where agentId='" + req.params.agentId + "'")
            .then((ress) => {
                res.send({result: true});
            }).catch((err) => {
            res.send({result: false, error: err});
        })
    }
    else
    {
        res.send({result: false, error: null});
    }
};


// Delete
exports.delAgent=(req,res)=>{
    if(!patten.agentIdPtn(req.params.agentId))
        res.send({result: false, error: "Invalid URL Agent Id `" + req.params.agentId + "`"});
    else
    {
        sequelize.query("delete from tblAgents where agentId='" + req.params.agentId + "'")
            .then((rows) => {
                console.log("Delete : ",rows);
                res.send({result: true});
            }).catch(err => {
            res.send({result:false, error:err});
        })
    }
};


// Searching
exports.searchAgent=(req,res)=>{
    var sql="active=1 and ";
    sql+=(req.body.agentId===undefined || req.body.agentId==="")?"":("agent.agentId like '" + req.body.agentId + "%' and ");
    sql+=(req.body.agentName===undefined || req.body.agentName==="")?"":("agent.agentName like '%" + req.body.agentName + "%' and ");
    sql+=(req.body.companyName===undefined || req.body.companyName==="")?"":("agent.companyName like '%" + req.body.companyName + "%' and ");
    sql+=(req.body.street===undefined || req.body.street==="")?"":("agent.street like '%" + req.body.street + "%' and ");
    sql+=(req.body.cityId===undefined || req.body.cityId==="")?"":("city.cityId=" + req.body.cityId + " and ");
    sql+=(req.body.zipCode===undefined || req.body.zipCode==="")?"":("agent.zipCode like '%" + req.body.zipCode + "%' and ");
    sql+=(req.body.serviceId===undefined || req.body.serviceId==="")?"":("cs.accessId=agent.agentId and cs.serviceId=s.serviceId and cs.serviceId=" + req.body.serviceId + " and ");

    sequelize.query("SELECT agent.agentId, agent.agentName, agent.companyName, agent.street, agent.zipCode, agent.classification, agent.paymentTerms, agent.creditLimit, city.cityName, city.State, cs.serviceId, s.serviceName, contact.firstName, contact.lastName, contact.work, contact.cell, contact.email, contact.contactType FROM tblAgents agent LEFT JOIN tblCities city ON agent.cityId = city.cityId LEFT JOIN tblContacts contact ON contact.accessId = agent.agentId, tblCustomServices cs, tblServices s where "+sql.slice(0,-4) + " GROUP BY agent.agentId ORDER BY agent.agentId").then((rows)=>{
        // if(rows[0].length!=0) {
        //     res.send(rows[0]);
        // }
        // else
        //     res.send({result: false, error:"Zero row found."});
        res.send(rows[0]);
    }).catch(err=>{
        //res.send(rows[0]);
        res.send({result:false,error:err})
    })
};