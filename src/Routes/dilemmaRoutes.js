var express = require('express');
var dilemmaRouter = express.Router();
var mongodb = require('mongodb').MongoClient;
var ObjectID = require('mongodb').ObjectID;
var url = 'mongodb://localhost/vilduhelst';

var dilemmas = [
    {
        red_dilemma: 'pik',
        blue_dilemma: 'fisse',
        red_dilemma_votes: 0,
        blue_dilemma_votes: 0
    },
    {
        red_dilemma: 'Kristine',
        blue_dilemma: 'Jonas',
        red_dilemma_votes: 0,
        blue_dilemma_votes: 0
    },
    {
        red_dilemma: 'Daniel',
        blue_dilemma: 'Svans',
        red_dilemma_votes: 0,
        blue_dilemma_votes: 0
    },
    {
        red_dilemma: 'Itamar',
        blue_dilemma: 'Coke',
        red_dilemma_votes: 0,
        blue_dilemma_votes: 0
    }
];





dilemmaRouter
    .get('/showall', function (req, res) {

        mongodb.connect(url, function (err, db) {
            var collection = db.collection('dilemmas');
            collection.find({}).toArray(function (err, results) {
                res.render('dilemmaList', {
                    dilemmas: results
                });
                db.close();
            });
        });
    });


dilemmaRouter
    .get('/addDilemmas', function (req, res) {
        var url = 'mongodb://localhost/vilduhelst';
        mongodb.connect(url, function (err, db) {
            var collection = db.collection('dilemmas');
            collection.insert(dilemmas, function (err, results) {
                res.send(results);
                db.close();
            });
        });

    });

dilemmaRouter
    .get('/:id', function (req, res) {
        var id = req.params.id;
        mongodb.connect(url, function (err, db) {
            var collection = db.collection('dilemmas');
            collection.find({
                '_id': new ObjectID(id)
            }).toArray(function (err, results) {
                res.render('index', {
                    dilemma: results[0]
                });
                db.close();
            });
        });
    });

dilemmaRouter
    .post('/:id', function (req, res) {
        var id = req.params.id;
        mongodb.connect(url, function (err, db) {
            var collection = db.collection('dilemmas');

            if (req.body.buttoncolor === 'red') {
                collection.updateOne({
                    '_id': new ObjectID(id)
                }, {
                    $inc: {
                        red_dilemma_votes: +1
                    }
                });
            } else if (req.body.buttoncolor === 'blue') {
                collection.updateOne({
                    '_id': new ObjectID(id)
                }, {
                    $inc: {
                        blue_dilemma_votes: +1
                    }
                });
            }
            db.close();
        });
    });

dilemmaRouter
    .get('/', function (req, res) {
        console.log('dilemma called');
        res.send('hej');
    });





module.exports = dilemmaRouter;
