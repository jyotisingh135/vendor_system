let {user}=require('./userModel');
let sequelize=require('../../config/db');
let jwt=require('jsonwebtoken');
let patten=require('../../config/patten');


// Insert
exports.addUser=(req,res)=>{
    if(!patten.userNamePtn(req.body.userName))
        res.send({result: false, error: "Invalid User Name `" + req.body.userName + "`"});
    else if(!patten.emailPtn(req.body.email))
        res.send({result: false, error: "Invalid Email `" + req.body.email + "`"});
    else if(!patten.classificationPtn(req.body.userType, /^[AUC]$/))
        res.send({result: false, error: "Invalid userType `" + req.body.userType + "`"});
    else {
        user.sync().then(() => {
            user.create(req.body)
                .then((user) => {
                    res.send(user);
                }).catch((err) =>
                    res.send({result: false, error: err})
            )
        })
    }
}

exports.login=(req,res)=>{
    if(!patten.emailPtn(req.body.email))
        res.send({result: false, error: "Invalid Email `" + req.body.email + "`"});
    else
    {
        sequelize.query("select * from tblUsers where email='"+req.body.email+"' and password='"+req.body.password+"'",{type:sequelize.QueryTypes.SELECT})
            .then((tblUsers)=>{
                if(tblUsers[0]!==undefined){
                    let token=jwt.sign({userId:tblUsers[0].userId,access:tblUsers[0].password},'abc123').toString();
                    res.send({email:tblUsers[0].email,userType:tblUsers[0].userType,msg:'success'});
                }
                else
                    res.send({'msg':'fail'});
            });
    }
}

