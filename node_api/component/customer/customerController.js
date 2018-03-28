let {customer}=require('./customerModel');
let sequelize=require('../../config/db');
let patten=require('../../config/patten');


// Insert
exports.addCustomer=(req,res)=>{
    if(!patten.phonePtn(req.body.phone))
        res.send({result: false, error: "Invalid Phone `" + req.body.phone + "`"});
    else if(!patten.fullNamePtn(req.body.customerName))
        res.send({result: false, error: "Invalid Customer Name `" + req.body.customerName + "`"});
    else if(!patten.cityIdPtn(req.body.cityId))
        res.send({result: false, error: "Invalid CityId `" + req.body.cityId + "`"});
    else {
        customer.sync().then(() => {
            customer.create(req.body)
                .then((result) => {
                    res.send(result);
                }).catch((err) =>
                    res.send({result: false, error: err})
                )
        });
    }
};


// Select
exports.getCustomer=(req,res)=>{
    sequelize.query("SELECT `customerId`, `customerName`, `phone`, `cityId` from tblCustomers")
        .then((rows)=>{
            res.send(rows[0]);
        }).catch(err => {
            res.send({result: false, error: err});
    })
};


// Delete
exports.deleteCustomer=(req,res)=> {
    if(!patten.numberPtn(req.params.id))
        res.send({result: false, error: "Invalid URL Customer id `" + req.params.id + "`"});
    else {
        sequelize.query("delete from tblCustomers where customerId=" + req.params.id)
            .then((rows) => {
                res.send({result: true});
            }).catch(err => {
            res.send({result: false, error: err});
        })
    }
};