const expect = require('expect');
const request = require('supertest');
const {ObjectID} = require('mongodb');

const {app} = require('./../server');
const {Todo} = require('./../models/todo');

const todos = [{
    _id: new ObjectID(),
    text: 'First Test Todo'
}, {
    _id: new ObjectID(),
    text: 'Second Test Todo',
    completed: true,
    completedAt: 777
}];

beforeEach((done) => {
    Todo.remove({}).then(() => {
        return Todo.insertMany(todos);
    }).then(()=>done());
});

describe('POST /todos', () => {
   it('should create a new todo', (done) => {
       var text = 'Test todo text';

       request(app)
           .post('/todos')
           .send({text})
           .expect(200)
           .expect((res)=>{
               expect(res.body.text).toBe(text);
           })
           .end((err, res) => {
               if(err){
                   return done(err);
               }
               Todo.find({text}).then((todos)=>{
                   expect(todos.length).toBe(1);
                   expect(todos[0].text).toBe(text);
                   done();
               }).catch((e)=>{
                   done(e)
               });
           });
   });

   it('should not create todo with invalid body data', (done) => {
       request(app)
           .post('/todos')
           .send({})
           .expect(400)
           .end((err, res) => {
               if(err){
                   return done(err);
               }
               Todo.find().then((todos) => {
               expect(todos.length).toBe(2);
               done();
           }).catch((e)=> {
               done(e);
           });
       });
   });
});

describe('GET /todos', () => {
    it('should get all todos', (done) => {
        request(app)
            .get('/todos')
            .expect(200)
            .expect((res) => {
                expect(res.body.todos.length).toBe(2);
            })
            .end(done);
    });
});

describe('GET /todos/:id', () => {
    it('should return todo doc', (done) => {
        request(app)
            .get(`/todos/${todos[0]._id.toHexString()}`)
            .expect(200)
            .expect((res) => {
                expect(res.body.todo.text).toBe(todos[0].text);
            })
            .end(done);
    });

    it('should return 404 if todo not found', (done) => {
        //send valid ID that isn't in collection. Get 404 code.
        let valID = new ObjectID().toHexString();
        request(app)
            .get(`/todos/${valID}`)
            .expect(404)
            .end(done);
    });

    it('should return 404 for invalid ID', (done) => {
        //send invalid ID. Get 404 code.
        request(app)
            .get('/todos/123123')
            .expect(404)
            .end(done);
    });
});

describe('DELETE /todos/:id', () => {
    it('should remove a todo', (done) => {
        var hexId = todos[0]._id.toHexString();
        request(app)
            .delete(`/todos/${hexId}`)
            .expect(200)
            .expect((res) => {
                expect(res.body.todo._id).toBe(hexId);
            })
            .end((err, res) => {
                if(err){
                    return done(err);
                }
                request(app)
                    .get(`/todos/${hexId}`)
                    .expect((res) => {
                        expect(404)
                    })
                    .end(done);
        });
    });

    it('should return 404 if todo not found', (done) => {
        var hexId = new ObjectID();
        request(app)
            .delete(`/todos/${hexId.toHexString()}`)
            .expect((res) => {
                expect(404)
            })
            .end(done);
    });

    it('should return 404 if object id is invalid', (done) => {
        request(app)
            .delete(`/todos/123123`)
            .expect((res) => {
                expect(404)
            })
            .end(done);
    });
});

describe('PATCH /todos/:id', () => {
    it('should update todo and set it to complete', (done) => {
        let id = todos[0]._id.toHexString();
        let text = 'First Test Todo; Updated';
        request(app)
            .patch(`/todos/${id}`)
            .send({
                text,
                completed: true
            })
            .expect(200)
            .expect((res) => {
                expect(res.body.todo.text).toBe(text);
                expect(res.body.todo.completed).toBe(true);
                expect(typeof res.body.todo.completedAt).toBe('number');
            })
            .end(done);
    });

    it('should clear completedAt when todo is not completed', (done) => {
        let id = todos[1]._id.toHexString();
        let text = 'Second Test Todo; Updated';
        request(app)
            .patch(`/todos/${id}`)
            .send({
                text,
                completed: false
            })
            .expect(200)
            .expect((res) => {
                expect(res.body.todo.text).toBe(text);
                expect(res.body.todo.completed).toBe(false);
                expect(res.body.todo.completedAt).toBeFalsy();
            })
            .end(done);
    });
});