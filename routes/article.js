var mongoose = require('mongoose');
var Article = mongoose.model('Article');



exports.index = function(req,res){
  Article
    .find()
    .sort('-updated-at')
    .exec(function(err,articles){
        if (err) throw err;
        res.render('article',{
            title : "Article",
            articles : articles
        })
    });  
};