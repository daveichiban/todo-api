
const {ObjectID} = require("mongodb");
const express = require("express");
const bodyParser = require("body-parser")


const {mongoose} = require("./db/mongoose");
const {Todo} = require("./models/todo");
const {User} = require("./models/user");

var app = express();

app.use(bodyParser.json());

app.post("/todos", (req, res) => {
    var todo = new Todo({
        text: req.body.text
    });
    todo.save().then ((doc) => {
        res.send(doc);
    }, (e) => {
        res.status(400).send(e);
    }
);
    console.log(req.body);
});

app.get("/todos", (req, res) => {
    Todo.find().then((todos) => {
        res.send({todos});
    }, (e) => {
        res.status(400).send(e);
    })

});

app.get("/todos/:id", (req, res) => {
    var id = req.params.id;
    if (!ObjectID.isValid(id)) {
        console.log("Invalid ID", id);
        return res.status(404).send();
    }
    Todo.findById(id).then((todo) => {
        if(!todo) {
            res.status(404).send();
        }        
        res.send({todo});
    }), (e) => {
        res.status(404).send();
    }
});

app.listen(3000, () => {
    console.log("Started on port 3000");

});

module.exports = {
    app
};