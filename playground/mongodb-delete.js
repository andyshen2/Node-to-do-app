const {MongoClient, ObjectID} = require('mongodb');

var obj = new ObjectID();

 
MongoClient.connect('mongodb://localhost:27017/TodoApp',{ useNewUrlParser: true }, (err, client) => {
    if(err){
        return console.log('unable to connect to MongoDB server');
    }
    console.log('Connected to MongoDB server');
    const db = client.db('TodoApp')
    
    
    db.collection('Todos').deleteMany({text: 'program'}).then((result) => {
        console.log(result);
    })
    
    db.collection('Todos').deleteOne({text: 'program'}).then((result) => {
        console.log(result);
    })
    
    //find one delete
    db.collection('Todos').findOneAndDelete({completed: false}).then((result) => {
        console.log(result);
    });
    
    
    });