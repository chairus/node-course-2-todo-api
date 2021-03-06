const mongoose = require("mongoose");
const validator = require("validator");
const jwt = require("jsonwebtoken");
const _ = require("lodash");
const bcrypt = require("bcryptjs");

var userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        minlength: 1,
        trim: true,
        unique: true,
        validate: {
            validator: validator.isEmail,
            message: "{VALUE} is not a valid email"
        }
    },
    password: {
        type: String,
        required: true,
        minlength: 6
    },
    tokens: [
        {
            access: {
                type: String,
                required: true
            },
            token: {
                type: String,
                required: true
            }
        }
    ]
});

userSchema.methods.toJSON = function() {
    var user = this;
    var userObject = user.toObject();

    return _.pick(userObject, ['_id', 'email']);
};

userSchema.methods.generateAuthToken = function () {
    var user = this;
    var access = 'auth';
    var token = jwt.sign({ _id: user._id.toHexString(), access }, 'I am BATMAN').toString();

    user.tokens.push({ access, token });

    return user.save().then(() => {
        return { user, token };
    });
};

userSchema.methods.removeToken = function (token) {
    var user = this;

    return user.update({ $pull: { tokens: { token } } });
};

userSchema.statics.findByToken = function (token) {
    var User = this;
    var decoded;

    try {
        decoded = jwt.verify(token, 'I am BATMAN');
    } catch (e) {
        // return new Promise(function(resolve, reject) {
        //     reject();
        // });
        return Promise.reject();
    }

    return User.findOne({
        '_id': decoded._id,
        'tokens.token': token,
        'tokens.access': decoded.access//'auth'
    });
};

userSchema.statics.findByCredentials = function(email, password) {
    var User = this;

    return User.findOne({ email }).then((user) => {
        if (!user) {
            return Promise.reject();
        }

        return new Promise((resolve, reject) => {
            bcrypt.compare(password, user.password, (err, result) => {
                if (!result) {
                    reject();
                }

                resolve(user);
            })
        });
    });
};

userSchema.pre('save', function(next) {
    var user = this;

    if (user.isModified('password')) {
        bcrypt.genSalt(10, (err, salt) => { // generate a salt
            bcrypt.hash(user.password, salt, (err, hash) => {   // hash the user's password using the generated salt
                user.password = hash;   // replace the plain text password with the hashed password
                next();
            })
        })
    } else {
        next();
    }
});

var User = mongoose.model("User", userSchema);

module.exports = { User };
