var express = require('express');
var path = require('path');
var fs = require('fs');
var alert = require('alert');
const { render } = require('ejs');
var app = express();
const PORT = process.env.PORT || 3030;


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
  var username = fs.readFileSync("current_username.txt");
  var userList = [];
  var book1 = false;
  var book2 = false;
  var book3 = false;
  var book4 = false;
  var book5 = false;
  var book6 = false;

  var data = fs.readFileSync("users.json", 'utf-8'); // Whole file as string
  data = data.substring(1, data.length-1); // remove opening and closing brackets of string
  var dataObjs = data.split(',\n'); // list of strings
  
  for (var i in dataObjs) {
    var obj = JSON.parse(dataObjs[i]);
    if (username == obj.user) {
      userList = obj.list;
    }
  }
  for (var book in userList) {
    if (userList[book] == 'dune') book1 = true;
    if (userList[book] == "flies") book2 = true;
    if (userList[book] == "grapes") book3 = true;
    if (userList[book] == "leaves") book4 = true;
    if (userList[book] == "mockingbird") book5 = true;
    if (userList[book] == "sun") book6 = true;
  }
  return res.render('readlist', {book1, book2, book3, book4, book5, book6});
  // res.render('readlist', )
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
      console.log(username + ' just logged in');
      res.render('home');
    }
  }
  if (!found) {
    var err = true;
    console.log("failed login: " + username + " " + password);
    return res.render('login', {err});
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
        flag = true;
        var err = true;
        console.log(username + " cannot be registered");
        return res.render('a', {err});
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
    console.log(username + " registered with password " + password)
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
        console.log(username + " added " + bookname + " to their list");
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



  app.post('/search', (req, res) => { // Search
    var books = ["dune", "lord of the flies", "the grapes of wrath", "leaves of grass","to kill a mockingbird","the sun and her flowers"]
    var show = [false, false, false, false, false, false]
    var query = req.body.Search;
    query = query.toLowerCase();

    for (var i in books) {
      if ((books[i]).includes(query))
        show[i] = true;
    }
    var book1 = show[0];
    var book2 = show[1];
    var book3 = show[2];
    var book4 = show[3];
    var book5 = show[4];
    var book6 = show[5];
    console.log(username + " searched for " + query);
    return res.render('searchresults', {book1, book2, book3, book4, book5, book6});
  })


module.exports = app;

// app.listen(3003);
app.listen(PORT, () => {
  console.log(`server started on port ${PORT}`);
});