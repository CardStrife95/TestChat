var mongoose = require('mongoose');
var News = mongoose.model('News');



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