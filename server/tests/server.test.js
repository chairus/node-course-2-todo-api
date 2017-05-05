const expect = require("expect");
const request = require("supertest");

const { ObjectID } = require("mongodb");
const { app } = require("../server");
const { Todo } = require("../models/todo");
const { User } = require("../models/user");
const seed = require("./seed/seed");

var todos = seed.todos;
var users = seed.users;

beforeEach(seed.populateUsers);
beforeEach(seed.populateTodos);

describe("POST /todos", () => {
    it("should create a new todo", (done) => {
        var text = "Test todo text";

        request(app)
            .post("/todos")
            .send({text})
            .expect(200)
            .expect((res) => {
                expect(res.body.text).toBe(text);
            })
            .end((err, res) => {
                if (err) {
                    return done(err);
                }

                Todo.find({text}).then((todos) => {
                    expect(todos.length).toBe(1);
                    expect(todos[0].text).toBe(text);
                    done();
                }).catch((err) => {
                    done(err);
                });
            })
    });


    it("should not create todo with invalid body data", (done) => {
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
                }).catch((err) => {
                    done(err);
                });
            })
    });
});

describe("GET /todos", () => {
    it("should return all todos", (done) => {
        request(app)
            .get("/todos")
            .expect(200)
            .expect((res) => {
                expect(res.body.todoList.length).toBe(1);
            })
            .end(done);
    });
});

describe("GET /todos/:id", () => {
    it("should return todo doc", (done) => {
        request(app)
            .get(`/todos/${todos[0]._id.toHexString()}`)
            .expect(200)
            .expect((res) => {
                expect(res.body.todo.text).toBe(todos[0].text);
            })
            .end(done);
    });

    it("should return a 404 if todo not found", (done) => {
       request(app)
            .get(`/todos/${(new ObjectID()).toHexString()}`)
            .expect(404)
            .end(done);
    });

    it("should return a 404 for non-object ID", (done) => {
        request(app)
            .get(`/todos/12345abcde`)
            .expect(404)
            .end(done);
    });
});

describe("DELETE /todos/:id", () => {
    it("should remove a todo", (done) => {
        var id = todos[0]._id.toHexString();

        request(app)
            .delete(`/todos/${id}`)
            .expect(200)
            .expect((res) => {
                expect(res.body.todo._id).toBe(id);
            })
            .end((err, res) => {
            if (err) {
                return done(err);
            }

            Todo.findById(id).then((res) => {
                expect(res).toNotExist();
                done();
            }).catch(err => done(err))
        });
    });

    it("should return 404 if todo not found", (done) => {
        request(app)
            .delete(`/todos/${(new ObjectID()).toHexString()}`)
            .expect(404)
            .end(done);
    });

    it("should return 404 if ID not valid", (done) => {
        request(app)
            .delete(`/todos/12345abcde`)
            .expect(404)
            .end(done);
    });
});

describe("PATCH /todos/:id", () => {
    it("should return an updated todo with completed property from false to true", (done) => {
        var id = todos[0]._id.toHexString();
        var body = {
            text: "This is from test",
            completed: true
        };

        request(app)
            .patch(`/todos/${id}`)
            .send(body)
            .expect(200)
            .expect((res) => {
                expect(res.body.todo.text).toBe(body.text);
                expect(res.body.todo.completed).toBe(true);
                expect(res.body.todo.completedAt)
                    .toExist()
                    .toBeA("number")
                    .toBeGreaterThan(0);
            })
            .end((err, res) => {
                if (err) {
                    return done(err);
                }

                Todo.findById(id).then((todo) => {
                    expect(res).toExist();
                    done();
                }).catch(err => {
                    done(err);
                })
        })
    });

    it("should return an updated todo with completed property from true to false", (done) => {
        var id = todos[0]._id.toHexString();
        var body = {
            text: "Again, this is from test",
            completed: false
        };

        request(app)
            .patch(`/todos/${id}`)
            .send(body)
            .expect(200)
            .expect((res) => {
                expect(res.body.todo.text).toBe(body.text);
                expect(res.body.todo.completed).toBe(false);
                expect(res.body.todo.completedAt).toNotExist();
            })
            .end((err, res) => {
                if (err) {
                    return done(err);
                }

                Todo.findById(id).then((todo) => {
                    expect(res).toExist();
                    done();
                }).catch(err => {
                    done(err);
                })
        })
    });
});

describe("GET /users/me", () => {
    it("should return the user if authenticated", (done) => {
        request(app)
            .get("/users/me")
            .set("x-auth", users[0].tokens[0].token)
            .expect(200)
            .expect((res) => {
                expect(res.body._id).toBe(users[0]._id.toHexString());
                expect(res.body.email).toBe(users[0].email);
            })
            .end(done);
    });

    it("should return a 401 if not authenticated", (done) => {
        request(app)
            .get("/users/me")
            .expect(401)
            .expect((res) => {
                expect(res.body).toEqual({});
            })
            .end(done);
    });
});

describe("POST /users", () => {
    it("should create a user", (done) => {
        var body = {
            email: "chrissy@example.com",
            password: "iluv2code143"
        };

        request(app)
            .post("/users")
            .send(body)
            .expect(200)
            .expect((res) => {
                expect(res.headers['x-auth']).toExist();
                expect(res.body._id).toExist();
                expect(res.body.email).toBe(body.email);
            })
            .end((err) => {
                if (err) {
                    return done(err);
                }

                User.findOne({ email: body.email }).then((user) => {
                    expect(user).toExist();
                    expect(user.password).toNotBe(body.password);
                    done();
                }).catch(err => done(err));
            });
    });

    it("should return validation error if request invalid", (done) => {
        var body = {
            email: "hashmalergordits",
            password: "pass"
        }

        request(app)
            .post("/users")
            .send(body)
            .expect(400)
            .expect((res) => {
                expect(res.headers['x-auth']).toNotExist();
                expect(res.body._id).toNotExist();
                expect(res.body.email).toNotExist();
            })
            .end(done);
    });

    it("should not create user if email in use", (done) => {
        var body = {
            email: users[0].email,
            password: "iluv2code143"
        };

        request(app)
            .post("/users")
            .send(body)
            .expect(400)
            .end((err) => {
                if (err) {
                    return done(err);
                }

                User.find({ email: body.email }).then((data) => {
                    expect(data.length).toBe(1);
                    done();
                }).catch(err => done(err));
            });
    });
});

describe("POST /users/login" ,() => {
    var body = {
        email: users[1].email,
        password: users[1].password
    }

    it("should login user and return auth token", (done) => {
        request(app)
            .post("/users/login")
            .send(body)
            .expect(200)
            .expect((res) => {
                expect(res.headers['x-auth']).toExist();
            })
            .end((err, res) => {
                if (err) {
                    return done(err);
                }

                User.findOne({ email: body.email }).then((user) => {
                    expect(user.tokens[0]).toInclude({
                        access: 'auth',
                        token: res.headers['x-auth']
                    });
                    done();
                }).catch(e => done(e));
            });
    });

    it("should reject invalid login", (done) => {
        request(app)
            .post("/users/login")
            .send({ email: body.email, password: "12345abcde" })
            .expect(400)
            .expect((res) => {
                expect(res.headers['x-auth']).toNotExist();
                expect(res.body).toEqual({});
            })
            .end((err) => {
                if (err) {
                    return done(err);
                }

                User.findOne({ email: users[1].email }).then((user) => {
                    expect(user.tokens.length).toBe(0);
                    done();
                }).catch(e => done(e));
            });
    });
});
