var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/players');
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log("Connected!");
    // we're connected!
  });
var playerSchema = new mongoose.Schema({
  name: String,
  url: String
})
module.exports.Player =  mongoose.model('Player', playerSchema);

var scoreSchema = new mongoose.Schema({
  name: String,
  score: Number
})
module.exports.Highscore = mongoose.model('HighScore', scoreSchema);