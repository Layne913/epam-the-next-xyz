var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var _ = require('underscore');

// note that typically data would NOT be loaded from the filesystem in this manner :)
var Article = mongoose.model('Article');
var Site = mongoose.model('Site');
var User = mongoose.model('User');


router.get('/articles', function(req, res, next) {
	res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-Header", "X-Requestd-With");

	Article.find({}, null, {sort:{data: -1}}, function(err, data) {
		res.send(data);
	});
});


router.post('/articles', function(req, res, next) {
	var article = new Article(req.body);
	article.save(function(err, article) {
		 if (err) return console.error(err);
	});
	res.send("You have successfully added" + article.title);
});

router.post('/users', function(req, res, next) {
  console.log(req.body);
  var user = new User(req.body);
  user.save(function(err, article) {
     if (err) {
      return console.error(err);
     } else {
     		console.log("successfully added in the database");
     		res.render('dashboard');
      	res.redirect('/./dashboard', {
        		greeting: "Hello",
        		name: user.name});
     }
  });
});


router.get('/articles/:id', function(req, res, next) {

	Article.findById(req.params.id, function(err, data) {
		if(!err) {
			var data_place = data.title;
			res.render('place',data);
			res.locals.scripts.push('/js/place.js');
		} else {
			res.send(404, 'File not Found');
		}
	});
});

// router.get('/sites', function(req, res, next) {
// 	Site.find({}, null, {sort:{data: -1}}, function(err, data) {
// 		console.log(JSON.stringify(data));
// 		var template = Handlebars.compile($('#list_sites').html())
// 		var temp = template(data);
// 	});
// })

module.exports = router;