
const expect = require("expect");
const request = require("supertest");
const { ObjectID } = require("mongodb")

const { app } = require("./../server");
const { Todo } = require("./../models/todo");

const todos = [{
    _id: new ObjectID(),
    text: "First test to do"
}, {
    text: "Second test to do",
    _id: new ObjectID(),
    completed: true,
    completedAt: 111
}]


beforeEach((done) => {
    Todo.remove({}).then(() => {
        return Todo.insertMany(todos);
    }).then(() => done());
});

describe("POST /todos", () => {
    it("should create a new todo", (done) => {
        var text = "This is the test todo text";
        request(app)
            .post("/todos")
            .send({ text })
            .expect(200)
            .expect((res) => {
                expect(res.body.text).toBe(text);
            })
            .end((err, res) => {
                if (err) {
                    return done(err);
                }
                Todo.find({ text }).then((todos) => {
                    expect(todos.length).toBe(1);
                    expect(todos[0].text).toBe(text);
                    done();
                }).catch((e) => done(e));
            });
    });
    it("should not create a todo record with invalid body data", (done) => {
        request(app)
            .post("/todos")
            .send({})
            .expect(400)
            .end((err, res) => {
                if (err) {
                    return done(err);
                }
                Todo.find().then((todos) => {
                    expect(todos.length).toBe(2);
                    done();
                }).catch((e) => done(e));
            });
    });
});

describe("GET /todos", () => {
    it("should get all todos", (done) => {
        request(app)
            .get(`/todos`)
            .expect(200)
            .expect((res) => {
                expect(res.body.todos.length).toBe(2);
            })
            .end(done);


    });
});

describe("GET /todo/:id", () => {
    it("should get a todo from an id", (done) => {
        request(app)
            .get(`/todos/${todos[0]._id.toHexString()}`)
            .expect(200)
            .expect((res) => {
                expect(res.body.todo.text).toBe(todos[0].text);
            })
            .end(done);
    })
    it("should return a 404 for a not found id", (done) => {
        var id = new ObjectID().toHexString();
        request(app)
            .get(`/todos/${id}`)
            .expect(404)
            .end(done)

    });
    it("should return a 404 for non-object ids", (done) => {
        request(app)
            .get("/todos/123")
            .expect(404)
            .end(done)
    });


});

describe("PATCH /todos/:id", () => {
    it("should update the todo", (done) => {
        var updatedTodo = {text: "This is an updated task", completed: true}
        request(app)
            .patch(`/todos/${todos[0]._id.toHexString()}`)
            .send(updatedTodo)
            .expect(200)
            .expect((res) => {
                expect(res.body.todo.text).toBe(updatedTodo.text);
                expect(res.body.todo.completed).toBe(updatedTodo.completed);
                expect(res.body.todo.completedAt).toBeA("number");
            })
            .end(done)
    });
    it("should clear completedAt when todo is not completed", (done) => {
        var updatedTodo2 = {text: "This is an updated task 2", completed: false}
        request(app)
        .patch(`/todos/${todos[1]._id.toHexString()}`)
        .send(updatedTodo2)
        .expect(200)
        .expect((res) => {
            expect(res.body.todo.text).toBe(updatedTodo2.text);
            expect(res.body.todo.completed).toBe(updatedTodo2.completed);
            expect(res.body.todo.completedAt).toNotExist();
        })
        .end(done)
    });
});
