var mongoose = require('mongoose');

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://<dbuser>:<dbpassword>@ds233531.mlab.com:33531/todo-app-database' || 'mongodb://localhost:27017/TodoApp', { useNewUrlParser: true });

module.exports = {
    mongoose
};