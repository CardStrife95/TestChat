var mongoose = require('mongoose');
var Todo = mongoose.model('Todo');
var News = mongoose.model('News');
var Message = mongoose.model('Message');

exports.list = function(req,res,next){
  Todo
    .find()
    .sort('-updated_at')
    .exec(function(err, todos){
        if(err) return next(err);
        res.json(todos);
    });  
};

exports.listNews = function(req,res,next){
    News
        .find()
        .sort('-update-at')
        .exec(function(err,news){
            if(err) return next(err) ;
            res.json(news);
        });
};

exports.listMessages = function(req,res,next){
    Message
        .find()
        .sort('-updated_at')
        .exec(function(err,messages){
            if(err) return next(err);
            res.json(messages);
        });
         
};