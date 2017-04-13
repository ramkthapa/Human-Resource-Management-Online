module.exports = function(app,db) {

    var insertdata = require("../models/position")(db);
    var usercheck = require("../models/position")(db);

    app.get("/addPos", function (req, res) {
        if(req.session.name!=null){
            insertdata.all(function(err,data){
            res.render("addPosition",{title:'in', useracc:req.session.name, userid:req.session.idno, user:data, datas:'',saved:0});
            })
        }
        else{
            res.redirect("/")
        }
    });

    app.post("/addPosition", function(req,res){
        if(req.session.name!=null){
        var posData = {
            pos:req.body.txtPosition
        }
        //console.log(posData.daysAvailable);
        insertdata.create({
            positionName:posData.pos }, function(err,result){
            if(!err){
                //res.redirect('/addPos')
                insertdata.all(function(err,data){
                    res.render("addPosition",{title:'in', useracc:req.session.name, userid:req.session.idno, user:data, datas:'',saved:1});
                })
            }
            else{
                console.log(err)
                res.redirect('/addPos')
            }
        })
        }
        else{
            res.redirect('/');
        }
    });


    app.get("/editPos", function (req, res) {
        if(req.session.name!=null){
            var query = require('url').parse(req.url,true).query;
            var id=query.id;
            if(id!=''){
                usercheck.find(id,function(err,result){
                    insertdata.all(function(err,data){
                        res.render("addPosition",{title:"in",useracc:req.session.name,userid:req.session.idno,user:data, datas:result,saved:0 })
                    })
                })
            }
        }
        else{
            res.redirect('/');
        }

    });

    app.post("/editPosition", function(req,res){
        if(req.session.name!=null){
        var posData = {
            idno:req.body.txtid,
            dep:req.body.txtPosition
        }
        //console.log(posData.daysAvailable);
        insertdata.update({where:{id:posData.idno},update:{positionName:posData.dep} }, function(err,result){
            if(!err){
//                res.redirect('/addPos')
                    insertdata.all(function(err,data){
                        res.render("addPosition",{title:"in",useracc:req.session.name,userid:req.session.idno,user:data, datas:'',saved:2 })
                })
            }
            else{
                console.log(err)
                res.redirect('/addPos')
            }
        })
        }
        else{
            res.redirect('/');
        }
    });


    app.get("/deletePosition", function (req, res) {
        if(req.session.name!=null){
            var usercheck = require("../models/position")(db);
            var query = require('url').parse(req.url,true).query;
            var id=query.id;

            if(id!=''){

                db.client.query('DELETE FROM position WHERE id='+id, function(err, user){
                    res.redirect('/addPos');
                });
            }
        }
        else{
            res.redirect('/');
        }

    });
}