let {carrier}=require('./carrierModel');
let sequelize=require('../../config/db');
let patten=require('../../config/patten');


// Insert
exports.addCarrier=(req,res)=>{
    if(!patten.fullNamePtn(req.body.carrierName))
        res.send({result: false, error: "Invalid Carrier Name `" + req.body.carrierName + "`"});
    else if(!patten.cityIdPtn(req.body.cityId))
        res.send({result: false, error: "Invalid CityId `" + req.body.cityId + "`"});
    else if(!patten.zipCodePtn(req.body.zipCode))
        res.send({result: false, error: "Invalid Zipcode `" + req.body.zipCode + "`"});
    else if(!patten.classificationPtn(req.body.classification, /^[AD]$/))
        res.send({result: false, error: "Invalid Classification `" + req.body.classification + "`"});
    else if(!patten.activePtn(req.body.active) && req.body.active!==undefined)
        res.send({result: false, error: "Invalid Activation `" + req.body.active + "`"});
    else {
        carrier.create({
            carrierName: req.body.carrierName,
            companyName: req.body.companyName,
            street: req.body.street,
            zipCode: req.body.zipCode,
            cityId: req.body.cityId,
            classification: req.body.classification,
            active: req.body.active === "" ? false : req.body.active
        }).then((rows) => {
            console.log('data', rows.dataValues);
            res.send(rows.dataValues);
        }).catch((err) => {
            console.log('error', err);
            res.send({result: false, error: err});
        })
    }
};


// Select
exports.getCarrier=(req,res)=>{
    sequelize.query("SELECT `carrierId`, `carrierName`, `companyName`, `street`, ca.`cityId`, " +
        "ci.`cityName`, ci.`state`, `zipCode`, `classification`, `active` FROM `tblCarriers` ca " +
        "LEFT JOIN `tblCities` ci on ci.cityId=ca.cityId")
        .then((rows) => {
            res.send(rows[0]);
        }).catch(err => {
        res.send({result:false, error:err});
    })
};


// Update
exports.updateCarrier=(req,res)=>{
    var sql="";
    sql+=(req.body.carrierId===undefined)?"":("carrierId='" + req.body.carrierId + "', ");
    sql+=(req.body.carrierName===undefined)?"":("carrierName='" + req.body.carrierName + "', ");
    sql+=(req.body.companyName===undefined)?"":("companyName='" + req.body.companyName + "', ");
    sql+=(req.body.street===undefined)?"":("street= '" + req.body.street + "', ");
    sql+=(req.body.cityId===undefined)?"":("cityId= " + req.body.cityId + ", ");
    sql+=(req.body.zipCode===undefined)?"":("zipCode= " + req.body.zipCode + ", ");
    sql+=(req.body.classification===undefined)?"":("classification= '" + req.body.classification + "', ");
    sql+=(req.body.active===undefined)?"":("active= " + req.body.active + ", ");

    if(!patten.carrierIdPtn(req.params.id))
        res.send({result: false, error: "Invalid URL Carrier Id `" + req.params.id + "`"});
    else if(!patten.carrierIdPtn(req.body.carrierId) && req.body.carrierId!==undefined)
        res.send({result: false, error: "Invalid Carrier Id `" + req.body.carrierId + "`"});
    else if(!patten.fullNamePtn(req.body.carrierName) && req.body.carrierName!==undefined)
        res.send({result: false, error: "Invalid Carrier Name `" + req.body.carrierName + "`"});
    else if(!patten.cityIdPtn(req.body.cityId) && req.body.cityId!==undefined)
        res.send({result: false, error: "Invalid CityId `" + req.body.cityId + "`"});
    else if(!patten.zipCodePtn(req.body.zipCode) && req.body.zipCode!==undefined)
        res.send({result: false, error: "Invalid ZipCode `" + req.body.zipCode + "`"});
    else if(!patten.classificationPtn(req.body.classification, /^[AD]$/) && req.body.classification!==undefined)
        res.send({result: false, error: "Invalid Classification `" + req.body.classification + "`"});
    else if(!patten.activePtn(req.body.active) && req.body.active!==undefined)
        res.send({result: false, error: "Invalid Activation `" + req.body.active + "`"});
    else if(sql!="") {
        sequelize.query("update tblCarriers set " + sql.slice(0, -2) +
            " where carrierId='" + req.params.id + "'")
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
exports.delCarrier=(req,res)=>{
    if(!patten.carrierIdPtn(req.params.id))
        res.send({result: false, error: "Invalid URL Carrier Id `" + req.params.id + "`"});
    else {
        sequelize.query("delete from tblCarriers where carrierId='" + req.params.id + "'")
            .then((rows) => {
                res.send({result: true});
            }).catch(err => {
            res.send({result: false, error: err});
        })
    }
};


// Searching
exports.searchCarrier=(req,res)=>{
    var sql="active=1 and ";
    sql+=(req.body.carrierId===undefined || req.body.carrierId==="")?"":("carrier.carrierId like '" + req.body.carrierId + "%' and ");
    sql+=(req.body.carrierName===undefined || req.body.carrierName==="")?"":("carrier.carrierName like '%" + req.body.carrierName + "%' and ");
    sql+=(req.body.companyName===undefined|| req.body.companyName==="")?"":("carrier.companyName like '%" + req.body.companyName + "%' and ");
    sql+=(req.body.street===undefined || req.body.street==="")?"":("carrier.street like '%" + req.body.street + "%' and ");
    sql+=(req.body.cityId===undefined || req.body.cityId==="")?"":("carrier.cityId=" + req.body.cityId + " and ");
    sql+=(req.body.zipCode===undefined || req.body.zipCode==="")?"":("carrier.zipCode like '%" + req.body.zipCode + "%' and ");
    sql+=(req.body.classification===undefined || req.body.classification==="")?"":("carrier.classification like '" + req.body.classification + "%' and ");
    sql+=(req.body.serviceId===undefined || req.body.serviceId==="")?"":("cs.accessId=carrier.carrierId and cs.serviceId=" + req.body.serviceId + " and ");
    sql+=(req.body.equipmentId===undefined || req.body.equipmentId==="")?"":("cq.carrierId=carrier.carrierId and cq.equipmentId=" + req.body.equipmentId + " and ");

    sequelize.query("SELECT carrier.carrierId, carrier.carrierName, carrier.companyName, " +
        "carrier.street, carrier.zipCode, carrier.classification, city.cityName,city.State, " +
        "contact.firstName, contact.lastName, contact.work, contact.cell, contact.email, " +
        "contact.contactType FROM tblCarriers carrier LEFT JOIN tblCities city " +
        "ON carrier.cityId = city.cityId LEFT JOIN tblContacts contact " +
        "ON contact.accessId = carrier.carrierId, tblCustomServices cs, tblCustomEquipments cq " +
        "where "+sql.slice(0,-4)+" group by carrier.carrierId order by carrier.carrierId")
        .then((rows)=>{
            res.send(rows[0]);
        }).catch(err=>{
            res.send({result:false ,error:err});
        })
};
