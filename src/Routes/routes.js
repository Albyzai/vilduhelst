var express = require('express');
var router = express.Router();

var mongodb = require('mongodb').MongoClient;
var url = 'mongodb://localhost/vilduhelst';
var globalResults;


router
    .get('/', function (req, res) {

        mongodb.connect(url, function (err, db) {
            var collection = db.collection('dilemmas');
            collection.aggregate([{
                $sample: {
                    size: 1
                }
            }]).toArray(function (err, results) {
                globalResults = results[0];
                res.render('index', {
                    dilemma: results[0]
                });
                db.close();
            });
        });
    });

router
    .get('/about', function (req, res) {
        res.send('Welcome to about page');
    });


router
    .post('/', function (req, res) {
        var id = globalResults._id;
        mongodb.connect(url, function (err, db) {
            var collection = db.collection('dilemmas');

            if (req.body.buttoncolor === 'red') {
                collection.updateOne({
                    '_id': id
                }, {
                    $inc: {
                        red_dilemma_votes: +1
                    }
                });
            } else if (req.body.buttoncolor === 'blue') {
                collection.updateOne({
                    '_id': id
                }, {
                    $inc: {
                        blue_dilemma_votes: +1
                    }
                });
            }
            db.close();
        });
    });

module.exports = router;
