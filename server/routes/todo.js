var router = require("express").Router();
var { Todo } = require("../models/todo");
var { User } = require("../models/user");

// Create - add a todo in the list
router.post("/todos", (req, res) => {
    Todo.create({
        text: req.body.text
    }).then((todo) => {
        res.send(todo);
    }, (err) => {
        res.status(400).send(err);
    });
});

// Index - show all todos
router.get("/todos", (req, res) => {
    Todo.find().then((todos) => {
        var todoList = todos.filter((todo) => !todo.completed)
        res.send({todoList});
    }, (err) => {
        res.status(500).send(err);
    });
});

module.exports = router;