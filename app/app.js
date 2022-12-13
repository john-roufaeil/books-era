var express = require('express');
var path = require('path');
var fs = require('fs');
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

// GET requests
app.get('/registration', function(req,res){
  res.render('registration')
});
app.get('/login', function(req,res){
  res.render('login')
});
app.get('/', function(req,res){
  res.render('login')
});
app.get('/home', function(req,res){
  res.render('home')
});
app.get('/searchresults', function(req,res){
  res.render('searchresults')
});
app.get('/novel', function(req,res){
  res.render('novel')
});
app.get('/fiction', function(req,res){
  res.render('fiction')
});
app.get('/poetry', function(req,res){
  res.render('poetry')
});
app.get('/readlist', function(req,res){
  res.render('readlist')
});
app.get('/dune', function(req,res){
  res.render('dune')
});
app.get('/flies', function(req,res){
  res.render('flies')
});
app.get('/grapes', function(req,res){
  res.render('grapes')
});
app.get('/leaves', function(req,res){
  res.render('leaves')
});
app.get('/mockingbird', function(req,res){
  res.render('mockingbird')
});
app.get('/sun', function(req,res){
  res.render('sun')
});

// POST requests
app.post('/login', (req, res) => { // Login
  var username = req.body.username;
  var password = req.body.password;
  var found = false;
  // res.send("POST Request Called")
  var data = fs.readFileSync("users.json", 'utf-8'); // Whole file as string
  data = data.substring(1, data.length-1); // remove opening and closing brackets of string
  var dataObjs = data.split(',\n'); // list of strings

  for (var i in dataObjs) {
    var obj = JSON.parse(dataObjs[i]);
    if (username == obj.user && password == obj.pass) {
      found = true;
      res.render('home');
    }
  }
  if (!found) {
    console.log("The username or password you entered is incorrect");
  }
})

app.post('/register', (req, res) => { // Registration
  var username = req.body.username;
  var password = req.body.password;
  var flag = false;

  var data = fs.readFileSync("users.json", 'utf-8'); // Whole file as string
  data = data.substring(1, data.length-1); // remove opening and closing brackets of string
  var dataObjs = data.split(',\n'); // list of strings

  for (var i in dataObjs) {
    var obj = JSON.parse(dataObjs[i]);
    if (username == obj.user) {
      console.log('This user already exists');
      flag = true;
    }
  }
  if (flag == false) {
    var newUser = {user: username, pass: password};
    var newUserString = JSON.stringify(newUser);
    fs.writeFileSync("users.json", '[' + data + ',\n' + newUserString + ']');
    res.render('login');
  }
})

  app.post('/search', (req, res) => { // Search
  res.send("POST Request Called")
})


module.exports = app;

app.listen(3001);