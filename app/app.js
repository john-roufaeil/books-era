var express = require('express');
var path = require('path');
var fs = require('fs');
var alert = require('alert');
var find = require('find');
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

// POST requests____________________________________________________
app.post('/login', (req, res) => { // Login
  var username = req.body.username;
  var password = req.body.password;
  var found = false;

  var data = fs.readFileSync("users.json", 'utf-8'); // Whole file as string
  data = data.substring(1, data.length-1); // remove opening and closing brackets of string
  var dataObjs = data.split(',\n'); // list of strings

  for (var i in dataObjs) {
    var obj = JSON.parse(dataObjs[i]);
    if (username == obj.user && password == obj.pass) {
      found = true;
      fs.writeFileSync("current_username.txt", username);
      res.render('home');
    }
  }
  if (!found) {
    alert("The username or password you entered is incorrect");
  }
})



app.post('/register', (req, res) => { // Registration
  var username = req.body.username;
  var password = req.body.password;
  var flag = false;

  var data = fs.readFileSync("users.json", 'utf-8'); // Whole file as string
  data = data.substring(1, data.length-1); // remove opening and closing brackets of string
  var dataObjs = data.split(',\n'); // list of strings

  if (data.length > 0) {
    for (var i in dataObjs) {
      var obj = JSON.parse(dataObjs[i]);
      if (username == obj.user) {
        alert('This user already exists');
        flag = true;
      }
    }
  }
  if (flag == false) {
    var newUser = {user: username, pass: password, list: []};
    var newUserString = JSON.stringify(newUser);
    if (data.length == 0) 
      fs.writeFileSync("users.json", '[' + newUserString + ']');
    else
      fs.writeFileSync("users.json", '[' + data + ',\n' + newUserString + ']');
    res.render('login');
  }
})



app.post('/add', (req, res) => { // Add Book to Read List
  var username = fs.readFileSync("current_username.txt");
  var bookname = req.body.bookname;

  var data = fs.readFileSync("users.json", 'utf-8'); // Whole file as string
  data = data.substring(1, data.length-1); // remove opening and closing brackets of string
  var dataObjs = data.split(',\n'); // list of strings
  
  fs.writeFileSync("users.json", "[");
  for (var i in dataObjs) {
    var obj = JSON.parse(dataObjs[i]);
    if (username == obj.user ) {
      if (!obj.list.includes(bookname)){
        obj.list.push(String(bookname));
      }
      else  {
        alert("You have already added this book to your Want to Read List.")
      }
    }
    if (i != dataObjs.length - 1)
      fs.appendFileSync("users.json", JSON.stringify(obj) + ",\n");
    else
      fs.appendFileSync("users.json", JSON.stringify(obj) + "\n");
  }
  fs.appendFileSync("users.json", "]");
})

function unique(name) {
  return name;
}

  app.post('/search', (req, res) => { // Search
  res.send("POST Request Called")
})


module.exports = app;

app.listen(3002);