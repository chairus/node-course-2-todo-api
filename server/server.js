require("./config/config"); // Setting environment variables

var { mongoose }    = require("./db/mongoose");
var { Todo }        = require("./models/todo");
var { User }        = require("./models/user");
var bodyParser      = require("body-parser");
var express         = require("express");
var todoRoutes      = require("./routes/todo"); // Export the todo routes
var userRoutes      = require("./routes/user"); // Export the user routes

var app = express();
const port = process.env.PORT;

// Parses the body of the request from the client as JSON object
app.use(bodyParser.json());

// Setting express to use the todoRoutes and userRoutes
app.use(todoRoutes);
app.use(userRoutes);

app.listen(port, () => {
    console.log(`Server has started. Listening on PORT ${port}`);
});

module.exports = { app };