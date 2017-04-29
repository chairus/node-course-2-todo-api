var router = require("express").Router();
var { Todo } = require("../models/todo");
var { User } = require("../models/user");

router.post("/todos", (req, res) => {
    Todo.create({
        text: req.body.text
    }).then((todo) => {
        res.send(todo);
    }, (err) => {
        res.status(400).send(err);
    });
});

module.exports = router;