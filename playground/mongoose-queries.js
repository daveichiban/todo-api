const {ObjectID} = require("mongodb");


const {mongoose} = require("./../server/db/mongoose");
const {Todo} = require("./../server/models/todo");

var id = "5a92ef643b535c0dc4bd0806";
    
if (!ObjectID.isValid(id)) {
    console.log("Invalid ID");
}

// Todo.find({
//     _id: id
// }).then((todos) => {
//     console.log("To dos", todos);
// });

// Todo.findOne({
//     _id: id
// }).then((todo) => {
//     console.log("To do", todo);
// });

Todo.findById(id).then((todo) => {
    if (!todo) {
        return console.log ("ID not found");
    }
    console.log("To do by id", todo);
}).catch((e) => console.log(e));
