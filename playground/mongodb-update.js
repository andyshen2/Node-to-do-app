const {MongoClient, ObjectID} = require('mongodb');

var obj = new ObjectID();

 
MongoClient.connect('mongodb://localhost:27017/TodoApp',{ useNewUrlParser: true }, (err, client) => {
    if(err){
        return console.log('unable to connect to MongoDB server');
    }
    console.log('Connected to MongoDB server');
    const db = client.db('TodoApp')
//    
//    db.collection('Todos').findOneAndUpdate({
//        _id: new ObjectID('5b431802d40c075b0aa45f47')
//    }, {
//        $set: {
//            completed: true
//        }
//    },{
//        returnOriginal: false
//    }).then((result) => {
//        console.log(result);
//    });
    
    db.collection('Users').findOneAndUpdate({
        _id: new ObjectID('5b4320f3d40c075b0aa463ac')
    }, {
        $inc: {
            age: 1
        },
        $set: {
            name: 'Shen'
        }
    }, {
        returnOriginal: false                                        
    }).then((result) => {
        console.log(result);
    });
   
    });