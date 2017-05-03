var mongoose = require("mongoose");

// Tell mongoose to use the built-in promise in javascript
mongoose.Promise = global.Promise;
//mongoose.connect("mongodb://localhost:27017/TodoApp");
mongoose.connect("mongodb://cyrus06:SEngineer-06@ds129651.mlab.com:29651/todos_app" || "mongodb://localhost:27017/TodoApp");

module.exports = { mongoose };