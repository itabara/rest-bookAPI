/**
 * Created by iulian on 24/07/16.
 */

var express = require('express');
var Book = require('../models/bookModel');

var bookController = require('../controllers/bookController')(Book);

var router = function(Book){

    var bookRouter = express.Router();

    bookRouter.route('/')
        .post(bookController.post)
        .get(bookController.get);

    bookRouter.use('/:bookId', function(req, res, next){
        Book.findById(req.params.bookId, function(err, book){
            if (err){
                res.status(500).send(err);
            } else {
                if (book){
                    req.book = book;
                    next();
                } else {
                    res.status(404).send('no book found');
                }
            }
        });
    });

    bookRouter.route('/:bookId')
        .get(function(req, res){
            // call the middleware
            var returnBook = req.book.toJSON();
            returnBook.links = {};
            var newLink = 'http://' + req.headers.host +
                '/api/books/?genre=' + returnBook.genre;
            returnBook.links.FilterByGenre = newLink.replace(' ', '%20');
            res.json(returnBook);
        })
        .put(function(req, res){
                req.book.title = req.body.title;
                req.book.auth = req.body.author;
                req.book.genre = req.body.genre;
                req.book.read = req.body.read;
                req.book.save(function(err){
                    if (err) {
                        res.status(500).send(err);
                    } else {
                        res.json(req.book);
                    }
                });
        })
        .patch(function(req, res){

            // skip _id so we'll delete it
            if (req.body._id)
                delete req.body._id;

            // retrieve each key from json

            for(var p in req.body){
                req.book[p] = req.body[p];
            }
            req.book.save(function(err){
                if (err) {
                    res.status(500).send(err);
                } else {
                    res.json(req.book);
                }
            });
        })
        .delete(function(req, res){
            req.book.remove(function(err){
                if (err) {
                    res.status(500).send(err);
                } else {
                    res.status(204).send('Removed');
                }
            });
        });
    return bookRouter;
};

// export as a function for easy inject
module.exports = router;