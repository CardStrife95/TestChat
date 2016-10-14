var mongoose = require('mongoose');
var News = mongoose.model('News');
var Message = mongoose.model('Message');



exports.index = function(req,res){
  News
    .find()
    .sort('-update_at')
    .exec(function(err,news){
        if(err) throw err;
        res.render('news',{
            title : 'News',
            news:news
        });
    });  
};


exports.insert = function(req,res){
    new News({
        title : req.body.title,
        content : req.body.content
    }).save(function(err,news,count){
        if(err) throw err;
        res.redirect('/news');
    });
};


exports.read = function(req,res){
    News
        .find()
        .sort('-update_at')
        .exec(function(err,news){
            if(err) throw err;
            res.render('newRead',{
                title : "News",
                news : news,
                current : req.params.id
            });
        });  
};

exports.addComment = function(req,res){
    var message = new Message({
        pseudo : req.body.pseudo,
        content : req.body.comment
    });
    News
        .findbyId(req.params.id,function(err,news){
            if (err) throw err;
            news.comments.push(message);
            message.save(function(err, mess){
                if(err) throw err;
            });
            news.save(function(err,newss){
                if(err) throw err;
            });
        });
    
}