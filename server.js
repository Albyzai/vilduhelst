//Sets up dev environment
var express = require('express'),
    mongoose = require('mongoose'),
    bodyParser = require('body-parser'),
    cookieParser = require('cookie-parser'),
    session = require('express-session'),
    passport = require('passport'),
    RedisStore = require('connect-redis')(session),
    port = process.env.PORT || 9999,
    app = express(),
    db;



//Database connection
mongoose.Promise = global.Promise;

if (process.env.ENV === 'Test') {
    db = mongoose.connect('mongodb://localhost/vilduhelst_test');
} else {
    db = mongoose.connect('mongodb://localhost/vilduhelst');
}




//Configuration - Middleware

app.use(express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(session({
    secret: 'vilduhelstSecret',
    store: new RedisStore({
        host: 'localhost',
        port: 6379
    }),
    expires: new Date(Date.now() + 30 * 86400 * 1000),
    maxAge: new Date(Date.now() + 30 * 86400 * 1000),
    saveUninitialized: false,
    resave: false
}));
require('./src/config/passport')(app);
app.set('view engine', 'ejs');
app.set('views', './src/views');




//Models
const Dilemma = require('./models/Dilemma.js');
const User = require('./models/User.js')



//Application routing
var routes = require('./src/routes/routes')(Dilemma);
var adminRouter = require('./src/routes/adminRoutes')(Dilemma);
var dilemmaRouter = require('./src/routes/dilemmaRoutes')(Dilemma, cookieParser);
var authRouter = require('./src/routes/authRoutes')(User);


app.use('/auth', authRouter);
app.use('/admin', adminRouter);
app.use('/', routes);
app.use('/', dilemmaRouter);



// redirect if nothing else sent a response
//function redirectUnmatched(req, res) {
//    res.redirect('/');
//}
//app.use(redirectUnmatched);


//Start server
app.listen(port, function () {
    console.log('Server is running on port ' + port);
});
