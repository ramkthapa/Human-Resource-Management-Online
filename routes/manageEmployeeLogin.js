
module.exports = function(app,db) {

    var usercheck = require("../models/login")(db);
    var allleave=require("../models/leave")(db);
    var allnotices=require("../models/notice")(db);

    app.get("/Employee", function (req, res) {
        if(req.session.name!=null){
            //res.render("popupMessage",{title:"in"});
            usercheck.findOne({where:{id:req.session.idno}},function(err,cb){
                //console.log(cb)
                    allnotices.all(function(erro,data){
                    allleave.count({status:0},function(err,counter){
                if(cb['access']==1){
                        res.render("welcome",{title:"in",useracc:req.session.name,userid:req.session.idno, leave:counter, notices:data})
                    }
                else{
                    db.client.query("SELECT COUNT(*) AS count FROM `empleave` WHERE empid='"+req.session.idno+"' AND `read`='0' AND `status`!='0'", function(err, user){
                    res.render("welcome",{title:"emp",useracc:req.session.name,userid:req.session.idno, leave:user[0]['count'], notices:data})
                    });
                }
                    })
                })

            })

        }
        else {

            res.redirect("/");
        }

    });

    app.post("/actadmin", function(req, res){
         var postData = {

            username: req.body.username,
            password: req.body.password

        };

        usercheck.count({Name:postData.username, password:postData.password},function(err,counter){
            //console.log(counter);
            if(counter==1){
                usercheck.all(function(err,result){
                    for(var row in result){
                        if(result[row]['Name']==postData.username){
                          var id= result[row]['id'];
                            break;
                        }
                    }
                    req.session.idno=id;
                    req.session.name=postData.username;
                //res.redirect('/Employee');
                res.send(true);
                })
            }
            else{
                //req.session.name=null;
                //res.render("message",{title:'out'})
                //res.redirect('/');
                res.send(false);
            }

        });

    });

     app.get("/logout",function(req,res){
        if(req.session.name!=null){
         req.session.destroy();
        res.redirect("/");
        }
         else{
            res.redirect('/');
        }
      });


}
