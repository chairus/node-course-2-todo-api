var mongoose = require("mongoose");

// Tell mongoose to use the built-in promise in javascript
mongoose.Promise = global.Promise;
mongoose.connect(process.env.MONGODB_URI);

module.exports = { mongoose };