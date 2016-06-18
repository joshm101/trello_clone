'use strict';

/**
 * Module dependencies
 */

var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

var BoardsSchema = new Schema({
  name: {
    type: String
  },
  starred: {
    type: Boolean
  },
  owner: {
    type: String
  },
  created: {
    type: Date
  }
});

mongoose.model('Boards', BoardsSchema);
