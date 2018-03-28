let sequelize=require('../../config/db');
let patten=require('../../config/patten');


// State
exports.getState=(req,res)=>{
    sequelize.query("Select distinct state from tblCities")
        .then((rows) => {
            res.send(rows[0]);
        }).catch(err => {
            res.send({err});
    })
};


// City
exports.getCity=(req,res)=>{
    if(!patten.fullNamePtn(req.params.name))
        res.send({result: false, error: "Invalid State Name `" + req.params.name + "`"});
    else {
        sequelize.query("Select cityId, cityName from tblCities where state='" + req.params.name + "'")
            .then((rows) => {
                res.send(rows[0]);
            }).catch(err => {
                res.send({err});
        })
    }
};


// Get State and City
exports.getCityState=(req,res)=>{
    if(!patten.cityIdPtn(req.params.id))
        res.send({result: false, error: "Invalid CityId `" + req.params.id + "`"});
    else {
        sequelize.query("Select cityName, state from tblCities where cityId='" + req.params.id + "'")
        .then((rows) => {
            res.send(rows[0]);
        }).catch(err => {
            res.send({err});
        })
    }
};