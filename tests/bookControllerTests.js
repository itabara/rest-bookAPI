/**
 * Created by iulian on 24/07/16.
 */
var should = require('should');
var sinon = require('sinon');

describe('Book Controller Tests', function(){
    describe('Post', function(){
        it('should not allow an empty title on post', function(){
            // this is not the model Book class but just a mock class
            // with 'save' method doing nothing
            var Book = function(book){this.save = function(){}};

            // mock the req object
            var req = {
                body: {
                    author: 'Test data'
                }
            };

            var res = {
                status: sinon.spy(),
                send: sinon.spy()
            };

            var bookController = require('../controllers/bookController')(Book);

            bookController.post(req, res);

            // check the status of the call and execution args
            res.status.calledWith(400).should.equal(true, 'Bad Status ' + res.status.args[0][0]);
            res.send.calledWith('Title is required').should.equal(true);
        });
    })
});