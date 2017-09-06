const express = require('express');
const User = require('mongoose').model('User');

const router = new express.Router();

router.get('/dashboard', (req, res) => {
  res.status(200).json({
    message: "You're authorized to see this secret message as this is a message from Server"
  });
});

router.get('/user', (req, res) => {
  console.log(req.body);
  User.find({}, function(err, users) {
		res.status(200).json(Object.assign({}, users, {message: "This is from server, user page"}));
	});

});

router.get('/projects', (req, res) => {
  res.status(200).json({
    message: "This is from server, projects..."
  });
});


module.exports = router;
