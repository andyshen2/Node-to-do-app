var mongoose = require('mongoose');

mongoose.Promise = global.Promise;

// let db = {
//     //localhost: 'mongodb://localhost:27017/TodoApp',
//    
// };
mongoose.connect(process.env.MONGODB_URI, {useNewUrlParser: true });

module.exports = {
    mongoose
};
//, { useNewUrlParser: true }
