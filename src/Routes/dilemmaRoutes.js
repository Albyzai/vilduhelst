var express = require('express');


var routes = function (Dilemma, session) {

    const dilemmaRouter = express.Router();



    //GET: Routes to the 'add dilemma' page
    //POST: Adds dilemma to DB with the fields from the <form>
    dilemmaRouter.route('/add')
        .get(function (req, res) {
            res.render('createDilemma')
        })
        .post(function (req, res) {
            const title = req.body.title;
            const dilemma_red = req.body.redDilemma;
            const dilemma_blue = req.body.blueDilemma;

            Dilemma.create({
                dilemma_title: title,
                red_dilemma: dilemma_red,
                blue_dilemma: dilemma_blue
            }, function (err, dilemma) {
                if (err) {
                    console.log('Add error: ' + err);
                }

                res.redirect('/add');
            })
        });


    //:GET Routes to the 'delete' page which consists of a list of dilemmas
    dilemmaRouter.route('/delete')
        .get(function (req, res) {
            Dilemma.find(function (err, dilemmas) {
                if (err) {
                    console.log('Delete error: ' + err);
                } else {
                    res.render('deleteDilemma', {
                        dilemmas: dilemmas
                    })
                }
            })
        })


    //DELETE: Route used by functions.js onclick to delete specified dilemma
    dilemmaRouter.route('/delete/:id')
        .delete(function (req, res) {
            const id = req.params.id
            const query = {
                _id: id
            }
            Dilemma.remove(query, function (err) {
                if (err) {
                    console.log('Delete error: ' + err);
                } else {
                    console.log(id + ' has been removed');
                    res.send('success')
                }
            })
        })


    //GET: Routes to the page of a specific dilemma
    //POST: Renders the result of the dilemma with client side .js
    dilemmaRouter.route(['/:id/:slug', '/:id*'])
        .get(function (req, res) {
            const _id = req.params.id;

            const query = {
                id: _id
            }

            Dilemma.findOne(query, function (err, dilemma) {
                if (err) {
                    console.log('Get error in /id/slug : ' + err);
                    res.redirect('/');
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
            const id = req.params.id;

            const query = {
                id: id
            };

            if (req.body.buttoncolor === 'red') {
                Dilemma.findOneAndUpdate(query, {
                    $inc: {
                        red_dilemma_votes: 1
                    }
                }, function (err, dilemma) {
                    if (err) {
                        console.log('Post error: ' + err);
                    } else {
                        let buttonJson = {
                            button: 'red'
                        };

                        res.render('index', {
                            dilemma: dilemma,
                            buttonclicked: JSON.stringify(buttonJson)
                        })
                    }
                });

            } else if (req.body.buttoncolor === 'blue') {

                Dilemma.findOneAndUpdate(query, {
                    $inc: {
                        blue_dilemma_votes: 1
                    }
                }, function (err, dilemma) {
                    if (err) {
                        console.log('Post error: ' + err);
                    } else {
                        let buttonJson = {
                            button: 'blue'
                        };

                        res.render('index', {
                            dilemma: dilemma,
                            buttonclicked: JSON.stringify(buttonJson)
                        })
                    }
                });
            }
        })




    //GET: Handles click of 'next' arrow key, by routing to a random (unvisited) dilemma
    dilemmaRouter.route('/next')
        .get(function (req, res) {

            Dilemma.count().exec(function (err, count) {
                if (err) {
                    console.log('Next get error: ' + err);
                }
                const random = Math.floor(Math.random() * count);

                Dilemma.findOne().skip(random).exec(function (err, dilemma) {
                    dilemmaID = dilemma._id;

                    res.redirect('/' + dilemma.id + '/' + dilemma.slug);

                })
            })

        })


    dilemmaRouter.route('/prev')
        .get(function (req, res) {
            res.redirect('back');
        });





    return dilemmaRouter;

}







module.exports = routes;
