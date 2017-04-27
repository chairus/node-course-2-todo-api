//const MongoClient = require("mongodb").MongoClient;
const { MongoClient, ObjectID } = require("mongodb");

MongoClient.connect("mongodb://localhost:27017/TodoApp", (err, db) => {
    if (err) {
        return console.log("Can't connect to MongoDB server");
    }
    
    console.log("Connected to MongoDB server");
    
    /*db.collection("Todos").find({_id: new ObjectID("59016ecfe73275b21a3dba1f")}).toArray().then((docs) => {
        console.log("Todos");
        console.log(JSON.stringify(docs, undefined, 4));
        db.close();
    }, (err) => {
       console.log("Unable to fetch todos", err); 
    });*/
    
    /*db.collection("Todos").find().count().then((count) => {
        console.log(`Todos count: ${count}`);
        db.close();
    }).catch((err) => {
        console.log("Unable to fetch todos", err);
    });*/
    
    db.collection("Users").find({name: "Cyrus Villacampa"}).toArray().then((docs) => {
        console.log(JSON.stringify(docs, undefined, 4));
        return db.collection("Users").find().count();
    }).then((count) => {
        console.log(`Total number of users: ${count}`);
        db.close();
    }).catch((err) => {
        console.log("Unable to fetch user(s)");
        db.close();
    });
    
});