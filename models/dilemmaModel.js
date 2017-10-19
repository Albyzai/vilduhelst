var mongoose = require('mongoose'),
    URLSlugs = require('mongoose-url-slugs'),
    AutoIncrement = require('mongoose-sequence')(mongoose),
    Schema = mongoose.Schema;


var dilemmaSchema = new Schema({
    dilemma_title: String,
    red_dilemma: String,
    blue_dilemma: String,
    red_dilemma_votes: {
        type: Number,
        default: 0
    },
    blue_dilemma_votes: {
        type: Number,
        default: 0
    }
});



//dilemmaSchema.plugin(AutoIncrement);
dilemmaSchema.plugin(AutoIncrement, {
    inc_field: 'id'
});
dilemmaSchema.plugin(URLSlugs('dilemma_title'));

module.exports = mongoose.model('Dilemma', dilemmaSchema);
