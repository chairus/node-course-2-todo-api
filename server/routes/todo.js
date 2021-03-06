const _ = require("lodash");
const { Todo } = require("../models/todo");
const { User } = require("../models/user");
const { ObjectID } = require("mongodb");
const middleware = require("../middleware/index");

var router = require("express").Router();

// Create - add a todo in the list
router.post("/todos", middleware.userAuthentication, (req, res) => {
    var body = {
        text: req.body.text,
        _creator: req.user._id
    }

    Todo.create(body).then((todo) => {
        res.send(todo);
    }, (err) => {
        res.status(400).send(err);
    });
});

// Index - show all todos
router.get("/todos", middleware.userAuthentication, (req, res) => {
    Todo.find({ _creator: req.user._id }).then((todos) => {
        var todoList = todos.filter((todo) => !todo.completed)
        res.send({todoList});
    }, (err) => {
        res.status(500).send(err);
    });
});

// Show - display a single todo
router.get("/todos/:id", middleware.userAuthentication, (req, res) => {
    var id = req.params.id;

    // Validate ID
    if (!ObjectID.isValid(id)) {
        res.status(404).send();
    }

    // Find the todo with the associated ID
    Todo.findOne({
        _id: id,
        _creator: req.user._id
    }).then((todo) => {
        if (!todo) {
            res.status(404).send();
        }
        res.send({todo});
    }).catch(e => {
        res.status(400).send();
    })
});

// Delete - remove a specific todo
router.delete("/todos/:id", middleware.userAuthentication, (req, res) => {
    var id = req.params.id;

    // Validate ID
    if (!ObjectID.isValid(id)) {
        res.status(404).send();
    }

    // Find the todo with the associated ID and remove it
    Todo.findOneAndRemove({
        _id: id,
        _creator: req.user._id
    }).then((todo) => {
        if (!todo) {
            res.status(404).send();
        }
        res.send({todo});
    }).catch(e => {
        res.status(400).send();
    })
});

// PATCH - update content of a todo
router.patch("/todos/:id", middleware.userAuthentication, (req, res) => {
    var id = req.params.id;
    var body = _.pick(req.body, ['text', 'completed']);

    // Validate ID
    if (!ObjectID.isValid(id)) {
        res.status(404).send();
    }

    // Update "completedAt" property if user has compeleted todo
    if (_.isBoolean(body.completed) && body.completed) {
        body.completedAt = (new Date()).getTime();
    } else {
        body.completed = false;
        body.completedAt = null;
    }

    // Find the todo with the associated ID and update it
    Todo.findOneAndUpdate({
        _id: id,
        _creator: req.user._id
    }, { $set: body }, { new: true }).then((todo) => {
        if (!todo) {
            res.status(404).send();
        }
        res.send({todo});
    }).catch(e => res.status(400).send());
});

module.exports = router;
