var router = require("express").Router();
const { User } = require("../models/user");
const _ = require("lodash");

router.post("/users", (req, res) => {
    var newUser = _.pick(req.body, ['email', 'password']);
    
    User.create(newUser).then((user) => {
        res.send(user);
    }).catch(err => res.status(400).send(err));
});

module.exports = router;