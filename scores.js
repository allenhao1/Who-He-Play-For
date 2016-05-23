var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/scores');
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log("Connected!");
    // we're connected!
  });
var scoreSchema = new mongoose.Schema({
  name: String,
  score: Number
})
module.exports.Highscore = mongoose.model('HighScore', scoreSchema);