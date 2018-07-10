const express = require('express');
const app = express();
const bodyparser = require('body-parser');
const path = require('path');
const axios = require('axios');
//logging middleware
app.use(function(req, res, next) {
  console.log(req.method, req.path);
  next();
});
app.use(express.static('client'));

app.listen(3000, () => console.log('Web server listening on localhost:3000 '));

// app.get('/', function());
//
app.post('/', function(req, res) {
  console.log('express post!')
  res.send('POST request to homepage');
});
