var mongoose = require('mongoose');

mongoose.Promise = global.Promise;

let db = {
    localhost: 'mongodb://localhost:27017/TodoApp',
    mlab: 'mongodb://AndyShen:c3b4ucme@ds233531.mlab.com:33531/todo-app-database'
};
mongoose.connect(db.mlab || db.localhost);

module.exports = {
    mongoose
};
//, { useNewUrlParser: true }