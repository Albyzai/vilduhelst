var express = require('express');


var router = function (Dilemma) {

    var defrouter = express.Router();

    defrouter.route('/')
        .get(function (req, res) {


            Dilemma.count().exec(function (err, count) {
                var random = Math.floor(Math.random() * count);

                Dilemma.findOne().skip(random).exec(function (err, dilemma) {
                    res.render('index', {
                        dilemma: dilemma
                    })
                })
            })

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
        });




    return defrouter;

}


module.exports = router;
