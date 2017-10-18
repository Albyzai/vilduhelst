//Sets up dev environment
var express = require('express'),
    mongoose = require('mongoose'),
    bodyParser = require('body-parser'),
    session = require('express-session'),
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




//Configuration
app.use(express.static('public'));
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());
app.use(session({
    secret: "vilduhelstSecret",
    expires: new Date(Date.now() + 30 * 86400 * 1000),
    maxAge: new Date(Date.now() + 30 * 86400 * 1000),
    saveUninitialized: true,
    resave: true
}))
app.set('view engine', 'ejs');
app.set('views', './src/views');



//Models
var Dilemma = require('./models/dilemmaModel.js');



//Application routing
var routes = require('./src/routes/routes')(Dilemma);
var adminRouter = require('./src/routes/adminRoutes')(Dilemma);
var dilemmaRouter = require('./src/routes/dilemmaRoutes')(Dilemma);

app.use('/', routes);
app.use('/dilemmas', dilemmaRouter);
app.use('/admin', adminRouter);




//Start server
app.listen(port, function () {
    console.log('Server is running on port ' + port);
});
