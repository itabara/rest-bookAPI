/**
 * Created by iulian on 24/07/16.
 */
var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');

var db;

if (process.env.ENV == 'Test'){
    db = mongoose.connect('mongodb://localhost/book-api-test');
} else {
    db = mongoose.connect('mongodb://localhost/book-api');
}

var Book = require('./models/bookModel');

var app = new express();
var port = process.env.PORT || 3000;
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

var bookRouter = require('./routes/bookRoutes')(Book);
var authorRouter = require('./routes/authorRoutes')();

app.use('/api/books', bookRouter);
app.use('/api/author', authorRouter);

app.get('/', function(req, res){
   res.send('Welcome to my API!');
});

app.listen(port, function(){
    console.log("Running on PORT: " + port);
})

// for supertest to test
module.exports = app;