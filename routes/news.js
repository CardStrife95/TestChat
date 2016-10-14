var mongoose = require('mongoose');
var News = mongoose.model('News');
var Comment = mongoose.model('Comment');



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
            console.log(news);
            console.log(news.comments);
            res.render('newRead',{
                title : "News",
                news : news,
                current : req.params.id
            });
        });  
};

exports.addComment = function(req,res){
    var comment = new Comment({
        pseudo : req.body.pseudo,
        content : req.body.comment
    });
    News
        .findById(req.params.id,function(err,news){
            if (err) throw err;
            news.comments.push(comment);
            comment.save(function(err, mess){
                if(err) throw err;
            });
            news.save(function(err,newss){
                if(err) throw err;
            });
        });
    
}

exports.delete_comment = function(req,res){
    News.
        findById(req.params.id,function(err,news){
            if(err) throw err;
            news.comments.find({comment_id : req.params.idcomment},function(err,comment){
                    
            });
        });
}