var mongoose = require("mongoose");

// Tell mongoose to use the built-in promise in javascript
mongoose.Promise = global.Promise;
mongoose.connect("mongodb://localhost:27017/TodoApp");

module.exports = { mongoose };