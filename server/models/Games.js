let mongoose = require('mongoose');

// create a model class
let GamesModel = mongoose.Schema({
    Name:String,
    Platform:String,
    Year:Number,
    Description:String,
    Price:String
},
{
    collection:"Games"
});
module.exports = mongoose.model('Games',GamesModel);
