var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Todo = new Schema({
    user_id : String,
    content : String,
    updated_at : Date
});

var Message = new Schema({
    message_id : Schema.Types.ObjectId,
    email_exp: String,
    motif : String,
    updated_at : {type : Date, default: Date.now},
    content : String
});

var Comment = new Schema({
    comment_id : Schema.Types.ObjectId,
    pseudo : String,
    update_at: { type:Date , default:Date.now },
    content : String
});

var News = new Schema({
    new_id : Schema.Types.ObjectId,
    title : String,
    update_at : { type:Date, default:Date.now},
    content : String,
    comments : [Comment]    
});

var Article = new Schema({
    article_id : Schema.Types.ObjectId,
    title : String,
    updated_at : {type : Date , default : Date.now},
    content : String
});

module.exports =  mongoose.model('Todo',Todo);
module.exports =  mongoose.model('Message',Message);
module.exports =  mongoose.model('Comment',Comment);
module.exports =  mongoose.model('News',News); 
module.exports =  mongoose.model('Article',Article); 

mongoose.connect('mongodb://127.0.0.1/express-todo')