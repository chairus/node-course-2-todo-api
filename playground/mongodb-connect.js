//const MongoClient = require("mongodb").MongoClient;
const { MongoClient, ObjectID } = require("mongodb");


/* ES6 destructuring - A way to pull out properties of an object or array and store it in a variable */
/*var user = {name: "Cyrus", age: 27};    // Declare an object
var { name } = user;    // Pull out the "name" property from the user object
console.log(name);*/

MongoClient.connect("mongodb://localhost:27017/TodoApp", (err, db) => {
    if (err) {
        return console.log("Can't connect to MongoDB server");
    }
    
    console.log("Connected to MongoDB server");
    
    /*db.collection("Todos").insertOne({
        text: "Something to do",
        completed: false
    }, (err, result) => {
        if (err) {
            return console.log("Unable to insert todo", err);
        }
        
        console.log(JSON.stringify(result.ops, undefined, 4));
    });*/
    
    /*db.collection("Users").insertOne({
        name: "Konohamaru Sarutobi",
        age: 21,
        location: "Konohagakure"
    }, (err, data) => {
        if (err) {
            return console.log("Unable to insert user", err);
        }
        
        console.log(JSON.stringify(data.ops, undefined, 4));
        console.log(data.ops[0]._id.getTimestamp());
    });*/
    
    db.close();
});