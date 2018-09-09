const {ObjectID} = require('mongodb');
const {Todo} = require('./../../models/todo');
const {User} = require('./../../models/user');
const userOneId = new ObjectID();
const userTwoId = new ObjectID();
const jwt = require('jsonwebtoken');

const users =[{
  _id: userOneId,
  email: 'andy@example.com',
  password: 'user1pass',
  tokens: [{
    access: 'auth',
    token: jwt.sign({_id: userOneId, access: 'auth'}, process.env.JWT_SECRET).toString()
  }]
}, {
  _id: userTwoId,
  email: 'ganggang@example.com',
  password: 'user2pass',
   tokens: [{
    access: 'auth',
    token: jwt.sign({_id: userTwoId, access: 'auth'}, process.env.JWT_SECRET).toString()
  }]
}];

const todos = [{
    _id: new ObjectID(),
    text: 'First to do',
    _creator: userOneId
}, {
    _id: new ObjectID(),
    text: 'another test to do',
    completedAt: 123,
    completed: true,
    _creator: userTwoId
  
}];

const populateTodos = (done) => {
   Todo.remove({}).then(() => {
          Todo.insertMany(todos);
    }).then(() => done());
};



const populateUsers = (done) => {
  User.remove({}).then(() => {
    var userOne = new User(users[0]).save();
    var userTwo = new User(users[1]).save();

    return Promise.all([userOne, userTwo])
  }).then(() => done());
};


module.exports = {todos, populateTodos, users, populateUsers};