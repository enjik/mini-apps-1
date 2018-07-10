const express = require('express');
const app = express();
const bodyparser = require('body-parser');
const path = require('path');
const axios = require('axios');

// app.use(function(req, res, next) {
//  res.header("Access-Control-Allow-Origin", "*");
//  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
//  next();
// });

app.use(function(req, res, next) {
  console.log(req.method, req.path);
  next();
});
app.use(bodyparser.urlencoded({
  extended: true
}));
app.use(express.static('client'));
app.use(express.static('node_modules'));


// app.get('/', function());
//
app.post('/', function(req, res) {
  
  res.send('POST request to homepage');
});

app.listen(3000, () => console.log('Web server listening on localhost:3000 '));
