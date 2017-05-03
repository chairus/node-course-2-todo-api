const router = require("express").Router();
const { Todo } = require("../models/todo");
const { User } = require("../models/user");
const { ObjectID } = require("mongodb");

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

router.get("/todos/:id", (req, res) => {
    var id = req.params.id;
    
    // Validate ID
    if (!ObjectID.isValid(id)) {
        res.status(404).send();
    }
    
    // Find the todo with the associated ID
    Todo.findById(id).then((todo) => {
        if (!todo) {
            res.status(404).send();
        }
        res.send({todo});
    }).catch(e => {
        res.status(400).send();
    })
});

module.exports = router;