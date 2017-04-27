//const MongoClient = require("mongodb").MongoClient;
const { MongoClient, ObjectID } = require("mongodb");

MongoClient.connect("mongodb://localhost:27017/TodoApp", (err, db) => {
    if (err) {
        return console.log("Can't connect to MongoDB server");
    }
    
    console.log("Connected to MongoDB server");
    
    /* =========== deleteMany =========== */
    /*db.collection("Todos").deleteMany({text: "Eat lunch"}).then((result) => {
        console.log(result);
        db.close();
    }).catch((err) => {
        console.log(err);
        db.close();
    });*/
    
    /* =========== deleteOne =========== */
    /*db.collection("Todos").deleteOne({text: "Eat lunch"}).then((result) => {
        console.log(result.result);
        db.close();
    }).catch((err) => {
        console.log(err);
        db.close();
    });*/
    
    /* =========== findOneAndDelete =========== */
    /*db.collection("Todos").findOneAndDelete({completed: false}).then((result) => {
        console.log(result);
    }).catch((err) => {
        console.log(err);
    });*/
    
    
    /*db.collection("Users").deleteMany({name: "Naruto Uzumaki"}).then((result) => {
        console.log(result.result);
        return db.collection("Users").findOneAndDelete({_id: new ObjectID("590183fbe73275b21a3dbd07")});
    }).then((result) => {
        console.log(result.value);
        db.close();
    }).catch((err) => {
        console.log("Unable to delete file(s)", err);
        db.close();
    })*/
    
});