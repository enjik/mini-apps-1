const express = require('express');
const app = express();
const connection = require('./index.js');
const bodyparser = require('body-parser');

//logging middleware
app.use(function(req, res, next) {
  console.log(req.method, res.path);
  next();
})

app.use(express.static('public'));
app.use(express.static('node_modules'));

//app.get();

var sql = 'SELECT * FROM checkout'
var err = null;
connection.query(sql, function(err, results) {
  if (err) {
    console.log('could not connect!');
  }
  console.log(results);
});

app.listen(3000, console.log('listening to server localhost:3000'));
