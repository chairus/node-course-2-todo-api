var router = require("express").Router();
const { User } = require("../models/user");
const _ = require("lodash");
const jwt = require("jsonwebtoken");

router.post("/users", (req, res) => {
    var newUser = _.pick(req.body, ['email', 'password']);
    
    User.create(newUser).then((user) => {
        return user.generateAuthToken();
    }).then((data) => {
        res.header('x-auth', data.token).send(data.user);
    }).catch(err => res.status(400).send(err));
});

module.exports = router;