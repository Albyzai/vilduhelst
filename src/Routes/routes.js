var express = require('express');


var router = function (Dilemma) {

    var defrouter = express.Router();
    var dilemmaID;

    defrouter.route('/')
        .get(function (req, res) {

            Dilemma.count().exec(function (err, count) {
                var random = Math.floor(Math.random() * count);

                Dilemma.findOne().skip(random).exec(function (err, dilemma) {
                    dilemmaID = dilemma._id;
                    res.render('index', {
                        dilemma: dilemma
                    })
                })
            })

        })
        .post(function (req, res) {
            if (req.body.buttoncolor === 'red') {
                Dilemma.findByIdAndUpdate(dilemmaID, {
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

                Dilemma.findByIdAndUpdate(dilemmaID, {
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
