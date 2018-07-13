var mysql = require('mysql');

var connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "users"
});

connection.connect(function(err) {
  if (err) throw err;
  console.log('connected to mysql database!')
  //var sql = 'SELECT * FROM checkout';
  // connection.query(sql, function(err, results) {
  //   if (err) {
  //     console.log('could not connect!');
  //   }
  //   console.log(results);
  // });
});

module.exports=connection;
//
// //comment out later
// connection.end();
