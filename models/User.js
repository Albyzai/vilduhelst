var mongoose = require('mongoose'),
    URLSlugs = require('mongoose-url-slugs'),
    AutoIncrement = require('mongoose-sequence')(mongoose),
    Schema = mongoose.Schema;


var dilemmaSchema = new Schema({
    username: String,
    password: String,
    email: String
});


module.exports = mongoose.model('User', dilemmaSchema);
