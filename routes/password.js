module.exports = function(app,db) {

    app.get("/changePassword", function (req, res) {
        if(req.session.name!=null){
            var usercheck = require("../models/login")(db);
            usercheck.findOne({where:{id:req.session.idno}},function(err,cb){
            if(cb['access']==1){
                res.render("changePassword",{title:"in", useracc:req.session.name,userid:req.session.idno});
            }
            else{
                res.render("changePassword",{title:"emp", useracc:req.session.name,userid:req.session.idno});
            }
            });
        }
        //console.log(id+'Hello');
        else {
            res.redirect("/");
        }
    });
    app.post("/actChangePass", function(req,res){
        if(req.session.name!=null){
        var postData={
            oldPassword:req.body.oldPass,
            newPassword:req.body.newPass
        }
        var user = require("../models/login")(db);
        user.count({id:req.session.idno, password:postData.oldPassword},function(err,counter){
            if(counter==1){
                //console.log('Password Matched')
                user.update({where:{id:req.session.idno},update:{password:postData.newPassword}},function(err,cb){
                 if(!err){
                    // console.log('Password Changed')
                     res.send(true);
                 }
                 else{
                 console.log(err);
                 }
                 })
            }
            else{
                res.send(false);
            }
        })
        }
        else{
            res.redirect('/');
        }
    });
}