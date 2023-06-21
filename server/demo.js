var mysql = require('mysql');

var con = mysql.createConnection({
  host: "127.0.0.1",
  user: "root",
  password: "root",
  database:"five_db"
});

con.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
});

