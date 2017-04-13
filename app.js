
var express = require('express');
var http = require('http');
var path = require('path');
var mysql=require('mysql');

var app = express();
app.engine('ejs', require('ejs-locals'));


var Schema = require('jugglingdb').Schema;
var db = new Schema('mysql', {
    database: 'node',
    username: 'root'
});


// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.set('view options', {layout: 'views/layout.ejs'});
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(express.cookieParser());
app.use(express.session({secret: '1234567890QWERTY'}));
app.use(app.router);
app.use(require('stylus').middleware(__dirname + '/public'));
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
    app.use(express.errorHandler());
}


require('./routes/index')(app, db);
require('./routes/manageEmployeeLogin')(app,db);
require('./routes/manageEmployee')(app,db);
require('./routes/manageNotice')(app,db);
require('./routes/password')(app,db);
require('./routes/manageLeave')(app,db);
require('./routes/message')(app,db);
require('./routes/manageDepartment')(app,db);
require('./routes/position')(app,db);
require('./routes/managePerformance')(app,db);


http.createServer(app).listen(app.get('port'), function(){
    console.log('Express server listening on port ' + app.get('port'));
});
