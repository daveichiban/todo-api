const {ObjectID} = require("mongodb");


const {mongoose} = require("./../server/db/mongoose");
const {Todo} = require("./../server/models/todo");
const {User} = require("./../server/models/user")

// Todo.remove({}).then((result) => {
//     console.log(result);
// });

// Todo.findOneAndRemove({}).then((result) => {
//     console.log(result);
// });

var id =new ObjectID("5a96b42300e14b1808c20083");

Todo.findByIdAndRemove({_id: id}).then((result) => {
    console.log(result);
});