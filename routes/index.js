
/*
 * GET home page.
 */
var utils = require('utils');
var mongoose = require('mongoose');
var Todo = mongoose.model('Todo');

exports.index = function(req, res, next){
  //res.render('index', { title: 'Test de Mongodb/Express.js/Nodejs' });
  Todo.find().sort('-updated_at').exec(function(err,todos){
    if (err) return next(err);
    res.render('index',{
      title : "Test avec Mongoose",
      todos : todos
    });
  });
};

exports.create = function(req,res, next){
  new Todo ({
    content : req.body.content,
    updated_at : Date.now()
  }).save(function(err,todo,count){
    if (err) return next(err);
    res.redirect('/');
  });
};

exports.destroy = function(req,res,next){
  Todo.findById(req.params.id,function(err,todo){
    todo.remove(function(err,todo){
      if(err) return next(err);
      res.redirect('/');
    });
  });
};

exports.edit = function(req,res,next){
  Todo.find().sort('-updated_at').exec(function(err,todos){
    if (err) return next(err);
    res.render('edit',{
      title: "Test avec Mongoose",
      todos : todos,
      current : req.params.id
    });
  }); 
};

exports.update = function(req,res,next){
  Todo.findById(req.params.id,function(err,todo){
    if (err) return next(err);
    todo.content = req.body.content;
    todo.updated_at = Date.now();
    todo.save(function(err,todo,count){
      res.redirect('/');
    });
  });
};

exports.current_user = function(req,res,next){
  var user_id = req.cookie ?
    req.cookies.user_id : undefined;
  if(!user_id){
    //res.cookie('user_id',utils.uid(32));
  }
  next();
}; 