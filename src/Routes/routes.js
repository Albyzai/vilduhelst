var express = require('express');


var router = function (Dilemma) {

    var defrouter = express.Router();
    var dilemmaID;

    defrouter.route('/destroysession')
        .get(function (req, res) {
            var sess = req.session.visitedDilemmas;
            req.session.destroy();
            res.send('Session data is destroyed. This is the destroyed session: ' + sess);
        })

    defrouter.route('/login')
        .get(function (req, res) {
            res.render('signin');
        })

    defrouter.route('/')
        .get(function (req, res) {

            var cookieString = '';


            if (req.cookies.allDilemmas === undefined) {
                console.log('IF kaldt');
                var cursor = Dilemma.find({}).cursor();

                cursor.on('data', function (doc) {
                    let stringToConcat = doc.id + ',';
                    cookieString = cookieString.concat(stringToConcat);
                    // Called once for every document
                });

                cursor.on('close', function (error) {
                    if (error) {
                        console.log('close error: ' + error);
                    }

                    if (req.cookies.dilemmas !== undefined) {
                        var dilemmas = req.cookies.dilemmas;
                        var dilemmaArray = dilemmas.split(",").filter(function (el) {
                            return el.length != 0
                        });;

                        var rand = Math.floor(Math.random() * dilemmaArray.length);
                        Dilemma.findOne({
                            id: {
                                $in: dilemmaArray
                            }
                        }).skip(rand).exec(function (err, dilemma) {
                            if (err) {
                                console.log('Error finding unvisited dilemma: ' + err);
                            }
                            res.render('index', {
                                dilemma: dilemma
                            })
                        })

                    } else {

                        Dilemma.count().exec(function (err, count) {

                            if (err) {
                                console.log('Get error on root: ' + err);
                            }

                            var random = Math.floor(Math.random() * count);

                            Dilemma.findOne().skip(random).exec(function (err, dilemma) {
                                if (err) {
                                    console.log('Error finding random dilemma: ' + err);
                                }

                                dilemmaID = dilemma._id;

                                res.cookie('allDilemmas', cookieString);
                                res.render('index', {
                                    dilemma: dilemma

                                })
                            })
                        })
                    }
                })

            } else {
                console.log('else kaldt');
                if (req.cookies.dilemmas !== undefined) {
                    var dilemmas = req.cookies.dilemmas;
                    var dilemmaArray = dilemmas.split(",").filter(function (el) {
                        return el.length != 0
                    });;

                    var rand = Math.floor(Math.random() * dilemmaArray.length);
                    Dilemma.findOne({
                        id: {
                            $in: dilemmaArray
                        }
                    }).skip(rand).exec(function (err, dilemma) {
                        if (err) {
                            console.log('Error finding unvisited dilemma: ' + err);
                        }
                        res.render('index', {
                            dilemma: dilemma
                        })
                    })

                } else {

                    Dilemma.count().exec(function (err, count) {

                        if (err) {
                            console.log('Get error on root: ' + err);
                        }

                        var random = Math.floor(Math.random() * count);

                        Dilemma.findOne().skip(random).exec(function (err, dilemma) {
                            if (err) {
                                console.log('Error finding random dilemma: ' + err);
                            }

                            dilemmaID = dilemma._id;

                            res.render('index', {
                                dilemma: dilemma

                            })
                        })
                    })
                }
            }

        })
        .post(function (req, res) { //Is there a better way to update votes than using post request?
            const sess = req.session;

            if (req.body.buttoncolor === 'red') {
                Dilemma.findByIdAndUpdate(dilemmaID, {
                    $inc: {
                        red_dilemma_votes: 1
                    }
                }, function (err, dilemma) {
                    if (err) {
                        console.log('Error updating votes on dilemma in root: ' + err);
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

                Dilemma.findByIdAndUpdate(dilemmaID, {
                    $inc: {
                        blue_dilemma_votes: 1
                    }
                }, function (err, dilemma) {
                    if (err) {
                        console.log('Error updating votes on dilemma in root: ' + err);
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
        });




    return defrouter;

}


module.exports = router;
