let {contact}=require('./contactModel');
let sequelize=require('../../config/db');
let patten=require('../../config/patten');


// Insert
exports.addCustomer=(req,res)=>{
    if(!patten.emailPtn(req.body.email))
        res.send({result: false, error: "Invalid email `" + req.body.email + "`"});
    else if(!patten.phonePtn(req.body.work))
        res.send({result: false, error: "Invalid Work Phone `" + req.body.work + "`"});
    else if(!patten.phonePtn(req.body.cell))
        res.send({result: false, error: "Invalid Cell Phone `" + req.body.cell + "`"});
    else if(!patten.accessIdPtn(req.body.accessId))
        res.send({result: false, error: "Invalid AccessId `" + req.body.accessId + "`"});
    else if(!patten.userNamePtn(req.body.firstName) || !patten.userNamePtn(req.body.lastName))
        res.send({result: false, error: "Invalid First name && Last name `" + req.body.firstName + " " + req.body.lastName + "`"});
    else {
        contact.create({
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            work: req.body.work === undefined ? null : req.body.work,
            cell: req.body.cell === undefined ? null : req.body.cell,
            email: req.body.email === undefined ? null : req.body.email,
            contactType: req.body.contactType === undefined ? "Primary" : req.body.contactType,
            accessId: req.body.accessId
        }).then((rows) => {
            res.send(rows.dataValues);
        }).catch((err) => {
            res.send({result: false, error: err});
        })
    }
};


// Select
exports.getCustomer=(req,res)=>{
    if(!patten.accessIdPtn(req.params.id))
        res.send({result: false, error: "Invalid URL Access Id `" + req.params.id + "`"});
    else {
        sequelize.query("Select `contactId`,`firstName`, `lastName`, `work`, `cell`, `email`, " +
            "`contactType`,`accessId` from tblContacts where accessId='" + req.params.id + "'")
            .then((rows) => {
                console.log(rows[0]);
                res.send(rows[0]);
            }).catch(err => {
            res.send({result: false, error: err});
        })
    }
};


// Update
exports.updateCustomer=(req,res)=>{
    var sql="";
    sql+=(req.body.firstName===undefined)?"":("firstName='" + req.body.firstName + "', ");
    sql+=(req.body.lastName===undefined)?"":("lastName='" + req.body.lastName + "', ");
    sql+=(req.body.work===undefined)?"":("work= " + req.body.work + ", ");
    sql+=(req.body.cell===undefined)?"":("cell= " + req.body.cell + ", ");
    sql+=(req.body.email===undefined)?"":("email='" + req.body.email + "', ");
    sql+=(req.body.contactType===undefined)?"":("contactType='" + req.body.contactType + "', ");
    sql+=(req.body.accessId===undefined)?"":("accessId='" + req.body.accessId + "', ");

    if(!patten.numberPtn(req.params.id))
        res.send({result: false, error: "Invalid URL Contact Id `" + req.params.id + "`"});
    else if((!patten.userNamePtn(req.body.firstName) && req.body.firstName!==undefined) ||
        (!patten.userNamePtn(req.body.lastName) && req.body.lastName!==undefined))
        res.send({result: false, error: "Invalid First name && Last name `" + req.body.firstName + " " + req.body.lastName + "`"});
    else if(!patten.emailPtn(req.body.email) && req.body.email!==undefined)
        res.send({result: false, error: "Invalid email `" + req.body.email + "`"});
    else if(!patten.phonePtn(req.body.work) && req.body.work!==undefined)
        res.send({result: false, error: "Invalid Work Phone `" + req.body.work + "`"});
    else if(!patten.phonePtn(req.body.cell) && req.body.cell!==undefined)
        res.send({result: false, error: "Invalid Cell Phone `" + req.body.cell + "`"});
    else if(!patten.accessIdPtn(req.body.accessId) && req.body.accessId!==undefined)
        res.send({result: false, error: "Invalid AccessId `" + req.body.accessId + "`"});
    else if(sql!="") {
        sequelize.query("update tblContacts set " + sql.slice(0, -2) + " where contactId=" + req.params.id)
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
exports.delCustomer=(req,res)=>{
    if(!patten.numberPtn(req.params.id))
        res.send({result: false, error: "Invalid URL Contact Id `" + req.params.id + "`"});
    else {
        sequelize.query("delete from tblContacts where contactId=" + req.params.id)
            .then((rows) => {
                res.send({result: true});
            }).catch(err => {
                res.send({result: false, error: err});
        })
    }
};