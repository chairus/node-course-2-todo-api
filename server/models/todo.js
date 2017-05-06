var mongoose = require("mongoose");

var todoSchema = new mongoose.Schema({
    text: {
        type: String,
        required: true,
        minlength: 1,    // Set the minimum length of the string to be atleast 1
        trim: true      // Removes the leading and trailing whitespaces
    },
    completed: {
        type: Boolean,
        default: false
    },
    completedAt: {
        type: Number,
        default: null
    },
    _creator: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    }
});

var Todo = mongoose.model("Todo", todoSchema);

module.exports = { Todo };
