/**
 * Created by iulian on 24/07/16.
 */
var bookController = function(Book){

    /**
    * @api {post} /book Create a new Book
    * @apiVersion 1.0.0
    * @apiName PostBook
    * @apiGroup Book
    *
    * @apiExample Example usage:
    *     endpoint: http://localhost:3000/api/book
    *
    *     body:
    *     {
    *       "title": "RestAPI with Node.js",
    *       "author": "IT"
    *     }
    *
    * @apiSuccess {String} _id The new Book _id.
    * @apiParam {String} title The book title.
    */
    var post = function(req, res){
        var book = new Book(req.body);

        if (!req.body.title){
            res.status(400);
            res.send('Title is required');
        } else {
            book.save();
            res.status(201);
            res.send(book);
        }
    };

    /**
    * @api {get} /book/:book_id Retrieve a book by _id
    * @apiVersion 1.0.0
    * @apiName GetBook
    * @apiGroup Book
    *
    *
    * @apiExample Example usage:
    *     endpoint: http://localhost:3000/api/book/:book_id
    *
    * @apiSuccess {String} _id The new Book _id.
    * @apiParam {String} title The book title.
    */
    var get = function(req, res){
        var query = {};
        if (req.query.genre){
            query.genre = req.query.genre;
        }
        Book.find(query, function(err, books){
            if (err){
                res.status(500).send(err);
            } else {
                var returnBooks = [];
                books.forEach(function(element, index, array){
                    var newBook = element.toJSON(); // copy the element
                    newBook.links = {};
                    newBook.links.self = 'http://' + req.headers.host + '/api/books/' + newBook._id;
                    returnBooks.push(newBook);
                });
                res.json(returnBooks);
            }
        });
    };

    // revealing model pattern
    return {
        post: post,
        get: get
    };
}

module.exports = bookController;
