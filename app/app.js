var express = require('express');
var path = require('path');
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

module.exports = app;

app.listen(3000);
