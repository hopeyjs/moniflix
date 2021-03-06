var createError 		= require('http-errors');
    express 			= require('express');
    app 				= express();
	router 				= express.Router();
    path 				= require('path');
    cookieParser 		= require('cookie-parser');
    logger 				= require('morgan');
    bodyParser 			= require('body-parser');
    nodemailer 			= require('nodemailer');
    mongoose 			= require('mongoose');
    passport			= require('passport');
    request             = require('request');
    _                   = require('lodash');
    LocalStrategy		= require('passport-local');
    User 				= require('./models/user');
    Staff       		= require('./models/staff');
    Card                = require('./models/cards');
    moment              = require('moment');
                          moment().format();
    

mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
mongoose.set('useNewUrlParser', true);
app.use(bodyParser.urlencoded({ extended: true }))
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));



//ROUTES
var indexRouter 		= require('./routes/index');
var usersRouter 		= require('./routes/users');
var authRouter 			= require('./routes/auth');
var adminRouter 		= require('./routes/admin');
var depositRouter 		= require('./routes/deposit');
var withdrawalRouter 	= require('./routes/withdrawal');
var transfersRouter 	= require('./routes/transfers');
var cardRouter          = require('./routes/card')

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(indexRouter);
app.use(usersRouter);
app.use(authRouter);
app.use(adminRouter);
app.use(depositRouter);
app.use(withdrawalRouter);
app.use(transfersRouter);
app.use(cardRouter);

//Setting Up Database
mongoose.connect('mongodb://localhost/moniflix-app', {useUnifiedTopology: true, useNewUrlParser: true});
// mongoose.connect(process.env.MONGODB_URI);



var port = 3000
app.listen(process.env.PORT || port, function(){
    console.log("server Started On Port " + port)
})


module.exports = app;
