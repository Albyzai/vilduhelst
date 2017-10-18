var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var dilemmaSchema = new Schema({
    red_dilemma: String,
    blue_dilemma: String,
    red_dilemma_votes: Number,
    blue_dilemma_votes: Number
});




module.exports = mongoose.model('Dilemma', dilemmaSchema);
