var mongoose = require('mongoose');
var Message = mongoose.model('Message');


exports.index = function(req,res){
  Message
    .find()
    .sort('-updated_at')
    .exec(function(err,messages){
        if(err) throw err;
        res.render('message',{
            messages : messages
        })
    });  
};

exports.add=function(req,res){
    new Message({
        email_exp : req.body.email,
        motif : req.body.motif,
        content : req.body.contenu
    }).save(function(err,message,count){
        if(err) throw err;
        res.redirect('/');
    });
}