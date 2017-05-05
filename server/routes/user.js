var router = require("express").Router();
const { User } = require("../models/user");
const _ = require("lodash");
const jwt = require("jsonwebtoken");
const middleware = require("../middleware/index");

router.post("/users", (req, res) => {
    var newUser = _.pick(req.body, ['email', 'password']);

    User.create(newUser).then((user) => {
        return user.generateAuthToken();
    }).then((data) => {
        res.header('x-auth', data.token).send(data.user);
    }).catch(err => res.status(400).send(err));
});

router.get("/users/me", middleware.userAuthentication, (req, res) => {
    res.send(req.user);
});

router.post("/users/login", (req, res) => {
    var body = _.pick(req.body, ['email', 'password']);

    User.findByCredentials(body.email, body.password).then((user) => {
        return user.generateAuthToken().then((data) => {
            res.header('x-auth', data.token).send(data.user);
        })
    }).catch(err => res.status(400).send());
});

router.delete("/users/me/token", middleware.userAuthentication, (req, res) => {
    req.user.removeToken(req.token).then(() => {
        res.status(200).send();
    }, () => {
        res.status(400).send();
    });

    /* ALTERNATIVE SOLUTION */
    // User.findByIdAndUpdate(req.user._id, { $pull: { tokens: {access:'auth', token:req.token} } }, { new: true }).then((user) => {
    //     res.send(user);
    // }).catch(err => res.status(500).send());
});

module.exports = router;
