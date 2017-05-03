var mongoose = require("mongoose");

// Tell mongoose to use the built-in promise in javascript
mongoose.Promise = global.Promise;
mongoose.connect("mongodb://localhost:27017/TodoApp");
//mongoose.connect("mongodb://cyrus:Mfdtda-06@ds129651.mlab.com:29651/todos_app");

module.exports = { mongoose };