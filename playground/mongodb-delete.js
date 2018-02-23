const {MongoClient, ObjectID} = require("mongodb");

MongoClient.connect("mongodb://localhost:27017/TodoApp", (err, client) => {
    if (err) {
       return console.log("Unable to connect to database server");
    }
    console.log("Connected to MongoDB server");
    const db = client.db("TodoApp");


//DeleteMany

// db.collection("Todos").deleteMany({text: "something"}).then((result) => {
//     console.log(result);
// });



// //DeleteOne
// db.collection("Todos").deleteOne({text: "Eat Lunch"}).then(result => {
//     console.log(result);
// });

//findOneAndDelete



db.collection("Todos").findOneAndDelete({_id: new ObjectID("5a90230f51031f61bb5ea953")}).then( result => {
    console.log(result);

});


//client.close();

});