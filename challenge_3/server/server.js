const express = require('express');
const app = express();
const connection = require('./index.js');
const bodyparser = require('body-parser');
const path = require('path');

//logging middleware
app.use(function(req, res, next) {
  console.log(req.method, res.path);
  next();
})
app.use(bodyparser.urlencoded({
  extended: true
}));
app.use(bodyparser.json());
app.use(express.static(path.join(__dirname, '../public')));
app.use(express.static('node_modules'));

app.post('/', function(req, res) {
  console.log(req.body.result);
//  var fields = ['firstName', 'lastName', 'email', 'password', 'line1', 'city', 'state', 'zip', 'phone', 'creditCard', 'expiryMonth', 'expiryYear', 'cvv', 'billingZip'];
  var map = req.body.result.map(field => '"' + field + '"');
  map = map.join(', ');
  console.log('map:' + map);

  var sql = 'INSERT INTO checkout (firstName, lastName, email, password, line1, city, state, zip, phone, creditCard, expiryMonth, expiryYear, cvv, billingZip) VALUES (' + map + ');';
  connection.query(sql, function (err, results) {
    if (err) {
      console.log('error with database: ' + err);
    }
    console.log('inserted into results!' + results);
  })
  res.send(req.body.result);
});
//app.get();

// var sql = 'SELECT * FROM checkout'
// var err = null;
// connection.query(sql, function(err, results) {
//   if (err) {
//     console.log('could not connect!');
//   }
//   console.log(results);
// });


app.listen(3000, () => console.log('listening to server localhost:3000'));
