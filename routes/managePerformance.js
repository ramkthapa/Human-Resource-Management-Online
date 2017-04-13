module.exports = function(app,db) {

    var dep=require("../models/department")(db);
    var per=require("../models/performance") (db);
    var emp=require("../models/employee") (db);
    var pos=require("../models/position") (db);

    app.get("/addPerformance", function (req, res) {
        if(req.session.name!=null){
            dep.all(function(err,depName){

                emp.all(function(erro,empName){
                    res.render("addPerformance",{title:"in",useracc:req.session.name,userid:req.session.idno, data:'',department:depName, employee:empName,saved:0})

                })
            })
        }

        else {
            res.redirect("/");
        }
    });

    app.post("/savePerformance", function(req,res){
        if(req.session.name!=null){
        var posData = {
            per_id: req.body.employee_test,
            per_name: req.body.project,
            per_begin: req.body.project_begin,
            per_end: req.body.project_end,
            per_rat:req.body.rating

        }
        console.log(posData.per_id)

        per.create({
            empId:posData.per_id,
            project_name:posData.per_name,
            project_begin:posData.per_begin,
            project_end:posData.per_end,
            rating:posData.per_rat

          }, function(err,result){

            if(!err){
//                res.redirect('/addPerformance')
                dep.all(function(err,depName){
                    emp.all(function(erro,empName){
                        res.render("addPerformance",{title:"in",useracc:req.session.name,userid:req.session.idno, data:'',department:depName, employee:empName,saved:1})

                    })
                })
            }
            else{
                console.log(err)
                res.redirect('/addPerformance')
            }
        })
        }
        else{
            res.redirect('/');
        }
    });

   app.get("/viewPerformance", function (req, res) {
            if(req.session.name!=null){

              db.client.query('SELECT p.*, e.firstName AS fname, e.middleName AS mname, e.lastName AS lname, e.email AS mail,d.departmentName AS dname, o.positionName AS pname FROM performance p, POSITION o, department d, employee e WHERE p.empId=e.id AND e.department=d.id AND e.position=o.id ORDER BY p.id DESC',function(err,user){
                  res.render("viewPerformance",{title:'in', useracc:req.session.name, userid:req.session.idno,data:user});
              });

            }
            else {

                res.redirect("/");
            }


        });

    app.get("/viewPerformanceDetails", function (req, res) {
        if(req.session.name!=null){

            var query = require('url').parse(req.url,true).query;
            var viewId=query.id;

            if(viewId!=''){
                db.client.query('SELECT p.*, e.firstName AS fname, e.middleName AS mname, e.lastName AS lname, e.email AS mail,d.departmentName as dname , o.positionName AS pname FROM performance p, POSITION o, department d, employee e WHERE p.id='+viewId+' AND p.empId=e.id AND e.department=d.id AND e.position=o.id ORDER BY p.id DESC',function(err,user){
                    console.log(user);
                    res.render("addPerformance",{title:'in', useracc:req.session.name, userid:req.session.idno, data:user, edit:'0'});

                });

            }
        }
        else{
            res.redirect('/');
        }

    });

    app.get("/editPerformance", function (req, res) {
        if(req.session.name!=null){

            var query = require('url').parse(req.url,true).query;
            var editId=query.id;

            if(editId!=''){
                db.client.query('SELECT p.*,e.id AS eid,e.department AS emp_de_Id, e.firstName AS fname, e.middleName AS mname, e.lastName AS lname, e.email AS mail,d.departmentName AS dname,d.id AS dId, o.positionName AS pname FROM performance p, POSITION o, department d, employee e WHERE p.id='+editId+' AND p.empId=e.id AND e.department=d.id AND e.position=o.id ORDER BY p.id DESC',function(err,user){
                    dep.all(function(erros,alldep){
                    res.render("addPerformance",{title:'in', useracc:req.session.name, userid:req.session.idno,data:user,depname:alldep,edit:'1',sender:0});
                    })
                });

            }
        }
        else{
            res.redirect('/');
        }

    });

    app.post("/edit_appraisal", function(req,res){
        if(req.session.name!=null){
        var posData = {
            perform_id:req.body.per_id,
            project_name:req.body.project,
            project_start: req.body.project_begin,
            project_end: req.body.project_end,
            rating:req.body.rating

        }

        console.log(posData);

        per.update({where:{id:posData.perform_id},update:{
            project_name:posData.project_name,
            project_begin:posData.project_start,
            project_end:posData.project_end,
            rating:posData.rating
        }},function(err,cb){
            if(!err){
//                res.redirect('/viewPerformance')
                dep.all(function(err,depName){
                    emp.all(function(erro,empName){
                        res.render("addPerformance",{title:"in",useracc:req.session.name,userid:req.session.idno, data:'',department:depName, employee:empName,saved:2})

                    })
                })
            }
            else{
                console.log(err)
                res.redirect('/viewPerformance')
            }

        })
        }
        else{
            res.redirect('/');
        }

    })



    app.get("/deletePerformance", function (req, res) {
        if(req.session.name!=null){
            var query = require('url').parse(req.url,true).query;
            var delId=query.id;

            if(delId!=''){

                db.client.query('DELETE FROM performance WHERE id='+delId, function(err, user){
                });
              res.redirect('/viewPerformance');
            }
        }
        else{
            res.redirect('/viePerformance');
        }

    });

    app.get('/ajax/performance', function (req, res){

        // input value from search
        var val = req.query.search;
        console.log(val);
        dep.all(function(err,depName){
        db.client.query('SELECT * FROM employee WHERE department='+val, function(err, user){

            res.render("dropdown",{empl:user})
        });
        })

    });


}