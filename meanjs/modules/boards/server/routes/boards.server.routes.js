'use strict';

module.exports = function (app) {
  var boards = require('../controllers/boards.server.controller');

  // API for board creation, deletion, update, etc.
  app.route('/api/boards/create').post(boards.createBoard);
  app.route('/api/boards/get_boards').get(boards.getBoards);
};
