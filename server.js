//Sets up dev environment
var express = require('express'),
    bodyParser = require('body-parser');

var app = express();

var port = process.env.PORT || 9999;



//Configuration
app.use(express.static('public'));
app.use(bodyParser.urlencoded({
    extended: true
}));
app.set('view engine', 'ejs');
app.set('views', './src/views');


//Application routing
var routes = require('./src/routes/routes');
var adminRouter = require('./src/routes/adminRoutes');
var dilemmaRouter = require('./src/routes/dilemmaRoutes');

app.use('/', routes);
app.use('/dilemmas', dilemmaRouter);
app.use('/admin', adminRouter);



//Start server
app.listen(port, function () {
    console.log('Server is running on port ' + port);
});


//var Dilemma = require('./models/dilemmaModel');
//
//dilemmaRouter.route('/Dilemmas')
//    .get(function (req, res) {
//
//        Dilemma.find(function (err, dilemmas) {
//            if (err) {
//                res.status(500).send(err);
//            } else {
//                res.json(dilemmas);
//            }
//
//        });
//    });
//
//dilemmaRouter.route('/Dilemmas/:dilemmaID')
//    .get(function (req, res) {
//
//        var query = Dilemma.findOne({
//            '_id': ':dilemmaID'
//        });
//
//        query.exec(function (err, dilemma) {
//            req.dilemma = dilemma;
//            console.log(req.dilemma);
//        });



// Dilemma.findById(req.params.dilemmaID, function(err,dilemma){
//     if(err)
//         res.status(500).send(err);
//     else
//         res.json(dilemma)

// })
//});
