module.exports = function(app,db) {
    var insertdata = require("../models/notice")(db);

    app.get("/addNotice", function (req, res) {
        if(req.session.name!=null){
            insertdata.all(function(err,data){
                res.render("addNotice",{title:"in",useracc:req.session.name,userid:req.session.idno,user:data, datas:'',saved:0});
        })
        }
        else {
            res.redirect("/");
        }
    });

    app.post("/actNotice", function(req,res){
        if(req.session.name!=null){
        var posData = {
            noticeTitle: req.body.txtnoticeTitle,
            noticeType:req.body.txtnoticeType,
            notice: req.body.txtNotice
        }
        var today = new Date();
        var dd = today.getDate();
        var mm = today.getMonth()+1; //January is 0!

        var yyyy = today.getFullYear();
        if(dd<10){dd='0'+dd} if(mm<10){mm='0'+mm} today = mm+'/'+dd+'/'+yyyy;

        insertdata.create({
            title:posData.noticeTitle,
            type:posData.noticeType,
            notice:posData.notice,
            date: today }, function(err,result){
            // console.log('Successfully Saved');
            if(!err){
//                res.redirect('/addNotice')
                insertdata.all(function(err,data){
                    res.render("addNotice",{title:"in",useracc:req.session.name,userid:req.session.idno,user:data, datas:'',saved:1});
                })
            }
            else{
                console.log(err)
                res.redirect('/addNotice')
            }
        })
        }
        else{
            res.redirect('/');
        }
    });

    app.get("/editNot", function (req, res) {
        if(req.session.name!=null){
            var query = require('url').parse(req.url,true).query;
            var id=query.id;
            if(id!=''){
                insertdata.find(id,function(err,result){
            insertdata.all(function(err,data){
                res.render("addNotice",{title:"in",useracc:req.session.name,userid:req.session.idno,user:data, datas:result,saved:0});
            })
                })
        }
        else {
            res.redirect("/");
        }
        }
    });

    app.post("/editNotice", function(req,res){
        if(req.session.name!=null){
        var posData = {
            noticeTitle: req.body.txtnoticeTitle,
            noticeType:req.body.txtnoticeType,
            notice: req.body.txtNotice,
            idno:req.body.txtid
        }
        var today = new Date();
        var dd = today.getDate();
        var mm = today.getMonth()+1; //January is 0!

        var yyyy = today.getFullYear();
        if(dd<10){dd='0'+dd} if(mm<10){mm='0'+mm} today = mm+'/'+dd+'/'+yyyy;

        insertdata.update({where:{id:posData.idno},
            update:{
            title:posData.noticeTitle,
            type:posData.noticeType,
            notice:posData.notice,
            date: today }}, function(err,result){

            if(!err){
//                console.log('okay')
//                res.redirect('/addNotice')
                insertdata.all(function(err,data){
                    res.render("addNotice",{title:"in",useracc:req.session.name,userid:req.session.idno,user:data, datas:'',saved:2});
                })
            }
            else{
                console.log(err)
                res.redirect('/addNotice')
            }
        })
        }
        else{
            res.redirect('/');
        }
    });


    app.get("/deleteNotice", function (req, res) {
        if(req.session.name!=null){

            var query = require('url').parse(req.url,true).query;
            var id=query.id;

            if(id!=''){

                db.client.query('DELETE FROM notice WHERE id='+id, function(err, user){
                    res.redirect('/addNotice');
                });
            }
        }
        else{
            res.redirect('/');
        }

    });

    app.get("/viewNotice", function (req, res) {

        if(req.session.name!=null){

            var query = require('url').parse(req.url,true).query;
            var id=query.id;

            if(id!=''){

                db.client.query('DELETE FROM notice WHERE id='+id, function(err, user){
                    res.redirect('/addNotice');
                });
            }
        }
        else{
            res.redirect('/');
        }

    });

}
