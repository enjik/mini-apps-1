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

//parse JSON obj into csv format
var rows = [];
var flatten = function(obj) {
    var row = [];
    for (var key in obj) {
        if (key === 'children') {
            rows.push(row.join(','));
            for (var i = 0; i < obj.children.length; i++) {
            flatten(obj.children[i]);
            }
        } else {
           row.push(obj[key]);
        }
    }
}

app.use(function(req, res, next) {
  console.log(req.method, req.path);
  next();
});
app.use(bodyparser.urlencoded({
  extended: true
}));
app.use(bodyparser.json());
app.use(express.static('client'));
app.use(express.static('node_modules'));

app.post('/', function(req, res) {
  console.log(req.body.result);
  var form = JSON.parse(req.body.result);
  var csv = '';

  for (var key in form) {
      if (key !== 'children') {
       csv += `${key},`;
      }
  }
  csv = csv.slice(0, csv.length - 1);
  csv += '<br>';
  flatten(form);
  csv += rows.join('<br>');
  rows = [];
  //console.log('csvObj:' + csvObj);
  res.send(csv);
});

app.listen(3000, () => console.log('Web server listening on localhost:3000 '));
