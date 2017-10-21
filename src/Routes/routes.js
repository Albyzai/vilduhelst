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

    defrouter.route('/')
        .get(function (req, res) {

            const sess = req.session;
            console.log('Sesssion is: ' + sess.visitedDilemmas);


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
                    if (!sess.visitedDilemmas) {
                        sess.visitedDilemmas = [dilemma.id];
                        res.render('index', {
                            dilemma: dilemma

                        })
                    } else {
                        let visitedDilemmas = sess.visitedDilemmas;
                        if (visitedDilemmas.includes(dilemma.id)) {
                            console.log('Page has already been visited, redirecting...');
                            res.redirect('/');
                        } else {
                            let newID = [dilemma.id];
                            res.cookie('visitedDilemmas', visitedDilemmas.concat(newID));
                            console.log(req.cookies.visitedDilemmas);
                            sess.visitedDilemmas = visitedDilemmas.concat(newID);
                            console.log('Page has NOT been visited, adding ' + newID + 'to session...');
                            res.render('index', {
                                dilemma: dilemma

                            })
                        }
                    }


                })
            })

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
