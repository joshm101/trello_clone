'use strict';

var validator = require('validator'),
  mongoose = require('mongoose'),
  Boards = mongoose.model('Boards');

/*
 * New board creation
 */
exports.createBoard = function (req, res) {
  console.log("req is: ", req.body);
  var board = new Boards(req.body);
  // board.owner =
  board.starred = false;
  console.log("req.user.username: ", req.user.username);
  board.owner = req.user.username;
  board.created = new Date();
  console.log("board.name is: ", board.name);

  board.save(function(err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      console.log("successfully saved board! ", board);
      res.boardSubmitted = board;
      return res.status(200).send(board);
    }
  });
};

/*
* Grab all boards for the currently
* logged in user
*
 */
exports.getBoards = function (req, res){
  console.log("req.user: ", req.user);
  console.log("res is: ", res);
  res.myResponse = "hello";
  var boardsFound = Boards.find( {owner: req.user.username}, function(error, boards){
    if (error) {
      console.log("error: ", error);
    } else {
        console.log("boards: ", boards);
        return res.status(200).send(boards);
    }
  });
};


/**
 * Render the boards page
 */
exports.renderBoards = function (req, res) {
  res.render('modules/boards/server/views/boards');
};
