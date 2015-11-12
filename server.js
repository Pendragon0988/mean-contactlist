var express    = require('express'),
    app        = express(),
    mongojs    = require('mongojs'),
    db         = mongojs('contactlist', ['contactlist']),
    bodyParser = require('body-parser');


app.use(express.static(__dirname + "/public"));
app.use(bodyParser.json());

app.get('/contactlist', function(req, res){
  console.log("I received a GET request");
  /*person1 = {
    name: 'Tom',
    email: 'tom@email.com',
    number: '(111)111-1111'
  },
    person2 = {
    name: 'Tracy',
    email: 'tracy@email.com',
    number: '(222)222-222'
  },
    person3 = {
    name: 'Tucker',
    email: 'tucker@email.com',
    number: '(333)333-333'
  }

  var contactlist = [person1, person2, person3];
  res.json(contactlist);*/

  db.contactlist.find(function(err, docs){
    console.log(docs);
    res.json(docs);
  });
});

app.post('/contactlist',function(req,res){
  db.contactlist.insert({name: req.body.name, email: req.body.email, number: req.body.number},function(err, doc){
    res.json(doc);
  });
});

app.delete('/contactlist/:id', function(req, res){
  var id = req.params.id;
  console.log(id);
  db.contactlist.remove({_id: mongojs.ObjectId(id)}, function(err, doc){
    res.json(doc);
  });
});

app.get('/contactlist/:id', function(req, res){
  var id = req.params.id;
  console.log(id);
  db.contactlist.findOne({_id: mongojs.ObjectId(id)}, function(err, doc){
    res.json(doc);
  });
});

app.put('/contactlist/:id', function(req, res){
  var id = req.params.id;
  console.log(req.body.name);
  db.contactlist.findAndModify({
    query: {_id: mongojs.ObjectId(id)},
    update: {$set: {name: req.body.name, email: req.body.email, number: req.body.number}},
    new: true }, function(err, doc) {
      res.json(doc);
  });
});

app.listen(9000);
console.log("Server is listening to port over 9000...");
