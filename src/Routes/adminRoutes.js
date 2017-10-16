var express = require('express');
var adminRouter = express.Router();


var router = function () {
    adminRouter
        .get('/addDilemmas', function (req, res) {
            res.send('inserting dilemmas');
        });

    return adminRouter;
}


module.exports = router;
