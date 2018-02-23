const MongoClient = require("mongodb").MongoClient;

MongoClient.connect("mongodb://localhost:27017/TodoApp", (err, client) => {
    if (err) {
       return console.log("Unable to connect to database server");
    }
    console.log("Connected to MongoDB server");
    const db = client.db("TodoApp");

db.collection("Todos").insertOne({
    text: "something",
    complete: false
}, (err, result) => {
    if (err) {
        return console.log("Unable to insert todo", err);
     }
     console.log(JSON.stringify(result.ops, undefined, 2));
});


db.collection('Users').insertOne({
    name: 'Dave',
    age: 31,
    location: 'Manchester'
  }, (err, result) => {
    if (err) {
      return console.log('Unable to insert user', err);
    }

    console.log(result.ops);
  });
  
client.close();


});