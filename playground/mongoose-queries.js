const{ObjectID} = require('mongodb');
const{mongoose} = require('./../server/db/mongoose');
const{Todo} = require('./../server/models/todo');
const{User} = require('./../server/models/user');

var id = '5bfc48a9185cd10fd42e752b';

// var id = '5bfc5b3f682a1c36cc5a2d2311';
// if(!ObjectID.isValid(id)) {
//     console.log('ID not valid');
// }

// Todo.find({
//     _id: id
// }).then((todos) => {
//     console.log('Todos: ',todos);
// });
//
// Todo.findOne({
//     _id: id
// }).then((todo) => {
//     console.log('Todo: ',todo);
// });

// Todo.findById(id).then((todo) => {
//     if(!todo){
//         return console.log('ID not found');
//     }
//     console.log('Todo: ',todo);
// }).catch((e)=> console.log(e));

//User,findbyid
//user not found
//user found
//errors

User.findById(id).then((user) => {
    if(!user) {
        return console.log('ID not found')
    }
    console.log('User: ', user);
}).catch((e)=>console.log(e));