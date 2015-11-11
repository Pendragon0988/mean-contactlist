var express = require('express');
var app     = express();
var mongojs = require('mongojs');
var db      = mongojs('contactlist', ['contactlist']);


/*
 * Step 1: Test the server connection
 *
 */
// app.get('/', function(req, res){
//   res.send("Hello Creative from the server!");
// });

app.use(express.static(__dirname + "/public"));

app.get('/contactlist', function(req, res){
  console.log("I received a GET request");

  db.contactlist.find(function(err, docs){
    console.log(docs);
    res.json(docs);
  });

});

app.listen(9000);
console.log("Server running on port over 9000...");
