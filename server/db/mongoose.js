var mongoose = require('mongoose');

mongoose.Promise = global.Promise;

let db = {
    localhost: 'mongodb://localhost:27017/TodoApp', { useNewUrlParser: true },
    mlab: 'mongodb://AndyShen:c3b4ucme@ds233531.mlab.com:33531/todo-app-database'
};
mongoose.connect(db.localhost || db.mlab);

module.exports = {
    mongoose
};