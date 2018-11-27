var express = require('express');
var bodyParser = require('body-parser');

var {mongoose} = require('./db/mongoose.js');
var {Todo} = require('./models/todo.js');
var {User} = require('./models/user.js');
var {ObjectID} = require('mongodb');

var app = express();
app.use(bodyParser.json());

app.post('/todos',(req,res)=>{
    // console.log(req.body);
    var todo = new Todo({
        text: req.body.text
    });
    todo.save().then((doc)=>{
        res.send(doc);
    },(e)=>{
        res.status(400).send(e);
    });
});

app.get('/todos', (req, res) => {
    Todo.find().then((todos) => {
       res.send({
           todos: todos
       })
    }, (e)=>{
        res.status(400).send(e);
    });
});

//Get /todos/12341234
app.get('/todos/:id', (req, res) => {
    var id = req.params.id;
    if(!ObjectID.isValid(id)){
        return res.status(404).send();
    }
    Todo.findById(id).then((todo) => {
        if (!todo) {
            res.status(404).send();
        }
        res.send({todo});
    }).catch((e) => {
        res.status(400).send();
    });
});

app.listen(3000, () => {
    console.log('Started on 3000');
});

// var newTodo = new Todo({
//     text: 'Drive',
//     completed: true,
//     completedAt: 26
// });
// var newUser = new User({
//     email: "RkaneEmail",
//     userName: "Rkane"
// });
//
// newTodo.save().then((doc)=>{
//     console.log(doc);
// },(e)=>{
//     console.log("Didn't work: ",e);
// });
// newUser.save().then((doc) => {
//     console.log(doc);
// }, (e) => {
//     console.log("Didn\'t work: ", e);
// });

module.exports = {app};