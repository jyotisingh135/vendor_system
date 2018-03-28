let sequelize=require('../../config/db');
let path=require('path');
let patten=require('../../config/patten');


// Select
exports.getAttachment=(req,res) => {
    if(!patten.accessIdPtn(req.params.id))
        res.send({result: false, error: "Invalid URL Access Id `" + req.params.id + "`"});
    else {
        sequelize.query("Select `attachmentId`, `fileName` from `tblAttachments` where `accessId`='" + req.params.id + "'")
            .then((rows) => {
                res.send(rows[0]);
            }).catch(err => {
                res.send({result: false, error: err});
            })
    }
};


// Insert
let url;
let Arr=[];
exports.addAttachment=(req,res) => {
    if(!patten.accessIdPtn(req.params.id))
    {
        res.send({result: false, error: "Invalid URL Access Id `" + req.params.id + "`"});
        return;
    }
    // if (!req.files)
    //     return res.send({result:false, error:null});
    let file = req.files.fileName;
    url=req.headers.host;

    let accessId=req.params.id;
    let err=undefined;
    if(!Array.isArray(file)) {
        // console.log(req.params.id, file);
        err=uploadFile(file,accessId);
    }
    else
    {
        for(let i=0;i<file.length;i++)
        {
            let err1=uploadFile(file[i], accessId);
            if(err===undefined)
                err=err1;
        }
    }
    // console.log("Error : ", err);
    if(err===undefined) {
        res.send({result: true});
    }
    else
        res.send({result: false, error:err});

};

let uploadFile=(file, accessId) => {
    let uploadpath = path.join(__dirname, "../../Attachment/",file.name);
    file.mv(uploadpath, function (err) {
        if (err)
            return err;

        sequelize.query("Insert into `tblAttachments`(`fileName`, `accessId`) values('"+url+'/Attachment/' + file.name + "', '" + accessId + "')")
            .then((rows) => {
            if(rows){
                sequelize.query("select * from tblAttachments where attachmentId in (select max(attachmentId) from tblAttachments where accessId='"+accessId+"')")
                    .then((rows)=> {
                        Arr.push(rows[0]);
                        console.log(Arr);
                    })}

            }).catch(err => {
                console.log(err);
                return err;
        });

    })

};


//Delete
exports.delAttachment=(req,res) => {
    if(req.params.id===undefined) {
        // Multiple Delete
        let flag=true;
        for (let i = 0; i < req.body.length; i++) {
            if(!patten.numberPtn(req.body[i].attachmentId))
            {
                res.send({result: false, error: "Invalid Attachment Id `" + req.body[i].attachmentId + "`"});
                return;
            }
        }
        for (let i = 0; i < req.body.length; i++) {
            sequelize.query("Delete from `tblAttachments` where `attachmentId`=" + req.body[i].attachmentId)
                .then((rows) => {
                    // res.send(rows[0]);
                }).catch(err => {
                    flag=false;
            })
        }
        if(flag)
            res.send({result: true});
        else
            res.send({result: false, error: null});
    }
    else
    {
        // Single Delete
        if(!patten.numberPtn(req.params.id))
        {
            res.send({result: false, error: "Invalid URL Attachment Id `" + req.params.id + "`"});
        }
        else
        {
            sequelize.query("Delete from `tblAttachments` where `attachmentId`=" + req.params.id)
                .then((rows) => {
                    res.send(rows[0]);
                }).catch(err => {
                res.send({result: false, error: err});
            })
        }
    }
};