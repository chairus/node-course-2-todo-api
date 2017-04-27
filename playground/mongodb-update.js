//const MongoClient = require("mongodb").MongoClient;
const { MongoClient, ObjectID } = require("mongodb");

MongoClient.connect("mongodb://localhost:27017/TodoApp", (err, db) => {
    if (err) {
        return console.log("Can't connect to MongoDB server");
    }
    
    console.log("Connected to MongoDB server");
    
    /*db.collection("Todos").findOneAndUpdate({
        _id: new ObjectID("59017fe6e73275b21a3dbc23")
    }, {
        $set: { completed: false }
    }, { 
        returnOriginal: false 
    }).then((result) => {
        console.log(result);
        db.close();
    }).catch((err) => {
        console.log("Unable to update file");
        db.close();
    });*/
    
    
    /* Using a callback function */
    /*db.collection("Users").findOneAndUpdate({
        _id: new ObjectID("59018909e73275b21a3dbdb8")
    }, {
        $set: {
            name: "Jiraiya",
            location: "Konohagakure/Rurouni"
        },
        $inc: {
            age: 0
        }
    }, {
        returnOriginal: false
    }, (err, result) => {
        if (err) {
            return console.log("Unable to update user");
        }
        console.log(result);
    });*/
    
    /* Using a promise */
    db.collection("Users").findOneAndUpdate({
        _id: new ObjectID("59018909e73275b21a3dbdb8")
    }, {
        $set: {
            name: "Jiraiya",
            location: "Konohagakure/Rurouni"
        },
        $inc: {
            age: 0
        }
    }, {
        returnOriginal: false
    }).then((result) => {
        console.log(result);
    });
    
});