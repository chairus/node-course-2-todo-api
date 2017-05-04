const mongoose = require("mongoose");
const validator = require("validator");
const jwt = require("jsonwebtoken");
const _ = require("lodash");

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

var User = mongoose.model("User", userSchema);

module.exports = { User };
