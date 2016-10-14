
/*
 * GET users listing.
 */
var mongoose = require('mongoose');
var User = mongoose.model('User');




exports.getUser = function(req, res){
  User.findById(req.params.id,function(err,user){
    if (err) throw err;
    res.json(user);
  });
};

