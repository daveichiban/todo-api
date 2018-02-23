const {MongoClient, ObjectID} = require("mongodb");

MongoClient.connect("mongodb://localhost:27017/TodoApp", (err, client) => {
    if (err) {
       return console.log("Unable to connect to database server");
    }
    console.log("Connected to MongoDB server");
    const db = client.db("TodoApp");

    // db.collection("Todos").findOneAndReplace({_id: new ObjectID("5a902ff151031f61bb5eacd9")}, {
    //     $set: {
    //         completed: true
    //     }
    // }, {
    //         returnOriginal: false
    //     }).then (results => {
    //         console.log(results);

    //     });


        db.collection("Users").findOneAndReplace({_id: new ObjectID("5a901a8b28d72c4f74314b56")}, {
        $set: {
            name: "Sumi"
        },
        $inc: {
            age: 1
        }

    }, {
            returnOriginal: false
        }).then (results => {
            console.log(results);

        });


client.close();

});