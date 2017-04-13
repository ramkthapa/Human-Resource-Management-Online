module.exports = function(app,db) {

    var insertdata = require("../models/department")(db);
    app.get("/addDep", function (req, res) {
        if(req.session.name!=null){
            insertdata.all(function(err,data){
            res.render("addDepartment",{title:'in', useracc:req.session.name, userid:req.session.idno, user:data, datas:'',saved:0});
            })
            }
        else{
            res.redirect("/")
        }
    });

    app.post("/addDepartment", function(req,res){
       if(req.session.name!=null){
        var posData = {
            dep:req.body.txtDepartment
        }
        //console.log(posData.daysAvailable);
        insertdata.create({
            departmentName:posData.dep }, function(err,result){
            if(!err){
//                res.redirect('/addDep')
                insertdata.all(function(err,data){
                    res.render("addDepartment",{title:'in', useracc:req.session.name, userid:req.session.idno, user:data, datas:'',saved:1});
                })
            }
            else{
                console.log(err)
                res.redirect('/addDep')
            }
        })
       }
        else{
           res.redirect('/');
       }
    });


    app.get("/editDep", function (req, res) {
        if(req.session.name!=null){
            var usercheck = require("../models/department")(db);
            var query = require('url').parse(req.url,true).query;

            var id=query.id;
            if(id!=''){
                usercheck.find(id,function(err,result){
                    insertdata.all(function(err,data){
                            res.render("addDepartment",{title:"in",useracc:req.session.name,userid:req.session.idno,user:data, datas:result,saved:0})
                    })
                    })
            }
        }
        else{
            res.redirect('/');
        }

    });

    app.post("/editDepartment", function(req,res){
        if(req.session.name!=null){
        var posData = {
            idno:req.body.txtid,
            dep:req.body.txtDepartment
        }
        //console.log(posData.daysAvailable);
        insertdata.update({where:{id:posData.idno},update:{departmentName:posData.dep} }, function(err,result){
            if(!err){
//                res.redirect('/addDep')
                insertdata.all(function(err,data){
                    res.render("addDepartment",{title:'in', useracc:req.session.name, userid:req.session.idno, user:data, datas:'',saved:2});
                })
            }
            else{
                res.redirect('/addDep')

            }
        })
        }
        else{
            res.redirct('/');
        }
    });


    app.get("/deleteDepartment", function (req, res) {
        if(req.session.name!=null){
            var usercheck = require("../models/employee")(db);
            var query = require('url').parse(req.url,true).query;
            var id=query.id;

            if(id!=''){

                db.client.query('DELETE FROM department WHERE id='+id, function(err, user){
                    res.redirect('/addDep');
                });
            }
        }
        else{
            res.redirect('/');
        }

    });




}