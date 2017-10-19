var express = require('express');


var routes = function (Dilemma, session) {

    var dilemmaRouter = express.Router();

    dilemmaRouter
        .get('/clear', function (req, res) {
            res.clearCookie('visited');
            res.send('Cookies cleared');
        });

    dilemmaRouter.route('/add')
        .get(function (req, res) {

            res.render('createDilemma')

        })
        .post(function (req, res) {
            let title = req.body.title;
            let dilemma_red = req.body.redDilemma;
            let dilemma_blue = req.body.blueDilemma;

            Dilemma.create({
                dilemma_title: title,
                red_dilemma: dilemma_red,
                blue_dilemma: dilemma_blue
            }, function (err, dilemma) {
                if (err) {
                    console.log(err);
                }

                res.redirect('/add');
            })
        });

    dilemmaRouter.route('/delete')
        .get(function (req, res) {

            Dilemma.find(function (err, dilemmas) {
                if (err) {
                    console.log(err);
                } else {
                    console.log(req.session.dilemmaID);
                    res.render('deleteDilemma', {
                        dilemmas: dilemmas
                    })
                }
            })
        })


    dilemmaRouter.route('/:id/:slug')
        .get(function (req, res) {
            const _id = req.params.id;
            const _slug = req.params.slug;

            let query = {
                id: _id,
                slug: _slug
            }

            Dilemma.findOne(query, function (err, dilemma) {
                if (err) {
                    console.log(err);
                } else {
                    if (dilemma === null) {
                        res.redirect('/');
                    } else {
                        res.render('index', {
                            dilemma: dilemma
                        })
                    }


                }
            })
        })

        .post(function (req, res) {

            if (req.body.buttoncolor === 'red') {
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
            //res.redirect('/dilemmas/' + req.params.id);
        })
        .delete(function (req, res) {
            let query = {
                _id: req.params.id
            };
            var dilemmaID = req.body.dilemmaId;

            Dilemma.remove(query, function (err) {
                if (err) {
                    console.log(err);
                }
                res.send('Succes');



            });
        });;


    dilemmaRouter.route('/next')
        .get(function (req, res) {

            Dilemma.count().exec(function (err, count) {
                var random = Math.floor(Math.random() * count);

                Dilemma.findOne().skip(random).exec(function (err, dilemma) {
                    dilemmaID = dilemma._id;

                    res.redirect('/' + dilemma.id + '/' + dilemma.slug);

                })
            })

        })






    return dilemmaRouter;

}







module.exports = routes;
