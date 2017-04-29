var { mongoose }    = require("./db/mongoose");
var { Todo }        = require("./models/todo");
var { User }        = require("./models/user");
var bodyParser      = require("body-parser");
var express         = require("express");
var todoRoutes      = require("./routes/todo"); // Exporting the todo routes

var app = express();

// Parses the body of the request from the client as JSON object
app.use(bodyParser.json());

// Setting express to use the todoRoutes
app.use(todoRoutes);

app.listen(3000, () => {
    console.log("Server has started. Listening on PORT 3000");
});
