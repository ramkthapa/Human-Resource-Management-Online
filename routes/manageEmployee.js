module.exports = function(app,db) {

var insertaccess = require("../models/login")(db);
var dep = require("../models/department")(db);
var pos = require("../models/position")(db);
var usercheck = require("../models/employee")(db);
var path = require('path');
var fs = require('fs');


    app.get("/addEmployee", function (req, res) {
        if(req.session.name!=null){
            dep.all(function(err,depName){
                pos.all(function(erro,posName){
                    db.client.query('SELECT id from employee ORDER BY id DESC', function(err, idno){
                        var id=idno[0]['id']+1;
                res.render("addEmployee",{title:"in",useracc:req.session.name,userid:req.session.idno,data:'',edit:'',department:depName,position:posName,idno:id, saved:0})
            })
            })
            });
        }
        else {
            res.redirect("/");
        }
    });

    app.get("/editEmployee", function (req, res) {
        if(req.session.name!=null){
            var query = require('url').parse(req.url,true).query;
            var id=query.id;
            //console.log(id)
            if(id!=''){
//                res.render("addEmployee",{title:"in",user:req.session.name,data:results})
                usercheck.find(id,function(err,result){
                    dep.all(function(err,depName){
                        pos.all(function(erro,posName){
                    //console.log(result['firstName'])
                    res.render("addEmployee",{title:"in",useracc:req.session.name,userid:req.session.idno,data:result,edit:'1',department:depName,position:posName})

                })
                    })
                })
            }
        }
        else{
            res.redirect('/');
        }

    });

    app.post("/editEmp", function(req,res){
        if(req.session.name!=null){
        var posData = {
            firstName: req.body.txtFirst,
            middleName:req.body.txtMiddle,
            lastName: req.body.txtLast,
            empId: req.body.txtEmpId,
            dep:req.body.department,
            pos:req.body.position,
            country:req.body.country,
            homeTown:req.body.txtHomeTown,
            contact:req.body.txtContact,
            email:req.body.txtEmail,
            gender: req.body.sex,
            maritalStatus:req.body.maritalStatus,
            dob: req.body.date,
            photo: req.files.inpFile.path

        }

        fs.exists('c:/hrm/public/photo/'+posData.empId+'.jpg', function(exists) {          //check for the existing image
            if (exists) {
//                        console.log('Image found');
                fs.unlink('c:/hrm/public/photo/'+posData.empId+'.jpg', function (err) {});  //delete the existing image
                tempPath = req.files.inpFile.path,
                    targetPath = path.resolve('c:/hrm/public/photo');
                targetPath = targetPath+'\\'+posData.empId+'.jpg';

                console.log("target path: "+ targetPath);
                fs.rename(tempPath, targetPath, function(err) {
                    console.log("Upload completed!");
                });
            }
            else {
            }
        });

        usercheck.update({where:{id:posData.empId},update:{
            firstName:posData.firstName,
            middleName:posData.middleName,
            lastName:posData.lastName,
            department:posData.dep,
            position:posData.pos,
            country:posData.country,
            homeTown:posData.homeTown,
            contactNo:posData.contact,
            email:posData.email,
            gender:posData.gender,
            maritalStatus:posData.maritalStatus,
            dateofBirth:posData.dob }},function(err,cb){
            if(!err){

                res.redirect('/viewEmployee')

            }
            else{
                console.log(err)
                res.redirect('/viewEmployee')
            }

        })
        insertaccess.update({where:{id:posData.empId},update:{Name:posData.firstName}},function(erro,cbd){
        })
        }
        else{
            res.redirect('/');
        }
    })

    app.get("/viewDetails", function (req, res) {
        if(req.session.name!=null){
            var query = require('url').parse(req.url,true).query;
            var id=query.id;
            //console.log(id)
            if(id!=''){

                usercheck.find(id,function(err,result){
                    dep.all(function(err,depName){
                        pos.all(function(erro,posName){
                            //console.log(result['firstName'])
                            res.render("addEmployee",{title:"in",useracc:req.session.name,userid:req.session.idno,data:result,edit:'0',department:depName,position:posName})
                        })
                    })
                })
            }
        }
        else{
            res.redirect('/');
        }

    });


    app.get("/viewProfile", function (req, res) {
        if(req.session.name!=null){

            var id = req.session.idno;

                usercheck.find(id,function(err,result){
                    dep.all(function(err,depName){
                        pos.all(function(erro,posName){
                            //console.log(result['firstName'])
                            res.render("addEmployee",{title:"emp",useracc:req.session.name,userid:req.session.idno,data:result,edit:'0',department:depName,position:posName})
                        })
                    })
                })
            }
        else{
            res.redirect('/');
        }

    });



    app.get("/viewEmployee", function (req, res) {
        if(req.session.name!=null){
            usercheck.all(function(err, results) {
                pos.all(function(erro,posName){
                    res.render("viewEmployee",{title:"in", useracc:req.session.name,userid:req.session.idno, user:results,data:posName})
                })
            })

        }
        else {

            res.redirect("/");
        }


    });

//    app.get('/saveEmployee',function(req,res){
//        if(req.session.name!=null){
//            //res.render("popupMessage",{title:"in"});
//            dep.all(function(err,depName){
//                pos.all(function(erro,posName){
//                    res.render('addEmployee',{title:'in',useracc:req.session.name,userid:req.session.idno, data:'',department:depName,position:posName})
//                })
//            })
//        }
//        else {
//            res.redirect("/");
//        }
//    });

    app.post("/saveEmp", function(req,res){
        if(req.session.name!=null){
        var tempPath="";
        var targetPath="";

        var posData = {
            firstName: req.body.txtFirst,
            middleName:req.body.txtMiddle,
            lastName: req.body.txtLast,
            empId: req.body.txtEmpId,
            dep:req.body.department,
            pos:req.body.position,
            country:req.body.country,
            homeTown:req.body.txtHomeTown,
            contact:req.body.txtContact,
            email:req.body.txtEmail,
            gender: req.body.sex,
            maritalStatus:req.body.maritalStatus,
            dob: req.body.date,
            photo: req.files.inpFile.path
        }

        usercheck.create({
            id:posData.empId,
            firstName:posData.firstName,
            middleName:posData.middleName,
            lastName:posData.lastName,
            department:posData.dep,
            position:posData.pos,
            country:posData.country,
            homeTown:posData.homeTown,
            contactNo:posData.contact,
            email:posData.email,
            gender:posData.gender,
            maritalStatus:posData.maritalStatus,
            dateofBirth:posData.dob }, function(err,result){
            // console.log('Successfully Saved');
            if(!err){
                tempPath = req.files.inpFile.path,
                 targetPath = path.resolve('c:/hrm/public/photo');
                targetPath = targetPath+'\\'+posData.empId+'.jpg';

                console.log("target path: "+ targetPath);
                fs.rename(tempPath, targetPath, function(err) {
                    console.log("Upload completed!");
                });

             //   res.redirect('/viewEmployee')
                dep.all(function(err,depName){
                    pos.all(function(erro,posName){
                        db.client.query('SELECT id from employee ORDER BY id DESC', function(err, idno){
                            var id=idno[0]['id']+1;
                            res.render("addEmployee",{title:"in",useracc:req.session.name,userid:req.session.idno,data:'',edit:'',department:depName,position:posName,idno:id, saved:1})
                        })
                    })
                });
            }
            else{
                console.log(err)
                res.redirect('/viewEmployee')
            }
        })

        function randomString() {
            var chars = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXTZabcdefghiklmnopqrstuvwxyz";
            var string_length = 8;
            var randomstring = '';
            for (var i=0; i<string_length; i++) {
                var rnum = Math.floor(Math.random() * chars.length);
                randomstring += chars.substring(rnum,rnum+1);
            }
            //document.randform.randomfield.value = randomstring;
            return randomstring;
        }

        var acc=0;
        insertaccess.create({
            id:posData.empId,
            Name:posData.firstName,
            password:randomString(),
            access:acc  }, function(err,result){
            // console.log('Successfully Saved');
            if(!err){
            }
            else{
                console.log(err)
            }
        })
        }
        else{
            res.redirect('/');
        }

    });

    app.get("/deleteEmployee", function (req, res) {
        if(req.session.name!=null){
            var query = require('url').parse(req.url,true).query;
            var id=query.id;
            //console.log(id)
            if(id!=''){
//                res.render("addEmployee",{title:"in",user:req.session.name,data:results})
                db.client.query('DELETE FROM employee WHERE id='+id, function(err, user){
                });
                db.client.query('DELETE FROM person WHERE id='+id, function(err, user){
                });

                res.redirect('/viewEmployee');
            }
        }
        else{
            res.redirect('/viewEmployee');
        }

    });

    /*app.post('/ajax/test', function (req, res, next){

        res.send('<h1>Hello world</h1>');
    }); */

}
