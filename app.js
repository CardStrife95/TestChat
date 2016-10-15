
/**
 * Module dependencies.
 */
require('./db');

var express = require('express.io')
  , routes = require('./routes')
  , http = require('http')
  , path = require('path');


var engine = require('ejs-locals');
var passport = require('passport');
var expressSession = require('express-session');

//Les routes
var todoapi = require('./routes/todoAPI.js');
var news = require('./routes/news.js');
var article = require('./routes/article.js');
var message = require('./routes/message.js');
var user = require('./routes/user.js');

//var expressLayouts = require('express-ejs-layouts');
var app = express();

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');
app.engine('ejs',engine);
app.set('view engine', 'ejs');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.cookieParser());
app.use(express.bodyParser());
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
//app.use(routes.current_user);
//app.use(expressLayouts);
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));
app.use(expressSession({secret:'mysecretkey'}));
app.use(passport.initialize());
app.use(passport.session());
app.http().io();

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

app.get('/', routes.index);
app.post('/create',routes.create);
app.get('/destroy/:id',routes.destroy);
app.get('/edit/:id',routes.edit);
app.post('/update/:id',routes.update);


app.get('/news',news.index);
app.post('/news',news.insert);

app.get('/news/:id',news.read);
app.post('/news/:id/comments',news.addComment);
app.get('/news/:id/comments/:idcomment',news.delete_comment);

app.get('/article',article.index);

app.post('/message',message.add);

app.get('/user/:id',user.getUser);

app.get('/api/todo',todoapi.list);
app.get('/api/news',todoapi.listNews);
app.get('/api/messages',todoapi.listMessages);
app.get('/api/users',todoapi.listUser);


http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
