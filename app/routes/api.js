var express = require('express');
var bodyParser = require('body-parser');
var jwt = require('jsonwebtoken');
var User = require('./../models/user');
var app = express();
var apiRoutes = express.Router();


apiRoutes.get('/', function (req, res){
	res.json({message: 'Welcome to the coolest API on the World!'});
})

apiRoutes.get('/users', function (req, res){
	User.find({}, function (err, users){
		res.json(users);
	})
})

apiRoutes.post('/authenticate', function (req, res){
	User.findOne({name: req.body.name}, function (err, user){
		if(err) throw err;
		if(!user){
			res.json({success: false, message: 'Authentication failed, user not found'});
		} else if(user){
			if(user.password != req.body.password){
				res.json({success: false, message: 'Authentication failed, wrong password'})
			} else {

				var token = jwt.sign(user, app.get('superSecret'), {expiresInMinutes: 1440});
				res.json({ success: true, message: 'Enjoy your token!', token: token});
			}
		}
	})
})

module.exports = apiRoutes;

