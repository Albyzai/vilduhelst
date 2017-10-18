var express = require('express');



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

var routes = function (Dilemma) {

    var dilemmaRouter = express.Router();

    dilemmaRouter
        .get('/clear', function (req, res) {
            res.clearCookie('visited');
            res.send('hej');
        });

    dilemmaRouter
        .get('/showall', function (req, res) {

            Dilemma.find(function (err, dilemmas) {
                if (err) {
                    console.log(err);
                } else {
                    res.render('dilemmaList', {
                        dilemmas: dilemmas
                    })
                }
            })
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

    dilemmaRouter.route('/:id')
        .get(function (req, res) {

            Dilemma.findById(req.params.id, function (err, dilemma) {
                if (err) {
                    console.log(err);
                } else {
                    res.render('index', {
                        dilemma: dilemma
                    })
                }
            });
        })

        .post(function (req, res) {

            if (req.body.buttoncolor === 'red') {
                console.log('red');
                Dilemma.findByIdAndUpdate(req.params.id, {
                    $inc: {
                        red_dilemma_votes: 1
                    }
                }, function (err, data) {
                    if (err) {
                        console.log(err);
                    } else {
                        console.log(data);
                    }
                });

            } else if (req.body.buttoncolor === 'blue') {

                Dilemma.findByIdAndUpdate(req.params.id, {
                    $inc: {
                        blue_dilemma_votes: 1
                    }
                }, function (err, data) {
                    if (err) {
                        console.log(err);
                    } else {
                        console.log(data);
                    }
                });


            }
            res.redirect('/' + req.params.id);
        });



    dilemmaRouter.route('/')
        .get(function (req, res) {
            res.send('hej');
        })
        .post(function (req, res) {
            res.send
        });



    return dilemmaRouter;

}








module.exports = routes;
