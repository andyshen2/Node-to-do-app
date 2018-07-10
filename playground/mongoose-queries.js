const {ObjectID} = require('mongodb');

const {mongoose} = require('./../server/db/mongoose');
const {Todo} = require('./../server/models/todo');
const {User} = require('./../server/models/user');

var id = '6b433a7009946e2cf48015a3';

if(ObjectID.isValid(id)){
  console.log('id not valid');  
};

User.find({
    _id: id
}).then((users) => {
    console.log('Users', users);
});

User.findOne({
    _id: id
}).then((user) => {
    console.log('users', user);
});

User.findById(id).then((user) => {
    if(!user){
        console.log('id not found');
    }
    console.log('User by id', user);
}).catch((e) => console.log(e));


//var id = '5b44542297114c23b885663311';
//
//if(!ObjectID.isValid(id)){
//    console.log('Id not valid');
//};
//
//Todo.find({
//    _id: id 
//}).then((todos) => {
//    console.log('Todos', todos);
//});
//
//Todo.findOne({
//    _id: id 
//}).then((todo) => {
//    console.log('Todos', todo);
//});
//
//
//Todo.findById(id).then((todo) => {
//    if(!todo){
//        return console.log('id not found');
//    }
//    console.log('Todo by id', todo);
//}).catch((e) => console.log(e));

