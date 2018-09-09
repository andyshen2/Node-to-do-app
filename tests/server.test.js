const expect = require('expect');
const request = require('supertest');
const{ObjectID} = require('mongodb');

const {app} = require('./../server');
const {Todo} = require('./../models/todo');
const {User} = require('./../models/user');


/*
const todos = [{
    _id: new ObjectID(),
    text: 'First to do'
}, {
    _id: new ObjectID(),
    text: 'another test to do',
    completedAt: 123,
    completed: true
  
}];
*/
const {todos, populateTodos, users, populateUsers} = require('./seed/seed');

beforeEach(populateUsers);
beforeEach(populateTodos);

describe('POST /todos', () => {
   it('Should create a new to do', (done) => {
       var text = 'testing';
       
       request(app)
        .post('/todos')
        .set('x-auth', user[0].tokens[0])
        .send({text})
        .expect(200)
        .expect((res) => {
           expect(res.body.text).toBe(text);
       })
       .end((err, res) => {
         if(err){
            return done(err);
         }  
         
         Todo.find({text}).then((todos) => {
             expect(todos.length).toBe(1);
             expect(todos[0].text).toBe(text);
             done();
         }).catch((e) => done(e));
           
       });   
   });
    
    it('Should not create to do with invalid body data', (done) => {
      request(app)
        .post('/todos')
        .set('x-auth', user[0].tokens[0])
        .send({})
        .expect(400)
       .end((err, res) => {
         if(err){
            return done(err);
         }  
         
         Todo.find().then((todos) => {
             expect(todos.length).toBe(2);
             done();
         }).catch((e) => done(e));
           
       });   
    });
});

describe('GET /todos', () => {
    it('Should get all todos', (done) => {
       request(app)
        .get('/todos')
        .set('x-auth', user[0].tokens[0])
        .expect(200)
        .expect((res) => {
           expect(res.body.todos.length).toBe(1);
       })
        .end(done);
    });
});

/*
describe('GET /todos/:id', () => {
    it('should not return todo doc created by other user', (done) => {
        request(app)
            .get(`/todos/${todos[1]._id.toHexString()}`)
            .set('x-auth', user[0].tokens[0])
            .expect(404)
            .end(done);
    });
    
    it('should return 404 if todo not found', (done) => {
        var hexId = new ObjectID().toHexString();
        
        request(app)
        .get(`/todos/${hexId}`)
        .set('x-auth', user[0].tokens[0])
        .expect(404)
        .end(done);
    });
    
    it('should return 404 for non-object ids', (done) => {
        request(app)
        .get('/todos/123abd')
        .expect(404)
        .end(done);
    });
}); 
*/

describe('DELETE /todos/:id' , () => {
    it('should remove a todo', (done) => {
        var hexId = todos[1]._id.toHexString();
        
        request(app)
            .delete(`/todos/${hexId}`)
            .set('x-auth', user[1].tokens[0])
            .expect(200)
            .expect((res) => {
                expect(res.body.todo._id).toBe(hexId);
            })
            .end((err, res) => {
                if(err){
                    return done(err);
                }
                Todo.findById(hexId).then((todo) => {
                    expect(todo).toBeFalsy();   
                    done();
                }).catch((e) => done(e));
                
            });        
    });
    
    it('should return 404 if todo not found', (done) => {
        var hexId = new ObjectID().toHexString();
        
        request(app)
        .delete(`/todos/${hexId}`)
        .expect(404)
        .end(done);
    });
    
    it('should return 404 if object is invalid', (done) => {
       
        
        request(app)
        .get(`/todos/123`)
        .expect(404)
        .end(done);
    });
});


describe('PATCH /todos/:id', () => {
    it('should update the todo', (done) => {
        var hexId = todos[0]._id.toHexString();
        
        request(app)
            .patch(`/todos/${hexId}`)
            .send({
                completed: true,
                text: 'new text'
            })
            .expect(200)
            .expect((res) => {
                expect(res.body.todo.completed).toBe(true);
                expect(res.body.todo.text).toBe('new text');
              //  expect(res.body.todo.completedAt).toBeA('number');
            })
            .end(done);
         
        
        
    });
    
    it('should clear completed at when todo is not completed', (done) => {
         var hexId = todos[1]._id.toHexString();
        
        request(app)
            .patch(`/todos/${hexId}`)
            .send({
                completed: false,
                text: 'new text'
            })
            .expect(200)
            .expect((res) => {
                expect(res.body.todo.completed).toBe(false);
                expect(res.body.todo.text).toBe('new text');
              // expect(res.body.todo.completedAt).toNotExist();
            })
            .end(done);
         
    });
});

describe('GET /users/me', () => {
  it('Should return user if authenticated', (done) => {
    request(app)
      .get('/users/me')
      .set('x-auth', users[0].tokens[0].token)
      .expect(200)
      .expect((res) => {
        expect(res.body._id).toBe(users[0]._id.toHexString());
        expect(res.body.email).toBe(users[0].email);
    }).end(done);
  });
  
  it('Should return user 401 if not authenticated', (done) => {
    request(app)
      .get('/users/me')
      .expect(401)
      .expect((res) => {
        expect(res.body).toEqual({});
      })
      .end(done);
  });
});

describe('POST /users', () => {
  it('should create a user', (done) => {
    var email = 'dudeman@example.com';
    var password = 'bad123';
    
    request(app)
      .post('/users')
      .send({email, password})
      .expect(200)
      .expect((res) => {
        //.toExist() not a function anymore toBeTruthy
        expect(res.headers['x-auth']).toBeTruthy();
        expect(res.body._id).toBeTruthy();
        expect(res.body.email).toBe(email);
    })
    .end((err) => {
    if (err) {
          return done(err);
        }

        User.findOne({email}).then((user) => {
          expect(user).toBeTruthy();
          expect(user.password).not.toBe(password);
          done();
      });
    });
  });
 /* it('should return validation errors if request is invalid', (done) => {
   
    
    request(app)
      .post('/users')
      .send({email:'aa', password:'a'})
      .expect(400)
      .end(done());
  });*/
/*  it('should not create user if email in use', (done) => {
    request(app)
      .post('/users')
      .send({
        email: users[0].email,
        password: 'Password123!'
      })
      .expect(400)
      .end(done);
  });*/
})

describe