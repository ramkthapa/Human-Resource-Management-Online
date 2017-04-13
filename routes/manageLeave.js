module.exports = function(app,db) {

    var insertdata = require("../models/leave")(db);
    var empdata=require("../models/employee")(db);

    app.get("/addLeave", function (req, res) {

	if(req.session.name!=null){
       res.render("addLeave",{title:'emp', useracc:req.session.name, userid:req.session.idno});
	}
	else{
		res.redirect("/")
	}
    });

    app.post("/addLeave", function(req,res){
        if(req.session.name!=null){
        var posData = {
            Type:req.body.leaveType,
            startDate: req.body.startDate,
            endDate: req.body.endDate,
            desc:req.body.descript
        }
        //console.log(posData.daysAvailable);
        var def=0;
        insertdata.create({
            empid:req.session.idno,
            leaveType:posData.Type,
            leaveStart:posData.startDate,
            leaveEnd:posData.endDate,
            description:posData.desc,
            status:def,
            read:def}, function(err,result){
            // console.log('Successfully Saved');
            if(!err){
                res.redirect('/addLeave')
            }
            else{
                console.log(err)
                res.redirect('/addLeave')
            }
        })
        }
        else{
            res.redirect('/');
        }
        });

    app.get("/displayLeave", function (req, res) {

        if(req.session.name!=null){
            db.client.query('SELECT e.firstName AS firstName, e.middleName AS middleName,e.lastName AS lastName, l.* FROM employee e,empLeave l where l.status=0 AND l.empid=e.id ORDER by l.id DESC', function(err, user){
                    res.render("displayLeave",{title:'in', useracc:req.session.name, userid:req.session.idno,leave:user});
            });
        }
        else{
            res.redirect("/")
        }
    });

    app.get("/acceptLeave",function(req,res){
        if(req.session.name!=null){
        var query = require('url').parse(req.url,true).query;
        var idno=query.id;
        insertdata.update({where:{id:idno},update:{status:'1'}},function(erro,cbd){
            res.redirect("/displayLeave");
        })
        }
        else{
            res.redirect('/');
        }
    });

    app.get("/rejectLeave",function(req,res){
        if(req.session.name!=null){
        var query = require('url').parse(req.url,true).query;
        var idno=query.id;
        insertdata.update({where:{id:idno},update:{status:'2'}},function(erro,cbd){
            res.redirect("/displayLeave");
        })
        }
        else{
            res.redirect('/');
        }
    });

    app.get("/viewLeave", function (req, res) {

        if(req.session.name!=null){
            db.client.query("SELECT * FROM `empleave` WHERE empid='"+req.session.idno+"' ORDER BY id DESC", function(err, data){
                insertdata.update({where:{empid:req.session.idno},update:{read:'1'}},function(erro,cbd){});
                res.render("viewLeave",{title:'emp', useracc:req.session.name, userid:req.session.idno, leave:data});

        })
        }
        else{
            res.redirect("/")
        }
    });

    app.get("/viewLeavebyAdmin", function (req, res) {

        if(req.session.name!=null){
            db.client.query("SELECT e.*, l.* FROM `empleave` as l, `employee` as e WHERE l.empid=e.id ORDER BY l.id DESC", function(err, data){
                res.render("viewLeave",{title:'in', useracc:req.session.name, userid:req.session.idno, leave:data});

            })
        }
        else{
            res.redirect("/")
        }
    });



}