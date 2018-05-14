const User = require('../models/user');
const { normalizeErrors } = require('../helpers/mongoose');
const jwt = require('jsonwebtoken');

exports.auth = function(req, res){
	  const email = req.body.email;
	  const password = req.body.password;

	  if (!email || !password) return res.status(422).send({errors: [{title: 'Missing Data', detail: "Provide email and password"}] });

	  User.findOne({email: email}, function(err, user) {
	    if (err) return res.status(422).send({errors: normalizeErrors(err.errors) });
	    if (!user) return res.status(422).send({errors: [{title: 'Invalid User', detail: "User doesnt exist"}] });


	    if (user.isSamePassword(password)) {
	      return res.json(jwt.sign({userId: user.id, username: user.username}, 'secret', { expiresIn: '1h' }));

	      // return res.json({token: jwt.encode({userId: user.id, email: user.email, username: user.username}, config.SECRET), email: user.email})
	    } else {
	      return res.status(422).send({errors: [{title: 'Wrong Data', detail: "Wrong email or password"}] });
	    }
	  })
}

exports.register = function(req, res){
	const {email, username, password, passwordConfirmation} = req.body;

	if (!email || !password) {
		 return res.status(422).send({errors: [{title: 'Data massing', detail: 'Provide email and password'}]});
	}

	if (password !== passwordConfirmation) {
		 return res.status(422).send({errors: [{title: 'Invalid password', detail: 'Password is not a same as confirmation'}]});	
	}


	User.findOne({email}, function(err, existingUser) {
		if (err) {
			return res.status(422).send({'Mongoose': 'Replace with mongoose error'});
		}

		if (existingUser) {
			return res.status(422).send({errors: [{title: 'Invalid Email', detail: 'User with same email already exist'}]});
		}

		const user = new User({
			username,
			email,
			password
		});

		user.save(function(err) {
			if (err) { return res.status(422).send({errors: normalizeErrors(err.errors)}); }

			return res.json({"registered": true});
		})
	})
}

exports.authMiddleware = function(req, res, next) {
  const token = req.headers.authorization;

  if (token) {
    const user = parseToken(token);

    User.findById(user.userId, function(err, user){
      if (err) return res.status(422).send({errors: normalizeErrors(err.errors) });

      if (user) {
        res.locals.user = user;
        next();
      } else {

        return notAuthorized(res);
      }
    });
  } else {

    return notAuthorized(res);
  }
}

function parseToken(token) {
  return jwt.verify(token.split(' ')[1], 'secret');
}

function notAuthorized(res) {
	return res.status(401).send({errors: [{title: 'Not Authorized', detail: "You are not authorized"}] });
}



