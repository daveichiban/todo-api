const {ObjectID} = require("mongodb");
const express = require("express");
const bodyParser = require("body-parser")


const {mongoose} = require("./db/mongoose");
const {Todo} = require("./models/todo");
const {User} = require("./models/user");

var app = express();

app.use(bodyParser.json());
const port = process.env.PORT || 3000

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
        return res.status(404).send();
    }

    Todo.findById(id).then((todo) => {
        if(!todo) {
            res.status(404).send();
        }        
        res.send({todo});
    }).catch ((e) => {
        res.status(404).send();
    });
});

app.delete("/todos/:id", (req, res) => {
    var id = req.params.id;

    if (!ObjectID.isValid(id)) {
        console.log("Non valid id");
        return res.status(404).send();
    }
    Todo.findByIdAndRemove(id).then((todo) => {
        if(!todo) {
            res.status(404).send();
        }        
        res.send({todo});
    }).catch ((e) => {
        console.log("Something happened");
        res.status(400).send();
    });
});




app.listen(port, () => {
    console.log(`Started on port ${port}`);

});

module.exports = {
    app
};