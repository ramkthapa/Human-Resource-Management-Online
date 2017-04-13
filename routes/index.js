/**
 * Created by Shrestha on 12/2/13.
 */
module.exports = function(app, db) {

    app.get("/", function (req, res) {

        var noticeall = require("../models/notice")(db);
            noticeall.all(function(err, notice) {
            res.render("index",{title:'out', notices:notice });
            });
    });

    /*app.post("/authenticate", function(req, res){

        var postData = {

            username: req.body.txtUsername,
            password: req.body.txtPassword

        };

       // console.log(JSON.stringify(postData));

       // res.redirect("");
    });
*/

}


