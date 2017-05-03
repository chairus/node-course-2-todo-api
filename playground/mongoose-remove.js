const { ObjectID } = require("mongodb");
const { mongoose } = require("../server/db/mongoose");
const { Todo } = require("../server/models/todo");
const { User } = require("../server/models/user");

const id = "5909638fb70f867b3309e601";

/*Todo.remove({}).then((res) => {
    console.log(res);
});*/

Todo.findOneAndRemove(id).then((todo) => {
    console.log(todo);
});

/*Todo.findByIdAndRemove(id).then((todo) => {
    console.log(todo);
});*/