//const MongoClient = require('mongodb').MongoClient;
const {MongoClient, ObjectID} = require('mongodb');

var obj = new ObjectID();

 
MongoClient.connect('mongodb://localhost:27017/TodoApp',{ useNewUrlParser: true }, (err, client) => {
    if(err){
        return console.log('unable to connect to MongoDB server');
    }
    console.log('Connected to MongoDB server');
//    const db = client.db('TodoApp')
//    
//    db.collection('Todos').insertOne({
//        text: 'somehting',
//        completed: false
//    }, (err, result) =>{
//        if(err){
//            return console.log('unable to insert todo', err);
//        
//        }
//        console.log(JSON.stringify(result.ops, undefined, 2));
//    })
    
    const db = client.db('Users')
   
    db.collection('user').insertOne({
        name: 'Andy',
        age: 21,
        location: 'here'
    }, (err, result) => {
        if(err){
             return console.log('unable to insert user', err);
        }
        
         console.log(result.ops[0]._id.getTimestamp());
    })
    client.close();
});

