//const MongoClient = require('mongodb').MongoClient;
const {MongoClient, ObjectID} = require('mongodb');

var obj = new ObjectID();

 
MongoClient.connect('mongodb://localhost:27017/TodoApp',{ useNewUrlParser: true }, (err, client) => {
    if(err){
        return console.log('unable to connect to MongoDB server');
    }
    console.log('Connected to MongoDB server');
    const db = client.db('TodoApp')
    
//    db.collection('Todos').find({
//        _id: new ObjectID('5b34a46c51abb227ac5e24d9')
//    }).toArray().then((docs) => {
//        console.log('Todos');
//        console.log(JSON.stringify(docs, undefined, 2));
//    }, (err) => {
//       console.log('Can not fethc todos', err); 
//    });
    

    db.collection('Todos').find().count().then((count) => {
        console.log('Todos count ' + count);
        console.log(JSON.stringify(docs, undefined, 2));
    }, (err) => {
       console.log('Can not fethc todos', err); 
    });
    
    client.close();
    

});

