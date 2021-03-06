const {ObjectID} = require("mongodb");
const {Todo} = require("./../../models/todo");
const {User} =require("./../../models/user");
const jwt = require("jsonwebtoken");

const userOneId = new ObjectID();
const userTwoId = new ObjectID();

const users = [{
    _id: userOneId,
    email: "dave@example.com",
    password: "userOnePass",
    tokens: [{
        access: "auth",
        token: jwt.sign({_id: userOneId, access: "auth"}, "abc123").toString()
    }]   
},{
    _id: userTwoId,
    email: "dave2@example.com",
    password: "userTwosPass", 
}];


const todos = [{
    _id: new ObjectID(),
    text: "First test to do"
}, {
    text: "Second test to do",
    _id: new ObjectID(),
    completed: true,
    completedAt: 111
}];

const populateTodos = (done) => {
    Todo.remove({}).then(() => {
        return Todo.insertMany(todos);
    }).then(() => done()).catch((e) => done(e));
};


const populateUsers = (done) => {
    User.remove({}).then(() => {
        var userOne = new User(users[0]).save();
        var userTwo = new User(users[1]).save();

        return Promise.all([userOne, userTwo])
    }).then(() => done());
};

module.exports = {todos, populateTodos, users, populateUsers};