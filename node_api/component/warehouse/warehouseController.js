let {warehouse}=require('./warehouseModel');
let sequelize=require('../../config/db');
let patten=require('../../config/patten');


// Insert
exports.addWarehouse=(req,res)=> {
    if(!patten.fullNamePtn(req.body.warehouseName))
        res.send({result: false, error: "Invalid Warehouse Name `" + req.body.warehouseName + "`"});
    else if(!patten.cityIdPtn(req.body.cityId))
        res.send({result: false, error: "Invalid CityId `" + req.body.cityId + "`"});
    else if(!patten.zipCodePtn(req.body.zipCode))
        res.send({result: false, error: "Invalid Zipcode `" + req.body.zipCode + "`"});
    else if(!patten.agentIdPtn(req.body.agentId))
        res.send({result: false, error: "Invalid Agent Id `" + req.body.agentId + "`"});
    else {
        warehouse.sync().then(() => {
            warehouse.create({
                warehouseName: req.body.warehouseName,
                street: req.body.street,
                cityId: req.body.cityId,
                zipCode: req.body.zipCode,
                agentId: req.body.agentId
            }).then((ress) => {
                res.send({result: true});
            }).catch((err) => {
                res.send({result: false, error: err});
            });
        })
    }
};


// Select
exports.getWarehouse=(req,res)=>{
    if(!patten.agentIdPtn(req.params.id))
        res.send({result: false, error: "Invalid URL Agent Id `" + req.params.id + "`"});
    else {
        sequelize.query("SELECT w.`warehouseId`, `warehouseName`, w.`street`, w.`cityId`, c.`cityName`, " +
            "c.`state`, w.`zipCode`, w.`agentId`, a.`agentName` FROM `tblWarehouses` w LEFT JOIN " +
            "`tblCities` c ON w.`cityId`=c.`cityId` LEFT JOIN `tblAgents` a ON w.`agentId`=a.`agentId` " +
            "HAVING agentId='" + req.params.id + "'")
            .then((rows) => {
                res.send(rows[0]);
            }).catch(err => {
                res.send({result: false, error: err});
        })
    }
};


// Update
exports.updateWarehouse=(req,res)=>{
    var sql="";
    sql+=(req.body.warehouseId===undefined)?"":("warehouseId='" + req.body.warehouseId + "', ");
    sql+=(req.body.warehouseName===undefined)?"":("warehouseName='" + req.body.warehouseName + "', ");
    sql+=(req.body.street===undefined)?"":("street= '" + req.body.street + "', ");
    sql+=(req.body.cityId===undefined)?"":("cityId= " + req.body.cityId + ", ");
    sql+=(req.body.zipCode===undefined)?"":("zipCode= " + req.body.zipCode + ", ");
    sql+=(req.body.agentId===undefined)?"":("agentId= '" + req.body.agentId + "', ");

    if(!patten.numberPtn(req.params.id))
        res.send({result: false, error: "Invalid URL Warehouse Id `" + req.params.id + "`"});
    else if(!patten.numberPtn(req.body.warehouseId) && req.body.warehouseId!==undefined)
        res.send({result: false, error: "Invalid Warehouse Id `" + req.body.warehouseId + "`"});
    else if(!patten.fullNamePtn(req.body.warehouseName) && req.body.warehouseName!==undefined)
        res.send({result: false, error: "Invalid Warehouse Name `" + req.body.warehouseName + "`"});
    else if(!patten.cityIdPtn(req.body.cityId) && req.body.cityId!==undefined)
        res.send({result: false, error: "Invalid CityId `" + req.body.cityId + "`"});
    else if(!patten.zipCodePtn(req.body.zipCode) && req.body.zipCode!==undefined)
        res.send({result: false, error: "Invalid ZipCode `" + req.body.zipCode + "`"});
    else if(!patten.agentIdPtn(req.body.agentId) && req.body.agentId!==undefined)
        res.send({result: false, error: "Invalid Agent Id `" + req.body.agentId + "`"});
    else if(sql!="") {
        sequelize.query("update tblWarehouses set " + sql.slice(0, -2) +
            " where warehouseId=" + req.params.id)
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
exports.delWarehouse=(req,res)=>{
    if(!patten.numberPtn(req.params.id))
        res.send({result: false, error: "Invalid URL Warehouse Id `" + req.params.id + "`"});
    else {
        sequelize.query("delete from tblWarehouses where warehouseId=" + req.params.id)
            .then((rows) => {
                console.log("Delete : ", rows);
                res.send({result: true});
            }).catch(err => {
                res.send({result: false, error: err});
        })
    }
};