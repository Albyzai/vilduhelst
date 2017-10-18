var express = require('express');
var adminRouter = express.Router();


var router = function (Dilemma) {
    adminRouter.route('addDilemmas')
        .get(function (req, res) {
            res.send('inserting dilemmas');
        });

    return adminRouter;
}


module.exports = router;
