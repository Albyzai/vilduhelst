var mongoose = require('mongoose');
var dilemmaModel = mongoose.Schema({
    red_dilemma: {type: String},
    blue_dilemma: {type: String},
    red_dilemma_votes: {type: Number},
    blue_dilemma_votes: {type: Number}

});





module.exports = mongoose.model('Dilemma', dilemmaModel);