module.exports = function(app,db) {

    var usercheck = require("../models/login")(db);
    var msgdata = require("../models/message")(db);
    var member=require("../models/employee")(db);

    app.get("/message", function (req, res) {
        if(req.session.name!=null){
            usercheck.findOne({where:{id:req.session.idno}},function(err,cb){
                    db.client.query("SELECT e.*, count(firstName) AS count FROM message m,employee e WHERE e.id=m.`from` AND m.`to`='"+req.session.idno+"'AND m.read='0' GROUP BY id",function(erros,msgdata){
                        member.all(function(erro,data){
                if(cb['access']==1){
                    res.render("message",{title:"in", useracc:req.session.name,userid:req.session.idno, msglist:msgdata,allemp:data});
                }
                else{
                    res.render("message",{title:"emp", useracc:req.session.name,userid:req.session.idno, msglist:msgdata, allemp:data});
                }
                        })
                    })
            });
        }
        else {
            res.redirect("/");
        }
    });

    app.get("/typeMessage",function(req,res){
        if(req.session.name!=null){
        var query = require('url').parse(req.url,true).query;
        rec=query.msgrec;
        req.session.msgto=rec;
        if(rec!=""){
            msgdata.update({where:{from:rec},update:{read:'1'}},function(erro,cbd){});
                usercheck.findOne({where:{id:req.session.idno}},function(err,cb){
                    usercheck.find(rec,function(erro,recname){
                        db.client.query("SELECT e.firstName AS name, m.* FROM message m, employee e WHERE (m.`from`=e.id AND m.`from`='"+rec+"' AND m.`to`='"+req.session.idno+"') OR (m.`from`=e.id AND m.`from`='"+req.session.idno+"' AND m.`to`='"+rec+"')ORDER BY id DESC",function(erros,msgdetails){
                            db.client.query("SELECT e.*, count(firstName) AS count FROM message m,employee e WHERE e.id=m.`from` AND m.`to`='"+req.session.idno+"'AND m.read='0' GROUP BY id",function(erros,msgdata){
                            member.all(function(erro,data){
                    if(cb['access']==1){
                        res.render("typeMessage",{title:'in', useracc:req.session.name, userid:req.session.idno,msglist:msgdata,allemp:data,msgto:recname,msg:msgdetails});
                    }
                    else{
                        res.render("typeMessage",{title:"emp",useracc:req.session.name,userid:req.session.idno,msglist:msgdata,allemp:data,msgto:recname,msg:msgdetails})
                    }
                            })
                            })
                    })
                    })
                })
        }
        else{
            res.redirect("/");
        }
        }
        else{
            res.redirect("/");
        }
    })

    app.post("/sendMessage", function(req,res){
        if(req.session!=null){

        var today = new Date();
        var dd = today.getDate();
        var mm = today.getMonth()+1; //January is 0!
        var yyyy = today.getFullYear();
        if(dd<10){dd='0'+dd} if(mm<10){mm='0'+mm} today = mm+'/'+dd+'/'+yyyy;

        var postData={
            message:req.body.txtmsg
        }
        msgdata.create({
            from:req.session.idno,
            to:rec,
            msg:postData.message,
            date:today,
            read:0
        },function(err,result){
            if(!err){
                if(req.session!=null){
                    var rec=req.session.msgto;
                    usercheck.findOne({where:{id:req.session.idno}},function(err,cb){
                        usercheck.find(rec,function(erro,recname){
                            db.client.query("SELECT e.firstName AS name, m.* FROM message m, employee e WHERE (m.`from`=e.id AND m.`from`='"+rec+"' AND m.`to`='"+req.session.idno+"') OR (m.`from`=e.id AND m.`from`='"+req.session.idno+"' AND m.`to`='"+rec+"')ORDER BY id DESC",function(erros,msgdetails){
                                db.client.query("SELECT e.*, count(firstName) AS count FROM message m,employee e WHERE e.id=m.`from` AND m.`to`='"+req.session.idno+"'AND m.read='0' GROUP BY id",function(erros,msgdata){
                                    member.all(function(erro,data){
                                        if(cb['access']==1){
                                            res.render("typeMessage",{title:'in', useracc:req.session.name, userid:req.session.idno,msglist:msgdata,allemp:data,msgto:recname,msg:msgdetails});
                                        }
                                        else{
                                            res.render("typeMessage",{title:"emp",useracc:req.session.name,userid:req.session.idno,msglist:msgdata,allemp:data,msgto:recname,msg:msgdetails})
                                        }
                                    })
                                })
                            })
                        })
                    })
                }
                else{
                    res.redirect("/");
                }
            }
            else{
                res.redirect("/");
            }
    })
        }
        else{
            res.redirect('/');
        }
    });
}