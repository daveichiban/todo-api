const {MongoClient, ObjectID} = require("mongodb");

MongoClient.connect("mongodb://localhost:27017/TodoApp", (err, client) => {
    if (err) {
       return console.log("Unable to connect to database server");
    }
    console.log("Connected to MongoDB server");
    const db = client.db("TodoApp");

db.collection("Todos").find().count().then((docs) => {
    console.log("To Do");
    console.log(JSON.stringify(docs, undefined,2));
}, (err) => {
    console.log("Unable to fetch To Do list", err)
});

client.close();

});